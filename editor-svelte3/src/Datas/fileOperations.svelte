<script context="module">
import { db,noDb, saveFileListToFromLocalforage } from "../Datas/Datas.svelte";    
export const addFilesToList = (addFiles) => {
        let files = [];
        for (const f of addFiles) {
            let exist = false;
            let path=f.path;
            if(db.project.projectMode){
                const rootPath=noDb.Project.rootPath;
                if (path.substring(0,rootPath.length)==rootPath) {
                    path=path.substring(rootPath.length,path.length);
                }
            }
            for (const item of db.FileList) {
                if (item.path === path) {
                    exist = true;
                    break;
                }
            }
            if (exist) {
                alert("this file is exist.\n" + path);
            } else {
                files = [...files, { path: path, name: f.name ,id:db.Counts.file }];
                db.Counts.file++;
            }
        }
        db.FileList = [...db.FileList, ...files];
        saveFileListToFromLocalforage();
        return db.FileList;
    };
    export const deleteFile = (id) => {
        db.FileList = db.FileList.filter((x) => x.id != id);
        saveFileListToFromLocalforage();
        return db.FileList;
    };
</script>