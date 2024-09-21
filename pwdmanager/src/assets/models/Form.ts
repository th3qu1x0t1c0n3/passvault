export interface IFormInput {
    name: string;
    type: string;
    placeholder: string;
    warning: string;
}

export interface IFilters {
    name: string;
    url: string;
    email: string;
    username: string;
}


export interface IButton {
    type: "submit" | "reset" | "button" | undefined;
    text: string;
    onClick?: () => void;
}

export interface ISignProps {
    setUser: (user: any) => void;
}

class FormInput implements IFormInput {
    name: string;
    type: string;
    placeholder: string;
    warning: string;

    constructor(name: string, type: string, placeholder: string, warning: string) {
        this.name = name;
        this.type = type;
        this.placeholder = placeholder;
        this.warning = warning;
    }
}

export default FormInput;