import {IApplication} from "../../assets/models/Vault";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";

interface ApplicationViewProps {
    application: IApplication;
}

function ApplicationView({application}: ApplicationViewProps) {

    function handleNavigate(url: string) {
        if (url && url.includes("http")) {
            window.open(url, "_blank");
        } else {
            window.open("https://" + url, "_blank");
        }
    }

    return (
        <div key={application.id} className="bg-pwdm-two p-3 rounded-lg shadow-lg grid grid-cols-2 gap-16 text-left">
            <h1 className="text-2xl ml-9 font-semibold">{application.name}</h1>
            <h1 className="clickable text-right" onClick={() => handleNavigate(application.url)}>
                {application.url} <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
            </h1>
        </div>)
}

export default ApplicationView;