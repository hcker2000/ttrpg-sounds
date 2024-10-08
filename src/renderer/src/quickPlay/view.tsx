import { useStore, QuickSoundProvider } from './provider'
import { Sound } from './sound'

export function QuickPlay() {
    const { store, addSound, setSoundVolume, removeSound } = useStore()

    return (
        <div class="quick-play">
            <div
                class="expander pointer border border-end-0 rounded-start ps-1 pt-3 pb-3"
                onClick={(e) => {
                    const element = document.getElementById('offcanvasRight')
                    element.classList.add('show')
                    element.classList.remove('hiding')
                }}
            >
                Quick Play
            </div>

            <div
                class="offcanvas offcanvas-end w-100"
                tabindex="-1"
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
            >
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasRightLabel">
                        <i class="bi bi-plus-circle-fill pointer" onClick={addSound}></i> Quick
                        Sounds
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        aria-label="Close"
                        onClick={(e) => {
                            const element = document.getElementById('offcanvasRight')
                            element.classList.remove('show')
                            element.classList.add('hiding')
                        }}
                    ></button>
                </div>
                <div class="offcanvas-body list">
                    <Sound></Sound>
                </div>
            </div>
        </div>
    )
}
