import React from "react";
import {Route, Routes} from "react-router-dom";
import PageNotFound from "../utils/PageNotFound";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";

function Main() {
    return (
        <div className={"text-pwdm-four"}>
            {/*<Header user={user} setUser={setUser}/>*/}

            <h1 className="text-4xl text-left">Password Manager</h1>
            <main className="min-h-screen font-semibold bg-pwdm-one">
                <div className="flex">
                    <div className="w-11/12 mx-auto">
                        <Routes>
                            <Route path="/" element={<SignUp />}/>
                            <Route path="/signin" element={<SignIn />}/>
                            <Route path="/signup" element={<SignUp />}/>

                            <Route path="*" element={<PageNotFound/>}/>
                        </Routes>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Main;