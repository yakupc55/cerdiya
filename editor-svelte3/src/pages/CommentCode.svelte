<script>

import {db,saveCommentsToFromLocalforage} from '../Datas/Datas.svelte';
import Select from 'svelte-select';
import CodeMirror from '../uiComponent/CodeMirror.svelte';

let id;

let listIndex = -1;
export let isActive=false;    
export let code="";
export let pathValue=null;
export let pointValue=null;
export let tabSize=0;

/*
Code mirror 
*/
let editor;
const options = {
		mode: "javascript",
		lineNumbers: true,
        value:code
	}
	
	
	
	function changed(event) {
        code=editor.getDoc().getValue();
		//console.log('changed')
		//console.log(event.detail)
	}
// end code mirror codes

$:pathItems = db.FileList.map(b => ({'label': b.name, 'value': b.id}));
$:pointItems = getPointList();

export const changeId = (_id)=> changePageById(_id);

const findIndexById=(id)=>{
        for(let i=0;i<db.Comments.length;i++){
            if(db.Comments[i].id==id){
                return i;
            }
        }
        return -1;
    }

function changePageById(_id){
    id=_id;
    //console.log(id);
    if(id>-1){
        let cm=db.Comments[findIndexById(id)];
        // console.log("cm :");
        // console.log(cm);
        isActive=cm.isActive;
        code=cm.code;
        tabSize=cm.tabSize;
        editor.getDoc().setValue(cm.code);
        pathValue= getPathValue(cm.cPath);
        pointValue=getPointValue(cm.cPoint,cm.cPath);
    }
}
function getPointValue(pointId,pathId){
        listIndex=findFileIndexById(pathId);
        pointItems = getPointList();
        if( pointId>=0 && listIndex>=0){
            let index = findIndexbyPoint(pointId);
            
            if(index>=0){
                let point = db.FileList[listIndex].Structure[index];
                return {'label': point.value, 'value': point.id};
            }
        }
        return null;
}

function findIndexbyPoint(pointId){
    // console.log("listIndex");
    // console.log(listIndex);
    // console.log("db.FileList[listIndex]");
    // console.log(db.FileList[listIndex]);

    for(let i=0;i<db.FileList[listIndex].Structure.length;i++){
        if(db.FileList[listIndex].Structure[i].id==pointId){
            return i;
        }
    }
    return -1;
}

function getPathValue(id){
        if(id>=0){
          let index = findFileIndexById(id);

        //   console.log("db.FileList[index] :");
        //   console.log(db.FileList[index]);
          if(index>=0){
              listIndex=index;
            return  pathValue = {'label': db.FileList[index].name, 'value': db.FileList[index].id};
          }
        }
        return null;
}
const findFileIndexById=(id)=>{
    // console.log("find file index by id");
    // console.log(id);
        for(let i=0;i<db.FileList.length;i++){
            if(db.FileList[i].id==id){
                // console.log("return true id :");
                // console.log(i);
                return i;
            }
        }
        return -1;
    }

function handleSelectPath(event) {
    // console.log(event);
    // console.log(cPath);
    let id= event.detail.value;
    // console.log("handle evetn path id :");
    // console.log(id);
    listIndex = findFileIndexById(id);
    // console.log(listIndex);
    pointItems = getPointList();
}

function handleSelectPoint(event) { }


function getPointList(){
    // console.log("listIndex :");
    // console.log(listIndex);
    if(listIndex>=0){
        if(db.FileList[listIndex].Structure && db.FileList[listIndex].Structure.length>0){
            return db.FileList[listIndex].Structure.filter(b => b.isCode==false).map(b => ({'label': b.value, 'value': b.id}));
        }else{
            return [];
        }
    }
    else{
        return [];
    }
}

</script>

<h5>Code:</h5>
<CodeMirror  on:change={changed} bind:editor {options} class="editor"/>
<div class="row">
    <div class="col-2">
        <h5>Tab Size :</h5>
    </div>
    <div class="col-10">
     <h5>   <input style="" type="number" bind:value={tabSize} pattern="[0-9]+" ></h5>
    </div>
</div>
<div class="row pb-1">
    <div class="col-2">
        <h5>Path :</h5>
    </div>
    <div class="col-10">
        <Select
        items={pathItems}
        bind:value={pathValue}
        on:select={handleSelectPath}></Select>
    </div>
</div>
<div class="row  pb-1">
    <div class="col-2">
        <h5>Point :</h5>
    </div>
    <div class="col-10">
        <Select
        items={pointItems}
        bind:value={pointValue}
        on:select={handleSelectPoint}></Select>
    </div>
</div>
<div class="row">
    <div class="col-2">
        <h5>Active :</h5>
    </div>
    <div class="col-10">
     <h5>   <input style="width: 35px;height: 35px;" type=checkbox bind:checked={isActive}></h5>
    </div>
</div>
