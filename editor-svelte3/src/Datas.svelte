<script context="module">
    export const db = {FileList:[]};
    export const getFileListFromLocalforage = ()=>{
        localforage.getItem('fileList').then(data => {
            if(data){
                console.log("kayıt getirme başarılı");
                db.FileList=data;
            }
        });
    }
    
    export const saveFileListToFromLocalforage = ()=>{
        localforage.setItem('fileList', db.FileList).then((x)=> console.log("kayıt başarılı"));
    } 
</script>
<script>
    import { onMount,onDestroy } from 'svelte';
    onMount( () => {
        setTimeout(() => {
            getFileListFromLocalforage();
        }, 100);
	});
	onDestroy(() => {
		saveFileListToFromLocalforage();
    });
</script>