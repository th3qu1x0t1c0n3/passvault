import {IAccount} from "../../assets/models/Vault";
import PasswordView from "../utils/PasswordView";

interface AccountViewProps {
    account: IAccount;
}

function AccountView({account}: AccountViewProps) {
    return (
        <div key={account.id} className="bg-pwdm-two p-3 rounded-lg shadow-lg grid grid-cols-3 gap-1">
            <h1 className="font-semibold">{account.email}</h1>
            <h1 className="font-semibold">{account.username}</h1>
            <PasswordView password={account.password}/>
        </div>
    )

}

export default AccountView;