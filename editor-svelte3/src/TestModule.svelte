<script context="module">
    export const someValue = {name:"test"}
    export const testFunction = ()=>{
        someValue.name="değişti";
    }
</script>
<script>
    import { onMount } from 'svelte';
    import { onDestroy } from 'svelte';    

    onMount(async () => {
        testFunction();
	});
    onDestroy(() => {
    
    });
</script>
<span>Test module is working</span>