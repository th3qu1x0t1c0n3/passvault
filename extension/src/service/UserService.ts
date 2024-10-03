import {PwdmanagerServerInstance} from "../App";
import {IsignIn, IsignUp} from "../assets/models/Authentication";


export async function signIn(signin: IsignIn) {
    return PwdmanagerServerInstance.post(`/user/signin`, signin).then((response) => {
        return response.data;
    });
}

export async function signUp(signup: IsignUp) {
    return PwdmanagerServerInstance.post(`/user/signup`, signup).then((response) => {
        return response.data;
    });
}

export async function getMe() {
    return PwdmanagerServerInstance.get(`/user/me`).then((response) => {
        return response.data;
    });
}

export async function changePwd() {
    return PwdmanagerServerInstance.post(`/user/pwd`).then((response) => {
        return response.data;
    });
}