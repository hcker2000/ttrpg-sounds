import { createContextProvider } from '@solid-primitives/context';
import { createStore, unwrap } from 'solid-js/store';

const initialStoreValue = {
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
    scenes: []
}

const createInitialStoreValue = () => {
    return initialStoreValue;
}

const [store, setStore] = createStore(initialStoreValue)

export const [SceneProvider, useStore] = createContextProvider(() => {
    const [store, setStore] = createStore(createInitialStoreValue());
    
    return {
      store: store,
      setStore: setStore,
      newScene: (newScene) => setStore("scenes", store.scenes.length, newScene),
      setSelectedScene: (scene) => setStore("selectedScene", structuredClone(unwrap(scene)))
    }
});