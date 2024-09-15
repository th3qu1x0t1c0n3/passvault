import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

// Function to encrypt the data
const encrypt = (masterPassword: string, data: string): string => {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);  // Generate a random salt
    const key = CryptoJS.PBKDF2(masterPassword, salt, { keySize: 256 / 32, iterations: 1000 });

    const iv = CryptoJS.lib.WordArray.random(128 / 8);  // Initialization vector (IV)
    const encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });

    // Concatenate salt, IV, and encrypted ciphertext into a single string
    return salt.toString() + iv.toString() + encrypted.toString();
};

// Function to decrypt the data
const decrypt = (masterPassword: string, encryptedData: string): string => {
    const salt = CryptoJS.enc.Hex.parse(encryptedData.substr(0, 32));  // Extract the salt (first 32 hex chars)
    const iv = CryptoJS.enc.Hex.parse(encryptedData.substr(32, 32));  // Extract the IV (next 32 hex chars)
    const ciphertext = encryptedData.substr(64);  // Extract the ciphertext (after the first 64 chars)

    const key = CryptoJS.PBKDF2(masterPassword, salt, { keySize: 256 / 32, iterations: 1000 });
    const decrypted = CryptoJS.AES.decrypt(ciphertext, key, { iv: iv });

    return decrypted.toString(CryptoJS.enc.Utf8);  // Convert from WordArray to string
};

const EncryptionDecryption: React.FC = () => {
    const [passwordToEncrypt, setPasswordToEncrypt] = useState<string>('');
    const [masterPassword, setMasterPassword] = useState<string>('');
    const [encryptedData, setEncryptedData] = useState<string | null>(null);
    const [decryptedData, setDecryptedData] = useState<string | null>(null);

    const handleEncrypt = () => {
        if (masterPassword && passwordToEncrypt) {
            const encrypted = encrypt(masterPassword, passwordToEncrypt);
            setEncryptedData(encrypted);
        }
    };

    const handleDecrypt = () => {
        if (masterPassword && encryptedData) {
            const decrypted = decrypt(masterPassword, encryptedData);
            setDecryptedData(decrypted);
        }
    };

    return (
        <div>
            <h1>Encrypt & Decrypt Example</h1>
            <div>
                <label>
                    Master Password:
                    <input
                        type="password"
                        value={masterPassword}
                        onChange={(e) => setMasterPassword(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Password to Encrypt:
                    <input
                        type="text"
                        value={passwordToEncrypt}
                        onChange={(e) => setPasswordToEncrypt(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={handleEncrypt}>Encrypt</button>
            {encryptedData && (
                <div>
                    <h2>Encrypted Data</h2>
                    <textarea value={encryptedData} readOnly rows={4} cols={50}></textarea>
                </div>
            )}
            <button onClick={handleDecrypt} disabled={!encryptedData}>
                Decrypt
            </button>
            {decryptedData && (
                <div>
                    <h2>Decrypted Data</h2>
                    <p>{decryptedData}</p>
                </div>
            )}
        </div>
    );
};

export default EncryptionDecryption;
