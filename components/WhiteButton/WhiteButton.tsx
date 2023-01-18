import {  ReactNode } from "react";

type WhiteButtonProps = {
    children?: ReactNode
}

export default function WhiteButton({children}: WhiteButtonProps) {
    return (
        <button className='mt-4 font-sans border-2 border-black rounded-2xl text-sm font-semibold bg-white text-black'>
            {children}
        </button>
    )
}