import {IUser} from "../../assets/models/Authentication";
import VerticalDotButton from "./VerticalDotButton";

interface IHeaderProps {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
}

function Header({user, setUser}: IHeaderProps) {

    return (
        <div className="grid grid-cols-3 p-4 bg-pwdm-two font-semibold text-justify">
            {
                user !== null ?
                    <>
                        <div className="flex justify-center col-span-2">
                            <h1 className={"text-4xl"}>{user.username}</h1>
                        </div>
                        <div className={"text-end my-auto"}>
                            <VerticalDotButton setUser={setUser} user={user}/>
                        </div>
                    </> :
                    <>
                        <div className="flex justify-center col-span-full">
                            <h1 className={"text-4xl"}>Sign in</h1>
                        </div>

                    </>
            }
        </div>
    );
}

export default Header;