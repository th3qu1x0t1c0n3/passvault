import {useNavigate} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import FormInput, {IButton, ISignProps} from "../../assets/models/Form";
import Form from "../utils/Form";
import {toast} from "react-toastify";
import {PwdmanagerServerInstance} from "../../App";
import {signIn} from "../../service/UserService";

function SignIn({setUser}: ISignProps) {
    const navigate = useNavigate();
    const [signinForm, setSigninForm] = useState({
        username: '',
        password: '',
    });
    const [signinFormInfo, setSigninFromInfo] = useState([
        new FormInput('username', 'text', 'Username', ''),
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
        }
    ]

    useEffect(() => {
        const username = localStorage.getItem('username_pm');
        if (username) {
            setSigninForm({
                username: username,
                password: ''
            })
        }

    }, []);

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

        signIn(signinForm).then(response => {
            setUser(response);
            localStorage.setItem('token_pm', response.token);
            localStorage.setItem('username_pm', response.username);
            PwdmanagerServerInstance.defaults.headers.common['Authorization'] = "Bearer " + response.token;
            toast.success("Signed In Successfully!");

            navigate('/home');
        }).catch(error => {
            toast.error(error.response?.data.message);
        })
    }

    return (
        <div>
            <Form formInputs={signinFormInfo} handleSubmit={handleSubmit} handleChange={handleChange}
                  buttons={signinButton} fieldForm={signinForm}/>
        </div>
    );
}

export default SignIn;