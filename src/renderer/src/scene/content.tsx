import { Show, createSignal } from "solid-js"
import { produce } from "solid-js/store"
import { useStore } from "./provider";
import { Sound } from "./sound";
import {Howl, Howler} from 'howler';

export function Content() {
    const { store, setStore } = useStore();
    const [playing, setPlaying] = createSignal(false);

    const toggleScene = (event) => {
        // todo: place this in the add audio call back once I get that element done. it should save the file path.
        // const hiddenFileInput = document.getElementById('hiddenFileInput');
        // hiddenFileInput.click();
      
        // hiddenFileInput.addEventListener('change', () => {
        //   const file = hiddenFileInput.files[0];
        //   const urlObj = URL.createObjectURL(file);
          
        //   const audioPlayer = new Audio(urlObj);
        //   audioPlayer.play()
        // })

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
            <div class="title">
                <h3 class="">{store.selectedScene.title}</h3>
                <i onClick={toggleScene} class={`bi bi-play-circle-fill pointer ${playing() == true ? 'text-success' : '' }`}></i>
            </div>
            <div class="mb-3">{store.selectedScene.description}</div>
            <div class="strike">Sounds</div>
            <Sound />
        </Show>
    )
}