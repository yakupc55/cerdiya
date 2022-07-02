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
    export const commentTypes= [
        {name:"code", id:0},
        {name:"folder", id:1},
        {name:"mod", id:2},
    ];
    export const db = {FileList:[],Situations:[],Counts:{situation:0,comment:0,file:0},Comments:[],project:{version:"v.0.0.1",projectMode:false}};
    export const noDb={Project:{rootPath:'',path:'',name:''},dataStatus:false}

    export const getFileListFromLocalforage = ()=>{
        localforage.getItem('fileList').then(data => {
            if(data){
              //  console.log("kayıt getirme başarılı");
                db.FileList=data;
            }
        });
    }

    const getAllCountsFromLocalforage = ()=>{
        localforage.getItem('Counts').then(data => {
            if(data){
              //  console.log("kayıt getirme başarılı");
              db.Counts=data;
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
    }

    export const changeDbData =(newDb)=>{
        db.Comments=newDb.Comments;
        db.FileList=newDb.FileList;
        db.Situations=newDb.Situations;
        db.Counts=newDb.Counts;
        db.project=newDb.project;
    }

    export const resetDbData =()=>{
        db.Comments=[];
        db.FileList=[];
        db.Situations=[];
        db.Counts.comment=0;
        db.Counts.situation=0;
        db.Counts.file=0;
        saveAllData();
    }
    export const saveAllData= ()=>{
        saveFileListToFromLocalforage();
        saveSituationsToFromLocalforage();
        saveCommentsToFromLocalforage();
        saveProjectDetailToFromLocalforage();
        getAllCountsFromLocalforage();
    }

    export const getAllData = ()=>{
        getFileListFromLocalforage();
        getSituationsFromLocalforage();
        getCommentsFromLocalforage();
        getProjectDetailFromLocalforage();
        getNoDbProjectFromLocalforage();
    }

    export const getNoDbProjectFromLocalforage = ()=>{
        localforage.getItem('noDb').then(data => {
            if(data){
              //  console.log("kayıt getirme başarılı");
                noDb.Project=data;
            }
        });
    }

    export const saveNoDbProjectToFromLocalforage = ()=>{
        localforage.setItem('noDb', noDb.Project).then((x)=> {
       // console.log("kayıt başarılı")
    });
    }

    export const getProjectDetailFromLocalforage = ()=>{
        localforage.getItem('projectDetail').then(data => {
            if(data){
              //  console.log("kayıt getirme başarılı");
                db.project=data;
            }
        });
    }
    
    export const saveAllCountsToFromLocalforage = ()=>{
        localforage.setItem('Counts', db.Counts).then((x)=> {
       // console.log("kayıt başarılı")
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
        saveAllCountsToFromLocalforage();
    } 

    export const saveCommentsToFromLocalforage = ()=>{
        localforage.setItem('comments', db.Comments).then((x)=> {
        //console.log("comments kayırları başarılı")
        });
        saveAllCountsToFromLocalforage();
    }
    
    const changeRootFilesFunc= (mode)=>{
        // console.log("------------");
        // console.log("değiştirme yapısına girildi");
        // console.log("değiştirilme öncesi dosyalar");
        // console.log(db.FileList);
        // console.log("noDb : ");
        // console.log(noDb);
        if(noDb.Project.path.length>1){
            // console.log("buraya giriyor başarılı bir şekilde");
            const rootPath=noDb.Project.rootPath;
            if(mode){
                for (let i = 0; i < db.FileList.length; i++) {
                    console.log("db.FileList[i].path.substring(0,rootPath.length) :");
                    console.log(db.FileList[i].path.substring(0,rootPath.length));
                    if(db.FileList[i].path.substring(0,rootPath.length)==rootPath){
                        // console.log("db.FileList[i].path.substring(rootPath.length,db.FileList[i].path.length) :");
                        // console.log(db.FileList[i].path.substring(rootPath.length,db.FileList[i].path.length));
                        db.FileList[i].path= db.FileList[i].path.substring(rootPath.length,db.FileList[i].path.length);
                    }
                }
            }
            else{
                for (let i = 0; i < db.FileList.length; i++) {
                    const search=db.FileList[i].path.search(":");
                    if(search==-1){
                        db.FileList[i].path=rootPath+db.FileList[i].path;
                    }
                }
            }
            saveFileListToFromLocalforage();
        }
        console.log("değiştirilme sonrası dosyalar");
        console.log(db.FileList);
        console.log("------------");
    }
    export const changeRootFiles =(mode)=>{
        localforage.getItem('projectDetail').then(data => {
            if(data){
                // console.log("local forage çağırıldı");
                // console.log("data :");
                // console.log(data);
                // console.log("mode :");
                // console.log(mode);
              if(data.projectMode!=mode)
                changeRootFilesFunc(mode);
            }
        });
        
    }
</script>
<script>
    import { onMount,onDestroy } from 'svelte';
    onMount( () => {
        setTimeout(() => {
            getAllData();
            noDb.dataStatus=true;
        }, 100);
	});
	onDestroy(() => {
		saveFileListToFromLocalforage();
    });
</script>