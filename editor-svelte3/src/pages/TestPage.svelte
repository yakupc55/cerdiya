<script>
  import Select from 'svelte-select';
  import { onMount } from 'svelte';
  import {db} from '../Datas/Datas.svelte';
  
  let listIndex = -1;
  $:tags_for_select = db.FileList.map(b => ({'label': b.name, 'value': b.path}));
  $:list2 = getList();
  onMount(async () => {
     
  });

  let value = {value: 'cake', label: 'Cake'};
  
  //a function find index of array by path in db.FileList
  const findIndexByPath=(path)=>{
      for(let i=0;i<db.FileList.length;i++){
          if(db.FileList[i].path==path){
              return i;
          }
      }
  }

  function handleSelect(event) {
   let path= event.detail.value;
   listIndex = findIndexByPath(path);
   console.log(listIndex);
   list2 = getList();
  //  $list2=db.FileList[index].Structure.filter(b => b.isCode==false).map(b => ({'label': b.value, 'value': b.id}));
    // .. do something here 🙂
  }

  function getList(){
    if(listIndex>=0){
      return db.FileList[listIndex].Structure.filter(b => b.isCode==false).map(b => ({'label': b.value, 'value': b.id}));
    }
    else{
      return [];
    }
  }
</script>

<Select
items={tags_for_select}
 on:select={handleSelect}></Select>
<Select
items={list2}
></Select>