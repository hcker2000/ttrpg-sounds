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
        ],
        tags: [
            "tavern",
            "night"
        ]
    },
    defaultSound: {
        id: null,
        title: "",
        file: "",
        volume: 25,
        loop: true,
        status: false,
        player: null
    },
    selectedScene: null,
    scenes: []
}

const createInitialStoreValue = () => {
    return initialStoreValue;
}


const addScene = async () => {
    const { value: data } = await Swal.fire({
        title: "Add a scene",
        html: `
            <div class="form-group mb-3">
                <label for="titleInput">Title</label>
                <input type="text" class="form-control" id="titleInput" placeholder="Enter title">
            </div>
            <div class="form-group">
                <label for="descriptionInput">Description</label>
                <textarea class="form-control" id="descriptionInput" rows="3" placeholder="Enter description"></textarea>
            </div>
        `,
        showCancelButton: true,
        preConfirm: async () => {
          const title = document.getElementById('titleInput').value
          const description = document.getElementById('descriptionInput').value
      
          if (!title) {
            return Swal.showValidationMessage('Please enter a title.')
          }
      
          return { title, description }
        }
    });

    if (data) {
        let newSceneObject = structuredClone(unwrap(initialStoreValue.defaultScene))

        newSceneObject.title = data.title
        newSceneObject.description = data.description
        newSceneObject.id = uuidv4()

        setStore("scenes", store.scenes.length, newSceneObject)
    }
}

const addSound = async () => {
    const { value: data } = await Swal.fire({
        title: "Add new sound",
        html: `
            <div class="form-group mb-3">
                <label for="titleInput">Title</label>
                <input type="text" class="form-control" id="titleInput" placeholder="Enter title">  
            </div>
            <div class="form-group">
                <label for="soundInput">File</label>  
                <input type="file" class="form-control" id="soundInput">
            </div>
        `,
        showCancelButton: true,
        preConfirm: async () => {
          const title = document.getElementById('titleInput').value
          const sound = document.getElementById('soundInput').files[0]
      
          if (!title) {
            return Swal.showValidationMessage('Please enter a title.')
          }
      
          if (!sound) {
            return Swal.showValidationMessage('Please select a sound file.')
          }
      
          return { title, sound }
        }
      })
      
      if (data) {
        let newSound = structuredClone(unwrap(initialStoreValue.defaultSound))
      
        newSound.title = data.title
        newSound.file = data.sound.path
        newSound.id = uuidv4()
      
        setStore("selectedScene", "sounds", store.selectedScene.sounds.length, newSound)
      }
}

const [store, setStore] = createStore(createInitialStoreValue());

export const [SceneProvider, useStore] = createContextProvider(() => {
    
    return {
      store: store,
      setStore: setStore,
      setSelectedScene: (scene) => setStore("selectedScene", scene),
      addScene: addScene,
      addSound: () => addSound(),
    }
});