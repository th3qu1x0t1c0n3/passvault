import {IApplication} from "../../assets/models/Vault";
import ApplicationView from "./ApplicationView";
import {IUser} from "../../assets/models/Authentication";


interface AppListProps {
    applications: IApplication[];
    getAllApplications: () => void;
    user: IUser;
}
function AppList({applications, getAllApplications, user}: AppListProps) {

    return (
        <div>
            <h1 className={"text-4xl mt-3"}>Applications</h1>
            <div className="grid grid-cols-1 gap-4 w-3/5 mx-auto mt-3">
                {
                    applications.map((application, index) => {
                        return (
                            <ApplicationView key={index} application={application} getAllApplications={getAllApplications} user={user}/>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default AppList;