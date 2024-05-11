import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Separator} from "@/components/ui/separator.tsx";
import BtnMenu from "@/components/custom/BtnMenu.tsx";
import {LuUser2} from "react-icons/lu";
import {
    MdOutlineCalendarMonth,
    MdOutlineLogout,
    MdOutlineMessage,
    MdOutlineNotifications,
    MdOutlineSearch,
    MdOutlineSettings
} from 'react-icons/md';
import {FaTasks} from 'react-icons/fa';
import {RiBankFill} from 'react-icons/ri';


interface SidebarProps {
    className?: string;
}

const Sidebar = ({className}: SidebarProps) => {
    const {t} = useTranslation()
    const [isToggle, setIsToggle] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsToggle(true);
            } else {
                setIsToggle(false);
            }
        };

        window.addEventListener('resize', handleResize);

        // Set the initial sidebar visibility based on the current window size
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const toggleSidebar = () => {
        setIsToggle(!isToggle);
    };

    return (
        <aside className={`${className} w-full leading-none`}>
            <Separator/>
            <BtnMenu className={`${isToggle ? 'mb-1.5' : 'mb-0'}`}  target={'sidebar'} onClick={toggleSidebar} isOpen={!isToggle}/>
            <nav className={`${isToggle ? 'flex' : 'hidden md:flex'}`}>
                <ul className={`bg-background w-full flex flex-col gap-y-5 transition ease-in-out duration-700 delay-150 overflow-hidden ${isToggle ? 'h-full ' : 'h-0'} ${isToggle ? 'opacity-100' : 'opacity-0'}`}>
                    <li className={`flex items-center gap-x-1.5 group md:gap-x-4 ${isToggle ? 'flex' : 'hidden md:flex'}`}>
                        <LuUser2
                            className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'}/>
                        {isToggle && (
                            <p>
                                {t('sidebar.user')}
                            </p>
                        )}
                    </li>
                    <li className={`flex items-center gap-x-1.5 group md:gap-x-4 ${isToggle ? 'flex' : 'hidden md:flex'}`}>
                        <MdOutlineSearch
                            className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'}/>
                        {isToggle && (
                            <p>
                                {t('sidebar.search')}
                            </p>
                        )}
                    </li>
                    <li className={`flex items-center gap-x-1.5 group md:gap-x-4 ${isToggle ? 'flex' : 'hidden md:flex'}`}>
                        <MdOutlineMessage
                            className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'}/>
                        {isToggle && (
                            <p>
                                {t('sidebar.messages')}
                            </p>
                        )}
                    </li>
                    <li className={`flex items-center gap-x-1.5 group md:gap-x-4 ${isToggle ? 'flex' : 'hidden md:flex'}`}>
                        <MdOutlineNotifications
                            className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'}/>
                        {isToggle && (
                            <p>
                                {t('sidebar.notifications')}
                            </p>
                        )}
                    </li>
                    <li className={`flex items-center gap-x-1.5 group md:gap-x-4 ${isToggle ? 'flex' : 'hidden md:flex'}`}>
                        <MdOutlineCalendarMonth
                            className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'}/>
                        {isToggle && (
                            <p>
                                {t('sidebar.calendar')}
                            </p>
                        )}
                    </li>
                    <li className={`flex items-center gap-x-1.5 group md:gap-x-4 ${isToggle ? 'flex' : 'hidden md:flex'}`}>
                        <FaTasks
                            className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'}/>
                        {isToggle && (
                            <p>
                                {t('sidebar.tasks')}
                            </p>
                        )}
                    </li>
                    <li className={`flex items-center gap-x-1.5 group md:gap-x-4 ${isToggle ? 'flex' : 'hidden md:flex'}`}>
                        <RiBankFill
                            className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'}/>
                        {isToggle && (
                            <p>
                                {t('sidebar.payements')}
                            </p>
                        )}
                    </li>
                    <li className={`flex items-center gap-x-1.5 group md:gap-x-4 ${isToggle ? 'flex' : 'hidden md:flex'}`}>
                        <MdOutlineSettings
                            className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'}/>
                        {isToggle && (
                            <p>
                                {t('sidebar.settings')}
                            </p>
                        )}
                    </li>
                    <li className={`flex items-center gap-x-1.5 group md:gap-x-4 ${isToggle ? 'flex' : 'hidden md:flex'}`}>
                        <MdOutlineLogout
                            className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'}/>
                        {isToggle && (
                            <p>
                                {t('sidebar.logout')}
                            </p>
                        )}
                    </li>
                </ul>

            </nav>
            <Separator className={`${isToggle ? 'mt-4' : 'mt-0'}`}/>
        </aside>
    )
}
export default Sidebar
