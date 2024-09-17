import {IApplication} from "../../assets/models/Vault";
import React, {useEffect, useState} from "react";
import {VaultService} from "../../services/VaultService";
import {toast} from "react-toastify";
import AppList from "../Application/AppList";
import {Route, Routes} from "react-router-dom";
import PageNotFound from "../utils/PageNotFound";
import EncryptionDecryption from "../EncryptionDecryption";

function Home() {
    const vaultService = new VaultService();
    const [applications, setApplications] = useState<IApplication[]>([]);

    useEffect(() => {
        vaultService.getAllApplications().then((response) => {
            setApplications(response);
        }).catch((error) => {
            toast.error(error.response?.data.message);
        })
    }, []);

    return (
        <div>
            <h1 className={"text-5xl"}>Home page</h1>

            <Routes>
                <Route path={"/"} element={<AppList applications={applications} />} />
                <Route path={"/ende"} element={<EncryptionDecryption />} />
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    )
}

export default Home;