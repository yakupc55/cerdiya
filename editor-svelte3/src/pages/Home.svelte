<script>
	import { createEventDispatcher } from 'svelte';
    import {db,noDb,saveProjectDetailToFromLocalforage,changeRootFiles} from '../Datas/Datas.svelte';
    import { onMount, onDestroy } from "svelte";
    import {saveProject,openProject,startNewProject,openProjectWithUrl} from '../Datas/projectOperations.svelte';

    import {homeSubscribes} from "../Datas/stores";
    let isFirstStart= true;

    const _addFilesToList = (value)=>{ openProjectWithUrl(value[0].path); noDb=noDb; }
    
    const smodes= {
        dragDropFiles:_addFilesToList
    }
    
    const unsubscribe = homeSubscribes.subscribe(data => {
        if(!isFirstStart){
            console.log(data);
            smodes[data.mode](data.value);
        }else{
            console.log("firs start is active");
            isFirstStart = false;
        }	
	});

    let projectSettings=db.project;

    const refreshData = ()=>{
        setTimeout(() => {
            noDb.dataStatus=noDb.dataStatus;
            projectSettings=db.project;
            noDb.Project= noDb.Project;
        }, 100);
    }
    onMount(async () => {
        setTimeout(() => {
            noDb.dataStatus=noDb.dataStatus;
            projectSettings=db.project;
        }, 200);
    });

    const _startNewProject = async()=>{
     const start=  await startNewProject();
     noDb=noDb;
    }
    const _openProject = async()=>{
     const start=  await openProject();
     noDb=noDb;
    }
    const _saveProject = async()=>{
     const start=  await saveProject();
     noDb=noDb;
    }

    const saveProjectSetting = async ()=>{
        changeRootFiles(projectSettings.projectMode);
        db.project =await JSON.parse(JSON.stringify(projectSettings));
        saveProjectDetailToFromLocalforage();
    }
	onDestroy(unsubscribe);
</script>
{#if noDb.dataStatus}
<button type="button"  class="btn btn-primary " on:click={_startNewProject}>Start New Project</button>
<button type="button"  class="btn btn-primary " on:click={_openProject} >Open a Project</button>
<button type="button"  class="btn btn-primary " on:click={_saveProject} >Save The Project</button>

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
