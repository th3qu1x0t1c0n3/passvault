import {useEffect, useState} from "react";
import {VaultService} from "../../services/VaultService";
import {IApplication} from "../../assets/models/Vault";
import {toast} from "react-toastify";
import FormInput, {IButton} from "../../assets/models/Form";
import Form from "../utils/Form";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import Button from "../utils/Button";

function UpdateApp() {
    const vaultService = new VaultService();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [appForm, setAppForm] = useState<IApplication>({
        id: 0, name: "", url: "", accounts: []
    });
    const [appFormInfo, setAppFromInfo] = useState([
        new FormInput('name', 'text', 'Name', ''),
        new FormInput('url', 'text', 'URL', '')
    ])
    const appButton: IButton[] = [
        {
            text: 'Update application',
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
        const timeStart = Date.now();
        while (idApp === null) {
            if (Date.now() - timeStart < 5000) {
                toast("Account not found, redirecting to home page");
                navigate('/u/');
            }
            urlParams = new URLSearchParams(window.location.search);
            idApp = urlParams.get('idApp');
        }

        vaultService.getApplication(idApp as string).then((response) => {
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

    function getAppValue(name: string) {
        switch (name) {
            case 'name':
                return appForm.name;
            case 'url':
                return appForm.url;
            default:
                return '';
        }
    }

    return (
        <div>
            <h1>Update Application</h1>

            <form onSubmit={handleSubmit} className="h-screen text-center">
                <div className="flex flex-col justify-center items-center mb-3">
                    {
                        appFormInfo.map((formInfo, index) => (
                            <div key={index} className="my-2 xl:w-1/3 lg:w-1/2 md:w-3/4 w-11/12" id={formInfo.name}>
                                {
                                    <div className={"grid grid-cols-10"}>
                                        <input
                                            className={`${formInfo.warning !== '' ? "border-red" : "border-gray-300"} col-span-9 form-input border rounded-md p-2 w-full text-pwdm-one`}
                                            id={formInfo.name}
                                            value={getAppValue(formInfo.name)}
                                            onChange={handleChange}
                                            type={formInfo.type === 'password' && showPassword ? 'text' : formInfo.type}
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
                    appButton?.map((button, index) => (
                        <Button key={index} type={button.type} text={button.text} onClick={button.onClick}/>
                    ))
                }
            </form>

        </div>
    )
}

export default UpdateApp;