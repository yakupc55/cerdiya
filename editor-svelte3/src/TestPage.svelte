<script>
    	import { onMount } from 'svelte';

        onMount(async () => {
		console.log(document.location);
		if (!('indexedDB' in window)) {
  			console.log('This browser doesn\'t support IndexedDB');
		}
		else{
			console.log("this browser supports IndexedDB");
		}
	});
</script>