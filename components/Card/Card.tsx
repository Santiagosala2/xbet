import Image from 'next/image';
import { ReactElement } from 'react';


type CardProps = {
    name: string;
    path?: string;
    onClick?: () => void
    children?: ReactElement
    borderColor?: string;
}

const Card = ({name , path , onClick , children, borderColor}: CardProps) => {

    return (
        <div className={`w-36 p-6 bg-white border rounded-lg shadow  inline-block my-6 mr-6 cursor-pointer ${borderColor ? borderColor : 'border-slate-900' }`} onClick={onClick}> 
            {path && <Image className="w-10 h-10 mb-2 text-slate-900" src={path} alt={name} width={80} height={80} /> } 
            { path &&<a href="#">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-slate-900">{name}</h5>
            </a>}
            {children && children}
        </div>
    )
}

export default Card;

