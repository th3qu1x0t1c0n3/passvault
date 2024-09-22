import React from 'react'
import {IApplication} from "../../assets/models/Vault";

interface IFilterObjectList {
    items: any[];
    renderItem: (items: IApplication[]) => JSX.Element;
    filters: any;
}

function FilterObjectList({items, renderItem, filters}: IFilterObjectList) {

    const filteredItems = Array.isArray(items)
        ? items.filter(item => {
            for (let key in filters) {
                if (filters[key]) {
                    if (Array.isArray(filters[key])) {
                        if (Array.isArray(item[key])) {
                            if (filters[key].length !== 0 && !filters[key].some((field: string) => item[key].includes(field))) {
                                return false;
                            }

                        } else {
                            if (filters[key].length !== 0 && !filters[key].includes(item[key])) {
                                return false;
                            }
                        }
                    } else if (typeof item[key] === 'string' && typeof filters[key] === 'string' && !String(item[key]).toLowerCase().includes(filters[key].toLowerCase())) {
                        return false;
                    } else if ((key === "email" || key === "username") && typeof filters[key] === 'string' && filters[key] !== "") {
                        if (!item.accounts.some((account: any) => account[key].toLowerCase().includes(filters[key].toLowerCase()))) {
                            return false;
                        }
                    }
                }
            }
            return true;
        })
        : []

    return (
        <div className="">
            <div className="">
                {renderItem(filteredItems)}
            </div>
        </div>
    )
}

FilterObjectList.defaultProps = {
    items: [],
    attributes: [],
    renderItem: () => {
        return (<>No Data</>)
    },
    filters: {}
}

export default FilterObjectList
