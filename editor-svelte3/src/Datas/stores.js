import { writable } from 'svelte/store';
export const st = {
    lastPageIndex:0
}
export const dragDropFiles = writable([]);
export const addFilesSubscribes= writable({});
	 let addFileDrag;
const bindEvents = [
    {name:"Home",dragSupport:false},
    {name:"Add files",dragSupport:true,subscribe:addFilesSubscribes},
    {name:"File structure",dragSupport:false},
    {name:"Test page",dragSupport:false}
];
dragDropFiles.subscribe(value => {
    // console.log("ana bölgede subscribe edildi");
    // console.log("page index :"+st.lastPageIndex);
    // console.log("value : ");
    // console.log(value);
    if(Array.isArray(value) && value.length>0){
        console.log("value is good");
        if(bindEvents[st.lastPageIndex].dragSupport){
            console.log("destek noktasında");
            bindEvents[st.lastPageIndex].subscribe.set({mode:"dragDropFiles",value:value});
        }
    }
});