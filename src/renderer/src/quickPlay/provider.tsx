import { createContextProvider } from '@solid-primitives/context'
import { makePersisted } from '@solid-primitives/storage'
import { createStore, unwrap, produce, type SetStoreFunction } from 'solid-js/store'
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid'
import { Howl, Howler } from 'howler'
import { createMemo } from 'solid-js'

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
        title: 'Add new quick sound',
        html: `
            <div class="form-group mb-3">
                <label for="titleInput">Title</label>
                <input type="text" class="form-control" id="titleInput" placeholder="Enter title">  
            </div>
            <div class="form-group">
                <label for="soundInput">File</label>  
                <input type="file" class="form-control" id="soundInput">
            </div>
        `,
        showCancelButton: true,
        preConfirm: async () => {
            const title = document.getElementById('titleInput').value
            const sound = document.getElementById('soundInput').files[0]

            if (!title) {
                return Swal.showValidationMessage('Please enter a title.')
            }

            if (!sound) {
                return Swal.showValidationMessage('Please select a sound file.')
            }

            return { title, sound }
        }
    })

    if (data) {
        let newSound = structuredClone(defaults.sound)

        newSound.title = data.title
        newSound.file = data.sound.path
        newSound.id = uuidv4()

        setStore('sounds', (sounds) => [...sounds, newSound])
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
