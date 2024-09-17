import React, {useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import PageNotFound from "../utils/PageNotFound";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import {IUser} from "../../assets/models/Authentication";
import Home from "./Home";
import Header from "../utils/Header";

function Main() {
    const [user, setUser] = useState<IUser | null>(null);

    function handleSignOut() {
        setUser(null);
    }


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