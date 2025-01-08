import { createContextProvider } from '@solid-primitives/context'
import { makePersisted } from '@solid-primitives/storage'
import { createStore, produce, type SetStoreFunction } from 'solid-js/store'
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid'
import { Howl, Howler } from 'howler'
import { Scene } from './scene'

const defaults = {
    scene: {
        id: null,
        title: 'Hello World',
        description:
            "A wizard is never late, Frodo Baggins. Nor is he early. He arrives precisely when he means to. 300 Athelas fulfilled selling. Hell profit Haleth rare! Garden reaction night ancestor prelude boys Sounds sweeps 3434. Usually titles king election foothold Thorin Oakenshield themselves stinks corrupted round fulfill. Silver unseen rampart fool Galadriel loosened feather vanquished treat named. Horn terribly reputation fellow's mercenaries crows Dwarvish worst sea convinced nothing's. Forebearers hasn't lead carcasses deputy overfond crevice maiden Gríma roaring ill-tempered is.",
        sounds: [],
        tags: ['tavern', 'night']
    },
    sound: {
        id: null,
        title: '',
        file: '',
        volume: 50,
        loop: true,
        status: false
    }
}

const initialStoreValue = {
    selectedSceneId: null,
    playingSounds: false,
    scenes: []
}

export function getSelectedScene() {
    return store.scenes.find((obj) => obj.id === store.selectedSceneId)
}

let audioPlayers = []

const createInitialStoreValue = () => {
    return initialStoreValue
}

export async function addScene() {
    const { value: data } = await Swal.fire({
        title: 'Add a scene',
        html: `
            <div class="form-group mb-3">
                <label for="titleInput">Title</label>
                <input type="text" class="form-control" id="titleInput" placeholder="Enter title">
            </div>
            <div class="form-group">
                <label for="descriptionInput">Description</label>
                <textarea class="form-control" id="descriptionInput" rows="3" placeholder="Enter description"></textarea>
            </div>
        `,
        showCancelButton: true,
        preConfirm: async () => {
            const title = document.getElementById('titleInput').value
            const description = document.getElementById('descriptionInput').value

            if (!title) {
                return Swal.showValidationMessage('Please enter a title.')
            }

            return { title, description }
        }
    })

    if (data) {
        let newSceneObject = structuredClone(defaults.scene)

        newSceneObject.title = data.title
        newSceneObject.description = data.description
        newSceneObject.id = uuidv4()

        setStore('scenes', (scenes) => [...scenes, newSceneObject])
    }
}

export function removeScene(sceneId) {
    setStore('scenes', (scene) => scene.filter((scene) => scene.id !== sceneId))
    setSelectedSceneId('');
}

export async function addSound() {
    stopSounds()

    const { value: data } = await Swal.fire({
        title: 'Add new sound',
        html: `
            <p>You may select multiple files</p>
            <div class="form-group text-start mb-3">
                <label for="soundInput">Files</label>  
                <input type="file" class="form-control" id="soundInput" multiple>
            </div>
            <div class="card">
                <div class="card-header">
                    Options
                </div>
                <div class="card-body">
                    <div class="form-group mb-3 text-start">
                        <label for="charactersInput">Characters to replace</label>
                        <input type="text" class="form-control" id="charactersInput" placeholder="IE .-_">
                        <div class="fs-6 fw-light">For example you might do dot, dash and underscore. This would replace any of those characters with a space.</div>
                    </div>
                    <div class="form-check form-switch   text-start">
                        <input class="form-check-input" type="checkbox" role="switch" id="capitalizeFirst">
                        <label class="form-check-label" for="capitalizeFirst">Capitalize first letter of each word</label>
                    </div>
                </div>
            </div>
        `,
        showCancelButton: true,
        preConfirm: async () => {
            const characters = document.getElementById('charactersInput').value
            const capitalize = document.getElementById('capitalizeFirst').checked
            const sounds = document.getElementById('soundInput').files

            if (sounds.length == 0) {
                return Swal.showValidationMessage('Please select a sound file.')
            }

            return { characters, capitalize, sounds }
        }
    })

    if (data) {
        for (const file of data.sounds) {
            let newSound = structuredClone(defaults.sound)
            let cleanFileName = file.name.replace(/\.[^.]*$/, '')

            if (data.characters != '') {
                const escapedCharacters = data.characters.replace(/[-.*+?^${}()|[\]\\]/g, '\\$&')
                cleanFileName = cleanFileName.replace(
                    new RegExp('[' + escapedCharacters + ']', 'g'),
                    ' '
                )
            }

            if (data.capitalize) {
                cleanFileName = cleanFileName.replace(/\b\w/g, match => match.toUpperCase())
            }

            newSound.title = cleanFileName
            newSound.file = file.path
            newSound.id = uuidv4()

            setStore(
                'scenes',
                (scene) => scene.id === store.selectedSceneId,
                'sounds',
                (sounds) => [...sounds, newSound]
            )
        }
    }
}

