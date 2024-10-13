
import React from 'react';
import {IButton} from "../../assets/models/Form";

function Button({type, text, onClick}: IButton) {

    return <button
        className="border border-pwdm-four text-pwdm-four hover:bg-pwdm-four hover:text-pwdm-one rounded transition ease-in duration-200 p-2 lg:mx-5"
        type={type} onClick={onClick}>{text}
    </button>;
}

export default Button;