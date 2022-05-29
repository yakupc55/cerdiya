<script>
    import { onMount, onDestroy } from "svelte";
    import { someValue } from "./TestModule.svelte";
    import { db, saveFileListToFromLocalforage } from "./Datas.svelte";
    let selectedFile=0;
    onMount(async () => {
       // console.log(db);
    });
</script>

<div class="row">
    <div class="col-3"> 
        <select
            class="form-select"
            size="20"
            bind:value={selectedFile}
            aria-label="multiple select example">
            {#each db.FileList as item, index}
            <option value={index}>{item.name}</option>
            {/each}
        </select>
    </div>
    <div class="col-6">
    <h1>{db.FileList[selectedFile].name}</h1>{db.FileList[selectedFile].path}
    </div>
</div>

