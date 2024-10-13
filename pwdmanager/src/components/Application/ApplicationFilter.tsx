import {useState} from "react";
import {IFilters} from "../../assets/models/Form";

interface IFiltersProps {
    filters: IFilters;
    setFilters: (filters: IFilters) => void;
}

function ApplicationFilter({filters, setFilters}: IFiltersProps) {

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log(name, value);
        setFilters({ ...filters, [name]: value });
        console.log(filters);
    };

    return (
        <div className="grid xl:grid-cols-4 grid-cols-2 gap-1 text-center md:w-3/5 w-10/12 mx-auto">
            <h1 className={"text-2xl col-span-full"}>Filter Applications</h1>
            <div>
                <label className={"mx-2 block"}>Name</label>
                <input
                    type="text"
                    name="name"
                    value={filters.name}
                    onChange={handleFilterChange}
                    className="p-2 border border-pwdm-four rounded-md"
                />
            </div>
            <div>
                <label className={"mx-2 block"}>URL</label>
                <input
                    type="text"
                    name="url"
                    value={filters.url}
                    onChange={handleFilterChange}
                    className="p-2 border border-pwdm-four rounded-md"
                />
            </div>
            <div>
                <label className={"mx-2 block"}>Email</label>
                <input
                    type="text"
                    name="email"
                    value={filters.email}
                    onChange={handleFilterChange}
                    className="p-2 border border-pwdm-four rounded-md"
                />
            </div>
            <div>
                <label className={"mx-2 block"}>Username</label>
                <input
                    type="text"
                    name="username"
                    value={filters.username}
                    onChange={handleFilterChange}
                    className="p-2 border border-pwdm-four rounded-md"
                />
            </div>
        </div>
    );
}

export default ApplicationFilter;