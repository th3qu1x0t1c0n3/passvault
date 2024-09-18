import React, {useState} from 'react';
import {IAccount, IApplication} from "../../assets/models/Vault";
import ApplicationForm from "../Application/ApplicationForm";
import AccountForm from "../Accounts/AccountForm";

interface INewRecordProps {
    applications: IApplication[];
    getAllApplications: () => void;
}

function NewRecord({applications, getAllApplications}: INewRecordProps) {
    const [selectedApp, setSelectedApp] = useState<IApplication | null>(null);

    function handleSelected(e: any) {
        setSelectedApp(applications.find(app => app.id === parseInt(e.target.value)) || null);
    }

    return (
        <div>
            <h1 className={"text-4xl mt-2"}>New Record</h1>
            <h1 className={"text-2xl mt-2"}>Add new Application or select one to add an Account</h1>

            <select name="apps" id="" className={"mt-2"} onChange={handleSelected}>
                <option value={0}>Select an Application</option>
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
                        <AccountForm getAllApplications={getAllApplications} application={selectedApp} />
                    </div>
                )
            }
        </div>
    )
}

export default NewRecord;