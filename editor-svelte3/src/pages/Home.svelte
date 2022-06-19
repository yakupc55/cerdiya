<script>
	import { createEventDispatcher } from 'svelte';
    import {db,changeDbData,resetDbData} from '../Datas/Datas.svelte';
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
</script>

<button type="button"  class="btn btn-primary btn-block uploadButton" on:click={startNewProject}>Start New Project</button>
<button type="button"  class="btn btn-primary btn-block uploadButton" on:click={openProject} >Open a Project</button>
<button type="button"  class="btn btn-primary btn-block uploadButton" on:click={saveProject} >Save The Project</button>
<h1>
    Developer: Diyar Ceran
    <br>
    Version: 0.0.1
</h1>