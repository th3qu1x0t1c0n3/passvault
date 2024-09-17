import FormInput, {IButton, ISignProps} from "../../assets/models/Form";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import Form from "../utils/Form";
import {UserService} from "../../services/UserService";
import {toast} from "react-toastify";
import {PwdmanagerServerInstance} from "../../App";

function SignUp({setUser}: ISignProps) {
    const navigate = useNavigate();
    const userService = new UserService();

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

        userService.signUp(creationForm).then(response => {
            setUser(response);
            localStorage.setItem('token', response.token);
            PwdmanagerServerInstance.defaults.headers.common['Authorization'] = response.token;
            toast.success("Signed In Successfully!");

            navigate('/u/');
        }).catch(error => {
            console.log(error);
            toast.error(error.response?.data.message);
        })



    }

    return (
        <div>
            <Form formInputs={createFormInfo} handleSubmit={handleSubmit} handleChange={handleCreationChange} buttons={signinButton}/>
        </div>
    );
}

export default SignUp;