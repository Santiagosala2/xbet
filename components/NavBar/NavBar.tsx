import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import user from '../../services/user';

interface INavBarProps {
    userBalance?:number
}


const NavBar = ({userBalance}: INavBarProps) => {
    const router = useRouter();
    const [userBalanceClassName , setUserBalanceClassName] = useState('font-semibold');

    const handleLogOut = () => {
        user.services.logout(() => router.push('/login'));
    }

    useEffect(() => {
       setUserBalanceClassName('font-semibold animate-pulse text-green-500');
       const timer = setTimeout(() => {
        setUserBalanceClassName('font-semibold')
       }, 2000);
       return () => clearTimeout(timer);
    },[userBalance])

    return (
        <>
            <div className="static top-0 left-0 right-0 bg-slate-900 text-white" >
                <div className="flex justify-center items-center p-2">
                    <div className="basis-4/5 font-semibold cursor-pointer" onClick={() => router.push('/dashboard')} >BetMate</div>
                    <div className="basis-1/5">
                        <div className='flex justify-center items-center my-0 -ml-4'>
                            <div className={userBalanceClassName}>{`$${userBalance}`}</div>
                            <NavBarIcons
                                marginXY='my-0 mx-1'
                                src='/walletIcon.svg'
                                name='Wallet'
                                menuAttached={false}
                                onClick={() => router.push('/dashboard/wallet')}
                            />
                            <NavBarIcons
                                marginXY='my-0 mx-1'
                                src='/friendsIcon.svg'
                                name='Wallet'
                                menuAttached={false}
                                onClick={() => router.push('/dashboard/friends')}
                            />
                            <NavBarIcons
                                marginXY='my-0 mx-4'
                                src='/profileIcon.svg'
                                name='Profile'
                                menuAttached={true}
                                menu={[
                                    { key: "Profile" },
                                    { key: "Friends" , onClick: () => router.push('/dashboard/friends')},
                                    { key: "Log out", onClick: handleLogOut }

                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
};

interface INavBarIconsMenu {
    key: string;
    onClick?: () => void;
}

interface INavBarIconsProps {
    src: string;
    name: string;
    menuAttached: boolean;
    menu?: INavBarIconsMenu[];
    marginXY: string;
    onClick?: () => void;
}

type AnyEvent = MouseEvent | TouchEvent;

const NavBarIcons = ({ src, name, menuAttached, menu, onClick , marginXY}: INavBarIconsProps) => {
    const [isMenuClosed, setIsMenuClosed] = useState(true);
    const menuRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        // Bind the event listener
        document.addEventListener("click", handleCloseMenu, true);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("click", handleCloseMenu, true);
        };
    }, []);

    const handleCloseMenu = (event: AnyEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsMenuClosed(true);
        }

    }

    const handleOpenMenu = (click?: () => void | undefined) => {
        setIsMenuClosed(false);
        if (click) {
            click();
        };
    }

    return (
        <div className={marginXY}>
            <button className='hover:bg-slate-700 hover:rounded-full p-2 relative' onClick={() => handleOpenMenu(onClick)}>
                <Image className="inline-block h-7 w-7 " src={src} alt={name} width={80} height={80} />
                {menuAttached && menu && !isMenuClosed && <div ref={menuRef} className='absolute left-0 right-0 mx-auto text-base list-none bg-white divide-y divide-gray-100 rounded shadow w-20 dark:bg-gray-700 my-2'>
                    <ul>
                        {menu.map(menuItem => <li key={menuItem.key} onClick={menuItem.onClick}><a className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'>{menuItem.key}</a></li>)}
                    </ul>
                </div>}
            </button>
        </div>
    )
}

export default NavBar;