import { useStore } from "./provider";

export function Sound() {
    const { store, setStore } = useStore();

    const toggleLoop = (soundIndex, event) => {
        setStore('selectedScene', 'sounds', soundIndex(), 'loop', !store.selectedScene.sounds[soundIndex()].loop)
    }

    const changeVolume = (soundIndex, event) => {
        setStore('selectedScene', 'sounds', soundIndex(), 'volume', event.target.value)
        
        // todo: if sound is playing update the volume
    }

    return (
        <div class="sounds">
            <For each={store.selectedScene.sounds}>{(sound, i) =>
                <div class="sound p-2 border rounded">
                    <div className="text-center">{sound.title}</div>
                    <div class="controls">
                        {sound.status != 'playing' ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-stop-fill" viewBox="0 0 16 16">
                                <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5"/>
                            </svg>
                        }
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" on:click={[toggleLoop, i]} fill="currentColor" class={`bi bi-arrow-repeat pointer ${sound.loop == true ? 'text-success' : '' }`} viewBox="0 0 16 16">
                            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"/>
                            <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"/>
                        </svg>
                        <input on:change={[changeVolume, i]} type="range" class="form-range" min="0" max="100" steps="1" value={sound.volume}></input>
                    </div>
                </div>
            }</For>
        </div>
    )
}