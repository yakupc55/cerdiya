<script>
    import { onMount,onDestroy } from 'svelte';
    import { someValue } from './TestModule.svelte'  
    export let FileList = [];
    let isAnythingChange=false;
    onMount(async () => {
        localforage.getItem('fileList').then(data => {
            if(data){
                console.log("kayıt getirme başarılı");
                FileList=data;
            }
        });
	});
    onDestroy(() => {
        if(isAnythingChange){
        localforage.setItem('fileList', FileList).then((x)=> console.log("kayıt başarılı"));
        }
    });
</script>
{someValue.name}
<h1>Structure page</h1>
    