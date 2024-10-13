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
            <div className="grid grid-cols-1 gap-4 md:w-3/5 w-11/12 mx-auto mt-3">
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
            {
                applications.length === 0 ? (
                    <div>
                        <h1 className={"text-3xl"}>No Applications Found!</h1>
                        <h1 className={"text-2xl"}>Please add an application</h1>
                    </div>
                    ) : (
                    <>
                        <div className={"mx-auto"}>
                            <ApplicationFilter filters={filters} setFilters={setFilters}/>
                        </div>
                        <FilterObjectList filters={filters} items={applications} renderItem={renderApplications}/>
                    </>
                )
            }
        </div>
    )
}

export default AppList;