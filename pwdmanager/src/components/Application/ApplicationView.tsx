import {IAccount, IApplication} from "../../assets/models/Vault";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare, faSync, faTrash} from "@fortawesome/free-solid-svg-icons";
import AccountList from "../Accounts/AccountList";
import {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import {decrypt} from "../EncryptionDecryption";
import PasswordPopup from "../utils/PasswordPopup";
import {VaultService} from "../../services/VaultService";
import {useNavigate} from "react-router-dom";

interface ApplicationViewProps {
    application: IApplication;
    getAllApplications: () => void;
}

function ApplicationView({application, getAllApplications}: ApplicationViewProps) {
    const vaultService = new VaultService();
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [masterPassword, setMasterPassword] = useState<string>("");
    const [accounts, setAccounts] = useState<IAccount[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) {
            setShowPopup(true);
        } else {
            setAccounts([]);
        }
    }, [open]);

    useEffect(() => {
        if (showPopup) {
            inputRef.current?.focus();
        }
    }, [showPopup]);

    function handleNavigate(url: string) {
        if (url && url.includes("http")) {
            window.open(url, "_blank");
        } else {
            window.open("https://" + url, "_blank");
        }
    }

    function handleDecrypt() {
        try {
            application.accounts.map((account) => {
                accounts.push({...account, password: decrypt(masterPassword, account.password)});
            })
            setMasterPassword("");
            setShowPopup(false);
        } catch (error) {
            toast.error("Failed to decrypt password: " + error);
        }
    }

    function handleCancel() {
        setMasterPassword("");
        setAccounts([]);
        setShowPopup(false);
        setOpen(false);
    }

    function handleDelete(e: any) {
        e.stopPropagation();
        vaultService.deleteApplication(application.id).then((response) => {
            getAllApplications();
            toast.success("Application deleted successfully!");
        }).catch((error) => {
            toast.error(error.response?.data.message);
        })
    }

    function deleteAccount(account: IAccount) {
        if (account.id !== undefined) {
            vaultService.deleteAccount(account.id).then(() => {
                toast.success("Account deleted!");
                setAccounts(accounts.filter((acc) => acc.id !== account.id));
                getAllApplications();
            }).catch((error) => {
                toast.error(error.response?.data.message);
            })
        } else {
            toast.error("Account ID not found!");
        }
    }

    return (
        <div className={"relative"}>
            <div className="bg-pwdm-two px-2 py-3 rounded-lg shadow-lg grid grid-cols-3 gap-1 text-left clickable"
                 onClick={() => setOpen(!open)}>
                <h1 className="text-2xl ml-9 font-semibold">{application.name}</h1>
                <h1 className="text-center my-auto">
                    <span className={"mx-2"}>{application.url}</span>
                    <FontAwesomeIcon className={"clickable"}
                                     onClick={() => handleNavigate(application.url)}
                                     icon={faArrowUpRightFromSquare}/>
                </h1>
                <div className={"text-end my-auto p-1 px-2"}>
                    <FontAwesomeIcon className={"mx-2"} onClick={() => navigate('/u/updateApp?idApp=' + application.id)} icon={faSync}/>
                    <FontAwesomeIcon className={"mx-2"} onClick={handleDelete} icon={faTrash}/>
                </div>
                {
                    open ? (
                        <AccountList accounts={accounts} deleteAccount={deleteAccount}/>
                    ) : application.accounts.length === 0 ? (
                        <h1 className={"text-center text-4xl col-span-full"}>No Accounts</h1>
                    ) : null
                }
            </div>

            {
                showPopup &&
                <PasswordPopup inputRef={inputRef} masterPassword={masterPassword} setMasterPassword={setMasterPassword}
                               handlePass={handleDecrypt} handleCancel={handleCancel}/>
            }

        </div>
    )
}

export default ApplicationView;