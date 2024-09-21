import {IApplication} from "../../assets/models/Vault";
import ApplicationView from "./ApplicationView";
import {IUser} from "../../assets/models/Authentication";
import ApplicationFilter from "./ApplicationFilter";
import {useState} from "react";
import {IFilters} from "../../assets/models/Form";
import FilterObjectList from "../utils/FilterObjectList";


interface AppListProps {
    applications: IApplication[];
    getAllApplications: () => void;
    user: IUser;
}

function AppList({applications, getAllApplications, user}: AppListProps) {
    const [filters, setFilters] = useState<IFilters>({
        name: "",
        url: "",
        email: "",
        username: "",
    });


    function renderApplications(applications: IApplication[]) {
        return (
            <div className="grid grid-cols-1 gap-4 w-3/5 mx-auto mt-3">
                {
                    applications.map((application, index) => {
                        return (
                            <ApplicationView key={index} application={application}
                                             getAllApplications={getAllApplications} user={user}/>
                        )
                    })
                }
            </div>
        );
    }

    return (
        <div>
            <h1 className={"text-4xl my-3"}>Applications</h1>
            <div className={"mx-auto"}>
                <ApplicationFilter filters={filters} setFilters={setFilters}/>
            </div>
            <FilterObjectList filters={filters} items={applications} renderItem={renderApplications}/>
        </div>
    )
}

export default AppList;