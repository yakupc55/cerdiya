import { writable } from 'svelte/store';
export const st = {
    lastPageIndex: 0
}
export const dragDropFiles = writable([]);
export const sentToMainParent = writable({});

export const addFilesSubscribes = writable({});
export const homeSubscribes = writable({});
let addFileDrag;
const bindEvents = [
    { name: "Home", dragSupport: true,subscribe: homeSubscribes, sendParentSupport: true },
    { name: "Add files", dragSupport: true, subscribe: addFilesSubscribes, sendParentSupport: true },
    { name: "File structure", dragSupport: false, sendParentSupport: false },
    { name: "Situations", dragSupport: false, sendParentSupport: false },
    { name: "Comments", dragSupport: false, sendParentSupport: false },
    { name: "Variables", dragSupport: false, sendParentSupport: false },
    { name: "Modes", dragSupport: false, sendParentSupport: false },
    { name: "Test page", dragSupport: false, sendParentSupport: false }
];
dragDropFiles.subscribe(value => {
     console.log("value : ");
     console.log(value);
     console.log("st.lastPageIndex :");
     console.log(st.lastPageIndex);
    if (Array.isArray(value) && value.length > 0) {
         console.log("value is good");
        if (bindEvents[st.lastPageIndex].dragSupport) {
              //console.log("it is at the support");
            bindEvents[st.lastPageIndex].subscribe.set({ mode: "dragDropFiles", value: value });
        }
    }
});

sentToMainParent.subscribe(value => {
    //console.log(st.lastPageIndex);
    if (bindEvents[st.lastPageIndex].dragSupport) {
        //  console.log("send to main is active");
        //  console.log(value);
        bindEvents[st.lastPageIndex].subscribe.set({ mode: value.mode, value: value.data });
    }
});