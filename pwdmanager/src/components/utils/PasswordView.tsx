import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

function PasswordView({password}: { password: string }) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={"grid-cols-2 grid gap-3"}>
            <input className={`border-gray-300 form-input border rounded-md p-1 w-full text-pwdm-one mx-auto`} type={showPassword ? 'text' : 'password'} value={password} />
            <FontAwesomeIcon className={"text-pwdm-four clickable p-2 my-auto"} icon={showPassword ? faEyeSlash : faEye} onClick={() => setShowPassword(!showPassword)} />
            {/*<button onClick={() => setShowPassword(!showPassword)}>*/}
            {/*    {showPassword ? 'Hide' : 'Show'}*/}
            {/*</button>*/}
        </div>
    );
}

export default PasswordView;

