import { writable } from 'svelte/store';
export const st = {
    lastPageIndex: 0
}
export const dragDropFiles = writable([]);
export const sentToMainParent = writable({});

export const addFilesSubscribes = writable({});
let addFileDrag;
const bindEvents = [
    { name: "Home", dragSupport: false, sendParentSupport: false },
    { name: "Add files", dragSupport: true, subscribe: addFilesSubscribes, sendParentSupport: true },
    { name: "File structure", dragSupport: false, sendParentSupport: false },
    { name: "Situations", dragSupport: false, sendParentSupport: false },
    { name: "Comments", dragSupport: false, sendParentSupport: false },
    { name: "Test page", dragSupport: false, sendParentSupport: false }
];
dragDropFiles.subscribe(value => {
    // console.log("value : ");
    // console.log(value);
    if (Array.isArray(value) && value.length > 0) {
        // console.log("value is good");
        if (bindEvents[st.lastPageIndex].dragSupport) {
            //  console.log("it is at the support");
            bindEvents[st.lastPageIndex].subscribe.set({ mode: "dragDropFiles", value: value });
        }
    }
});

sentToMainParent.subscribe(value => {
    if (bindEvents[st.lastPageIndex].dragSupport) {
        //  console.log("send to main is active");
        //  console.log(value);
        bindEvents[st.sendParentSupport].subscribe.set({ mode: value.mode, value: value.data });
    }
});