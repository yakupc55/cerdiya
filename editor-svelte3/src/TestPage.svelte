<script>
    import { onMount } from 'svelte';
    import { onDestroy } from 'svelte';    
    import TestModule,{ someValue } from './TestModule.svelte'  
    onMount(async () => {
		console.log(document.location);
	});
    onDestroy(() => {
        console.log("çalıştı");
    });
    let getItem= ()=>{
        localforage.getItem('key2').then(x => console.log(x));
    }
    let setItem= ()=>{
        localforage.setItem('key', 'value').then((x)=>{
            console.log(x);
        });
    }

</script>
{someValue.name}
<TestModule />
<button on:click={getItem}> get item </button>
<button on:click={setItem}> set item </button>