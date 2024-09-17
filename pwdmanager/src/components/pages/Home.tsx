import {IApplication} from "../../assets/models/Vault";
import {useEffect, useState} from "react";
import {VaultService} from "../../services/VaultService";
import {toast} from "react-toastify";
import AppList from "../Application/AppList";

function Home() {
    const vaultService = new VaultService();
    const [applications, setApplications] = useState<IApplication[]>([]);

    useEffect(() => {
        vaultService.getAllApplications().then((response) => {
            setApplications(response);
            console.log(response);
        }).catch((error) => {
            toast.error(error.response?.data.message);
        })
    }, []);

    return (
        <div>
            <h1 className={"text-5xl"}>Home page</h1>

            <AppList applications={applications} />
        </div>
    )
}

export default Home;