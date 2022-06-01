<script>
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
        <button on:click={_openUpdateMode} class="button btn-primary">Edit</button>
        <button on:click={_deleteStructure} class="button btn-danger">delete</button>
        <button on:click={_openNewStructure(index)} class="button btn-success">New up</button>
        <button on:click={_openNewStructure(index+1)} class="button btn-success">New Down</button>
    </div>
</div>
{:else}
<div class="row">
    <div class="col-8">
<span>düzenleme modundasınız</span>
    </div>
    <div class="col-4">
        <button on:click={_saveStructure} class="button btn-primary">Save</button>
        <button on:click={_cancelStructure} class="button btn-primary">Cancel</button>
    </div>
</div>
{/if}