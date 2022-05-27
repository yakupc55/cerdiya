<script>
	import Fa from 'svelte-fa';
    import {faCircleMinus} from '@fortawesome/free-solid-svg-icons'
    const electron = require('electron');
    const path = require('path');
    export let FileList=[];
    // Importing dialog module using remote
    const dialog = electron.remote.dialog;

    const addFileFunction= () => {
// If the platform is 'win32' or 'Linux'
    if (process.platform !== 'darwin') {
        // Resolves to a Promise<Object>
        dialog.showOpenDialog({
            title: 'Select the File to be uploaded',
            defaultPath: path.join(__dirname, '../assets/'),
            buttonLabel: 'Upload',
            // Restricting the user to only Text Files.
            filters: [
                {
                    name: 'Text Files',
                    extensions: ['txt', 'docx']
                }, ],
            // Specifying the File Selector Property
            properties: ['openFile']
        }).then(file => {
            // Stating whether dialog operation was
            // cancelled or not.
            console.log(file.canceled);
            if (!file.canceled) {
              // Updating the GLOBAL filepath variable 
              // to user-selected file.
              console.log(global);
              global.filepath = file.filePaths[0].toString();
              console.log(path.basename(global.filepath));
              console.log(global.filepath);
            }  
        }).catch(err => {
            console.log(err)
        });
    }
    else {
        // If the platform is 'darwin' (macOS)
        dialog.showOpenDialog({
            title: 'Select the File to be uploaded',
            defaultPath: path.join(__dirname, '../assets/'),
            buttonLabel: 'Upload',
            filters: [
                {
                    name: 'Text Files',
                    extensions: ['txt', 'docx']
                }, ],
            // Specifying the File Selector and Directory 
            // Selector Property In macOS
            properties: ['openFile', 'openDirectory']
        }).then(file => {
            console.log(file.canceled);
            if (!file.canceled) {
              global.filepath = file.filePaths[0].toString();
              console.log(global.filepath);
            }  
        }).catch(err => {
            console.log(err)
        });
    }
}
    var uploadFile = document.getElementById('upload');


    document.addEventListener('drop', (event) => {
    let files=[];
    event.preventDefault();
    event.stopPropagation();
    for (const f of event.dataTransfer.files) {
        let exist=false;
        for(const item of FileList){
            if(item.path === f.path){
                exist=true;
                break;  
            }
        }
        if(exist){
            alert("this file is exist.\n"+f.path);
        }
        else{
            files= [...files,{path:f.path,name:f.name}];
        }
    }
    FileList= [...FileList,...files]; 
});
 
document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
 
document.addEventListener('dragenter', (event) => {
    console.log('File is in the Drop Space');
});
 
document.addEventListener('dragleave', (event) => {
    console.log('File has left the Drop Space');
});

const deleteFile= (path)=>{
    FileList = FileList.filter(x => x.path!=path);
}
</script>
<button on:click={addFileFunction}>Upload File</button>
<h1>
    File list 
</h1>
{#if FileList.length>0}
<h2>{FileList.length}</h2>
{#each FileList as item, index}
<h4>{index}. {item.name} <div on:click={deleteFile(item.path)}><Fa icon={faCircleMinus} color="red" /></div></h4>
{/each} 
{:else}
<h2>list is empty</h2>
{/if}