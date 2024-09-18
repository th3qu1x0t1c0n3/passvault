import Form from "../utils/Form";
import {useState} from "react";
import FormInput, {IButton} from "../../assets/models/Form";
import {useNavigate} from "react-router-dom";

function AccountForm(){
    const navigate = useNavigate();
    const [accountForm, setAccountForm] = useState({
    });
    const [accountFormInfo, setAccountFromInfo] = useState([
    ])
    const accountButton: IButton[] = [
        {
            text: 'Create account',
            type: 'submit'
        },
        {
            text: 'Reset',
            type: 'reset'
        }
    ]

    function handleSubmit(e: any){
        e.preventDefault();
    }

    function handleChange(e: any){
        console.log(e.target.value);
    }

    return(
        <div>
            <h1>Account Form</h1>

            <Form formInputs={accountFormInfo} handleSubmit={handleSubmit} handleChange={handleChange} buttons={accountButton} />
        </div>
    );
}

export default AccountForm;