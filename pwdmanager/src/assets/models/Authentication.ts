
export interface IUser {
    username: string;
    role: string;
    token: string;
}

export interface IUserProfile {
    username: string;
}

export interface IsignIn {
    username: string;
    password: string;
}

export interface IsignUp {
    username: string;
    password: string;
}