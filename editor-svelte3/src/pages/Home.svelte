<script>
	import { createEventDispatcher } from 'svelte';
    import {db,changeDbData,resetDbData,saveProjectDetailToFromLocalforage} from '../Datas/Datas.svelte';
    import { onMount, onDestroy } from "svelte";

    let projectSettings={version:"v.0.0.1",projectMode:false};

    onMount(async () => {
        setTimeout(() => {
            db=db;
            projectSettings=db.project;
        }, 200);
    });

    const fs = require('fs');
    const electron = require('electron');
    

    const openProject = async function() {
        const o = await electron.remote.dialog.showOpenDialog({
            title: 'Select a file',
            filters: [{
                name: "Cerdiya Project",
                extensions: ["crdy"]
            }],
            properties: ['openFile']
        });
        if(o.filePaths.length > 0) {
            console.log(o.filePaths[0]);
            fs.readFile(o.filePaths[0], function (error, content) {
                console.log("its good")
                var test = JSON.parse(content);
                console.log(test);
                changeDbData(test);
                console.log(db);
            });
        }
    };

    const startNewProject = async function(){
        console.log("start new project")
        resetDbData();
    }

    const saveProject = async function() {
        const o = await electron.remote.dialog.showSaveDialog({
            title: 'Save file as',
            filters: [{
                name: "Cerdiya Project",
                extensions: ["crdy"]
            }]
        });

        console.log(o.filePath);
        var data=JSON.stringify(db);
        fs.writeFile(o.filePath, data, function(err) {
            if (err) {
            console.log(err);
            }
        });
        electron.dialog.showMessageBox({ message: "Exported data to " + o.filePath, buttons: ["OK"] });
    };

    const saveProjectSetting = async ()=>{
        db.project =await JSON.parse(JSON.stringify(projectSettings));
        saveProjectDetailToFromLocalforage();
    }

</script>
{#if db.dataStatus}
<button type="button"  class="btn btn-primary " on:click={startNewProject}>Start New Project</button>
<button type="button"  class="btn btn-primary " on:click={openProject} >Open a Project</button>
<button type="button"  class="btn btn-primary " on:click={saveProject} >Save The Project</button>

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
