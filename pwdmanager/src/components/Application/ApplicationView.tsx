import {IAccount, IApplication} from "../../assets/models/Vault";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import AccountList from "../Accounts/AccountList";
import {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import {decrypt} from "../EncryptionDecryption";
import PasswordPopup from "../utils/PasswordPopup";

interface ApplicationViewProps {
    application: IApplication;
}

function ApplicationView({application}: ApplicationViewProps) {
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
                return setAccounts([...accounts, {...account, password: decrypt(masterPassword, account.password)}]);
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

    return (
        <div className={"relative"}>
            <div className="bg-pwdm-two px-2 py-3 rounded-lg shadow-lg grid grid-cols-2 gap-1 text-left clickable"
                 onClick={() => setOpen(!open)}>
                <h1 className="text-2xl ml-9 font-semibold">{application.name}</h1>
                <h1 className="text-right">
                    <span className={"mx-2"}>{application.url}</span>
                    <FontAwesomeIcon className={"clickable"}
                                     onClick={() => handleNavigate(application.url)}
                                     icon={faArrowUpRightFromSquare}/>
                </h1>
                {
                    open && <AccountList accounts={accounts}/>
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