<script>
    import { db, saveFileListToFromLocalforage } from "../Datas/Datas.svelte";
    import { addFilesToList } from "./../Datas/fileOperations.svelte";
    const electron = require("electron");
    const path = require("path");    
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    // Importing dialog module using remote
    const dialog = electron.remote.dialog;
    const addFileFunction = () => {
        // If the platform is 'win32' or 'Linux'
        if (process.platform !== "darwin") {
            // Resolves to a Promise<Object>
            dialog
                .showOpenDialog({
                    title: "Select the File to be uploaded",
                    defaultPath: path.join(__dirname, "../assets/"),
                    buttonLabel: "Upload",
                    // Restricting the user to only Text Files.
                    filters: [
                        {
                            name: "Text Files",
                            extensions: ["txt", "docx"],
                        },
                    ],
                    // Specifying the File Selector Property
                    properties: ["openFile"],
                })
                .then((file) => {
                    // Stating whether dialog operation was
                    // cancelled or not.
                    //console.log(file.canceled);
                    if (!file.canceled) {
                        // Updating the GLOBAL filepath variable
                        // to user-selected file.
                        // console.log(global);
                         global.filepath = file.filePaths[0].toString();
                        // console.log(path.basename(global.filepath));
                        // console.log(global.filepath);
                        dispatch('uploadFileEvent', {
                            name:path.basename(global.filepath),path:global.filepath
                        });  
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            // If the platform is 'darwin' (macOS)
            dialog
                .showOpenDialog({
                    title: "Select the File to be uploaded",
                    defaultPath: path.join(__dirname, "../assets/"),
                    buttonLabel: "Upload",
                    filters: [
                        {
                            name: "Text Files",
                            extensions: ["txt", "docx"],
                        },
                    ],
                    // Specifying the File Selector and Directory
                    // Selector Property In macOS
                    properties: ["openFile", "openDirectory"],
                })
                .then((file) => {
                    // console.log(file.canceled);
                    if (!file.canceled) {
                        global.filepath = file.filePaths[0].toString();
                        // console.log(global.filepath);
                        addFilesToList([{name:path.basename(global.filepath),path:global.filepath}])
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    };
</script>
<div class="text-center button-area">
    <button type="button" style="" class="btn btn-primary btn-block uploadButton" on:click={addFileFunction}>Upload File</button>
</div>
<style type="text/css">
:global(.uploadButton){
    width:80%;
    padding: 4px;
}
:global(.button-area){
    background-color:rgba(0, 98, 255,0.85)
}
</style>