<script>
	import Datas from './Datas/Datas.svelte';
	import FileStructure from './FileStructure.svelte';
	import Home from './Home.svelte';
	import AddFile from './AddFile.svelte';
	import { onMount } from 'svelte';
	import TestPage from './TestPage.svelte';
    import DragDropEvent from "./tools/DragDropEvent.svelte";
	import {dragDropFiles,st} from "./Datas/stores";

	const ccolor="bg-secondary active";
	let currentPageComponent=Home;
	// let addFileDrag;
	// const bindEvents = [
	// 		{name:"Home",dragSupport:false},
	// 		{name:"Add files",dragSupport:true,dragFunction:addFileDrag},
	// 		{name:"File structure",dragSupport:false},
	// 		{name:"Test page",dragSupport:false}
	// ];
	// files.subscribe(value => {
	// 	console.log("subscribe yapıldı");
	// 	if(bindEvents[st.lastPageIndex].dragSupport){
	// 		console.log("destekleyene dek gelindi");
	// 	}
	// });
	const pages =[
			{name:"Home", component:Home, active:true,ccolor:ccolor},
			{name:"Add files", component:AddFile, active:false,ccolor:""},
			{name:"File structure", component:FileStructure,active:false,ccolor:""},
			{name:"Test page", component:TestPage,active:false,ccolor:""}
		];

		
	onMount(async () => {
		//console.log(document.location);
	});

	const changePage= (index)=>{
		if(index !=st.lastPageIndex){
			currentPageComponent=pages[index].component;
			pages[index].active = true;
			pages[index].ccolor = ccolor;

			pages[st.lastPageIndex].active = false;
			pages[st.lastPageIndex].ccolor = "";	
			
			st.lastPageIndex=index;
		}
	}
</script>

<svelte:head>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
	<script src="build/localforage.min.js"></script>
</svelte:head>
<Datas />
<DragDropEvent />
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
	<div to="/" class="navbar-brand" >Cerdiya</div>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
		<div class="navbar-nav">
		{#each pages as {name,ccolor},i}
		<div on:click={()=>changePage(i)} to="testPage" class="nav-item nav-link {ccolor}">{name} </div>	
		{/each}
		</div>
	</div>
</nav>

<svelte:component this={currentPageComponent}/>

		