import { FormEventHandler, ReactNode } from 'react';
type CenteredFormProps = {
    children?: ReactNode;
    onSubmit?: FormEventHandler<HTMLFormElement> | undefined
}

const CenteredForm = ({children,onSubmit} : CenteredFormProps) => {

    return (
        <form className='flex items-center justify-center font-sans' onSubmit={onSubmit}>
            <div className='flex flex-col gap-4 max-w-sm rounded shadow-lg p-20'>
                {children}
            </div>
        </form>        
    )
}

export default CenteredForm;