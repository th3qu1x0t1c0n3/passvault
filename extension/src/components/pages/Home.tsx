import {Route, Routes} from "react-router-dom";
import {IAccount, IApplication} from "../../assets/models/Vault";
import {useEffect, useState} from "react";
import {deleteApplication, getAccountsByApplication, getApplicationsByUrl} from "../../service/VaultService";
import {toast} from "react-toastify";
import PageNotFound from "../utils/PageNotFound";
import AccountList from "../Account/AccountList";
import UpdateAccount from "./UpdateAccount";
import {IUser} from "../../assets/models/Authentication";

interface IHomeProps {
    user: IUser;
}
function Home({user}: IHomeProps) {
    const [application, setApplication] = useState<IApplication>({accounts: [], id: 0, name: "", url: ""});
    const [accounts, setAccounts] = useState<IAccount[]>([]);

    useEffect(() => {
        findApplication();
    }, []);

    function findApplication() {
        const name = window.location.hostname;
        getApplicationsByUrl(name).then((response) => {
            setApplication(response);
            setAccounts(application.accounts);
        }).catch((error) => {
            toast.error(error.response?.data.message);
        });
    }

    function getAccounts() {
        getAccountsByApplication(application.id).then((response) => {
            setAccounts(response);
        }).catch((error) => {
            toast.error(error.response?.data.message);
        })
    }

    function handleDelete(e: any) {
        e.stopPropagation();
        deleteApplication(application.id).then((response) => {
            getAccounts();
            toast.success("Application deleted successfully!");
        }).catch((error) => {
            toast.error(error.response?.data.message);
        })
    }

    return (
        <div>
            <h1 className={"text-4xl"}>App {application.name} at {application.url}</h1>
            <AccountList accounts={accounts} deleteAccount={handleDelete} />
            {/*<Routes>*/}
            {/*    <Route path={"/"} element={<AccountList accounts={accounts} deleteAccount={handleDelete} />}/>*/}
            {/*    <Route path={"/updateAcc"} element={<UpdateAccount user={user}/>}/>*/}
            {/*    <Route path="*" element={<PageNotFound/>}/>*/}
            {/*</Routes>*/}
        </div>
    );
}

export default Home;