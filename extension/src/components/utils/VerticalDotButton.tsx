import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare, faEllipsisV, faHome, faLock, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";
import {PwdmanagerServerInstance} from "../../App";
import {IUser} from "../../assets/models/Authentication";

interface IVerticalDotButtonProps {
    setUser: (user: IUser | null) => void;
    user: IUser | null;
}

function VerticalDotButton({setUser, user}: IVerticalDotButtonProps) {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    function disconnect() {
        lockManager();
        localStorage.removeItem('username_pm');
    }

    function lockManager() {
        setUser(null);
        localStorage.removeItem('token_pm');
        PwdmanagerServerInstance.defaults.headers.common['Authorization'] = '';
        navigate("/signin");
    }

    function togglePopup() {
        setShowPopup(!showPopup);
    }

    return (
        <div className="relative">
            <FontAwesomeIcon icon={faEllipsisV}
                             className={"text-2xl mx-auto my-auto clickable py-1 px-4 hover:bg-pwdm-three rounded-2xl"}
                             onClick={togglePopup}/>
            {showPopup && (
                <div
                    className="absolute right-0 mt-2 w-48 bg-pwdm-one border border-pwdm-four rounded shadow-lg text-start"
                    onClick={togglePopup}>
                    <ul>
                        <li className="p-2 hover:bg-pwdm-two cursor-pointer"
                            onClick={() => window.open("https://passmanager.quixotic.date/", '_blank')}>
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={"me-2"}/>
                            Full website
                        </li>
                        <li className="p-2 hover:bg-pwdm-two cursor-pointer"
                            onClick={() => user === null ? navigate("/") : navigate("/home")}>
                            <FontAwesomeIcon icon={faHome} className={"me-2"}/>
                            Home page
                        </li>
                        <li className="p-2 hover:bg-pwdm-two cursor-pointer" onClick={disconnect}>
                            <FontAwesomeIcon icon={faSignOutAlt} className={"me-2"}/>
                            Disconnect
                        </li>
                        <li className="p-2 hover:bg-pwdm-two cursor-pointer" onClick={lockManager}>
                            <FontAwesomeIcon icon={faLock} className={"me-2"}/>
                            Lock manager
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default VerticalDotButton;