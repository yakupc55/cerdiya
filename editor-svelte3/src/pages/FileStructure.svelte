<script>
	import StructureItem from './StructureItem.svelte';
	import Switch from './../uiComponent/Switch.svelte';
    import { onMount, onDestroy } from "svelte";
    import {flip} from 'svelte/animate';
    import {_dragstartList,_dropList} from '../Datas/dragDropList.svelte';
    import { db, saveFileListToFromLocalforage } from "./../Datas/Datas.svelte";
    let selectedFile=0;

    onMount(async () => {
       // console.log(db);
    });
      //for drag drop list system
      let hovering = false;
    const options = {duration:300};
    let testList = [
        {type:"code",value:"test1"},
        {type:"point",value:"point1"},
        {type:"point",value:"point2"},
        {type:"point",value:"point3"},
    ];
  //  let testlist = testList2;
    const dropList= (event, target)=>{
        testList = _dropList(event, target,testList,()=>{console.log("çalıştı")});
        hovering = null;
    };
    let updateIndex=-1;

    const _openUpdateMode = (value)=> {updateIndex=value}
    const cmodes = {
        openUpdateMode:_openUpdateMode
    }

    const connectionWithChilds = (data)=>{
        data=data.detail;
       // console.log(data);
        cmodes[data.mode](data.value);
    }
</script>
{#if db.FileList.length>0}
<div class="row m-0 p-0">
    <div class="col-3 bg-secondary">
      
        <select
        class="form-select w-100"
        size="20"
        bind:value={selectedFile}
        aria-label="multiple select example">
        {#each db.FileList as item, index}
        <option value={index}>{item.name}</option>
        {/each}
    </select>
       
       
    </div>
    <div class="col-9 center bg-secondary">
        <div class="row bg-dark p-0 m-0 text-white">
            <div class="col-4">
                Name : {db.FileList[selectedFile].name.substring(0,35)}
            </div>
            <div class="col-8">
                Path :{db.FileList[selectedFile].path.substring(0,70)}
            </div>
        </div>
        {#if testList && testList.length>0}
        {#each testList as item,index(item.value)}
            <div
            animate:flip={options}
                draggable={true} 
                on:dragstart={event => _dragstartList(event, index)}
                on:drop|preventDefault={event => dropList(event, index)}
                ondragover="return false"
                on:dragenter={() => hovering = index}
                class:is-active={hovering === index}
             class="card">
             <span>{index}</span>
                <StructureItem on:connection={connectionWithChilds} index={index} {...item} mode={(updateIndex==index)?"update":"show"}/>
            </div>
        {/each}
        {:else}
            <div class="card">
                <StructureItem on:connection={connectionWithChilds} index=-1 type="code" value="test2" mode="show"/>
            </div>
        {/if}
        
    </div>
</div>
{:else}
<h1>Firstly add files please</h1>
{/if} 

