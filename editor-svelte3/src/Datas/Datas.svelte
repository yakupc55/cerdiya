<script context="module">
	import Situations from './../pages/Situations.svelte';
    export const db = {FileList:[],Situations:[],stCount:0};
    export const getFileListFromLocalforage = ()=>{
        localforage.getItem('fileList').then(data => {
            if(data){
              //  console.log("kayıt getirme başarılı");
                db.FileList=data;
            }
        });
    }
    export const getSituationsFromLocalforage = ()=>{
        localforage.getItem('situations').then(data => {
            if(data){
              //  console.log("kayıt getirme başarılı");
                db.Situations=data;
            }
        });
        localforage.getItem('situationsCount').then(data => {
            if(data){
              //  console.log("kayıt getirme başarılı");
              db.stCount=data;
            }
        });
    }
    export const saveFileListToFromLocalforage = ()=>{
        localforage.setItem('fileList', db.FileList).then((x)=> {
       // console.log("kayıt başarılı")
    });
    } 
    export const saveSituationsToFromLocalforage = ()=>{
        localforage.setItem('situations', db.Situations).then((x)=> {
       // console.log("kayıt başarılı")
    });
        localforage.setItem('situationsCount', db.stCount).then((x)=> {
       // console.log("kayıt başarılı")
    });
    } 
</script>
<script>
    import { onMount,onDestroy } from 'svelte';
    onMount( () => {
        setTimeout(() => {
            getFileListFromLocalforage();
            getSituationsFromLocalforage();
        }, 100);
	});
	onDestroy(() => {
		saveFileListToFromLocalforage();
    });
</script>