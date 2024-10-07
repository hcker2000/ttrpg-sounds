import { QuickPlay } from './quickPlay/view'
import { Scene } from './scene/scene'

export function Layout() {
    return (
        <div class="layout">
            <Scene />
            <QuickPlay />
        </div>
    )
}
