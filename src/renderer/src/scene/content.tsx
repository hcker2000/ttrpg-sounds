import { Show, createSignal } from "solid-js"
import { produce } from "solid-js/store"
import { useStore } from "./provider";
import { Sound } from "./sound";
import {Howl, Howler} from 'howler';

export function Content() {
    const { store, setStore, addSound } = useStore();
    const [playing, setPlaying] = createSignal(false);

    const toggleScene = (event) => {
        store.selectedScene.sounds.forEach((sound, index) => {
            if (sound.status == 'playing') {
                setPlaying(false)
                sound.player.stop();
                setStore('selectedScene', 'sounds', index, produce((thisSound) => {
                    thisSound.status = 'stopped',
                    thisSound.player = null
                }))
            } else {
                setPlaying(true)
                let howlPlayer = new Howl({
                    src: ['media://' + sound.file],
                })
                howlPlayer.volume(sound.volume * 0.01)
                howlPlayer.play()
    
                setStore('selectedScene', 'sounds', index, produce((thisSound) => {
                    thisSound.status ='playing',
                    thisSound.player = howlPlayer
                }))
            }
        })
    }

    return (
        <Show when={store.selectedScene} fallback={<div></div>}>
            <div class="title mb-3">
                <h3 class="mb-0">{store.selectedScene.title}</h3>
                <i onClick={toggleScene} class={`bi bi-play-circle-fill pointer play-pause ${playing() == true ? 'text-success' : '' }`}></i>
            </div>
            <div class="mb-3">{store.selectedScene.description}</div>
            <div class="sounds-wrapper">
                <div class="header">
                    <div class="strike">
                        <span class="me-2">Sounds</span><i onClick={addSound} class={`bi bi-plus-circle-fill pointer`}></i>
                    </div>
                </div>
                <Sound />
            </div>
        </Show>
    )
}