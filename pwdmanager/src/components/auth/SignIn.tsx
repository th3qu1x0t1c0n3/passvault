import {useNavigate} from "react-router-dom";
import {FormEvent, useState} from "react";
import FormInput, {IButton, ISignProps} from "../../assets/models/Form";
import Form from "../utils/Form";
import {UserService} from "../../services/UserService";
import {toast} from "react-toastify";
import {PwdmanagerServerInstance} from "../../App";

function SignIn({setUser}: ISignProps) {
    const navigate = useNavigate();
    const userService = new UserService();

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
        },
        {
            text: 'Go Sign up',
            type: 'button',
            onClick: () => navigate('/signup')
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

        userService.signIn(signinForm).then(response => {
            setUser(response);
            localStorage.setItem('token_pm', response.token);
            PwdmanagerServerInstance.defaults.headers.common['Authorization'] = "Bearer " + response.token;
            toast.success("Signed In Successfully!");

            navigate('/u/');
        }).catch(error => {
            toast.error(error.response?.data.message);
        })
    }

    return (
        <div>
            <Form formInputs={signinFormInfo} handleSubmit={handleSubmit} handleChange={handleChange} buttons={signinButton}/>
        </div>
    );
}

export default SignIn;