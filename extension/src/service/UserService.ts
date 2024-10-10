import {PwdmanagerServerInstance} from "../App";
import {IsignIn} from "../assets/models/Authentication";


export async function signIn(signin: IsignIn) {
    return PwdmanagerServerInstance.post(`/user/signin`, signin).then((response) => {
        return response.data;
    });
}

export async function getMe() {
    return PwdmanagerServerInstance.get(`/user/me`).then((response) => {
        return response.data;
    });
}
