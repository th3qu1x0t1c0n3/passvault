import {IAccount, IApplication} from "../../assets/models/Vault";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import AccountList from "../Accounts/AccountList";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import Button from "../utils/Button";
import {decrypt} from "../EncryptionDecryption";

interface ApplicationViewProps {
    application: IApplication;
}

function ApplicationView({application}: ApplicationViewProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [masterPassword, setMasterPassword] = useState<string>("");
    const [accounts, setAccounts] = useState<IAccount[]>([]);

    useEffect(() => {
        if (open) {
            setShowPopup(true);
        } else {
            setAccounts([]);
        }
    }, [open]);

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
            // toast.success("Password decrypted successfully!");
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
                    {application.url}
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
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <form className="bg-pwdm-one p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl mb-4">Enter Master Password</h2>
                        <input
                            type="password"
                            className="form-input border border-pwdm-four rounded-md p-2 w-full text-pwdm-one mb-4"
                            value={masterPassword}
                            onChange={(e) => setMasterPassword(e.target.value)}
                        />
                        <div className="flex justify-end">
                            <Button type={"button"} text={"Decrypt"} onClick={handleDecrypt}/>
                            <Button type={"button"} text={"Cancel"} onClick={handleCancel}/>
                        </div>
                    </form>
                </div>
            }

        </div>
    )
}

export default ApplicationView;