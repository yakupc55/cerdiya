<script context="module">
   export const _dropList = (event, target,list,callback) => {
      event.dataTransfer.dropEffect = 'move'; 
      const start = parseInt(event.dataTransfer.getData("text/plain"));
      const newTracklist = list;
  
      if (start < target) {
        newTracklist.splice(target + 1, 0, newTracklist[start]);
        newTracklist.splice(start, 1);
      } else {
        newTracklist.splice(target, 0, newTracklist[start]);
        newTracklist.splice(start + 1, 1);
      }
      list = newTracklist;
      callback();
      return list;
    }
  
  export  const _dragstartList = (event, i) => {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.dropEffect = 'move';
      const start = i;
      event.dataTransfer.setData('text/plain', start);
    }
</script>