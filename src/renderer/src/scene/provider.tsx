import { createContextProvider } from '@solid-primitives/context';
import { createStore, unwrap } from 'solid-js/store';
import Swal from "sweetalert2"
import { v4 as uuidv4 } from 'uuid';

const initialStoreValue = {
    defaultScene: {
        id: null,
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


const addScene = async () => {
    const { value: title } = await Swal.fire({
        title: "Scene Title",
        input: "text",
        inputLabel: "Give your Scene a title",
        inputValue: '',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return "You need to write something!";
            }
        }
    });

    if (title) {
        let newSceneObject = structuredClone(unwrap(initialStoreValue.defaultScene))

        newSceneObject.title = title
        newSceneObject.id = uuidv4()

        setStore("scenes", store.scenes.length, newSceneObject)
    }
}

const addSound = (scene) => {
    // todo: open file picker and update the selected scene, eventually the selected scene needs synced back into scenes (or maybe selectedScene is just the index for scenes)
}

const [store, setStore] = createStore(createInitialStoreValue());

export const [SceneProvider, useStore] = createContextProvider(() => {
    
    return {
      store: store,
      setStore: setStore,
      setSelectedScene: (scene) => setStore("selectedScene", scene),
      addScene: addScene,
      addSound: (scene) => addSound(scene),
    }
});