import Form from "../utils/Form";
import {useState} from "react";
import FormInput, {IButton} from "../../assets/models/Form";
import {useNavigate} from "react-router-dom";
import {IAccount, IApplication} from "../../assets/models/Vault";
import {VaultService} from "../../services/VaultService";

interface IAccountFormProps {
    application: IApplication
}

function AccountForm({application}: IAccountFormProps) {
    const navigate = useNavigate();
    const vaultService = new VaultService();
    const [accountForm, setAccountForm] = useState<IAccount>({
        applicationId: application.id, id: 0, email: "", username: "", password: ""
    });
    const [accountFormInfo, setAccountFromInfo] = useState([
        new FormInput('email', 'text', 'email@address.com', ''),
        new FormInput('username', 'text', 'UserName', ''),
        new FormInput('password', 'password', 'Password', ''),
    ])
    const accountButton: IButton[] = [
        {
            text: 'Create account',
            type: 'submit'
        },
        {
            text: 'Reset',
            type: 'reset'
        }
    ]

    function handleSubmit(e: any) {
        e.preventDefault();
        vaultService.createAccount(accountForm).then(response => {
            navigate('/u/');
        }).catch(error => {
            console.log(error);
        })
    }

    function handleChange(e: any) {
        console.log(e.target.value);
        setAccountFromInfo(accountFormInfo.map((formInfo) => {
            if (formInfo.name === e.target.id)
                formInfo.warning = '';
            return formInfo;
        }))

        setAccountForm({...accountForm, [e.target.id]: e.target.value})
    }

    return (
        <div>
            <h1>Account Form</h1>

            <Form formInputs={accountFormInfo} handleSubmit={handleSubmit} handleChange={handleChange}
                  buttons={accountButton}/>
        </div>
    );
}

export default AccountForm;