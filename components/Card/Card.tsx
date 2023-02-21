import Image from 'next/image';


type CardProps = {
    name: string;
    path: string;
    onClick?: () => void
}

const Card = ({name , path , onClick}: CardProps) => {

    return (
        <div className="w-36 p-6 bg-white border border-slate-900 rounded-lg shadow  inline-block my-6 mr-6 cursor-pointer" onClick={onClick}> 
            <Image className="w-10 h-10 mb-2 text-slate-900" src={path} alt={name} width={80} height={80} />  
            <a href="#">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-slate-900">{name}</h5>
            </a>
        </div>
    )
}

export default Card;

