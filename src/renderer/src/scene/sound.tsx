import { For } from 'solid-js';
import { useStore } from "./provider";

export function Sound() {
    const { store, getSelectedScene, setSelectedScene, setSoundVolume, toggleLoop } = useStore();

    return (
        <div class="sounds">
            <For each={getSelectedScene().sounds}>{(sound, i) =>
                <div class="sound p-2 border rounded">
                    <div class="text-center">{sound.title}</div>
                    <div class="controls">
                        <div>
                        {sound.status != 'playing' ?
                            <i class="bi bi-stop-fill"></i> :
                            <i class="bi bi-play-fill"></i>
                        }
                        </div>
                        <div>
                            <i onClick={[toggleLoop, i()]} class={`bi bi-arrow-repeat pointer ${sound.loop == true ? 'text-success' : '' }`}></i>
                        </div>
                        <input onChange={[setSoundVolume, i()]} type="range" class="form-range" min="0" max="100" steps="1" value={sound.volume}></input>
                    </div>
                </div>
            }</For>
        </div>
    )
}