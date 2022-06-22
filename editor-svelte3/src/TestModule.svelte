<script>
	import 'codemirror/mode/javascript/javascript'

	import {onMount} from 'svelte'
import CodeMirror from './uiComponent/CodeMirror.svelte';
	const code = `function test() {\n  return 42\n}`
	const options = {
		mode: "javascript",
		lineNumbers: true,
		value: code
	}
	let editor
	let cursor_activity = false
	onMount(()=>{
		console.log("Editor: ", editor)
	})
	
	function cursorMoved(event) {
		cursor_activity = true
		console.log('cursor activity')
		// console.log(event.detail)
		
	}
	
	function changed(event) {
		console.log('changed')
		// console.log(event.detail)
	}
	
</script>

<CodeMirror on:activity={cursorMoved} on:change={changed} bind:editor {options} class="editor"/>
<p>
	Cursor Activity: {cursor_activity}
</p>
<div>
	<button on:click={() => editor.execCommand('selectAll')}>
		Select All
	</button>	
	
	<button on:click={() => editor.setCursor(0)}>
		Cursor at Start
	</button>	

	<button on:click={() => editor.setCursor(editor.getValue().length)}>
		Cursor at End
	</button>	

</div>


<style>
	:global(.editor) {
		font-size: 1.2rem;
	}
</style>