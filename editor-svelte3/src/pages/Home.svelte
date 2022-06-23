<script>
	import { createEventDispatcher } from 'svelte';
    import {db,noDb,saveProjectDetailToFromLocalforage,changeRootFiles} from '../Datas/Datas.svelte';
    import { onMount, onDestroy } from "svelte";
    import {saveProject,openProject,startNewProject} from '../Datas/projectOperations.svelte';
    let projectSettings=db.project;

    onMount(async () => {
        setTimeout(() => {
            noDb.dataStatus=noDb.dataStatus;
            projectSettings=db.project;
        }, 200);
    });

    

    const saveProjectSetting = async ()=>{
        changeRootFiles(projectSettings.projectMode);
        db.project =await JSON.parse(JSON.stringify(projectSettings));
        saveProjectDetailToFromLocalforage();
    }

</script>
{#if noDb.dataStatus}
<button type="button"  class="btn btn-primary " on:click={startNewProject}>Start New Project</button>
<button type="button"  class="btn btn-primary " on:click={()=>{openProject(projectSettings)}} >Open a Project</button>
<button type="button"  class="btn btn-primary " on:click={saveProject} >Save The Project</button>

{#if noDb.Project.name.length>1}
<br>
<hr>

<b style="font-size:18px">Project Name : </b> {noDb.Project.name}
    <br>
<b style="font-size:18px">Project Path : </b> {noDb.Project.path}
{/if}
<br>
<hr>
<div> 
    <input style="width:18px;height:18px" type=checkbox  bind:checked={projectSettings.projectMode}>
    <b style="font-size:18px"> Project Mode</b>
    <span style="font-size:12px">( path of files add by project path)</span>
</div>

<br>
<button type="button"  class="btn btn-primary btn-block uploadButton" on:click={saveProjectSetting} >Save The Settings</button>


<br>
<hr>
<h1>
    Developer: Diyar Ceran
    <br>
    Version: 0.0.2
</h1>

{:else}
<h1>waiting the data...</h1>
{/if}
