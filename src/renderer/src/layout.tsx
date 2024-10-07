import { QuickPlay } from './quickPlay/view'
import { Scene } from './scene/scene'
import { QuickSoundProvider} from './quickPlay/provider';

export function Layout() {
    return (
        <div class="layout">
            <Scene />
            <QuickSoundProvider>
                <QuickPlay />
            </QuickSoundProvider>
        </div>
    )
}
