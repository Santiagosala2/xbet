import CenteredForm from '../../components/CenteredForm/CenteredForm';
import FormInput from '../../components/FormInput/FormInput';
import Link from 'next/link';
import { FormLabels, IFormInputs } from '../../constants/constants';
import WhiteButton from '../../components/WhiteButton/WhiteButton';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import moment from 'moment';
import { useRouter } from 'next/router';
import { useState } from 'react'
import user from '../../services/user';

const schema = yup.object({
    firstName: yup.string().required(`${FormLabels.firstName} is a required field`),
    lastName: yup.string().required(`${FormLabels.lastName} is a required field`),
    dateOfBirth: yup.string().required(`${FormLabels.dateOfBirth} is a required field`).test('DOB','You must be over 18 years old', value => moment().diff(moment(value),'years') >= 18).typeError("Please enter a valid date"),
    email: yup.string().required(`${FormLabels.email} is a required field`).email(`${FormLabels.email} must be a valid email`),
    password: yup.string().required(`${FormLabels.password} is a required field`).min(8,`${FormLabels.password} be at least 8 long`)

  }).required();

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });

    const router = useRouter();

    const [serverError , setServerError] = useState('');

    const onSubmit = (data: IFormInputs) => {
        user.services.register<IFormInputs>(data,(res) => {
            if (res === true)
            {
                router.push('login');
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
                type='text'
                label={FormLabels.firstName}
                required={true}
                register={register}
                error={!!errors.firstName}
                errorMsg={errors.firstName?.message}
                borderColor={!!errors.firstName ? errorBorder : noErrorBorder}
            />
            <FormInput
                type='text'
                label={FormLabels.lastName}
                required={true}
                register={register}
                error={!!errors.lastName}
                errorMsg={errors.lastName?.message}
                borderColor={!!errors.lastName ? errorBorder : noErrorBorder}
            />
            <FormInput
                type='date'
                label={FormLabels.dateOfBirth}
                required={true}
                register={register}
                error={!!errors.dateOfBirth}
                errorMsg={errors.dateOfBirth?.message}
                borderColor={!!errors.dateOfBirth ? errorBorder : noErrorBorder}
            />
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
            {{serverError} && <label className="block text-xs font-semibold leading-6 text-rose-500" >{serverError}</label>}
           
            <WhiteButton>Create Account!</WhiteButton>
         </CenteredForm>


    )
}