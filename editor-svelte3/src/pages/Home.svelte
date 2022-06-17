<script>
	import { createEventDispatcher } from 'svelte';
    function startNewProject(){

    }

    function openProject(){

    }

    function saveProject(){

    }
</script>

<button type="button"  class="btn btn-primary btn-block uploadButton" on:click={startNewProject}>Start New Project</button>
<button type="button"  class="btn btn-primary btn-block uploadButton" on:click={openProject} >Open a Project</button>
<button type="button"  class="btn btn-primary btn-block uploadButton" on:click={saveProject} >Save The Project</button>
<h1>
    Developer: Diyar Ceran
    <br>
    Version: 0.0.1
</h1>