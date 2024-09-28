import { Show, useContext } from "solid-js"
import { useStore } from "./provider";
import { Sound } from "./sound";

export function Content() {
    const { store } = useStore();

    return (
        <Show when={store.selectedScene} fallback={<div>Loading...</div>}>
            <h5 class="">{store.selectedScene.title}</h5>
            <div>{store.selectedScene.description}</div>
            <div className="strike">Sounds</div>
            <Sound />
        </Show>
    )
}