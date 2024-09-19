import React, {useEffect, useState} from 'react';
import {IAccount, IApplication} from "../../assets/models/Vault";
import ApplicationForm from "../Application/ApplicationForm";
import AccountForm from "../Accounts/AccountForm";
import {IUser} from "../../assets/models/Authentication";
import {toast} from "react-toastify";

interface INewRecordProps {
    applications: IApplication[];
    getAllApplications: () => void;
    user: IUser;
}

function NewRecord({applications, getAllApplications, user}: INewRecordProps) {
    const [selectedApp, setSelectedApp] = useState<IApplication | null>(null);

    function handleSelected(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedApp(applications.find(app => app.id === parseInt(e.target.value)) || null);
    }

    return (
        <div>
            <h1 className={"text-4xl mt-2"}>New Record</h1>
            <h1 className={"text-2xl mt-2"}>Add new Application or select one to add an Account</h1>
            <select name="apps" id="" onChange={handleSelected} className={"mt-2 block w-1/5 mx-auto p-2 border border-pwdm-four rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pwdm-four focus:border-pwdm-four"}>
                <option value={0}>Add new Application</option>
                {applications.map((app) => (
                    <option key={app.id} value={app.id}>{app.name}</option>
                ))}
            </select>

            {
                selectedApp === null ? (
                    <div>
                        <ApplicationForm getAllApplications={getAllApplications} />
                    </div>
                ) : (
                    <div>
                        <AccountForm application={selectedApp} user={user} />
                    </div>
                )
            }
        </div>
    )
}

export default NewRecord;