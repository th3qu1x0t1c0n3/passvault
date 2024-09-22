import React, {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import PageNotFound from "../utils/PageNotFound";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import {IUser} from "../../assets/models/Authentication";
import Home from "./Home";
import Header from "../utils/Header";
import {PwdmanagerServerInstance} from "../../App";
import {UserService} from "../../services/UserService";
import {toast} from "react-toastify";
import Footer from "../utils/Footer";

function Main() {
    const navigate = useNavigate();
    const userService = new UserService();
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            PwdmanagerServerInstance.defaults.headers.common['Authorization'] = "Bearer " + token;

            userService.getMe().then(response => {
                setUser(response);
                navigate("/u/");
            }).catch(error => {
                toast.error(error.response?.data.message);
            })
        } else {
            setUser(null);
            localStorage.removeItem('token');
            PwdmanagerServerInstance.defaults.headers.common['Authorization'] = '';
            navigate("/");
        }
    }, []);


    return (
        <div className={"text-pwdm-four"}>
            <Header user={user} setUser={setUser}/>

            <main className="min-h-screen font-semibold bg-pwdm-one">
                <div className="flex">
                    <div className="w-11/12 mx-auto">
                        <Routes>
                            <Route path="/" element={<SignUp setUser={setUser} />}/>
                            {user && <Route path="/u/*" element={<Home user={user}/>}/>}
                            <Route path="/signin" element={<SignIn setUser={setUser} />}/>
                            <Route path="/signup" element={<SignUp setUser={setUser} />}/>

                            <Route path="*" element={<PageNotFound/>}/>
                        </Routes>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Main;