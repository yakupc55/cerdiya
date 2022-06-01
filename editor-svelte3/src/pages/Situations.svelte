<script>
    import { faCircleMinus,faCirclePlus,faCircleUp,faCircleDown,faPenToSquare,faSave,faCancel } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
	import Situations from './Situations.svelte';
    import {db} from '../Datas/Datas.svelte';
    let updateIndex=-1;
    let firstValue="save your fist value";

    const saveSituation =(index)=>{
        if(db.Situations.length==0){
            db.Situations = [{value:firstValue,isActive:false}];
        }
    }
</script>
<div class="border border-secondary bg-dark mb-2">
{#if db.Situations.length > 0}
    {#each db.Situations as situation}
    <div class="card mb-2">
        <div class="card-header bg-white text-white m-0 p-0">
            <div class="row d-flex justify-content-center align-items-center">
                <div class="col-9">
                    {situation.value}
                </div>
                <div class="col-3 d-flex">
                    <button class="button btn-primary"><Fa icon={faPenToSquare} color="white" /></button>
                    <button class="button btn-danger"><Fa icon={faCircleMinus} color="white" /></button>
                    <button class="button btn-success"><Fa icon={faCirclePlus} size="1.2x" color="white" /><Fa icon={faCircleUp} color="black" /></button>
                    <button class="button btn-success"><Fa icon={faCirclePlus} size="1.2x" color="white" /><Fa icon={faCircleDown} color="black" /></button>
                </div>
            </div>
        </div>
    </div>
    {/each}
{:else}
    <div class="card mb-2">
        <div class="card-header bg-white text-white m-0 p-0 ">
            <div class="row">
                <div class="col-10">
                    <input bind:value={firstValue} style="width: 100%;" type="text">
                </div>
                <div class="col-2">
                    <button on:click={saveSituation} class="button btn-primary m-0 p-1"><Fa icon={faSave} color="white" /></button>
                    <button class="button btn-danger m-0 p-1"><Fa icon={faCancel} color="white" /></button>
                </div>
            </div>
        </div>
    </div>
 
{/if}
</div>