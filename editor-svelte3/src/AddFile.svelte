<script>
	import UploadFile from './tools/UploadFile.svelte';
    import { fly } from 'svelte/transition';
    import Fa from "svelte-fa";
    import {db,saveFileListToFromLocalforage} from './Datas/Datas.svelte';
    import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
    import { onMount,onDestroy } from 'svelte';
    import { addFilesToList,deleteFile } from "./Datas/fileOperations.svelte";
    import {addFilesSubscribes} from "./Datas/stores";
    const electron = require("electron");
    let isFirstStart= true;
    onMount(async () => {

	});
    const _addaddFilesToList = (value)=>{ db.FileList = addFilesToList(value); }
    const modes= {
        dragDropFiles:_addaddFilesToList
    }
    const _deleteFile = (index) =>{db.FileList=deleteFile(index)};
    var uploadFile = document.getElementById("upload");

    const unsubscribe = addFilesSubscribes.subscribe(data => {
        if(!isFirstStart){
            console.log("yardımcı sistem başarılı");
            console.log(data);
            modes[data.mode](data.value);
        }else{
            console.log("ilk çalışma sistemi aktif");
            isFirstStart = false;
        }	
	});

	onDestroy(unsubscribe);
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
                <tr in:fly="{{ x: -400, duration: 500 }}">
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
