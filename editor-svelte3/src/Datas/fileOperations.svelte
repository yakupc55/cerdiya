<script context="module">
import { db, saveFileListToFromLocalforage } from "../Datas/Datas.svelte";    
export const addFilesToList = (addFiles) => {
        let files = [];
        for (const f of addFiles) {
            let exist = false;
            for (const item of db.FileList) {
                if (item.path === f.path) {
                    exist = true;
                    break;
                }
            }
            if (exist) {
                alert("this file is exist.\n" + f.path);
            } else {
                files = [...files, { path: f.path, name: f.name }];
            }
        }
        db.FileList = [...db.FileList, ...files];
        saveFileListToFromLocalforage();
        return db.FileList;
    };
    export const deleteFile = (path) => {
        db.FileList = db.FileList.filter((x) => x.path != path);
        saveFileListToFromLocalforage();
        return db.FileList;
    };
</script>