<script>
	import CommentCode from './CommentCode.svelte';
    import { fade, blur, fly, slide, scale } from "svelte/transition";
    import Select from 'svelte-select';
    import {flip} from 'svelte/animate';
    import { quintOut } from "svelte/easing";
    import {db,saveCommentsToFromLocalforage} from '../Datas/Datas.svelte';
    import {faSave } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import { onMount } from 'svelte';

    
    let situationsValues=null;
    let sendId=()=>{};
    let comment="";
    let description="";
    let isActive=false;    
    let code="";
    let tabSize = 0;
    let pathValue=null;
    let pointValue=null;
    let id;
    let firstIndex=-1;

   
    $:situationsItems = getSituationsList();
    onMount(async () => {
        
        //cPaht not empty .find index by path.later use this index to add value to pathValue
        
	});

    function getSituationsValues(list){
        if(list && list.length>0 && firstIndex>=0){
            let valueList=[];
            for(let i=0;i<list.length;i++){
                let index = db.Situations.findIndex(b => b.id==list[i]);
                if(index>=0){
                    valueList.push({'label': db.Situations[index].name, 'value': list[i]});
                }
            }
            return valueList;
        }
        return null;
    }   

    function handleSelectSituations(event) { }

    //a function get situations list from db.Situations
    function getSituationsList(){
        if(db.Situations && db.Situations.length>0){
            return db.Situations.map(b => ({'label': b.name, 'value': b.id}));
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

    function getIdlist(){
        let idList=[];
        //console.log(situationsValues);
        if(situationsValues){
            for(const st of situationsValues){
                // console.log(st);
                idList.push(st.value);
            }
        }
        //console.log(idList);
        return idList;
    }
    const saveComment=()=>{
        let index = findIndexById(id);
        db.Comments[index].comment=comment;
        db.Comments[index].description=description;
        db.Comments[index].cPath=(pathValue)?pathValue.value:"";
        db.Comments[index].cPoint=(pointValue)?pointValue.value:-1;
        db.Comments[index].code=code;
        db.Comments[index].tabSize=tabSize;
        db.Comments[index].isActive=isActive;
        db.Comments[index].situations=getIdlist();
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
        // console.log(_id);
        // console.log(db.Comments);
        id = _id;

        setTimeout(() => {sendId(id);}, 1);

        firstIndex=findIndexById(id);
        if(id>-1 && firstIndex>-1){
            let cm=db.Comments[findIndexById(id)];
            //console.log(cm);
            comment=cm.comment;
            description=cm.description;
            situationsValues=getSituationsValues(cm.situations);
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
<CommentCode bind:changeId={sendId} bind:isActive={isActive} bind:tabSize={tabSize} bind:code={code} bind:pathValue={pathValue} bind:pointValue={pointValue} />
{:else if selectedNavPage==1}

<h3>Comment:</h3>
<textarea bind:value={comment} style="width: 100%; height:120px"></textarea>
<h3>Description:</h3>
<textarea bind:value={description} style="width: 100%; height:240px"></textarea>


{:else if selectedNavPage==2}

<h3>Situations:</h3>
<Select
        items={situationsItems}
        bind:value={situationsValues}
        isMulti=true
        on:select={handleSelectSituations}></Select>
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
