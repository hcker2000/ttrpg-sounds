import { Show, useContext } from "solid-js"
import { produce } from "solid-js/store"
import { useStore } from "./provider";
import { Sound } from "./sound";
import {Howl, Howler} from 'howler';

export function Content() {
    const { store, setStore } = useStore();

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

        // todo: loop over all store.sounds and start them playing
        store.selectedScene.sounds.forEach((sound, index) => {
            if (sound.status == 'playing') {
                sound.player.stop();
                setStore('selectedScene', 'sounds', index, produce((thisSound) => {
                    thisSound.status = 'stopped',
                    thisSound.player = null
                }))
            } else {
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
        <Show when={store.selectedScene} fallback={<div>Loading...</div>}>
            <input type="file" id="hiddenFileInput"></input>
            <div className="title">
                <h3 class="">{store.selectedScene.title}</h3>
                <svg on:click={toggleScene} xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-play-circle-fill pointer" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
                </svg>
            </div>
            <div class="mb-3">{store.selectedScene.description}</div>
            <div className="strike">Sounds</div>
            <Sound />
        </Show>
    )
}