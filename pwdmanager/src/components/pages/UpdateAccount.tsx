import {VaultService} from "../../services/VaultService";
import {useEffect, useState} from "react";
import {IAccount, IApplication} from "../../assets/models/Vault";
import {toast} from "react-toastify";
import FormInput, {IButton} from "../../assets/models/Form";
import {encrypt} from "../EncryptionDecryption";
import Form from "../utils/Form";
import PasswordPopup from "../utils/PasswordPopup";
import {useNavigate} from "react-router-dom";

function UpdateAccount() {
    const vaultService = new VaultService();
    const navigate = useNavigate();
    const [originalAccount, setOriginalAccount] = useState<IApplication | null>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [masterPassword, setMasterPassword] = useState<string>("");
    const [accountForm, setAccountForm] = useState<IAccount>({
        applicationId: 0, email: "", username: "", password: ""
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

    useEffect(() => {
        let urlParams = new URLSearchParams(window.location.search);
        let idAccount = urlParams.get('idAccount');
        while (idAccount === null) {
            urlParams = new URLSearchParams(window.location.search);
            idAccount = urlParams.get('idAccount');
        }

        vaultService.getAccountById(idAccount as string).then((response) => {
            setOriginalAccount(response);
            setAccountForm(response);
        }).catch((error) => {
            toast.error(error.response?.data.message);
        });

    }, []);

    function handleSubmit(e: any) {
        e.preventDefault();
        setSubmitting(true);

        e.target.reset();
    }

    function handleChange(e: any) {
        setAccountFromInfo(accountFormInfo.map((formInfo) => {
            if (formInfo.name === e.target.id)
                formInfo.warning = '';
            return formInfo;
        }))

        setAccountForm({...accountForm, [e.target.id]: e.target.value})
    }

    function handleCancel() {
        setMasterPassword("");
        setSubmitting(false);
    }

    function handlePass() {
        const encryptedPassword = encrypt(masterPassword, accountForm.password);
        setSubmitting(false);
        const newAccount = {...accountForm, password: encryptedPassword};

        vaultService.updateAccount(newAccount).then(response => {
            navigate('/u/');
            toast.success("Account Updated successfully!");
        }).catch(error => {
            toast.error(error.response?.data.message);
        })
    }


    return (
        <div>
            <h1>Update Account</h1>

            <Form formInputs={accountFormInfo} handleSubmit={handleSubmit} handleChange={handleChange}
                  buttons={accountButton}/>

            {
                submitting &&
                <PasswordPopup handlePass={handlePass} handleCancel={handleCancel} masterPassword={masterPassword} setMasterPassword={setMasterPassword} />
            }
        </div>
    );
}

export default UpdateAccount;