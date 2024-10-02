import { For } from 'solid-js';
import { unwrap } from "solid-js/store";
import Swal from "sweetalert2"
import { useStore } from "./provider";

export function Nav() {
    const { store, setStore, newScene, setSelectedScene } = useStore();

    const addScene = async (event) => {
        const { value: title } = await Swal.fire({
            title: "Scene Title",
            input: "text",
            inputLabel: "Give your Scene a title",
            inputValue: '',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "You need to write something!";
                }
            }
        });
        if (title) {
            let newSceneObject = structuredClone(unwrap(store.defaultScene))
    
            newSceneObject.title = title
            newScene(newSceneObject)
        }
    }

    return (
        <div>
            <div class="d-grid gap-2">
                <button type="button" class="btn btn-success btn-sm mb-3" id="addScene" onClick={addScene}><i class="bi bi-plus-circle-fill"></i> Add Scene</button>
            </div>
            <ul class="nav flex-column nav-fill">
                <For each={store.scenes}>{(scene, i) =>
                    <li class="nav-item">
                        <a class="nav-link active" onClick={[setSelectedScene, scene]} href="#" title={scene.description}>{scene.title}</a>
                    </li>
                }</For>
            </ul>
        </div>
    )
}