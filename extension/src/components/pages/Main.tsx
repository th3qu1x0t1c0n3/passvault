import {Route, Routes, useNavigate} from "react-router-dom";
import Header from "../utils/Header";
import PageNotFound from "../utils/PageNotFound";
import Footer from "../utils/Footer";
import {IUser} from "../../assets/models/Authentication";
import {useEffect, useState} from "react";
import Home from "./Home";
import SignIn from "./SignIn";
import {PwdmanagerServerInstance} from "../../App";
import {getMe} from "../../service/UserService";
import {toast} from "react-toastify";
import UpdateAccount from "./UpdateAccount";

function Main() {
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token_pm');

        if (token) {
            PwdmanagerServerInstance.defaults.headers.common['Authorization'] = "Bearer " + token;

            getMe().then(response => {
                setUser(response);
                // navigate("/u/");
            }).catch(error => {
                toast.error(error.response?.data.message);
            })
        } else {
            setUser(null);
            localStorage.removeItem('token_pm');
            PwdmanagerServerInstance.defaults.headers.common['Authorization'] = '';
            // navigate("/");
        }
    }, []);
    useEffect(() => {
        if (user) {
            navigate("/home");
        } else {
            navigate("/");
        }
    }, [user]);

    return (
        <div className={"text-pwdm-four"}>
            <Header user={user} setUser={setUser}/>

            <main className="min-h-screen font-semibold bg-pwdm-one">
                <div className="flex">
                    <div className="w-11/12 mx-auto">
                        <Routes>
                            <Route path={"/"} element={<SignIn setUser={setUser}/>}/>
                            {user &&
                                <>
                                    {/*<Route path={"/u/*"} element={<Home user={user}/>}/>*/}
                                    <Route path={"/home"} element={<Home user={user}/>}/>
                                    <Route path={"/updateAcc"} element={<UpdateAccount user={user}/>}/>

                                </>
                            }

                            <Route path="*" element={<PageNotFound/>}/>
                        </Routes>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
}

export default Main;