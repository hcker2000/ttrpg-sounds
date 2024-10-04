import { For } from 'solid-js'
import { useStore } from './provider'

export function Sound() {
    const { store, getSelectedScene, setSoundVolume, toggleLoop, removeSound } = useStore()

    return (
        <div class="sounds">
            <For each={getSelectedScene().sounds}>
                {(sound, i) => (
                    <div class="sound p-2 border rounded">
                        <div class="title-row">
                            <div>
                                <i
                                    onClick={[toggleLoop, sound.id]}
                                    class={`bi bi-repeat medium-icon pointer ${sound.loop == true ? 'text-success' : ''}`}
                                ></i>
                            </div>
                            <div>
                                <div class="text-center">{sound.title}</div>
                            </div>
                            <div>
                                <i
                                    onClick={[removeSound, sound.id]}
                                    class={`bi bi-x-circle-fill medium-icon pointer text-danger`}
                                ></i>
                            </div>
                        </div>
                        <div class="volume">
                            <div>
                                {sound.status != 'playing' ? (
                                    <i class="bi bi-volume-up-fill medium-icon"></i>
                                ) : (
                                    <i class="bi bi-volume-up-fill medium-icon text-success pulse-icon"></i>
                                )}
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
                        </div>
                    </div>
                )}
            </For>
        </div>
    )
}
