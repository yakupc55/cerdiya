<script>
    import {db,saveCommentsToFromLocalforage} from '../Datas/Datas.svelte';
    import {flip} from 'svelte/animate';
    import {_dragstartList,_dropList} from '../Datas/dragDropList.svelte';

        //for drag list
        let hovering = false;
        const options = {duration:300};
        const dropList= (event, target)=>{
            db.Comments = _dropList(event, target,db.Comments,()=>{});
            hovering = null;
        }

</script>

<div class="row p-0 m-0">
    <div class="col-6 bg-danger">
        <div class="row">
            {#each db.Comments as comment,index(comment.id)}
                <div
                animate:flip={options}
                draggable={true} 
                on:dragstart={event => _dragstartList(event, index)}
                on:drop|preventDefault={event => dropList(event, index)}
                ondragover="return false"
                on:dragenter={() => hovering = index}
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
</style>