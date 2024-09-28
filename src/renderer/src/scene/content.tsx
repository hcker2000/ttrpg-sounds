import { Show, useContext } from "solid-js"
import { useStore } from "./provider";
import { Sound } from "./sound";

export function Content() {
    const { store } = useStore();

    return (
        <Show when={store.selectedScene} fallback={<div>Loading...</div>}>
            <div className="title">
                <h3 class="">{store.selectedScene.title}</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
                </svg>
            </div>
            <div class="mb-3">{store.selectedScene.description}</div>
            <div className="strike">Sounds</div>
            <Sound />
        </Show>
    )
}