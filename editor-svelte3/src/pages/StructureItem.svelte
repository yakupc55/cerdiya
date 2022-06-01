<script>
	import Switch from './../uiComponent/Switch.svelte';
    import { faCircleMinus,faCirclePlus,faCircleUp,faCircleDown,faPenToSquare,faSave,faCancel } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    export let isCode;
    let _isCode;
    export let id;
    export let value;
    let _value=value;
    export let mode;
    export let index;

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    const _openUpdateMode = () =>{
        dispatch('connection', {
                            mode:"openUpdateMode",value:id
                        });  
    };
    const _deleteStructure = () =>{
        dispatch('connection', {
                            mode:"deleteStructure",value:id
                        });  
    };

    const _saveStructure = () =>{
        dispatch('connection', {
                            mode:"saveStructure",value:{value:_value,isCode:_isCode}
                        });  
    };

    const _openNewStructure = (sendIndex) =>{
        dispatch('connection', {
                            mode:"openNewStructure",value:sendIndex
                        });  
    };

    const _cancelStructure = () =>{
        dispatch('connection', {
                            mode:"cancelStructure",value:id
                        });  
    };
</script>


{#if mode=="show"}
<div class="row">
    <div class="col-8">
        {#if isCode}
        <div class="card-header bg-success text-white m-0 p-0 mt-1">
            <center>Code</center> 
            <div class="card-body bg-white text-dark m-0 p-0 pt-1">
                <span>{value}</span> 
            </div>
           
            </div>
        {:else}
        <div class="card-header bg-primary text-white m-0 p-0 mt-1">
            <center>Point</center> 
            <div class="card-body bg-white text-dark m-0 p-0 pt-1">
                <span>{value}</span> 
            </div>
        </div>
        {/if}
    </div>
    <div class="col-4 d-flex justify-content-center align-items-center ">
            <button on:click={_openUpdateMode} class="button btn-primary"><Fa icon={faPenToSquare} color="white" /></button>
            <button on:click={_deleteStructure} class="button btn-danger"><Fa icon={faCircleMinus} color="white" /></button>
            <button on:click={_openNewStructure(index)} class="button btn-success"><Fa icon={faCirclePlus} size="1.2x" color="white" /><Fa icon={faCircleUp} color="black" /></button>
            <button on:click={_openNewStructure(index+1)} class="button btn-success"><Fa icon={faCirclePlus} size="1.2x" color="white" /><Fa icon={faCircleDown} color="black" /></button>
    </div>
</div>
{:else}
<div class="row d-flex justify-content-center align-items-center">
    <div class="col-9">
        {#if isCode}
        <textarea bind:value={_value}  style="width: 100%;"></textarea>
        {:else}
        <input bind:value={_value} style="width: 100%;" type="text">
        {/if}
        
    </div>
    <div class="col-2 d-flex justify-content-center align-items-center">
            <Switch bind:checked={_isCode} names={{on:"Code",off:"Point"}}/>
    </div>
    <div class="col-1">
        <button on:click={_saveStructure} class="button btn-primary m-0 p-1"><Fa icon={faSave} color="white" /></button>
        <button on:click={_cancelStructure} class="button btn-danger m-0 p-1"><Fa icon={faCancel} color="white" /></button>
    </div>
</div>
{/if}