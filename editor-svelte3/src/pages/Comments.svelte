<script>
    import {db,saveCommentsToFromLocalforage} from '../Datas/Datas.svelte';
    import {flip} from 'svelte/animate';
    import {_dragstartList,_dropList} from '../Datas/dragDropList.svelte';
    import { faCircleMinus,faCirclePlus,faCircleUp,faCircleDown,faPenToSquare,faSave,faCancel } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
        //for drag list
        let hovering = false;
        const options = {duration:300};
        const dropList= (event, target)=>{
            db.Comments = _dropList(event, target,db.Comments,()=>{});
            hovering = null;
        }
        let selectedIndex=-1;
        const cancelSelected=()=>{
            selectedIndex=-1;
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
        
        const deleteComment=()=>{
            let index = findIndexById(selectedIndex);
            db.Comments.splice(index,1);
            db.Comments= db.Comments;
            selectedIndex=-1;
        }

        const addComment=(add)=>{
            let index = findIndexById(selectedIndex)+add;
            db.Comments.splice(index,0,{comment: "new comment",description:"new",code:"",isActive:false,id:db.cmCount});
            db.Comments= db.Comments;
            selectedIndex=db.cmCount;
            db.cmCount++;
        }
</script>

<div class="row p-0 m-0">
    <div class="col-6 bg-primary" data-spy="scroll">
        {#if selectedIndex>=0}
        <center>
            <div class="w-50 position-fixed">
                <button on:click={deleteComment} class="button btn-danger"><Fa icon={faCircleMinus} color="white" /></button>
                <button on:click={()=>addComment(0)} class="button btn-success"><Fa icon={faCirclePlus} size="1.2x" color="white" /><Fa icon={faCircleUp} color="black" /></button>
                <button on:click={()=>addComment(1)} class="button btn-success"><Fa icon={faCirclePlus} size="1.2x" color="white" /><Fa icon={faCircleDown} color="black" /></button>
                <button on:click={cancelSelected} class="button btn-dark"><Fa icon={faCancel} color="white" /></button>
            </div>
        </center>
        <div class="mt-5"></div>
        {/if}
    
        <div class="row">
            {#each db.Comments as comment,index(comment.id)}
                <div
                animate:flip={options}
                draggable={true} 
                on:click={()=>{selectedIndex=comment.id}}
                on:dragstart={event => _dragstartList(event, index)}
                on:drop|preventDefault={event => dropList(event, index)}
                ondragover="return false"
                on:dragenter={() => hovering = index}
                class:selected={selectedIndex==comment.id}
                class:is-active={hovering === index}
                 class="card cm-card m-1 p-0">
                    {comment.comment}    
                </div>                
            {/each}
        </div>
    </div>
    <div class="col-6 bg-success">
        <h1>area 2</h1>
    </div>
</div>

<style>
    .cm-card{
        height: 175px;
        width: 175px;
    }
    .selected{
        background-color: #ffc107;
    }
</style>