import {useEffect, useState} from "react";
import {VaultService} from "../../services/VaultService";
import {IApplication} from "../../assets/models/Vault";
import {toast} from "react-toastify";
import FormInput, {IButton} from "../../assets/models/Form";
import Form from "../utils/Form";
import {useNavigate} from "react-router-dom";

function UpdateApp() {
    const vaultService = new VaultService();
    const navigate = useNavigate();
    const [originalApp, setOriginalApp] = useState<IApplication | null>(null);
    const [appForm, setAppForm] = useState<IApplication>({
        id: 0, name: "", url: "", accounts: []
    });
    const [appFormInfo, setAppFromInfo] = useState([
        new FormInput('name', 'text', 'Name', ''),
        new FormInput('url', 'text', 'URL', '')
    ])
    const appButton: IButton[] = [
        {
            text: 'Create application',
            type: 'submit'
        },
        {
            text: 'Reset',
            type: 'reset'
        }
    ]


    useEffect(() => {
        let urlParams = new URLSearchParams(window.location.search);
        let idApp = urlParams.get('idApp');
        while (idApp === null) {
            urlParams = new URLSearchParams(window.location.search);
            idApp = urlParams.get('idApp');
        }

        vaultService.getApplication(idApp as string).then((response) => {
            setOriginalApp(response);
            setAppForm(response);
        }).catch((error) => {
            toast.error(error.response?.data.message);
        });

    }, []);

    function handleSubmit(e: any) {
        e.preventDefault();
        vaultService.updateApplication(appForm).then(response => {
            navigate('/u/');
            toast.success("Application updated successfully!");
        }).catch(error => {
            toast.error(error.response?.data.message);
        })
    }

    function handleChange(e: any) {
        setAppFromInfo(appFormInfo.map((formInfo) => {
            if (formInfo.name === e.target.id)
                formInfo.warning = '';
            return formInfo;
        }))

        setAppForm({...appForm, [e.target.id]: e.target.value})
    }

    return (
        <div>
            <h1>Update Application</h1>

            <Form formInputs={appFormInfo} handleSubmit={handleSubmit} handleChange={handleChange} buttons={appButton}/>
        </div>
    )
}

export default UpdateApp;