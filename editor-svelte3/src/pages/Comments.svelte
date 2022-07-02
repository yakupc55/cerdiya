<script>
	import CommentDetail from './CommentDetail.svelte';
    import {db,saveCommentsToFromLocalforage} from '../Datas/Datas.svelte';
    import {flip} from 'svelte/animate';
    import {_dragstartList,_dropList} from '../Datas/dragDropList.svelte';
    import { faCircleMinus,faCirclePlus,faCircleUp,faCircleDown,faCancel } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import { onMount } from 'svelte';
    
    const firstComment ={comment: "new comment",description:"new",id:db.Counts.comment,code:"",tabSize:0,isActive:false,type:0,cPath:-1,cPoint:0,situations:[]};
    onMount(async () => {
        changeId(-1);
        //console.log(db);
		if(db.Comments.length==0){
            db.Comments = [{comment: "new comment",description:"new",id:db.Counts.comment,code:"",tabSize:0,isActive:false,type:0,cPath:-1,cPoint:0,situations:[]}];
            db.Counts.comment+=1;
            saveCommentsToFromLocalforage();
        }
        //console.log(db.Comments);
	});
        //for drag list
        let hovering = false;
        let changeId=()=>{};
        const options = {duration:300};
        const dropList= (event, target)=>{
            db.Comments = _dropList(event, target,db.Comments,()=>{});
            hovering = null;
        }
        let selectedIndex=-1;
        const cancelSelected=()=>{
            changeId(-1);
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
        
        const doubleClick=()=>{
            console.log("dobule click is working");
        }

        const deleteComment=()=>{
            if(db.Comments.length>1){let index = findIndexById(selectedIndex);
            db.Comments.splice(index,1);
            db.Comments= db.Comments;
            selectedIndex=-1;
            saveCommentsToFromLocalforage();
            }else{
                alert("you cant't delete first comment");
            }
        }

        const addComment=(add)=>{
            let index = findIndexById(selectedIndex)+add;
            //console.log(index);
            db.Comments.splice(index,0,{comment: "new comment",description:"new",id:db.Counts.comment,code:"",tabSize:0,isActive:false,type:0,cPath:-1,cPoint:0,situations:[]});
            
            db.Comments= db.Comments;
            selectedIndex=db.Counts.comment;
            changeId(db.Counts.comment);
            db.Counts.comment+=1;
            saveCommentsToFromLocalforage();
        }

        const _refresh=()=>{
            db.Comments = db.Comments;
        }

        const cmodes = {
        refresh:_refresh
        }

    const connectionWithChilds = (data)=>{
        data=data.detail;
       // console.log(data);
        cmodes[data.mode](data.value);
    }
</script>
<div class="test">
    <div class="row p-0 m-0">
        <div class="col-6 bg-primary">
            <div class="position-sticky text-white">
               <a >root</a> > 
            </div>
            {#if selectedIndex>=0}
            <center>
                <div class="w-50 position-sticky" style="height:40px">
                    <button on:click={deleteComment} class="button btn-danger"><Fa icon={faCircleMinus} color="white" /></button>
                    <button on:click={()=>addComment(0)} class="button btn-success"><Fa icon={faCirclePlus} size="1.2x" color="white" /><Fa icon={faCircleUp} color="black" /></button>
                    <button on:click={()=>addComment(1)} class="button btn-success"><Fa icon={faCirclePlus} size="1.2x" color="white" /><Fa icon={faCircleDown} color="black" /></button>
                    <button on:click={cancelSelected} class="button btn-dark"><Fa icon={faCancel} color="white" /></button>
                </div>
            </center>
            {:else}
            <div class="w-50 position-sticky">
                <div style="height:40px"></div>
            </div>
            {/if}
        
            <div class="row commentsArea">
                {#each db.Comments as comment,index(comment.id)}
                    <div
                    animate:flip={options}
                    draggable={true} 
                    on:click={()=>{selectedIndex=comment.id;changeId(comment.id);}}
                    on:dblclick={doubleClick}
                    on:dragstart={event => _dragstartList(event, index)}
                    on:drop|preventDefault={event => dropList(event, index)}
                    ondragover="return false"
                    on:dragenter={() => hovering = index}
                    class:is-inactive={!comment.isActive && selectedIndex!=comment.id}
                    class:is-folder={comment.type==1}
                    class:selected={selectedIndex==comment.id}
                    class="card cm-card m-1 p-0">
                        {comment.comment}    
                    </div>                
                {/each}
                <div style="height: 20px;"></div>
            </div>
        </div>
        <div class="col-6 bg-white">
            <CommentDetail on:connection={connectionWithChilds} bind:changeId={changeId} />
        </div>
    </div>
</div>
<style>
    .cm-card{
        height: 170px;
        width: 170px;
    }
    .selected{
        background-color: #ffc107;
    }
    .commentsArea{
        overflow-y: scroll;
        height: 520px;
    }
    .test{
        height: 550px;
        width: 100%;
        overflow: hidden;
    }
    .is-inactive{
        opacity: 0.9;
        background-color: rgb(244, 149, 149) !important;
    }
    .is-folder{
        background-color: rgb(64, 79, 240) !important;
    }</style>