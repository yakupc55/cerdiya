<script>

import {db,saveCommentsToFromLocalforage} from '../Datas/Datas.svelte';
import Select from 'svelte-select';

let id;

let listIndex = -1;
export let isActive=false;    
export let code="";
export let pathValue=null;
export let pointValue=null;

$:pathItems = db.FileList.map(b => ({'label': b.name, 'value': b.path}));
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
        isActive=cm.isActive;
        code=cm.code;
        pathValue= getPathValue(cm.cPath);
        pointValue=getPointValue(cm.cPoint,cm.cPath);
    }
}
function getPointValue(pointId,path){
        listIndex=findIndexByPath(path);
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
    for(let i=0;i<db.FileList[listIndex].Structure.length;i++){
        if(db.FileList[listIndex].Structure[i].id==pointId){
            return i;
        }
    }
    return -1;
}

function getPathValue(path){
        if(path && path.length>0){
          let index = findIndexByPath(path);
          if(index>=0){
              listIndex=index;
            return  pathValue = {'label': db.FileList[index].name, 'value': db.FileList[index].path};
          }
        }
        return null;
}
const findIndexByPath=(path)=>{
        for(let i=0;i<db.FileList.length;i++){
            if(db.FileList[i].path==path){
                return i;
            }
        }
        return -1;
    }

function handleSelectPath(event) {
    // console.log(event);
    // console.log(cPath);
    let path= event.detail.value;
    listIndex = findIndexByPath(path);
    // console.log(listIndex);
    pointItems = getPointList();
}

function handleSelectPoint(event) { }


function getPointList(){
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

<h3>Code:</h3>
<textarea bind:value={code} style="width: 100%; height:200px"></textarea>
<div class="row pb-1">
    <div class="col-2">
        <h4>Path :</h4>
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
        <h4>Point :</h4>
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
        <h4>Active :</h4>
    </div>
    <div class="col-10">
     <h4>   <input style="width: 35px;height: 35px;" type=checkbox bind:checked={isActive}></h4>
    </div>
</div>
