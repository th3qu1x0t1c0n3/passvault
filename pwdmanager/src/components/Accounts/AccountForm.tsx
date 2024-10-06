import {useEffect, useState} from "react";
import FormInput, {IButton} from "../../assets/models/Form";
import {IAccount, IApplication} from "../../assets/models/Vault";
import {VaultService} from "../../services/VaultService";
import {toast} from "react-toastify";
import {encrypt} from "../EncryptionDecryption";
import PasswordPopup from "../utils/PasswordPopup";
import Form from "../utils/Form";
import {UserService} from "../../services/UserService";
import {IsignIn, IUser} from "../../assets/models/Authentication";

interface IAccountFormProps {
    application: IApplication
    user: IUser
}

function AccountForm({application, user}: IAccountFormProps) {
    const vaultService = new VaultService();
    const userService = new UserService();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [event, setEvent] = useState<any>();
    const [masterPassword, setMasterPassword] = useState<string>("");
    const [accountForm, setAccountForm] = useState<IAccount>({
        applicationId: application.id, email: "", username: "", password: ""
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
        setAccountForm({...accountForm, applicationId: application.id});
    }, [application]);

    function handleSubmit(e: any) {
        e.preventDefault();
        setSubmitting(true);
        setEvent(e);
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
        setSubmitting(false);
        const signIn: IsignIn = {username: user.username, password: masterPassword};

        userService.signIn(signIn).then(response => {
            const encryptedPassword = encrypt(masterPassword, accountForm.password);
            const newAccount = {...accountForm, password: encryptedPassword};

            vaultService.createAccount(newAccount).then(response => {
                setAccountForm({applicationId: application.id, email: "", username: "", password: ""});
                event.target.reset();
                toast.success("Account created successfully!");
            }).catch(error => {
                toast.error(error.response?.data.message);
            })
        }).catch(error => {
            toast.error(error.response?.data.message);
        })

        setMasterPassword("");
    }


    return (
        <div>
            <h1>Account Form</h1>

            <Form formInputs={accountFormInfo} handleSubmit={handleSubmit} handleChange={handleChange}
                  buttons={accountButton} fieldForm={accountForm}/>

            {
                submitting &&
                <PasswordPopup handlePass={handlePass} handleCancel={handleCancel} masterPassword={masterPassword}
                               setMasterPassword={setMasterPassword}/>
            }
        </div>
    );
}

export default AccountForm;