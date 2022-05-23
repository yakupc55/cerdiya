<script>
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