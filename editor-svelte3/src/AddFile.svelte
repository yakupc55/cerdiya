<script>
    const electron = require('electron');
    const path = require('path');

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
    let FileList=[];

    document.addEventListener('drop', (event) => {
    let files=[];
    event.preventDefault();
    event.stopPropagation();
    for (const f of event.dataTransfer.files) {
        let exist=false;
        console.log("step 1 if");
        for(const item of FileList){
            console.log("step 2");
            if(item.path === f.path){
                exist=true;
                break;  
            }
        }
        if(exist){
            console.log("step 3 if");
            alert("this file is exist.\n"+f.path);
            console.log("this file is exist.\n"+f.path);
        }
        else{
            console.log("step 3 else");
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
</script>
<button on:click={addFileFunction}>Upload File</button>
<h1>
    File list 
</h1>
{#if FileList.length>0}
<h2>{FileList.length}</h2>
{#each FileList as item, index}
<h4>{index}. {item.name}</h4>
{/each} 
{:else}
<h2>list is empty</h2>
{/if}