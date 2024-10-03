import {PwdmanagerServerInstance} from "../App";
import {IAccount, IApplication} from "../assets/models/Vault";

// Applications
export async function createApplication(app: IApplication) {
    return PwdmanagerServerInstance.post(`/apps/create`, app).then((response) => {
        return response.data;
    });
}
export async function getAllApplications() {
    return PwdmanagerServerInstance.get(`/apps/all`).then((response) => {
        return response.data;
    });
}
export async function getApplication(appId: string) {
    return PwdmanagerServerInstance.get(`/apps?id=${appId}`).then((response) => {
        return response.data;
    });
}
export async function updateApplication(app: IApplication) {
    return PwdmanagerServerInstance.put(`/apps/update`, app).then((response) => {
        return response.data;
    });
}
export async function deleteApplication(appId: number) {
    return PwdmanagerServerInstance.delete(`/apps/delete?id=${appId}`).then((response) => {
        return response.data;
    });
}

//     Accounts
export async function createAccount(account: IAccount) {
    return PwdmanagerServerInstance.post(`/account/add`, account).then((response) => {
        return response.data;
    });
}
export async function getAccountsByApplication(appId: string) {
    return PwdmanagerServerInstance.get(`/account/all?id=${appId}`).then((response) => {
        return response.data;
    });
}
export async function getAccountById(accId: string) {
    return PwdmanagerServerInstance.get(`/account?id=${accId}`).then((response) => {
        return response.data;
    });
}
export async function updateAccount(account: IAccount) {
    return PwdmanagerServerInstance.put(`/account/update`, account).then((response) => {
        return response.data;
    });
}
export async function deleteAccount(accountId: number) {
    return PwdmanagerServerInstance.delete(`/account/delete?id=${accountId}`).then((response) => {
        return response.data;
    });
}

