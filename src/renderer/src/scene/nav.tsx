import { For } from 'solid-js'
import { useStore } from './provider'

export function Nav() {
    const { store, setSelectedSceneId, addScene, getSelectedScene } = useStore()

    return (
        <div>
            <div class="d-grid gap-2">
                <button
                    type="button"
                    class="btn btn-success btn-sm mb-3"
                    id="addScene"
                    onClick={addScene}
                >
                    <i class="bi bi-plus-circle-fill"></i> Add Scene
                </button>
            </div>
            <ul class="nav flex-column nav-fill d-none d-md-block">
                <For each={store.scenes}>
                    {(scene, i) => (
                        <li class="nav-item">
                            <a
                                class={`nav-link ${store.selectedSceneId == scene.id ? 'text-success' : ''}`}
                                onClick={[setSelectedSceneId, scene.id]}
                                href="#"
                                title={scene.description}
                            >
                                {scene.title}
                            </a>
                        </li>
                    )}
                </For>
            </ul>
            <select
                class="form-select d-md-none"
                aria-label="Default select example"
                value={getSelectedScene() ? getSelectedScene().id : ''}
                onChange={(e) => setSelectedSceneId(e.target.value)}
            >
                <For each={store.scenes}>
                    {(scene, i) => <option value={scene.id}>{scene.title}</option>}
                </For>
            </select>
        </div>
    )
}
