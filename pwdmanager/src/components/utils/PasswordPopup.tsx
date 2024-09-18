import Button from "./Button";
import React, {RefObject} from "react";

interface IPasswordPopup {
    inputRef?: RefObject<HTMLInputElement>;
    masterPassword: string;
    setMasterPassword: (password: string) => void;
    handlePass: () => void;
    handleCancel: () => void;
}
function PasswordPopup({inputRef, masterPassword, setMasterPassword, handlePass, handleCancel}: IPasswordPopup) {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <form className="bg-pwdm-one p-6 rounded-lg shadow-lg">
                <h2 className="text-xl mb-4">Enter Master Password</h2>
                <input
                    ref={inputRef}
                    type="password"
                    className="form-input border border-pwdm-four rounded-md p-2 w-full text-pwdm-one mb-4"
                    value={masterPassword}
                    onChange={(e) => setMasterPassword(e.target.value)}
                />
                <div className="flex justify-end">
                    <Button type={"button"} text={"Decrypt"} onClick={handlePass}/>
                    <Button type={"button"} text={"Cancel"} onClick={handleCancel}/>
                </div>
            </form>
        </div>
    );
}

export default PasswordPopup;