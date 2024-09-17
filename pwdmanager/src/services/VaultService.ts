import {PwdmanagerServerInstance} from "../App";
import {IAccount, IApplication} from "../assets/models/Vault";

export class VaultService{
    // Applications
    async createApplication(app: IApplication) {
        return PwdmanagerServerInstance.post(`/apps/create`, app).then((response) => {
            return response.data;
        });
    }
    async getAllApplications() {
        return PwdmanagerServerInstance.get(`/apps/all`).then((response) => {
            return response.data;
        });
    }
    async getApplication(appId: string) {
        return PwdmanagerServerInstance.get(`/apps?id=${appId}`).then((response) => {
            return response.data;
        });
    }
    async updateApplication(app: IApplication) {
        return PwdmanagerServerInstance.put(`/apps/update`, app).then((response) => {
            return response.data;
        });
    }
    async deleteApplication(appId: string) {
        return PwdmanagerServerInstance.delete(`/apps/delete?id=${appId}`).then((response) => {
            return response.data;
        });
    }
//     Accounts
    async createAccount(account: IAccount) {
        return PwdmanagerServerInstance.post(`/account/add`, account).then((response) => {
            return response.data;
        });
    }
    async getAccount() {
        return PwdmanagerServerInstance.get(`/account/all`).then((response) => {
            return response.data;
        });
    }
    async updateAccount(account: IAccount) {
        return PwdmanagerServerInstance.put(`/account/update`, account).then((response) => {
            return response.data;
        });
    }
    async deleteAccount(appId: string, accountId: string) {
        return PwdmanagerServerInstance.delete(`/account/delete?id=${accountId}`).then((response) => {
            return response.data;
        });
    }
}