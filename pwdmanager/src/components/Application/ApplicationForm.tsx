import {useState} from "react";
import FormInput, {IButton} from "../../assets/models/Form";
import Form from "../utils/Form";
import {VaultService} from "../../services/VaultService";
import {toast} from "react-toastify";
import {IApplication} from "../../assets/models/Vault";

interface IApplicationFormProps {
    getAllApplications: () => void;
}
function ApplicationForm({getAllApplications}: IApplicationFormProps) {
    const vaultService = new VaultService();
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

    function handleSubmit(e: any) {
        e.preventDefault();
        vaultService.createApplication(appForm).then(response => {
            setAppForm({id: 0, name: "", url: "", accounts: []});
            e.target.reset();
            toast.success("Application created successfully!");
            getAllApplications();
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
            <h1>Application Form</h1>
            <Form formInputs={appFormInfo} handleSubmit={handleSubmit} handleChange={handleChange} buttons={appButton} fieldForm={appForm}/>
        </div>
    )
}

export default ApplicationForm;