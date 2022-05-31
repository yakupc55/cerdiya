<script>
	import { sentToMainParent } from './../Datas/stores.js';
    import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
    import { fly } from 'svelte/transition';
    import {flip} from 'svelte/animate';
    import Fa from "svelte-fa";
    import {saveFileListToFromLocalforage } from "../Datas/Datas.svelte";
    import { createEventDispatcher } from 'svelte';
    export let FileList={};
    import {_dragstartList,_dropList} from '../Datas/dragDropList.svelte';
    const dispatch = createEventDispatcher();
    const _deleteFile = (index) =>{
        dispatch('connection', {
                            mode:"deleteFile",value:index
                        });  
    };

    //for drag drop list system
    let hovering = false;
    const options = {duration:300};
    const dropList= (event, target)=>{
        FileList = _dropList(event, target,FileList,saveFileListToFromLocalforage);
        hovering = null;
    }
    // const drop = (event, target) => {
    //   event.dataTransfer.dropEffect = 'move'; 
    //   const start = parseInt(event.dataTransfer.getData("text/plain"));
    //   const newTracklist = FileList;
  
    //   if (start < target) {
    //     newTracklist.splice(target + 1, 0, newTracklist[start]);
    //     newTracklist.splice(start, 1);
    //   } else {
    //     newTracklist.splice(target, 0, newTracklist[start]);
    //     newTracklist.splice(start + 1, 1);
    //   }
    //   FileList = newTracklist;
    //   hovering = null;
    //   saveFileListToFromLocalforage();
    // }
  
    // const dragstart = (event, i) => {
    //   event.dataTransfer.effectAllowed = 'move';
    //   event.dataTransfer.dropEffect = 'move';
    //   const start = i;
    //   event.dataTransfer.setData('text/plain', start);
    // }
</script>
{#if FileList.length > 0}
    <table class="table table-sm table-dark">
        <thead>
            <tr>
                <th class="col-1" scope="col">index</th>
                <th class="col-3" scope="col">Name</th>
                <th class="col-6" scope="col">Path</th>
                <th class="col-1" scope="col">Tools</th>
            </tr>
        </thead>
        <tbody>
            {#each FileList as item, index(item.path)}
                <!-- <h4>{index}. {item.name} <span on:click={deleteFile(item.path)}><Fa icon={faCircleMinus} color="red" /></span></h4> -->
                <tr
                animate:flip={options}
                draggable={true} 
                on:dragstart={event => _dragstartList(event, index)}
                on:drop|preventDefault={event => dropList(event, index)}
                ondragover="return false"
                on:dragenter={() => hovering = index}
                class:is-active={hovering === index}
                 in:fly="{{ x: -400, duration: 500 }}">
                    <th scope="row">{index}</th>
                    <td>{item.name.substring(0,35)}</td>
                    <td>{item.path.substring(0,70)}</td>
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