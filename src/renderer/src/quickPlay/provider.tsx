import { createContextProvider } from '@solid-primitives/context'
import { makePersisted } from '@solid-primitives/storage'
import { createStore, unwrap, produce, type SetStoreFunction } from 'solid-js/store'
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid'
import { Howl, Howler } from 'howler'
import { createMemo } from 'solid-js'
import { Accordion } from 'solid-bootstrap'

const defaults = {
    sound: {
        id: null,
        title: '',
        file: '',
        volume: 50,
        status: 'stopped',
        visible: true
    }
}

const initialStoreValue = {
    sounds: [],
    search: ''
}

let audioPlayers = []

const addSound = async () => {
    const { value: data } = await Swal.fire({
        title: 'Add new quick sounds',
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

            setStore('sounds', (sounds) => [...sounds, newSound])
        }
        return
    }
}

const removeSound = async (soundId) => {
    const audioPlayer = getAudioPlayer(soundId)

    if (audioPlayer) {
        audioPlayer.player.stop()
    }

    setStore('sounds', (sound) => sound.filter((sound) => sound.id !== soundId))
}

const getAudioPlayer = (soundId) => {
    return audioPlayers.find((item) => item.id === soundId)
}

const playSound = (sound) => {
    setStore('sounds', ({ id }) => id === sound.id, 'status', 'playing')

    let newPlayer = {
        id: sound.id,
        player: new Howl({
            src: ['file://' + sound.file],
            loop: false
        })
    }

    newPlayer.player.volume(sound.volume * 0.01)
    newPlayer.player.play()

    const index = audioPlayers.push(newPlayer) - 1

    newPlayer.player.on('end', () => {
        const index = audioPlayers.findIndex((obj) => obj.id == sound.id)
        audioPlayers.splice(index, 1)
    })
}

// unused at this point
const stopSound = (soundId) => {
    const audioPlayer = getAudioPlayer(soundId)
    audioPlayer.player.stop()
}

const setSoundVolume = (soundId, event) => {
    const audioPlayer = getAudioPlayer(soundId)
    const newVolume = event.target.value

    setStore('sounds', ({ id }) => id === soundId, 'volume', newVolume)

    if (audioPlayer) {
        audioPlayer.player.volume(newVolume * 0.01)
    }
}

const setSearch = (value) => {
    setStore('search', value)
}

const createInitialStoreValue = () => {
    return initialStoreValue
}

const [store, setStore] = makePersisted(createStore(createInitialStoreValue()), {
    name: 'ttrpg-sounds-quick'
})
const getSounds = createMemo(() => {
    if (store.search == '') {
        return store.sounds
    }

    return store.sounds.filter((obj) => obj.title.toLowerCase().includes(store.search))
})

export const [QuickSoundProvider, useStore] = createContextProvider(() => {
    return {
        store: store,
        setStore: setStore,
        addSound: () => addSound(),
        removeSound: (soundId) => removeSound(soundId),
        playSound: (soundId) => playSound(soundId),
        setSoundVolume: (soundId, event) => setSoundVolume(soundId, event),
        setSearch: (value) => setSearch(value),
        getSounds: () => getSounds()
    }
})
