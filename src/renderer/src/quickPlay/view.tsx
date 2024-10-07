export function QuickPlay() {
    return (
        <div class="quick-play">
                <div
                class="expander pointer border border-end-0 rounded-start ps-1 pt-3 pb-3"
                onClick={(e) => {
                    const element = document.getElementById('offcanvasRight');
                    element.classList.add("show");
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
                    <i class="bi bi-plus-circle-fill"></i> Quick Sounds
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        aria-label="Close"
                        onClick={(e) => {
                            const element = document.getElementById('offcanvasRight');
                            element.classList.remove("show");
                        }}
                    ></button>
                </div>
                <div class="offcanvas-body">...</div>
            </div>
        </div>
    )
}
