import {VaultService} from "../../services/VaultService";
import {useEffect, useState} from "react";
import {IAccount} from "../../assets/models/Vault";
import {toast} from "react-toastify";
import FormInput, {IButton} from "../../assets/models/Form";
import {encrypt} from "../EncryptionDecryption";
import PasswordPopup from "../utils/PasswordPopup";
import {useNavigate} from "react-router-dom";
import Button from "../utils/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {IsignIn, IUser} from "../../assets/models/Authentication";
import {UserService} from "../../services/UserService";

interface IAccountFormProps {
    user: IUser;
}
function UpdateAccount({user}: IAccountFormProps) {
    const vaultService = new VaultService();
    const userService = new UserService();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
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
            text: 'Update account',
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
        const timeStart = Date.now();
        while (idAccount === null) {
            if (Date.now() - timeStart < 5000) {
                toast("Account not found, redirecting to home page");
                navigate('/u/');
            }
            urlParams = new URLSearchParams(window.location.search);
            idAccount = urlParams.get('idAccount');
        }

        vaultService.getAccountById(idAccount as string).then((response) => {
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
        setSubmitting(false);
        const signIn: IsignIn = {username: user.username, password: masterPassword};

        userService.signIn(signIn).then(response => {
            const encryptedPassword = encrypt(masterPassword, accountForm.password);
            const newAccount = {...accountForm, password: encryptedPassword};

            vaultService.updateAccount(newAccount).then(response => {
                navigate('/u/');
                toast.success("Account Updated successfully!");
            }).catch(error => {
                toast.error(error.response?.data.message);
            })
        }).catch(error => {
            toast.error(error.response?.data.message);
        })
        setMasterPassword("");
    }


    function getAccountValue(name: string) {
        if (accountForm !== null) {
            switch (name) {
                case 'email':
                    return accountForm.email;
                case 'username':
                    return accountForm.username;
                case 'password':
                    return accountForm.password;
            }
        }
        return "";
    }

    return (
        <div>
            <h1>Update Account</h1>

            <form onSubmit={handleSubmit} className="h-screen text-center">
                <div className="flex flex-col justify-center items-center mb-3">
                    {
                        accountFormInfo.map((formInfo, index) => (
                            <div key={index} className="my-2 xl:w-1/3 lg:w-1/2 md:w-3/4 w-11/12" id={formInfo.name}>
                                {
                                    <div className={"grid grid-cols-10"}>
                                        <input
                                            className={`${formInfo.warning !== '' ? "border-red" : "border-gray-300"} col-span-9 form-input border rounded-md p-2 w-full text-pwdm-one`}
                                            id={formInfo.name}
                                            value={getAccountValue(formInfo.name)}
                                            onChange={handleChange} type={formInfo.type === 'password' && showPassword ? 'text' : formInfo.type}
                                            placeholder={formInfo.placeholder}/>
                                        {
                                            formInfo.type === 'password' &&
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}
                                                             className={"my-auto mx-auto"}
                                                             onClick={() => setShowPassword(!showPassword)}/>
                                        }
                                    </div>
                                }
                                <p>{formInfo.warning}</p>
                            </div>
                        ))
                    }
                </div>

                {
                    accountButton?.map((button, index) => (
                        <Button key={index} type={button.type} text={button.text} onClick={button.onClick}/>
                    ))
                }
            </form>

            {
                submitting &&
                <PasswordPopup handlePass={handlePass} handleCancel={handleCancel} masterPassword={masterPassword}
                               setMasterPassword={setMasterPassword}/>
            }
        </div>
    );
}

export default UpdateAccount;