<script>
	import StructureItem from './StructureItem.svelte';
	import Switch from './../uiComponent/Switch.svelte';
    import { onMount, onDestroy } from "svelte";
    import {flip} from 'svelte/animate';
    import {_dragstartList,_dropList} from '../Datas/dragDropList.svelte';
    import { db, saveFileListToFromLocalforage } from "./../Datas/Datas.svelte";
    let selectedFile=0;
    let idCount=4;
    onMount(async () => {
       // console.log(db);
    });
      //for drag drop list system
      let hovering = false;
    const options = {duration:300};
    let testList = [
        {type:"code",value:"test1" ,id:0},
        {type:"point",value:"point1",id:1},
        {type:"point",value:"point2",id:2},
        {type:"point",value:"point3",id:3},
    ];
  //  let testlist = testList2;
    const dropList= (event, target)=>{
        testList = _dropList(event, target,testList,()=>{});
        hovering = null;
    };
    let updateIndex=-1;

    const _openUpdateMode = (value)=> {updateIndex=value};
    const _deleteStructure = (id) => {testList = testList.filter((x) => x.id != id)}
    const _openNewStructure = (index) => {
        index = (index >=0) ? index : 0;
        console.log(index);
        testList.splice(index,0,{type:"code",value:"",id:idCount});
        testList=testList;
        updateIndex = idCount;
        idCount++;
    }
    const _saveStructure = (id) => {
       updateIndex=-1;
    }
    const _cancelStructure = (id) => {
        updateIndex=-1;
    }
    const cmodes = {
        openUpdateMode:_openUpdateMode,
        deleteStructure:_deleteStructure,
        saveStructure:_saveStructure,
        openNewStructure:_openNewStructure,
        cancelStructure: _cancelStructure
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
        {#each testList as item,index(item.id)}
            <div
            animate:flip={options}
                draggable={true} 
                on:dragstart={event => _dragstartList(event, index)}
                on:drop|preventDefault={event => dropList(event, index)}
                ondragover="return false"
                on:dragenter={() => hovering = index}
                class:is-active={hovering === index}
             class="card">
                <StructureItem on:connection={connectionWithChilds} index={index} {...item} mode={(updateIndex==item.id)?"update":"show"}/>
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

