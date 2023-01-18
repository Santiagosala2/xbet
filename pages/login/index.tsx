import CenteredForm from '../../components/CenteredForm/CenteredForm';
import FormInput from '../../components/FormInput/FormInput';
import Link from 'next/link';
import { FormLabels, IFormInputs } from '../../constants/constants';
import WhiteButton from '../../components/WhiteButton/WhiteButton';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import user from '../../services/user';

const schema = yup.object({
    email: yup.string().required(`${FormLabels.email} is a required field`).email(`${FormLabels.email} must be a valid email`),
    password: yup.string().required(`${FormLabels.password} is a required field`)

  }).required();

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });

    const router = useRouter();

    const [serverError , setServerError] = useState('');

    const onSubmit = (data: IFormInputs) => {
        user.services.login<IFormInputs>(data,(res) => {
            if (res === true)
            {
              router.push('dashboard');
            } else {
              setServerError(res.errorMessage);
            }

        })
    };
    
    const noErrorBorder = 'ring-sky-500 ring-1 ring-slate-300';
    const errorBorder = 'ring-rose-500 ring-1 ring-rose-300'

   
    return (
        <CenteredForm onSubmit={handleSubmit(onSubmit)}>
           <FormInput
                type='email'
                label={FormLabels.email}
                required={true}
                register={register}
                error={!!errors.email}
                errorMsg={errors.email?.message}
                borderColor={!!errors.email ? errorBorder : noErrorBorder}
            />
            <FormInput
                type='password'
                label={FormLabels.password}
                required={true}
                register={register}
                error={!!errors.password}
                errorMsg={errors.password?.message}
                borderColor={!!errors.password ? errorBorder : noErrorBorder}
            />
            <button className='rounded-lg font-sans text-sm font-semibold py-3 px-4 bg-slate-900 text-white hover:bg-slate-700'>Login</button>
            {{serverError} && <label className="block text-xs font-semibold leading-6 text-rose-500" >{serverError}</label>}
            <a className='text-center'>Forgot password?</a>
            <WhiteButton>
                <Link href="/register" className='no-underline text-black text-sm font-semibold'>Create Account!</Link>
            </WhiteButton>

        </CenteredForm>



    )
}