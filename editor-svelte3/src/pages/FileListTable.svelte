<script>
	import { sentToMainParent } from './../Datas/stores.js';
    import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
    import { fly } from 'svelte/transition';
    import Fa from "svelte-fa";

    import { createEventDispatcher } from 'svelte';
    export let db={};
    const dispatch = createEventDispatcher();
    const _deleteFile = (index) =>{
        dispatch('connection', {
                            mode:"deleteFile",value:index
                        });  
    };
</script>
{#if db.FileList.length > 0}
    <table class="table table-sm table-dark">
        <thead>
            <tr>
                <th class="col-1" scope="col">index</th>
                <th class="col-3" scope="col">Name</th>
                <th class="col-6" scope="col">Path</th>
                <th class="col-1" scope="col">Tools</th>
            </tr>
        </thead>
        <tbody>
            {#each db.FileList as item, index}
                <!-- <h4>{index}. {item.name} <span on:click={deleteFile(item.path)}><Fa icon={faCircleMinus} color="red" /></span></h4> -->
                <tr in:fly="{{ x: -400, duration: 500 }}">
                    <th scope="row">{index}</th>
                    <td>{item.name.substring(0,35)}</td>
                    <td>{item.path.substring(0,70)}</td>
                    <td
                        ><span on:click={_deleteFile(item.path)}
                            ><Fa icon={faCircleMinus} color="red" /></span
                        ></td
                    >
                </tr>
            {/each}
        </tbody>
    </table>
{:else}
    <h2>You didn't add any file</h2>
{/if}