import { createContext, useContext } from 'solid-js';
import { createStore, unwrap } from 'solid-js/store';

// Create a context
const StoreContext = createContext();

// Define the provider component that will hold the store
export function SceneProvider(props) {
    // Create a store (could be any complex object or state)
    const [store, setStore] = createStore({
        defaultScene: {
            title: "Hello World",
            description: "A wizard is never late, Frodo Baggins. Nor is he early. He arrives precisely when he means to. 300 Athelas fulfilled selling. Hell profit Haleth rare! Garden reaction night ancestor prelude boys Sounds sweeps 3434. Usually titles king election foothold Thorin Oakenshield themselves stinks corrupted round fulfill. Silver unseen rampart fool Galadriel loosened feather vanquished treat named. Horn terribly reputation fellow's mercenaries crows Dwarvish worst sea convinced nothing's. Forebearers hasn't lead carcasses deputy overfond crevice maiden Gríma roaring ill-tempered is.",
            sounds: [
                {
                    title: "birds",
                    file: "/home/hcker2000/Downloads/file_example_MP3_700KB.mp3",
                    volume: 25,
                    loop: true,
                    status: false,
                    player: null
                },
                {
                    title: "river",
                    file: "/home/hcker2000/Downloads/sample-9s.mp3",
                    volume: 0,
                    loop: true,
                    status: false,
                    player: null
                },
            ],
            tags: [
                "tavern",
                "night"
            ]
        },
        selectedScene: null,
        scenes: [],
        newScene: (newScene) => setStore("scenes", store.scenes.length, newScene),
        setSelectedScene: (scene) => setStore("selectedScene", structuredClone(unwrap(scene)))
    })

    // Pass the store to the context provider
    return (
        <StoreContext.Provider value={{store: store, setStore: setStore}}>
            {props.children}
        </StoreContext.Provider>
    );
}

// Export a hook for easy access to the store in any component
export function useStore() {
    return useContext(StoreContext);
}