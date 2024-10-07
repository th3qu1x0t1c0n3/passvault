import {IAccount} from "../../assets/models/Vault";
import AccountView from "./AccountView";

interface AccountListProps {
    accounts: IAccount[];
    deleteAccount: (account: IAccount) => void;
}

function AccountList({accounts, deleteAccount}: AccountListProps) {

    function catchEvent(e: any) {
        e.stopPropagation();
    }

    return (
        <div className={"text-center col-span-full "} onClick={catchEvent}>
            <h1 className={"text-2xl"}>Accounts</h1>
            <div className="grid grid-cols-1 gap-4 mx-auto text-center">
                <div className="bg-pwdm-one rounded-lg grid grid-cols-3 gap-1 border-b border-pwdm-four">
                    <h1 className="font-semibold">Email</h1>
                    <h1 className="font-semibold">Username</h1>
                    <h1 className="font-semibold text-start ms-16">Password</h1>
                </div>

                {
                    accounts && accounts.length > 0 && accounts.map((account, index) => {
                        return (
                            <div key={index}>
                                <AccountView account={account} deleteAccount={deleteAccount}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

}

export default AccountList;