import {PwdmanagerServerInstance} from "../App";
import {IsignIn, IsignUp} from "../assets/models/Authentication";

export class UserService {

    async signIn(signin: IsignIn) {
        return PwdmanagerServerInstance.post(`/user/signin`, signin).then((response) => {
            return response.data;
        });
    }

    async signUp(signup: IsignUp) {
        return PwdmanagerServerInstance.post(`/user/signup`, signup).then((response) => {
            return response.data;
        });
    }

    async getMe() {
        return PwdmanagerServerInstance.get(`/user/me`).then((response) => {
            return response.data;
        });
    }

    async changePwd() {
        return PwdmanagerServerInstance.post(`/user/pwd`).then((response) => {
            return response.data;
        });
    }
}