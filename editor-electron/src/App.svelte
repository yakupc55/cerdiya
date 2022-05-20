<script>
import AddFile from './AddFile.svelte';
import { Router, Route, Link } from "svelte-routing";

export let url = "";
</script>

<head>
	<link rel='stylesheet' href='vendor/bootstrap/css/bootstrap.min.css'>
<script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
</head>
<Router url="{url}">
<nav class="navbar navbar-expand-lg navbar-light bg-light">
	<a class="navbar-brand" href="#">Cerdiya</a>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
	  <span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
	  <div class="navbar-nav">
		<Link to="addFile" class="nav-item nav-link active" href="#">Add file </Link>
		
		<a class="nav-item nav-link" href="#">page 1</a>
		<a class="nav-item nav-link" href="#">Page 2</a>
	  </div>
	</div>
</nav>
<div>
    <Route path="addFile" component="{AddFile}" />
</div>

</Router>