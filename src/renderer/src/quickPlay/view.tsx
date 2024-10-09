import { useStore, QuickSoundProvider } from './provider'
import { Sound } from './sound'

export function QuickPlay() {
    const { store, addSound, setSearch } = useStore()

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
                    <div class="input-group me-3">
                        <button class="btn btn-outline-success" type="button" onClick={addSound}>
                            <i class="bi bi-plus-circle-fill"></i>
                        </button>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Search"
                            onInput={(e) => {
                                setSearch(e.target.value)
                            }}
                        />
                    </div>
                    <i
                        class="bi bi-chevron-right pointer medium-icon"
                        onClick={(e) => {
                            const element = document.getElementById('offcanvasRight')
                            element.classList.remove('show')
                            element.classList.add('hiding')
                        }}
                    ></i>
                </div>
                <div class="offcanvas-body list">
                    <Sound></Sound>
                </div>
            </div>
        </div>
    )
}
