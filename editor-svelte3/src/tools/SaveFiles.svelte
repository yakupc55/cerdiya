<script>
    import { faRefresh,faSave } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import { db,noDb } from "../Datas/Datas.svelte";
    import {writeToDisk} from "../Datas/projectOperations.svelte";
    const electron = require('electron');
    const path = require('path');
    const fs = require('fs');

    let tempDb=null;

    function saveFiles(){  
    //console.log("savefiles is working");
    tempDb=JSON.parse(JSON.stringify(db));

    //first add to structure
    //console.log(tempDb);
    let index=-1;
    let findex=-1;
    let pindex=-1;
    tempDb.Comments.forEach((comment,index) => {
        if(isCommitActive(index)){
            // console.log("aktive commit");
            // console.log(comment);
            findex=tempDb.FileList.findIndex(file => file.id== comment.cPath);
            if(findex>-1 && tempDb.FileList[findex].Structure){
                pindex=tempDb.FileList[findex].Structure.findIndex(point => point.id == comment.cPoint);
                // let test=tempDb.FileList[findex].Structure[pindex];
                // console.log(test);
                if(pindex>-1){
                    if(tempDb.FileList[findex].Structure[pindex].code){
                        tempDb.FileList[findex].Structure[pindex].code+="\n"+comment.code;
                    }else{
                        tempDb.FileList[findex].Structure[pindex].code=comment.code;
                    }
                    //console.log(tempDb.FileList[findex].Structure[pindex].code);
                }
            }
            //console.log(findex);
        }else{
            // console.log("not aktive commit");
            // console.log(comment);
        }
    });

    // save the files
    let Files=[];
    tempDb.FileList.forEach((file,index) => {
        Files.push({info:file,data:''});
        //console.log(file);
        if(file.Structure){
            file.Structure.forEach((point) => {
            if(point.isCode){
                Files[index].data+=point.value+"\n";
            }else{
                if(point.code){
                    Files[index].data+=point.code+"\n";
                }
            }
            
        });
        }     
    });

    // console.log("Files :");
    // console.log(Files);
    Files.forEach((file) => {
        if(file.data){
            // console.log("file.data :");
            // console.log(file.data);
            var path="";
            if(db.project.projectMode && noDb.Project.path.length>1)
            path = noDb.Project.rootPath;
            
            path+=file.info.path;
            fs.writeFile(path, file.data, (err) => {
                if (err) throw err;
                //console.log('The file has been saved!');
            });
        }
    });
    console.log("savefiles is done");
    
    //console.log(Files);
    }// end function saveFiles

    function isCommitActive(index){
        let i=-1;
        if(!tempDb.Comments[index].isActive){
            return false;
        }
        for (let i = 0; i < tempDb.Comments[index].situations.length; i++) {
            i=tempDb.Situations.findIndex(situation => situation.id==tempDb.Comments[index].situations[i]);
            if(i>-1){
                if(!tempDb.Situations[i].isActive){
                    return false;
                }
            }
        }
        return true;
    }

    function savePro(){
        if(noDb.Project.path.length>1){
            writeToDisk(noDb.Project.path);
        }else{
            alert("firstly save project on somewhere");
        }
    }
</script>
<button on:click={saveFiles} class="button btn-white m-0 p-1"><Fa icon={faRefresh} color="black" /></button> 
<button on:click={savePro} class="button btn-white m-0 p-1"><Fa icon={faSave} color="black" /></button> 