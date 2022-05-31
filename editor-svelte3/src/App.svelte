<script>
	import AppNavbar from './AppNavbar.svelte';
	import Datas from './Datas/Datas.svelte';
	import { onMount } from 'svelte';
    import DragDropEvent from "./tools/DragDropEvent.svelte";
	import AppHead from './AppHead.svelte';

	onMount(async () => {
		//console.log(document.location);
	});

</script>

<AppHead />
<Datas />
<DragDropEvent />
<AppNavbar />

		