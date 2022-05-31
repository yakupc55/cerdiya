<script>
    export let type;
    export let value;
    export let mode;
    import { createEventDispatcher } from 'svelte';
</script>


{#if mode=="show"}
<span>şu an show modunda açtınız</span>
    {#if type=="code"}
        <span>tipi kod olan bir mekanizmayı açtınız {value}</span>  
    {:else}
        <span>tipi point olan bir mekanizmayı açtınız {value}</span> 
    {/if}
{:else}
<span>düzenleme modundasınız</span>
{/if}