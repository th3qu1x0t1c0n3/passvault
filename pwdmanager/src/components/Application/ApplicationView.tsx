import {IApplication} from "../../assets/models/Vault";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import AccountList from "../Accounts/AccountList";
import {useState} from "react";

interface ApplicationViewProps {
    application: IApplication;
}

function ApplicationView({application}: ApplicationViewProps) {
    const [open, setOpen] = useState<boolean>(false);

    function handleNavigate(url: string) {
        if (url && url.includes("http")) {
            window.open(url, "_blank");
        } else {
            window.open("https://" + url, "_blank");
        }
    }

    return (
        <>
            <div className="bg-pwdm-two px-2 py-3 rounded-lg shadow-lg grid grid-cols-2 gap-1 text-left clickable"
                 onClick={() => setOpen(!open)}>
                <h1 className="text-2xl ml-9 font-semibold">{application.name}</h1>
                <h1 className="text-right">
                    {application.url} <FontAwesomeIcon className={"clickable"}
                                                       onClick={() => handleNavigate(application.url)}
                                                       icon={faArrowUpRightFromSquare}/>
                </h1>
                {
                    open && <AccountList accounts={application.accounts}/>
                }

            </div>
            {/*{*/}
            {/*    open && <AccountList accounts={application.accounts}/>*/}
            {/*}*/}

        </>
    )
}

export default ApplicationView;