<script>
    import { faCircleMinus,faCirclePlus,faCircleUp,faCircleDown,faPenToSquare,faSave,faCancel } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    export let type;
    export let id;
    export let value;
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
                            mode:"saveStructure",value:id
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
        <span>şu an show modunda açtınız</span>
        {#if type=="code"}
            <span>tipi kod olan bir mekanizmayı açtınız {value}</span>  
        {:else}
            <span>tipi point olan bir mekanizmayı açtınız {value}</span> 
        {/if}
    </div>
    <div class="col-4">
        <button on:click={_openUpdateMode} class="button btn-primary"><Fa icon={faPenToSquare} color="white" /></button>
        <button on:click={_deleteStructure} class="button btn-danger"><Fa icon={faCircleMinus} color="white" /></button>
        <button on:click={_openNewStructure(index)} class="button btn-success"><Fa icon={faCirclePlus} size="1.2x" color="white" /><Fa icon={faCircleUp} color="black" /></button>
        <button on:click={_openNewStructure(index+1)} class="button btn-success"><Fa icon={faCirclePlus} size="1.2x" color="white" /><Fa icon={faCircleDown} color="black" /></button>
    </div>
</div>
{:else}
<div class="row">
    <div class="col-8">
<span>düzenleme modundasınız</span>
    </div>
    <div class="col-4">
        <button on:click={_saveStructure} class="button btn-primary"><Fa icon={faSave} color="white" /></button>
        <button on:click={_cancelStructure} class="button btn-danger"><Fa icon={faCancel} color="white" /></button>
    </div>
</div>
{/if}