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
                            mode:"openUpdateMode",value:index
                        });  
    };
    const _deleteStructure = () =>{
        dispatch('connection', {
                            mode:"deleteStructure",value:id
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
    </div>
</div>
{:else}
<span>düzenleme modundasınız</span>

{/if}