import { Show } from 'solid-js'
import { useStore } from './provider'
import { Sound } from './sound'

export function Content() {
    const { store, getSelectedScene, addSound, toggleSounds } = useStore()

    return (
        <Show when={getSelectedScene()} fallback={<div></div>}>
            <div class="title mb-3">
                <h3 class="mb-0">{getSelectedScene().title}</h3>
                <i
                    onClick={toggleSounds}
                    class={`bi pointer play-pause ${store.playingSounds == true ? 'text-success bi-stop-circle-fill' : 'bi-play-circle-fill'}`}
                ></i>
            </div>
            <div class="mb-3">{getSelectedScene().description}</div>
            <div class="sounds-wrapper">
                <div class="header">
                    <div class="strike">
                        <span class="me-2">Sounds</span>
                        <i onClick={addSound} class={`bi bi-plus-circle-fill pointer`}></i>
                    </div>
                </div>
                <Sound />
            </div>
        </Show>
    )
}
