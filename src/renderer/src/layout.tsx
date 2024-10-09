import { QuickPlay } from './quickPlay/view'
import { Scene } from './scene/scene'
import { QuickSoundProvider } from './quickPlay/provider'
import svgIconUrl from '../assets/icon.svg'
import { onMount } from 'solid-js'

export function Layout() {
    onMount(() => {
        const splashScreen = document.getElementsByClassName('splash')[0]
        setTimeout(() => {
            splashScreen.classList.add('fade-out')
            setTimeout(() => {
                splashScreen.classList.add('d-none')
            }, 2000)
        }, 2000)
    })

    return (
        <>
            <div class="splash fader">
                <figure>
                    <img src={svgIconUrl} />
                    <figcaption>TTRPG Sounds</figcaption>
                </figure>
            </div>
            <div class="layout">
                <Scene />
                <QuickSoundProvider>
                    <QuickPlay />
                </QuickSoundProvider>
            </div>
        </>
    )
}
