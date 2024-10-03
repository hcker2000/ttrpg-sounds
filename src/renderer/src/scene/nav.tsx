import { For } from 'solid-js';
import { useStore } from "./provider";

export function Nav() {
    const { store, setSelectedSceneId, addScene } = useStore();

    return (
        <div>
            <div class="d-grid gap-2">
                <button type="button" class="btn btn-success btn-sm mb-3" id="addScene" onClick={addScene}><i class="bi bi-plus-circle-fill"></i> Add Scene</button>
            </div>
            <ul class="nav flex-column nav-fill">
                <For each={store.scenes}>{(scene, i) =>
                    <li class="nav-item">
                        <a class={`nav-link ${store.selectedSceneId == scene.id ? 'text-success' : '' }`} onClick={[setSelectedSceneId, scene.id]} href="#" title={scene.description}>{scene.title}</a>
                    </li>
                }</For>
            </ul>
        </div>
    )
}