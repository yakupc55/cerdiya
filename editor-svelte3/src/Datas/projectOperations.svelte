<script context="module">

import { db,noDb,changeDbData,resetDbData,saveNoDbProjectToFromLocalforage } from "./Datas.svelte";
const fs = require('fs');
const electron = require('electron');

const changeNoDbPath =(path)=>{
    noDb.Project.path=path;
    const index=noDb.Project.path.lastIndexOf('\\');
    noDb.Project.rootPath=noDb.Project.path.substring(0,index+1);
    noDb.Project.name=noDb.Project.path.substring(index+1,noDb.Project.path.length);
    console.log(noDb);
    saveNoDbProjectToFromLocalforage();
}

export const writeToDisk = (filePath)=>{
    var data=JSON.stringify(db);
    fs.writeFile(filePath, data, function(err) {
            if (err) {
            console.log(err);
            }
        });
}

export const openProjectWithUrl = (url)=>{
    // console.log("url :");
    // console.log(url);
    fs.readFile(url, function (error, content) {
        console.log("its good")
        var test = JSON.parse(content);
        console.log(test);
        changeDbData(test);
        console.log(db);
    });
    changeNoDbPath(url);
}

export const openProject = async function() {
    const o = await electron.remote.dialog.showOpenDialog({
        title: 'Select a file',
        filters: [{
            name: "Cerdiya Project",
            extensions: ["crdy"]
        }],
        properties: ['openFile']
    });
    if(o.filePaths.length > 0) {
        openProjectWithUrl(o.filePaths[0]);
    }
};

export const startNewProject = async function(){
    
    const o = await electron.remote.dialog.showSaveDialog({
        title: 'Save file as',
        filters: [{
            name: "Cerdiya Project",
            extensions: ["crdy"]
        }],
        properties: ['saveFile']
    });

    if(o.filePath) {
        changeNoDbPath(o.filePath);
        console.log("start new project")
        resetDbData();
        writeToDisk(o.filePath);
        electron.remote.dialog.showMessageBox({ message: "Exported data to " + o.filePath, buttons: ["OK"] });
        console.log("no db path");
        console.log(noDb.Project.path);
    }
}

export const saveProject = async function() {

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
    writeToDisk(o.filePath);
    electron.remote.dialog.showMessageBox({ message: "Exported data to " + o.filePath, buttons: ["OK"] });
    changeNoDbPath(o.filePath);
}
};
</script>
