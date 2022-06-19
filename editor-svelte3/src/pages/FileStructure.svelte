<script>
	import StructureItem from './StructureItem.svelte';
	import Switch from './../uiComponent/Switch.svelte';
    import { onMount, onDestroy } from "svelte";
    import {flip} from 'svelte/animate';
    import {_dragstartList,_dropList} from '../Datas/dragDropList.svelte';
    import { db, saveFileListToFromLocalforage } from "./../Datas/Datas.svelte";
    let selectedFile=0;
   
      //for drag drop list system
    let hovering = false;
    const options = {duration:300};
    let testList = [
        // {isCode:true,value:"test1" ,id:0},
        // {isCode:false,value:"point1",id:1},
        // {isCode:false,value:"point2",id:2},
        // {isCode:false,value:"point3",id:3},
    ];
    onMount(async () => {
        // console.log(db.FileList[0].Structure);
        if(db.FileList.length> 0 && db.FileList[0].Structure==undefined){
            db.FileList[0].Structure = [];
            db.FileList[0].idCount = 0;
        }
        //console.log(db.FileList[0].Structure);
    });
  //  let testlist = testList2;
    const dropList= (event, target)=>{
        db.FileList[selectedFile].Structure = _dropList(event, target,db.FileList[selectedFile].Structure,()=>{});
        hovering = null;
    };
    let updateIndex=-1;
    let isNew=false;
    
    const _openUpdateMode = (value)=> {
        updateNewControl();
        isNew=false;
        updateIndex=value 
    };
    const _deleteStructure = (id) => {db.FileList[selectedFile].Structure = db.FileList[selectedFile].Structure.filter((x) => x.id != id)}
    const _openNewStructure = (index) => {
        updateNewControl();
        isNew=true;
        index = (index >=0) ? index : 0;
        console.log(index);
        db.FileList[selectedFile].Structure.splice(index,0,{isCode:false,value:"",id:db.FileList[selectedFile].idCount});
        db.FileList[selectedFile].Structure=db.FileList[selectedFile].Structure;
        updateIndex = db.FileList[selectedFile].idCount;
        db.FileList[selectedFile].idCount++;
    }
    const _saveStructure = (data) => {
        if(db.FileList[selectedFile].Structure.length > 0){
            db.FileList[selectedFile].Structure[data.index].isCode=data.isCode;
            db.FileList[selectedFile].Structure[data.index].value=data.value;
            updateIndex=-1;
        }else{
            db.FileList[selectedFile].Structure=[{isCode:data.isCode,value:data.value,id:db.FileList[selectedFile].idCount}];
            db.FileList[selectedFile].idCount++;
        }
        saveFileListToFromLocalforage();
    }
    const _cancelStructure = (id) => {
        if(isNew){
           _deleteStructure(updateIndex);
        }
        updateIndex=-1;
    }
    
    const updateNewControl=()=>{
        if(isNew && updateIndex>=0){
           _deleteStructure(updateIndex);
        }
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

    const selectBoxOnChange = (event)=>{
        let index= event.target.selectedIndex;
        console.log(index);
        if(!db.FileList[index].Structure){
            db.FileList[index].Structure = [];
            db.FileList[index].idCount = 0;
        }
    }
</script>
{#if db.FileList.length>0}
<div class="row m-0 p-0">
    <div class="col-3 bg-secondary">
      
        <select
        class="form-select"
        size="20"
        on:change={selectBoxOnChange}
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
        {#if db.FileList[selectedFile].Structure && db.FileList[selectedFile].Structure.length>0}
        {#each db.FileList[selectedFile].Structure as item,index(item.id)}
            <div
            animate:flip={options}
                draggable={true} 
                on:dragstart={event => _dragstartList(event, index)}
                on:drop|preventDefault={event => dropList(event, index)}
                ondragover="return false"
                on:dragenter={() => hovering = index}
                class:is-active={hovering === index}
             class="card m-0 p-0 mt-1">
                <StructureItem on:connection={connectionWithChilds} index={index} {...item} mode={(updateIndex==item.id)?"update":"show"}/>
            </div>
        {/each}
        {:else}
            <div class="card">
                <StructureItem on:connection={connectionWithChilds} index=0 id={db.FileList[selectedFile].idCount} isCode={false} value="save your first point" mode="edit"/>
            </div>
        {/if}
        
    </div>
</div>
{:else}
<h1>Firstly add files please</h1>
{/if} 

