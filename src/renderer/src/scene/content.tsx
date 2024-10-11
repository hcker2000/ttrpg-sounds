import { Show } from 'solid-js'
import { useStore } from './provider'
import { Sound } from './sound'
import { Dropdown } from 'solid-bootstrap'

export function Content() {
    const { store, getSelectedScene, addSound, toggleSounds, removeScene } = useStore()

    return (
        <Show when={getSelectedScene()} fallback={<div></div>}>
            <div class="title mb-3">
                <h3 class="mb-0">{getSelectedScene().title}</h3>
                <i
                    onClick={toggleSounds}
                    class={`bi pointer play-pause ${store.playingSounds == true ? 'text-success bi-stop-circle-fill' : 'bi-play-circle-fill'}`}
                ></i>
            </div>
            <div class="description mb-3">
                <div>{getSelectedScene().description}</div>
                <Dropdown>
                    <Dropdown.Toggle as="div" class="pointer">
                        <i class="bi bi-three-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={[removeScene, getSelectedScene().id]}>
                            <i class="bi bi-trash-fill"></i> Delete
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
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
