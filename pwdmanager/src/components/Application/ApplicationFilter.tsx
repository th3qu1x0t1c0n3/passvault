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
        <div className="grid grid-cols-4 gap-0 text-center w-4/5 mx-auto">
            <div>
                <label className={"mx-2"}>Name</label>
                <input
                    type="text"
                    name="name"
                    value={filters.name}
                    onChange={handleFilterChange}
                    className="p-2 border border-pwdm-four rounded-md"
                />
            </div>
            <div>
                <label className={"mx-2"}>URL</label>
                <input
                    type="text"
                    name="url"
                    value={filters.url}
                    onChange={handleFilterChange}
                    className="p-2 border border-pwdm-four rounded-md"
                />
            </div>
            <div>
                <label className={"mx-2"}>Email</label>
                <input
                    type="text"
                    name="email"
                    value={filters.email}
                    onChange={handleFilterChange}
                    className="p-2 border border-pwdm-four rounded-md"
                />
            </div>
            <div>
                <label className={"mx-2"}>Username</label>
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