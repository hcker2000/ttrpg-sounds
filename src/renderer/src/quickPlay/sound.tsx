import { For } from 'solid-js'
import { useStore } from './provider'

export function Sound() {
    const { store, setSoundVolume, removeSound, playSound } = useStore()

    return (
        <div class="sounds">
            <For each={store.sounds}>
                {(sound, i) => (
                    <div class="sound p-2 border rounded">
                        <div onClick={[playSound, sound]} class="text-center cursor btn btn-light w-100 mb-2">{sound.title}</div>
                        <div class="volume">
                            <div>
                                <i class="bi bi-volume-up-fill medium-icon"></i>
                            </div>
                            <input
                                onChange={[setSoundVolume, sound.id]}
                                type="range"
                                class="form-range"
                                min="0"
                                max="100"
                                steps="1"
                                value={sound.volume}
                            ></input>
                            <div>
                                <i
                                    onClick={[removeSound, sound.id]}
                                    class={`bi bi-x-circle-fill medium-icon pointer text-danger`}
                                ></i>
                            </div>
                        </div>
                    </div>
                )}
            </For>
        </div>
    )
}
