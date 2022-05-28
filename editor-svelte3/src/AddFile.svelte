<script>
    import Fa from "svelte-fa";
    import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
    import { onMount,onDestroy } from 'svelte';
    const electron = require("electron");
    const path = require("path");
    let isAnythingChange=false;
    export let FileList = [];
    // Importing dialog module using remote
    const dialog = electron.remote.dialog;

    onMount(async () => {
        localforage.getItem('fileList').then(data => {
            if(data){
                console.log("kayıt getirme başarılı");
                FileList=data;
            }
        });
	});
    onDestroy(() => {
        if(isAnythingChange){
        localforage.setItem('fileList', FileList).then((x)=> console.log("kayıt başarılı"));
        }
    });
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
                        addFilesToList([{name:path.basename(global.filepath),path:global.filepath}])
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
    var uploadFile = document.getElementById("upload");

    let addFilesToList = (addFiles) => {
        let files = [];
        for (const f of addFiles) {
            let exist = false;
            for (const item of FileList) {
                if (item.path === f.path) {
                    exist = true;
                    break;
                }
            }
            if (exist) {
                alert("this file is exist.\n" + f.path);
            } else {
                files = [...files, { path: f.path, name: f.name }];
            }
        }
        FileList = [...FileList, ...files];
        isAnythingChange=true;
    };

    document.addEventListener("drop", (event) => {
        let files = [];
        event.preventDefault();
        event.stopPropagation();
        for (const f of event.dataTransfer.files) {
            files.push({ name: f.name, path: f.path });
        }
        addFilesToList(files);
    });

    document.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    document.addEventListener("dragenter", (event) => {
        console.log("File is in the Drop Space");
    });

    document.addEventListener("dragleave", (event) => {
        console.log("File has left the Drop Space");
    });

    const deleteFile = (path) => {
        FileList = FileList.filter((x) => x.path != path);
        isAnythingChange=true;
    };
</script>

<button on:click={addFileFunction}>Upload File</button>
{#if FileList.length > 0}
    <table class="table table-striped table-dark">
        <thead>
            <tr>
                <th scope="col">index</th>
                <th scope="col">Name</th>
                <th scope="col">Path</th>
                <th scope="col">Tools</th>
            </tr>
        </thead>
        <tbody>
            {#each FileList as item, index}
                <!-- <h4>{index}. {item.name} <span on:click={deleteFile(item.path)}><Fa icon={faCircleMinus} color="red" /></span></h4> -->
                <tr>
                    <th scope="row">{index}</th>
                    <td>{item.name}</td>
                    <td>{item.path}</td>
                    <td
                        ><span on:click={deleteFile(item.path)}
                            ><Fa icon={faCircleMinus} color="red" /></span
                        ></td
                    >
                </tr>
            {/each}
        </tbody>
    </table>
{:else}
    <h2>You didn't add any file</h2>
{/if}
