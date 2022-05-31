<script>
    import FileStructure from './pages/FileStructure.svelte';
	import Home from './pages/Home.svelte';
	import AddFile from './pages/AddFile.svelte';
    import TestPage from './pages/TestPage.svelte';
    import {st} from "./Datas/stores";
    
    const ccolor="bg-secondary active";
	let currentPageComponent=Home;

	const pages =[
			{name:"Home", component:Home, active:true,ccolor:ccolor},
			{name:"Add files", component:AddFile, active:false,ccolor:""},
			{name:"File structure", component:FileStructure,active:false,ccolor:""},
			{name:"Test page", component:TestPage,active:false,ccolor:""}
		];
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