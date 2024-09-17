import {useNavigate} from "react-router-dom";
import {IUser} from "../../assets/models/Authentication";
import {PwdmanagerServerInstance} from "../../App";
import Button from "./Button";

interface IHeaderProps {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
}

function Header({user, setUser}: IHeaderProps) {
    const navigate = useNavigate();

    function disconnect() {
        setUser(null);
        localStorage.removeItem('token');
        PwdmanagerServerInstance.defaults.headers.common['Authorization'] = '';
        navigate("/signin");
    }

    return (
        <div className="flex justify-between items-center p-4 bg-pwdm-two font-semibold">
            <div onClick={() => user === null ? navigate("/") : navigate("/u/")}>
                <h1 className="text-2xl font-bold clickable inline-block ms-2">Password Manager</h1>
            </div>
            {
                user !== null &&
                <>
                    <div className="flex justify-center">
                        <h1 className={"text-4xl"}>Welcome {user.username}</h1>
                    </div>
                    <div>
                        <Button text={"Disconnect"} type={"button"} onClick={disconnect} />
                    </div>
                </>
            }
        </div>
    );
}

export default Header;