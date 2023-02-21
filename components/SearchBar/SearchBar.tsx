import Image from 'next/image';
import { ChangeEvent } from 'react';

type SearchBarProps = {
    inputName: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    placeHolder?: string;
}

const SearchBar = ({ inputName, onChange , placeHolder }: SearchBarProps) => {

    return (
        <div className="flex-auto  border rounded-md  border-slate-300 px-1">
            <Image className="inline-block h-4 w-4 m-1" src={"/searchIcon.svg"} alt={"search icon"} width={10} height={10} />
            <input
                type="text"
                aria-label={inputName}
                className={`inline-block appearance-none text-slate-900 focus:outline-none text-sm`}
                onChange={onChange}
                placeholder={placeHolder}
            />
        </div>
    )
}

export default SearchBar;

