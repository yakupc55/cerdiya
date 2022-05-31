<script>
    export let type;
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
</script>


{#if mode=="show"}
<span>şu an show modunda açtınız</span>
    {#if type=="code"}
        <span>tipi kod olan bir mekanizmayı açtınız {value}</span>  
    {:else}
        <span>tipi point olan bir mekanizmayı açtınız {value}</span> 
    {/if}
    <button on:click={_openUpdateMode} class="button btn-primary">Edit</button>
{:else}
<span>düzenleme modundasınız</span>

{/if}