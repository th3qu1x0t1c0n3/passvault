export interface IApplication{
    id: number;
    name: string;
    url: string;
    accounts: IAccount[];
}
export interface IAccount {
    id: number;
    applicationId: number;
    email: string;
    username: string;
    password: string;
}
