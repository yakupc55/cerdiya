<script>
    import { faCircleMinus,faCirclePlus,faCircleUp,faCircleDown,faPenToSquare,faSave,faCancel } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import {flip} from 'svelte/animate';
	import Situations from './Situations.svelte';
    import {db,saveSituationsToFromLocalforage} from '../Datas/Datas.svelte';
    import {_dragstartList,_dropList} from '../Datas/dragDropList.svelte';

    //for drag list
    let hovering = false;
    const options = {duration:300};
    const dropList= (event, target)=>{
        db.Situations = _dropList(event, target,db.Situations,saveSituationsToFromLocalforage);
        hovering = null;
    }

    let updateIndex=-1;
    let lastNewIndex=0;
    let firstValue="save your fist value";
    let _tempValue="";
    let isNew=false;
    const saveSituation =(index)=>{
        if(db.Situations.length==0){
            db.Situations = [{name:firstValue,isActive:false,id:db.stCount}];
            db.stCount++;
        }
        else{
            updateIndex = -1;
            db.Situations[index].name=_tempValue;
            db.stCount++;
        }
        saveSituationsToFromLocalforage();
    }

    const openUpdate=(index)=>{
        updateNewControl(index);
        updateIndex=db.Situations[index].id;
        _tempValue=db.Situations[index].name;
        isNew=false;
    }

    const cancelUpdate=()=>{
        updateIndex=-1;
    }

    const deleteStituation=(index)=>{
        db.Situations.splice(index,1);
        db.Situations= db.Situations;
        firstValue="save your fist value";
    }
    const openNewSituation=(index)=>{
        _tempValue="";
        db.Situations.splice(index,0,{name:"new situation",isActive:false,id:db.stCount});
        updateIndex=db.stCount;
        db.stCount++;
        isNew=true;
        lastNewIndex=index;
    }

    const updateNewControl=()=>{
        if(isNew && updateIndex>=0){
           deleteStituation(lastNewIndex);
        }
    }
</script>
<div class="border border-secondary bg-dark mb-2">
{#if db.Situations.length > 0}
    {#each db.Situations as situation,index(situation.name)}
    <div
    animate:flip={options}
    draggable={true} 
    on:dragstart={event => _dragstartList(event, index)}
    on:drop|preventDefault={event => dropList(event, index)}
    ondragover="return false"
    on:dragenter={() => hovering = index}
    class:is-active={hovering === index}
     class="card mb-2">
        <div class="card-header bg-white text-dark m-0 p-0">
            <div class="row d-flex justify-content-center align-items-center">
                <div class="col-10">
                    {#if updateIndex==situation.id}
                        <input bind:value={_tempValue} style="width: 100%;" type="text">
                    {:else}
                        {situation.name}
                    {/if}
                </div>
                <div class="col-2 d-flex">
                    {#if updateIndex==situation.id}
                        <button on:click={()=>saveSituation(index)} class="button btn-primary m-0 p-1"><Fa icon={faSave} color="white" /></button>
                        <button on:click={cancelUpdate} class="button btn-danger m-0 p-1"><Fa icon={faCancel} color="white" /></button>
                    {:else}
                        <button on:click={()=>openUpdate(index)} class="button btn-primary"><Fa icon={faPenToSquare} color="white" /></button>
                        <button on:click={()=>deleteStituation(index)} class="button btn-danger"><Fa icon={faCircleMinus} color="white" /></button>
                        <button on:click={()=>openNewSituation(index)} class="button btn-success"><Fa icon={faCirclePlus} size="1.2x" color="white" /><Fa icon={faCircleUp} color="black" /></button>
                        <button on:click={()=>openNewSituation(index+1)} class="button btn-success"><Fa icon={faCirclePlus} size="1.2x" color="white" /><Fa icon={faCircleDown} color="black" /></button>
                    {/if}
                </div>
            </div>
        </div>
    </div>
    {/each}
{:else}
    <div class="card mb-2">
        <div class="card-header bg-white text-white m-0 p-0 ">
            <div class="row">
                <div class="col-10">
                    <input bind:value={firstValue} style="width: 100%;" type="text">
                </div>
                <div class="col-2">
                    <button on:click={saveSituation} class="button btn-primary m-0 p-1"><Fa icon={faSave} color="white" /></button>
                </div>
            </div>
        </div>
    </div>
{/if}
</div>