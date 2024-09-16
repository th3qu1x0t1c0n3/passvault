import FormInput, {IButton} from "../../assets/models/Form";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "../utils/Button";
import Form from "../utils/Form";

function SignUp() {
    const navigate = useNavigate();

    const [creationForm, setCreationForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [createFormInfo, setCreateFromInfo] = useState([
        new FormInput('username', 'text', 'Email', ''),
        new FormInput('password', 'password', 'Password', ''),
        new FormInput('confirmPassword', 'password', 'Confirm Password', '')
    ])
    const signinButton: IButton[] = [
        {
            text: 'Sign up',
            type: 'submit'
        },
        {
            text: 'Reset',
            type: 'reset'
        },
        {
            text: 'Go Sign in',
            type: 'button',
            onClick: () => navigate('/signin')
        }
    ]

    function handleCreationChange(e: any) {
        setCreateFromInfo(createFormInfo.map((formInfo) => {
            if (formInfo.name === e.target.id)
                formInfo.warning = '';
            return formInfo;
        }))
        setCreationForm({...creationForm, [e.target.id]: e.target.value});
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        console.log("Sign up form submitted");


    }

    return (
        <div>
            <Form formInputs={createFormInfo} handleSubmit={handleSubmit} handleChange={handleCreationChange} buttons={signinButton}/>
        </div>
    );
}

export default SignUp;