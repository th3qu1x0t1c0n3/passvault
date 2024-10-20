// import {cacheNames as chrome} from "workbox-core/src";
// import {signIn} from "../src/service/UserService";
//
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === 'fetchLogin') {
//         Call your Java Spring API to get the login info
        // signIn(request.url).then((login) => {
        //     sendResponse({ username: login.username, password: login.password });
        // });
    // }
// });
chrome.action.onClicked.addListener((tab) => {
    console.log("Action button clicked."); // Print a message in the console
    // Query to get the current active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const activeTab = tabs[0]; // Get the active tab object
            console.log("Current Tab URL:", activeTab.url); // Print the URL in the console
        } else {
            console.log("No active tab found.");
        }
    });
});

function getCurrentTabUrl() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab) {
            console.log('Current Tab URL:', currentTab.url);
            return currentTab.url;
        }
    });
}

getCurrentTabUrl();
