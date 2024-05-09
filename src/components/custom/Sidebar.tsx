import {useState} from "react";
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


interface NewSideProps {
    className?: string;
}

const Sidebar = ({className}: NewSideProps) => {
    const {t} = useTranslation()
    const [isToggle, setIsToggle] = useState(false);

    const toggleSidebar = () => {
        setIsToggle(!isToggle);
    };

    return (
        <aside className={`${className} leading-none`}>
                <Separator/>
                <BtnMenu target={'sidebar'} onClick={toggleSidebar} isOpen={!isToggle}/>
                <Separator className={'mb-4'}/>
            <nav>
                <ul className={`h-full flex flex-col gap-y-4`}>
                    <li className={`flex items-center gap-x-1.5 group md:gap-x-4 ${isToggle ? 'flex' : 'hidden md:flex'}`}>
                        <LuUser2 className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'}/>
                        {isToggle && (
                            <p>
                                {t('sidebar.user')}
                            </p>
                        )}
                    </li>
                    <li className={`flex items-center gap-x-1.5 group md:gap-x-4 ${isToggle ? 'flex' : 'hidden md:flex'}`}>
                        <MdOutlineSearch className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'}/>
                        {isToggle && (
                            <p>
                                {t('sidebar.search')}
                            </p>
                        )}
                    </li>
                    <li className={`flex items-center gap-x-1.5 group md:gap-x-4 ${isToggle ? 'flex' : 'hidden md:flex'}`}>
                        <MdOutlineMessage className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'}/>
                        {isToggle && (
                            <p>
                                {t('sidebar.messages')}
                            </p>
                        )}
                    </li>
                    <li className={`flex items-center gap-x-1.5 group md:gap-x-4 ${isToggle ? 'flex' : 'hidden md:flex'}`}>
                        <MdOutlineNotifications className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'}/>
                        {isToggle && (
                            <p>
                                {t('sidebar.notifications')}
                            </p>
                        )}
                    </li>
                    <li className={`flex items-center gap-x-1.5 group md:gap-x-4 ${isToggle ? 'flex' : 'hidden md:flex'}`}>
                        <MdOutlineCalendarMonth className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'}/>
                        {isToggle && (
                            <p>
                                {t('sidebar.calendar')}
                            </p>
                        )}
                    </li>
                    <li className={`flex items-center gap-x-1.5 group md:gap-x-4 ${isToggle ? 'flex' : 'hidden md:flex'}`}>
                        <FaTasks className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'}/>
                        {isToggle && (
                            <p>
                                {t('sidebar.tasks')}
                            </p>
                        )}
                    </li>
                    <li className={`flex items-center gap-x-1.5 group md:gap-x-4 ${isToggle ? 'flex' : 'hidden md:flex'}`}>
                        <RiBankFill className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'}/>
                        {isToggle && (
                            <p>
                                {t('sidebar.payements')}
                            </p>
                        )}
                    </li>
                    <li className={`flex items-center gap-x-1.5 group md:gap-x-4 ${isToggle ? 'flex' : 'hidden md:flex'}`}>
                        <MdOutlineSettings className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'}/>
                        {isToggle && (
                            <p>
                                {t('sidebar.settings')}
                            </p>
                        )}
                    </li>
                    <li className={`flex items-center gap-x-1.5 group md:gap-x-4 ${isToggle ? 'flex' : 'hidden md:flex'}`}>
                        <MdOutlineLogout className={'transition ease-in-out delay-150 group-hover:scale-125 group-hover:text-primary'}/>
                        {isToggle && (
                            <p>
                                {t('sidebar.logout')}
                            </p>
                        )}
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
export default Sidebar
