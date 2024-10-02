import {cacheNames as chrome} from "workbox-core/src";
import {UserService} from "../service/UserService";

const userService = new UserService();
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fetchLogin') {
        // Call your Java Spring API to get the login info
        userService.signIn(request.url).then((login) => {
            sendResponse({ username: login.username, password: login.password });
        });
    }
});
