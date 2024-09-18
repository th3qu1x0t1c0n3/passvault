import {IApplication} from "../../assets/models/Vault";
import ApplicationView from "./ApplicationView";


interface AppListProps {
    applications: IApplication[];
    getAllApplications: () => void;
}
function AppList({applications, getAllApplications}: AppListProps) {

    return (
        <div>
            <h1 className={"text-4xl mt-3"}>Applications</h1>
            <div className="grid grid-cols-1 gap-4 w-3/5 mx-auto mt-3">
                {
                    applications.map((application, index) => {
                        return (
                            <ApplicationView key={index} application={application} getAllApplications={getAllApplications}/>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default AppList;