export async function removeSound(soundId) {
    const audioPlayer = getAudioPlayer(soundId)
    const status = getSelectedScene().sounds.find((sound) => sound.id === soundId).status

    // Stop any audio players that are playing for this sound and remove them
    if (status == 'playing') {
        audioPlayer.player.stop()
        //!= how? delete audioPlayer
    }

    // Remove the sound from the scene
    setSelectedScene('sounds', (sound) => sound.filter((sound) => sound.id !== soundId))
}

type Scene = (typeof store)['scenes'][number]
const setSelectedScene: SetStoreFunction<Scene> = (...args: any[]) => {
    return setStore('scenes', ({ id }) => id === store.selectedSceneId, ...args)
}

export function setSelectedSceneId(sceneId) {
    setStore('playingSounds', false)
    setStore('selectedSceneId', sceneId)
    
    if (store.selectedSceneId != null) {
        stopSounds()
    }
}

export function getAudioPlayer(soundId) {
    return audioPlayers.find((item) => item.id === soundId)
}

export function toggleSounds() {
    const playingSounds = store.playingSounds
    const selectedScene = getSelectedScene()

    if (playingSounds === true) {
        Howler.stop()
        audioPlayers = []
        setSelectedScene(
            'sounds',
            { from: 0, to: selectedScene.sounds.length - 1 },
            'status',
            'stopped'
        )
    } else {
        selectedScene.sounds.forEach((sound, index) => {
            let newPlayer = {
                id: sound.id,
                player: new Howl({
                    src: ['file://' + sound.file],
                    loop: sound.loop
                })
            }

            newPlayer.player.volume(sound.volume * 0.01)
            newPlayer.player.play()

            audioPlayers.push(newPlayer)

            newPlayer.player.on('end', () => {
                if (sound.loop === false) {
                    setSelectedScene('sounds', ({ id }) => id === sound.id, 'status', 'stopped')
                }

                var updateGlobalPlayStatus = true

                selectedScene.sounds.forEach((sound, index) => {
                    if (sound.status == 'playing') {
                        updateGlobalPlayStatus = false
                    }
                })

                if (updateGlobalPlayStatus === true) {
                    setStore('playingSounds', false)
                }
            })

            setSelectedScene('sounds', index, 'status', 'playing')
        })
    }

    setStore('playingSounds', !playingSounds)
}

export function stopSounds() {
    Howler.stop()
    audioPlayers = []

    const selectedScene = getSelectedScene()

    setStore('playingSounds', false)
    setSelectedScene(
        'sounds',
        { from: 0, to: selectedScene.sounds.length - 1 },
        'status',
        'stopped'
    )
}

export function setSoundVolume(soundId, event) {
    const audioPlayer = getAudioPlayer(soundId)
    const newVolume = event.target.value

    setSelectedScene('sounds', ({ id }) => id === soundId, 'volume', newVolume)

    if (audioPlayer) {
        audioPlayer.player.volume(newVolume * 0.01)
    }
}

export function toggleLoop(soundId, event) {
    const audioPlayer = getAudioPlayer(soundId)

    const newValue = !getSelectedScene().sounds.filter((sound) => sound.id === soundId)[0].loop

    setSelectedScene('sounds', ({ id }) => id === soundId, 'loop', newValue)

    if (audioPlayer) {
        audioPlayer.player.loop(newValue)
    }
}

const [store, setStore] = makePersisted(createStore(createInitialStoreValue()), {
    name: 'ttrpg-sounds'
})

export function getStore() {
    return store;
}