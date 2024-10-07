import { createContextProvider } from '@solid-primitives/context'
import { makePersisted } from '@solid-primitives/storage'
import { createStore, unwrap, produce, type SetStoreFunction } from 'solid-js/store'
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid'
import { Howl, Howler } from 'howler'

const defaults = {
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
    sounds: []
}

const addSound = async () => {
    const { value: data } = await Swal.fire({
        title: 'Add new sound',
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

        setStore(
            'sounds',
            (sounds) => [...sounds, newSound]
        )
    }
}

const removeSound = async (soundId) => {
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

const getAudioPlayer = (soundId) => {
    return audioPlayers.find((item) => item.id === soundId)
}

const stopSound = (soundId) => {
    Howler.stop()
    audioPlayers = []
}

const setSoundVolume = (soundId, event) => {
    const audioPlayer = getAudioPlayer(soundId)
    const newVolume = event.target.value

    setSelectedScene('sounds', ({ id }) => id === soundId, 'volume', newVolume)

    if (audioPlayer) {
        audioPlayer.player.volume(newVolume * 0.01)
    }
}

const createInitialStoreValue = () => {
    return initialStoreValue
}

const [store, setStore] = makePersisted(createStore(createInitialStoreValue()), {
    name: 'ttrpg-sounds-quick'
})

export const [QuickSoundProvider, useStore] = createContextProvider(() => {
    return {
        store: store,
        setStore: setStore,
        addSound: () => addSound(),
        removeSound: (soundId) => removeSound(soundId),
        toggleSound: (soundId) => toggleSound(soundId),
        setSoundVolume: (soundId, event) => setSoundVolume(soundId, event)
    }
})