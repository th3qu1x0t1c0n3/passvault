import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function PasswordView({password}: { password: string }) {
    const [showPassword, setShowPassword] = useState(false);

    function pwToShow() {
        if (showPassword) {
            return password;
        } else {
            return "*".repeat(Math.min(10, password.length));
        }
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(password).then(() => {
            toast.success("Password copied to clipboard!");
        }).catch(err => {
            toast.error("Failed to copy password: ", err);
        });
    }
    
    return (
        <div className={"grid-cols-2 grid gap-1 text-right"}>
            <h1 className={`rounded-md p-1 w-full text-pwdm-four mx-auto`}>{pwToShow()}</h1>
            <div className={"text-left"}>
                <FontAwesomeIcon className={"text-pwdm-four clickable p-2 my-auto"}
                                 icon={showPassword ? faEyeSlash : faEye}
                                 onClick={() => setShowPassword(!showPassword)}/>
                <FontAwesomeIcon className={"text-pwdm-four clickable p-2 my-auto"} icon={faCopy}
                                 onClick={copyToClipboard}/>
            </div>
        </div>
    );
}

export default PasswordView;

