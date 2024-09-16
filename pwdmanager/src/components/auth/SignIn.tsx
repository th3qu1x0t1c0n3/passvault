import {useNavigate} from "react-router-dom";
import {FormEvent, useState} from "react";
import FormInput, {IButton} from "../../assets/models/Form";
import Form from "../utils/Form";

function SignIn() {
    const navigate = useNavigate();

    const [signinForm, setSigninForm] = useState({
        username: '',
        password: '',
    });
    const [signinFormInfo, setSigninFromInfo] = useState([
        new FormInput('username', 'text', 'Email', ''),
        new FormInput('password', 'password', 'Password', ''),
    ])
    const signinButton: IButton[] = [
        {
            text: 'Sign in',
            type: 'submit'
        },
        {
            text: 'Reset',
            type: 'reset'
        },
        {
            text: 'Go Sign up',
            type: 'button',
            onClick: () => navigate('/signin')
        }
    ]

    function handleChange(e: any) {
        setSigninFromInfo(signinFormInfo.map((formInfo) => {
            if (formInfo.name === e.target.id)
                formInfo.warning = '';
            return formInfo;
        }))
        setSigninForm({...signinForm, [e.target.id]: e.target.value});
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        console.log("Sign in form submitted");
    }

    return (
        <div>
            <Form formInputs={signinFormInfo} handleSubmit={handleSubmit} handleChange={handleChange} buttons={signinButton}/>
        </div>
    );
}

export default SignIn;