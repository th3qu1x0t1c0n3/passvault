import FormInput, {IButton} from "../../assets/models/Form";
import Button from "./Button";

interface IFormInput {
    handleSubmit: (e: any) => void;
    handleChange: (e: any) => void;
    formInputs: FormInput[];
    buttons?: IButton[];
}

function Form({handleSubmit, handleChange, formInputs, buttons}: IFormInput) {
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
                                        : <input
                                            className={`${formInfo.warning !== '' ? "border-red" : "border-gray-300"} form-input border rounded-md p-2 w-full text-pwdm-one`}
                                            id={formInfo.name}
                                            onChange={handleChange} type={formInfo.type}
                                            placeholder={formInfo.placeholder}/>

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