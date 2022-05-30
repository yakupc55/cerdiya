<script>
    import { dragDropFiles } from './../Datas/stores.js';
    document.addEventListener("drop", (event) => {
        let _files = [];
        event.preventDefault();
        event.stopPropagation();
        for (const f of event.dataTransfer.files) {
            _files.push({ name: f.name, path: f.path });
        }
     //  console.log(_files);
       dragDropFiles.set(_files);
    });

    document.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    document.addEventListener("dragenter", (event) => {
      //  console.log("File is in the Drop Space");
    });

    document.addEventListener("dragleave", (event) => {
       // console.log("File has left the Drop Space");
    });
</script>