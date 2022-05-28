<script>
    import { onMount } from 'svelte';
    import { onDestroy } from 'svelte';    
      
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

<button on:click={getItem}> get item </button>
<button on:click={setItem}> set item </button>