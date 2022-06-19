<script context="module">
	import { defaults } from './../../node_modules/codemirror/src/edit/options.js';
    let testComments =[
        // {comment: "test1",description:"test1",code:"code1",isActive:false,id:0},
        // {comment: "test2",description:"test2",code:"code2",isActive:false,id:1},
        // {comment: "test3",description:"test3",code:"code3",isActive:false,id:2},
        // {comment: "test4",description:"test4",code:"code4",isActive:false,id:3},
        // {comment: "test5",description:"test5",code:"code5",isActive:false,id:4},
        // {comment: "test6",description:"test6",code:"code6",isActive:false,id:5},
        // {comment: "test7",description:"test7",code:"code7",isActive:false,id:6},
        // {comment: "test8",description:"test8",code:"code8",isActive:false,id:7},
        // {comment: "test9",description:"test9",code:"code9",isActive:false,id:8},
        // {comment: "test10",description:"test10",code:"code10",isActive:false,id:9},
        // {comment: "test11",description:"test11",code:"code11",isActive:false,id:10},
        // {comment: "test12",description:"test12",code:"code12",isActive:false,id:11}
    ]
    export const db = {FileList:[],Situations:[],stCount:0,cmCount:0,Comments:[],project:{version:"v.0.0.1",projectMode:false},dataStatus:false};
    export const getFileListFromLocalforage = ()=>{
        localforage.getItem('fileList').then(data => {
            if(data){
              //  console.log("kayıt getirme başarılı");
                db.FileList=data;
            }
        });
    }
    export const getSituationsFromLocalforage = ()=>{
        localforage.getItem('situations').then(data => {
            if(data){
              //  console.log("kayıt getirme başarılı");
                db.Situations=data;
            }
        });
        localforage.getItem('situationsCount').then(data => {
            if(data){
              //  console.log("kayıt getirme başarılı");
              db.stCount=data;
            }
        });
    }

    export const changeDbData =(newDb)=>{
        db.Comments=newDb.Comments;
        db.FileList=newDb.FileList;
        db.Situations=newDb.Situations;
        db.cmCount=newDb.cmCount;
        db.stCount=newDb.stCount;
        db.project={version:"v.0.0.1",projectMode:false};
    }

    export const resetDbData =()=>{
        db.Comments=[];
        db.FileList=[];
        db.Situations=[];
        db.cmCount=0;
        db.stCount=0;
        saveAllData();
    }
    export const saveAllData= ()=>{
        saveFileListToFromLocalforage();
        saveSituationsToFromLocalforage();
        saveCommentsToFromLocalforage();
        saveProjectDetailToFromLocalforage();
    }

    export const getAllData = ()=>{
        getFileListFromLocalforage();
        getSituationsFromLocalforage();
        getCommentsFromLocalforage();
        getProjectDetailFromLocalforage();
    }

    export const getProjectDetailFromLocalforage = ()=>{
        localforage.getItem('projectDetail').then(data => {
            if(data){
              //  console.log("kayıt getirme başarılı");
                db.project=data;
            }
        });
    }

    export const saveProjectDetailToFromLocalforage = ()=>{
        localforage.setItem('projectDetail', db.project).then((x)=> {
       // console.log("kayıt başarılı")
    });
    } 

    export const getCommentsFromLocalforage = ()=>{
        localforage.getItem('comments').then(data => {
            if(data){
              //  console.log("kayıt getirme başarılı");
                db.Comments=data;
            }
        });
        localforage.getItem('commentsCount').then(data => {
            if(data){
              //  console.log("kayıt getirme başarılı");
              db.cmCount=data;
            }
        });
    }
    export const saveFileListToFromLocalforage = ()=>{
        localforage.setItem('fileList', db.FileList).then((x)=> {
       // console.log("kayıt başarılı")
    });
    } 
    export const saveSituationsToFromLocalforage = ()=>{
        localforage.setItem('situations', db.Situations).then((x)=> {
       // console.log("kayıt başarılı")
    });
        localforage.setItem('situationsCount', db.stCount).then((x)=> {
       // console.log("kayıt başarılı")
    });
    } 
    export const saveCommentsToFromLocalforage = ()=>{
        localforage.setItem('comments', db.Comments).then((x)=> {
        //console.log("comments kayırları başarılı")
    });
        localforage.setItem('commentsCount', db.cmCount).then((x)=> {
        //console.log("comment count kaydı başarılı");
    });
    } 
</script>
<script>
    import { onMount,onDestroy } from 'svelte';
    onMount( () => {
        setTimeout(() => {
            getAllData();
            db.dataStatus=true;
        }, 100);
	});
	onDestroy(() => {
		saveFileListToFromLocalforage();
    });
</script>