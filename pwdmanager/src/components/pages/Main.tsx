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

function Main() {
    const navigate = useNavigate();
    const userService = new UserService();
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token && user === null) {
            userService.getMe().then(response => {
                setUser(response);
                PwdmanagerServerInstance.defaults.headers.common['Authorization'] = "Bearer " + token;
            })
        }
        // if (token === undefined || token === null) {
        //     setUser(null);
        //     localStorage.removeItem('token');
        //     PwdmanagerServerInstance.defaults.headers.common['Authorization'] = '';
        //     navigate("/");
        // }
    }, [user]);


    return (
        <div className={"text-pwdm-four"}>
            <Header user={user} setUser={setUser}/>

            <main className="min-h-screen font-semibold bg-pwdm-one">
                <div className="flex">
                    <div className="w-11/12 mx-auto">
                        <Routes>
                            <Route path="/" element={<SignUp setUser={setUser} />}/>
                            <Route path="/u/*" element={<Home />}/>
                            <Route path="/signin" element={<SignIn setUser={setUser} />}/>
                            <Route path="/signup" element={<SignUp setUser={setUser} />}/>

                            <Route path="*" element={<PageNotFound/>}/>
                        </Routes>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Main;