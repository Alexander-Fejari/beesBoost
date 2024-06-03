import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator.tsx";
import BtnMenu from "@/components/custom/BtnMenu.tsx";
import { LuUser2 } from "react-icons/lu";
import {
    MdOutlineCalendarMonth,
    MdOutlineLogout,
    MdOutlineMessage,
    MdOutlineNotifications,
    MdOutlineSearch,
    MdOutlineSettings
} from 'react-icons/md';
import { FaTasks } from 'react-icons/fa';
import { RiBankFill } from 'react-icons/ri';
import { NavLink } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.tsx";
import SearchComponent from "@/components/custom/Dashboard/Search.tsx";
import { Button } from "@/components/ui/button.tsx";
import SignIn from "@/components/custom/Auth/SignIn.tsx";

interface SidebarProps {
    className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
    const { t } = useTranslation();
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

    // Classes partagées pour les éléments de navigation
    const navItemClasses = `flex items-center gap-x-1.5 group md:gap-x-4 ${isToggle ? 'flex' : 'hidden md:flex'}`;

    return (
        <aside className={`${className} w-full leading-none`}>
            <Separator />
            <BtnMenu className={`${isToggle ? 'mb-1.5' : 'mb-0'}`} target={'sidebar'} onClick={toggleSidebar} isOpen={!isToggle} />
            <nav className={`${isToggle ? 'flex' : 'hidden md:flex'}`}>
                <ul className={`bg-background w-full flex flex-col gap-y-5 transition ease-in-out duration-700 delay-150 overflow-hidden ${isToggle ? 'h-full ' : 'h-0'} ${isToggle ? 'opacity-100' : 'opacity-0'}`}>
                    <NavLink to={'/dashboard/profile'} className={navItemClasses}>
                        <LuUser2 className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'} />
                        {isToggle && (
                            <p>
                                {t('sidebar.user')}
                            </p>
                        )}
                    </NavLink>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className={navItemClasses}>
                                <MdOutlineSearch className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'} />
                                {isToggle && (
                                    <p>
                                        {t('sidebar.search')}
                                    </p>
                                )}
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className={'my-4 self-center'}>
                                    {t('sidebar.search')}
                                </DialogTitle>
                                <DialogDescription asChild>
                                    <SearchComponent />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <NavLink to={'/dashboard/messages'} className={navItemClasses}>
                        <MdOutlineMessage className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'} />
                        {isToggle && (
                            <p>
                                {t('sidebar.messages')}
                            </p>
                        )}
                    </NavLink>
                    <NavLink to={'/'} className={navItemClasses}>
                        <MdOutlineNotifications className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'} />
                        {isToggle && (
                            <p>
                                {t('sidebar.notifications')}
                            </p>
                        )}
                    </NavLink>
                    <NavLink to={'/'} className={navItemClasses}>
                        <MdOutlineCalendarMonth className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'} />
                        {isToggle && (
                            <p>
                                {t('sidebar.calendar')}
                            </p>
                        )}
                    </NavLink>
                    <NavLink to={'/dashboard/post'} className={navItemClasses}>
                        <FaTasks className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'} />
                        {isToggle && (
                            <p>
                                {t('sidebar.tasks')}
                            </p>
                        )}
                    </NavLink>
                    <NavLink to={'/'} className={navItemClasses}>
                        <RiBankFill className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'} />
                        {isToggle && (
                            <p>
                                {t('sidebar.payements')}
                            </p>
                        )}
                    </NavLink>
                    <NavLink to={'/dashboard/settings'} className={navItemClasses}>
                        <MdOutlineSettings className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'} />
                        {isToggle && (
                            <p>
                                {t('sidebar.settings')}
                            </p>
                        )}
                    </NavLink>
                    <NavLink to={'/'} className={navItemClasses}>
                        <MdOutlineLogout className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'} />
                        {isToggle && (
                            <p>
                                {t('sidebar.logout')}
                            </p>
                        )}
                    </NavLink>
                </ul>
            </nav>
            <Separator className={`${isToggle ? 'mt-4' : 'mt-0'}`} />
        </aside>
    );
}

export default Sidebar;
