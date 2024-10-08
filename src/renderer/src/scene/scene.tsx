import { Nav } from './nav'
import { Content } from './content'
import { SceneProvider } from './provider'

export function Scene() {
    return (
        <SceneProvider>
            <div class="scene container-fluid min-vh-100 d-flex flex-column">
                <div class="row flex-grow-0 flex-md-grow-1">
                    <div class="nav-container bg-secondary-subtle col-md-3 col-xl-2 pe-3 pt-3 pb-3">
                        <Nav />
                    </div>

                    <div class="content col-md-9 col-xl-10 pt-3 pb-3">
                        <Content />
                    </div>
                </div>
            </div>
        </SceneProvider>
    )
}
