<script>
	import FileStructure from './FileStructure.svelte';
	import Home from './Home.svelte';
	import AddFile from './AddFile.svelte';
	import { Router, Route, Link,navigate } from "svelte-routing";
	import { onMount } from 'svelte';

	export let url = "";
	let FileList= [];
	const basepath = /^\/?[a-zA-Z]+:/.test(window.location.pathname)
    ? window.location.pathname.substr(0, window.location.pathname.indexOf(":") + 1)
    : "/"

	onMount(async () => {
		navigate("/", { replace: true });
		console.log(document.location);
		if (!('indexedDB' in window)) {
  			console.log('This browser doesn\'t support IndexedDB');
		}
		else{
			console.log("this browser supports IndexedDB");
		}
	});
	</script>
	
	<head>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
	</head>
	<Router url="{url}" basepath={basepath}>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<Link to="/" class="navbar-brand" >Cerdiya</Link>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
		  <span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
		  <div class="navbar-nav">
			<Link to="addFile" class="nav-item nav-link active" >Add file </Link>
			<Link to="fileStructure" class="nav-item nav-link active" >file structure </Link>
		  </div>
		</div>
	</nav>
	<div>
		<Route path="addFile" ><AddFile  /></Route>
		<Route path="fileStructure" component="{FileStructure}" />
		<Route path="/"><Home /></Route>
	</div>
	
	</Router>