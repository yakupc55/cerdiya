<script>
	import UploadFile from './tools/UploadFile.svelte';
    import Fa from "svelte-fa";
    import {db,saveFileListToFromLocalforage} from './Datas/Datas.svelte';
    import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
    import { onMount,onDestroy } from 'svelte';
    import { addFilesToList,deleteFile } from "./Datas/fileOperations.svelte";
    
    const electron = require("electron");

    onMount(async () => {

	});
    onDestroy(() => {
        
    });

    const _deleteFile = (index) =>{db.FileList=deleteFile(index)};
    var uploadFile = document.getElementById("upload");

    document.addEventListener("drop", (event) => {
        let files = [];
        event.preventDefault();
        event.stopPropagation();
        for (const f of event.dataTransfer.files) {
            files.push({ name: f.name, path: f.path });
        }
       db.FileList = addFilesToList(files);
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
   const uploadFileEvent= (event)=>{ db.FileList = addFilesToList([{name:event.detail.name,path:event.detail.path}]);};
</script>
<UploadFile on:uploadFileEvent={uploadFileEvent} />
{#if db.FileList.length > 0}
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
            {#each db.FileList as item, index}
                <!-- <h4>{index}. {item.name} <span on:click={deleteFile(item.path)}><Fa icon={faCircleMinus} color="red" /></span></h4> -->
                <tr>
                    <th scope="row">{index}</th>
                    <td>{item.name}</td>
                    <td>{item.path}</td>
                    <td
                        ><span on:click={_deleteFile(item.path)}
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
