<script>
	import FileListTable from './FileListTable.svelte';
	import UploadFile from '../tools/UploadFile.svelte';

    import {db} from '../Datas/Datas.svelte';
    import { onMount,onDestroy } from 'svelte';
    import { addFilesToList,deleteFile } from "../Datas/fileOperations.svelte";
    import {addFilesSubscribes} from "../Datas/stores";

    const electron = require("electron");
    let isFirstStart= true;
    onMount(async () => {

	});
    const _addFilesToList = (value)=>{ db.FileList = addFilesToList(value); }
    const _deleteFile = (index) =>{db.FileList=deleteFile(index)};
    const smodes= {
        dragDropFiles:_addFilesToList
    }
    
    const cmodes = {
        deleteFile:_deleteFile
    }

    const connectionWithChilds = (data)=>{
        data=data.detail;
       // console.log(data);
        cmodes[data.mode](data.value);
    }

    const unsubscribe = addFilesSubscribes.subscribe(data => {
        if(!isFirstStart){
            // console.log(data);
            smodes[data.mode](data.value);
        }else{
          //  console.log("firs start is active");
            isFirstStart = false;
        }	
	});

	onDestroy(unsubscribe);
   const uploadFileEvent= (event)=>{ db.FileList = addFilesToList([{name:event.detail.name,path:event.detail.path}]);};
</script>
<UploadFile on:uploadFileEvent={uploadFileEvent} />
<FileListTable on:connection={connectionWithChilds} db={db}/>
