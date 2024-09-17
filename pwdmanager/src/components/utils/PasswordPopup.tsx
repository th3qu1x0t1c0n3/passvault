import { useState } from "react";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";

function decrypt(masterPassword: string, encryptedData: string): string {
    const salt = CryptoJS.enc.Hex.parse(encryptedData.substr(0, 32));  // Extract the salt (first 32 hex chars)
    const iv = CryptoJS.enc.Hex.parse(encryptedData.substr(32, 32));  // Extract the IV (next 32 hex chars)
    const ciphertext = encryptedData.substr(64);  // Extract the ciphertext (after the first 64 chars)

    const key = CryptoJS.PBKDF2(masterPassword, salt, { keySize: 256 / 32, iterations: 1000 });
    const decrypted = CryptoJS.AES.decrypt(ciphertext, key, { iv: iv });

    return decrypted.toString(CryptoJS.enc.Utf8);  // Convert from WordArray to string
}

function PasswordPopup({ password }: { password: string }) {
    const [showPassword, setShowPassword] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [masterPassword, setMasterPassword] = useState("");

    function pwToShow() {
        if (showPassword) {
            return password;
        } else {
            return "*".repeat(Math.min(10, password.length));
        }
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(password).then(() => {
            toast.success("Password copied to clipboard!");
        }).catch(err => {
            toast.error("Failed to copy password: " + err);
        });
    }

    function handleShowPassword() {
        setIsPopupOpen(true);
    }

    function handleDecrypt() {
        try {
            const decryptedPassword = decrypt(masterPassword, password);
            setShowPassword(true);
            setIsPopupOpen(false);
            toast.success("Password decrypted successfully!");
        } catch (error) {
            toast.error("Failed to decrypt password: " + error);
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl mb-4">Enter Master Password</h2>
                <input
                    type="password"
                    className="border border-gray-300 p-2 w-full mb-4"
                    value={masterPassword}
                    onChange={(e) => setMasterPassword(e.target.value)}
                />
                <div className="flex justify-end">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        onClick={handleDecrypt}
                    >
                        Decrypt
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={() => setIsPopupOpen(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PasswordPopup;