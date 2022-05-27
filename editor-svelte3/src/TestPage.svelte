<script>
    import { onMount } from 'svelte';
        
      
    onMount(async () => {
		console.log(document.location);
		
        localforage.setItem('key', 'value').then((x)=>{
            console.log(x);
        })
	});


</script>

<button> get item </button>
<button> set item </button>