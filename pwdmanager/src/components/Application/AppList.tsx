import {IApplication} from "../../assets/models/Vault";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import ApplicationView from "./ApplicationView";


interface AppListProps {
    applications: IApplication[];
}
function AppList({applications}: AppListProps) {

    return (
        <div>
            <h1 className={"text-4xl mt-3"}>List of applications</h1>
            <div className="grid grid-cols-1 gap-4 w-1/3 mx-auto mt-3">
                {
                    applications.map((application) => {
                        return (
                            <ApplicationView key={application.id} application={application}/>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default AppList;