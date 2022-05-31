<script>
    import {flip} from 'svelte/animate';
    import { db, saveFileListToFromLocalforage } from "../Datas/Datas.svelte";
    
    let hovering = false;
  
    const drop = (event, target) => {
      event.dataTransfer.dropEffect = 'move'; 
      const start = parseInt(event.dataTransfer.getData("text/plain"));
      const newTracklist = db.FileList;
  
      if (start < target) {
        newTracklist.splice(target + 1, 0, newTracklist[start]);
        newTracklist.splice(start, 1);
      } else {
        newTracklist.splice(target, 0, newTracklist[start]);
        newTracklist.splice(start + 1, 1);
      }
      db.FileList = newTracklist;
      hovering = null;
      saveFileListToFromLocalforage();
    }
  
    const dragstart = (event, i) => {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.dropEffect = 'move';
      const start = i;
      event.dataTransfer.setData('text/plain', start);
    }
  
  </script>
  
  <div class="list">
    {#each db.FileList as n, index  (n.name)}
      <div
               class="list-item" 
         animate:flip
         draggable={true} 
         on:dragstart={event => dragstart(event, index)}
         on:drop|preventDefault={event => drop(event, index)}
         ondragover="return false"
         on:dragenter={() => hovering = index}
         class:is-active={hovering === index}>
         {n.name}	
      </div>
    {/each}
  </div>
