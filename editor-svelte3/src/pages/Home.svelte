<script>
	import { createEventDispatcher } from 'svelte';
    import {db,noDb,changeDbData,resetDbData,saveProjectDetailToFromLocalforage,changeRootFiles} from '../Datas/Datas.svelte';
    import { onMount, onDestroy } from "svelte";

    let projectSettings={version:"v.0.0.1",projectMode:false};

    onMount(async () => {
        setTimeout(() => {
            noDb.Project.dataStatus=noDb.Project.dataStatus;
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
            console.log("o.filePaths[0] :");
            console.log(o.filePaths[0]);
            console.log(o.filePaths[0]);
            fs.readFile(o.filePaths[0], function (error, content) {
                console.log("its good")
                var test = JSON.parse(content);
                console.log(test);
                changeDbData(test);
                console.log(db);
                projectSettings=db.project;
            });
            noDb.Project.path=o.filePaths[0];
            const index=noDb.Project.path.lastIndexOf('\\');
            noDb.Project.rootPath=noDb.Project.path.substring(0,index+1);
        }
    };

    const startNewProject = async function(){
        
        const o = await electron.remote.dialog.showSaveDialog({
            title: 'Save file as',
            filters: [{
                name: "Cerdiya Project",
                extensions: ["crdy"]
            }],
            properties: ['saveFile']
        });

        if(o.filePath) {
            noDb.Project.path=o.filePath;
            const index=noDb.Project.path.lastIndexOf('\\');
            noDb.Project.rootPath=noDb.Project.path.substring(0,index+1);
            console.log("start new project")
            resetDbData();
            var data=JSON.stringify(db);
            fs.writeFile(o.filePath, data, function(err) {
                if (err) {
                console.log(err);
                }
            });
            electron.remote.dialog.showMessageBox({ message: "Exported data to " + o.filePath, buttons: ["OK"] });
            console.log("no db path");
            console.log(noDb.Project.path);
        }
    }

    const saveProject = async function() {

        const o = await electron.remote.dialog.showSaveDialog({
            title: 'Save file as',
            filters: [{
                name: "Cerdiya Project",
                extensions: ["crdy"]
            }],
            properties: ['saveFile']
        });
        
        if(o.filePath) {
            console.log(o.filePath);
            var data=JSON.stringify(db);
            fs.writeFile(o.filePath, data, function(err) {
                if (err) {
                console.log(err);
                }
            });
            electron.remote.dialog.showMessageBox({ message: "Exported data to " + o.filePath, buttons: ["OK"] });
        }
    };

    const saveProjectSetting = async ()=>{
        changeRootFiles(projectSettings.projectMode);
        db.project =await JSON.parse(JSON.stringify(projectSettings));
        saveProjectDetailToFromLocalforage();
    }

</script>
{#if noDb.Project.dataStatus}
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
