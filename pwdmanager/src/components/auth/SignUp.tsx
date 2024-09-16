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
            <form onSubmit={handleSubmit} className="h-screen text-center">
                <div className="flex flex-col justify-center items-center mb-3">
                    {
                        createFormInfo.map((formInfo, index) => (
                            <div key={index} className="my-2 xl:w-1/3 lg:w-1/2 md:w-3/4 w-11/12" id={formInfo.name}>
                                <input
                                    className={`${formInfo.warning !== '' ? "border-pwdm-red" : "border-pwdm-light"} form-input border rounded-md p-2 w-full text-pwdm-one`}
                                    id={formInfo.name}
                                    onChange={handleCreationChange} type={formInfo.type}
                                    placeholder={formInfo.placeholder}/>
                            </div>
                        ))
                    }
                </div>

                <Button type={"submit"} text={"Sign up"}/>
            </form>

            <Form formInputs={createFormInfo} handleSubmit={handleSubmit} handleChange={handleCreationChange} buttons={signinButton}/>
        </div>
    );
}

export default SignUp;