import React from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import { FormLabels, IFormInputs } from '../../constants/constants';
import { getEnumKeyByEnumValue } from '../../helpers/use';



type FormInputProps = {
    type: string;
    label: FormLabels;
    required: boolean;
    placeholder?: string;
    errorMsg?: string;
    error?: boolean;
    borderColor: string;
    register?:UseFormRegister<IFormInputs>;
}

const FormInput = ({type , label , required,  placeholder , error, borderColor , errorMsg, register}:FormInputProps) => {
    const registerLabel : Path<IFormInputs> = getEnumKeyByEnumValue(FormLabels,label)!

    return (
        <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900" >{label}</label>
            <input
                type={type}
                aria-label={label}
                aria-required={required}
                placeholder={placeholder}
                className={`appearance-none text-slate-900 bg-white rounded-md block shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:${borderColor}`}
                {...register ? {...register( registerLabel,{required})}: null}
            />
            {error && <label className="block text-xs font-semibold leading-6 text-rose-500" >{errorMsg}</label>} 
        </div>
    )
};


export default FormInput;