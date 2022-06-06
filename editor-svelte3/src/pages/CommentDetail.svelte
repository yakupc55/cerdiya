<script>
    import { fade, blur, fly, slide, scale } from "svelte/transition";
    import Select from 'svelte-select';
    import {flip} from 'svelte/animate';
    import { quintOut } from "svelte/easing";
    import {db,saveCommentsToFromLocalforage} from '../Datas/Datas.svelte';
    import {faSave } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import { onMount } from 'svelte';

    let pathValue=null;
    let pointValue=null;
    let listIndex = -1;
    let comment="";
    let description="";
    let cPath="";
    let cPoint=0;
    let code="";
    let isActive=false;
    let id;

    $:pathItems = db.FileList.map(b => ({'label': b.name, 'value': b.path}));
    $:pointItems = getPointList();
    onMount(async () => {
        //cPaht not empty .find index by path.later use this index to add value to pathValue
        
	});

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
    //a function find index of array by path in db.FileList
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

    function handleSelectPoint(event) {
        console.log(event);
        console.log(cPoint);
        let point= event.detail.value;
        console.log(pointValue);
    }

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
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    const refresh = () => {
        dispatch('connection', {
                            mode:"refresh",value:{}
                        });
    };

    const saveComment=()=>{
        let index = findIndexById(id);
        db.Comments[index].comment=comment;
        db.Comments[index].description=description;
        db.Comments[index].cPath=(pathValue)?pathValue.value:"";
        db.Comments[index].cPoint=(pointValue)?pointValue.value:-1;
        db.Comments[index].code=code;
        db.Comments[index].isActive=isActive;
        saveCommentsToFromLocalforage();
        refresh();
    }
    //a function find index of array by id
    const findIndexById=(id)=>{
        for(let i=0;i<db.Comments.length;i++){
            if(db.Comments[i].id==id){
                return i;
            }
        }
        return -1;
    }

    const changePageById = (_id) =>{
        //console.log(_id);
        id = _id;
        if(id>-1){
            let cm=db.Comments[findIndexById(id)];
            //console.log(cm);
            comment=cm.comment;
            description=cm.description;
            cPath=cm.cPath;
            cPoint=cm.cPoint;
            code=cm.code;
            isActive=cm.isActive;
            pathValue= getPathValue(cm.cPath);
            pointValue=getPointValue(cm.cPoint,cm.cPath);
        }
    }

    export const changeId = (_id)=> changePageById(_id);
    let selectedNavPage =0;
    let clickId=3;
    
    const pageList = [{name:"Code",id:0,clickId:0},{name:"Information",id:1,clickId:1},{name:"Situations",id:2,clickId:2}];
    const options = {duration:400,y:30};
    const changeSelectedNavPage = (index) => {
    selectedNavPage = index;
   }
</script>

{#if id>=0}
<div class="row bg-primary text-white" style="height:35px">

{#each pageList as page(page.clickId)}
    
        <div class="col-3">
            {#if page.id==selectedNavPage}
            <div
            in:fly={options}
             class="selected-page"></div>
            {/if}
            <div
            on:click={()=>changeSelectedNavPage(page.id)}
            class:select-item={page.id==selectedNavPage}
            class:non-select-item={page.id!=selectedNavPage}
             class="navItem">{page.name}</div>
        </div>
    
    {/each}
    <div class="col-auto float-left p-0 m-0">
        <button on:click={saveComment} class="button btn-primary m-0 p-1"><Fa icon={faSave} color="white" /></button> 
    </div>
</div>

{#if selectedNavPage==0}
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

{:else if selectedNavPage==1}
<h3>Comment:</h3>
<textarea bind:value={comment} style="width: 100%; height:120px"></textarea>
<h3>Description:</h3>
<textarea bind:value={description} style="width: 100%; height:240px"></textarea>


{:else if selectedNavPage==2}
<h1>Situations Page</h1>
{/if}

{:else}
        <h1>Please select a comment</h1>
{/if}

<style>
    
    .selected-page{
        position: relative;
        top: 8px;
        left: 0;
        width: 100%;
        height: 30px;
        background-color: white;
        border-top-left-radius: 20px 30px;
        border-top-right-radius: 20px 30px;
    }
    .navItem{
        position: relative;
        color:black;
        width: 100%;
        height: 30px;
        font-weight: 600;
        font-size: 18px;
    }
    .select-item{
        color:black;
        top: -25px;
        left: 14px;
    }
    .non-select-item{
        color:white;
        top: 6px;
        left: 14px;
    }
</style>
