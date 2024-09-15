import {useNavigate} from "react-router-dom";
import {IUser} from "../../assets/models/Authentication";
import {useState} from "react";

interface IHeaderProps {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
}

function Header({user, setUser}: IHeaderProps) {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState<string>('');
    const pages = ['portfolio', 'wallets', 'transactions', 'allocations', 'kelly'];

    const handleNavigation = (page: string) => {
        setActivePage(page);
        navigate(`/u/${page}`);
    };

    return (
        <div className="flex justify-between items-center p-4 bg-pwdm-two font-semibold">
            <div onClick={() => user === null ? navigate("/") : navigate("/u/transactions")}>
                <h1 className="text-2xl font-bold clickable inline-block ms-2">pwdm</h1>
            </div>
            {
                user !== null &&
                <>
                    <div className="flex justify-center">
                        {
                            pages.map((page) => (
                                <button onClick={() => handleNavigation(page)}
                                        className={`${activePage === page ? 'bg-pwdm-three' : 'bg-pwdm-four'} text-pwdm-two mx-1 px-4 py-2 rounded`}>
                                    {page.charAt(0).toUpperCase() + page.slice(1)}
                                </button>
                            ))
                        }
                    </div>
                    <div>
                        <button onClick={() => {
                            navigate("/u/profile")
                            setActivePage("profile")
                        }}
                                className={`${activePage === "profile" ? 'bg-pwdm-three' : 'bg-pwdm-four'} mx-4 text-pwdm-two px-4 py-2 rounded`}>
                            Profile
                        </button>
                    </div>
                </>
            }
        </div>
    );
}

export default Header;