import {IAccount} from "../../assets/models/Vault";
import PasswordView from "../utils/PasswordView";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

interface AccountViewProps {
    account: IAccount;
    deleteAccount: (account: IAccount) => void;
}

function AccountView({account, deleteAccount}: AccountViewProps) {
    return (
        <div key={account.id} className="bg-pwdm-one p-3 rounded-lg shadow-lg grid grid-cols-3 gap-1">
            <h1 className="font-semibold">{account.email}</h1>
            <h1 className="font-semibold">{account.username}</h1>
            <div className={"grid grid-cols-4 my-auto p-1 px-2"}>
                <PasswordView password={account.password}/>

                <div className={"text-right my-auto p-1 px-2"}>
                    <FontAwesomeIcon className={""} onClick={() => deleteAccount(account)} icon={faTrash}/>
                </div>
            </div>

        </div>
    )

}

export default AccountView;