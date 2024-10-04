import {Route, Routes, useNavigate} from "react-router-dom";
import Header from "../utils/Header";
import PageNotFound from "../utils/PageNotFound";
import Footer from "../utils/Footer";
import {IUser} from "../../assets/models/Authentication";
import {useState} from "react";
import Home from "./Home";

function Main() {
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser | null>(null);

    return (
        <div className={"text-pwdm-four"}>
            <Header user={user} setUser={setUser}/>

            <main className="min-h-screen font-semibold bg-pwdm-one">
                <div className="flex">
                    <div className="w-11/12 mx-auto">
                        <Routes>
                            <Route path={"/"} element={<div>Home route</div>} />
                            <Route path={"/u/*"} element={<Home />} />

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