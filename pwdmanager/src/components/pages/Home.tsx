import {IApplication} from "../../assets/models/Vault";
import React, {useEffect, useState} from "react";
import {VaultService} from "../../services/VaultService";
import {toast} from "react-toastify";
import AppList from "../Application/AppList";
import {Route, Routes, useNavigate} from "react-router-dom";
import PageNotFound from "../utils/PageNotFound";
import Button from "../utils/Button";
import NewRecord from "./NewRecord";
import UpdateAccount from "./UpdateAccount";
import UpdateApp from "./UpdateApp";
import {IUser} from "../../assets/models/Authentication";
import {IFilters} from "../../assets/models/Form";

interface IHomeProps {
    user: IUser;
}

function Home({user}: IHomeProps) {
    const vaultService = new VaultService();
    const navigate = useNavigate();
    const [applications, setApplications] = useState<IApplication[]>([]);

    useEffect(() => {
        getAllApplications()
    }, [navigate]);

    function getAllApplications() {
        vaultService.getAllApplications().then((response) => {
            setApplications(response.sort((a: IApplication, b: IApplication) => a.name.localeCompare(b.name)));
        }).catch((error) => {
            toast.error(error.response?.data.message);
        })
    }

    return (
        <div>
            <div className={"grid grid-cols-2 gap-2 w-1/4 mx-auto mt-4"}>
                <Button text={"Home"} type={"button"} onClick={() => {
                    getAllApplications();
                    navigate('/u/');
                }}/>
                <Button text={"New Record"} type={"button"} onClick={() => navigate('/u/new')}/>
            </div>
            <Routes>
                <Route path={"/"} element={<AppList applications={applications} getAllApplications={getAllApplications}
                                                    user={user}/> }/>
                <Route path={"/new"}
                       element={<NewRecord getAllApplications={getAllApplications} applications={applications}
                                           user={user}/>}/>
                {/*<Route path={"/updateApp"} element={<EncryptionDecryption />} />*/}
                <Route path={"/updateApp"} element={<UpdateApp/>}/>
                <Route path={"/updateAcc"} element={<UpdateAccount user={user}/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    )
}

export default Home;