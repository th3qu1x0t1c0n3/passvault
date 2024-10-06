import FormInput, {IButton} from "../../assets/models/Form";
import Button from "./Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

interface IFormInput {
    handleSubmit: (e: any) => void;
    handleChange: (e: any) => void;
    formInputs: FormInput[];
    buttons?: IButton[];
    fieldForm?: any;
}

function Form({handleSubmit, handleChange, formInputs, buttons, fieldForm}: IFormInput) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <form onSubmit={handleSubmit} className="h-screen text-center">
                <div className="flex flex-col justify-center items-center mb-3">
                    {
                        formInputs.map((formInfo, index) => (
                            <div key={index} className="my-2 xl:w-1/3 lg:w-1/2 md:w-3/4 w-11/12" id={formInfo.name}>
                                {
                                    formInfo.type === 'textarea' ?
                                        <textarea
                                            className={`${formInfo.warning !== '' ? "border-red" : "border-gray-300"} form-input border rounded-md p-2 w-full text-pwdm-one`}
                                            id={formInfo.name}
                                            onChange={handleChange}
                                            placeholder={formInfo.placeholder}/>
                                        : <div className={"grid grid-cols-10"}>
                                            <input
                                                className={`${formInfo.warning !== '' ? "border-red" : "border-gray-300"} col-span-9 form-input border rounded-md p-2 w-full text-pwdm-one`}
                                                id={formInfo.name}
                                                onChange={handleChange}
                                                defaultValue={fieldForm[formInfo.name as keyof typeof fieldForm]}
                                                type={formInfo.type === 'password' && showPassword ? 'text' : formInfo.type}
                                                placeholder={formInfo.placeholder}/>
                                            {
                                                formInfo.type === 'password' &&
                                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}
                                                                 className={"my-auto mx-auto"}
                                                                 onClick={() => setShowPassword(!showPassword)}/>
                                            }
                                        </div>
                                }
                                <p>{formInfo.warning}</p>
                            </div>
                        ))
                    }
                </div>

                {
                    buttons?.map((button, index) => (
                        <Button key={index} type={button.type} text={button.text} onClick={button.onClick}/>
                    ))
                }
            </form>

        </div>
    );
}

export default Form;