<script>
    import { fade, blur, fly, slide, scale } from "svelte/transition";
    import {flip} from 'svelte/animate';
    import { quintOut } from "svelte/easing";
    export let id;
    let selectedNavPage =0;
    let clickId=3;
    const pageList = [{name:"Code",id:0,clickId:0},{name:"Information",id:1,clickId:1},{name:"Situations",id:2,clickId:2}];
    const options = {duration:400,y:30};
    const changeSelectedNavPage = (index) => {
    selectedNavPage = index;
   }
</script>

<div class="row bg-primary text-white" style="height:33px">
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
</div>

<h1>{id}</h1>
{#if selectedNavPage==0}
<h1>page 1</h1>
{:else if selectedNavPage==1}
<h1>page 2</h1>
{:else if selectedNavPage==2}
<h1>page 3</h1>
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
