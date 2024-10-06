import {Routes} from "react-router-dom";
import {IAccount, IApplication} from "../../assets/models/Vault";
import {useEffect, useState} from "react";
import {getAccountsByApplication, getApplicationsByUrl} from "../../service/VaultService";
import {toast} from "react-toastify";

function Home() {
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

    return (
        <div>
            <div>Home route</div>
            <Routes>
                {/*<Route path={"/"} element={<AppList applications={applications} getAllApplications={getAllApplications}
                                                    user={user}/> }/>*/}
                {/*<Route path={"/new"}
                       element={<NewRecord getAllApplications={getAllApplications} applications={applications}
                                           user={user}/>}/>*/}
                {/*<Route path={"/updateApp"} element={<UpdateApp/>}/>*/}
                {/*<Route path={"/updateAcc"} element={<UpdateAccount user={user}/>}/>*/}
                {/*<Route path="*" element={<PageNotFound/>}/>*/}

            </Routes>
        </div>
    );
}

export default Home;