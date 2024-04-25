import { useTranslation } from 'react-i18next';
import { LuLayoutDashboard, LuUser2 } from 'react-icons/lu';
import { MdOutlineSearch, MdOutlineMessage, MdOutlineNotifications, MdOutlineCalendarMonth, MdOutlineSettings, MdOutlineLogout } from 'react-icons/md';
import { FaTasks } from 'react-icons/fa';
import { RiBankFill } from 'react-icons/ri';
// import LanguageSwitcher from '@/components/custom/LanguageSwitcher';


const Sidebar = () => {
    const { t } = useTranslation();

    return (
        <aside className='hidden md:flex flex-col p-4 md:w-1/12 lg:w-1/5 bg-slate-400'>
            <a className='flex items-center gap-2 text-center'>
                <LuLayoutDashboard/>
                <p className='md:hidden lg:block'>{t('sidebar.dashboard')}</p>
            </a>
            <div className="md:w-1/2 lg:w-full h-px border border-black mt-4"/>
            <div className='flex flex-col gap-2 mt-4'>
                <a className='flex items-center gap-2'>
                    <LuUser2 />
                    <p className='md:hidden lg:block'>{t('sidebar.user')}</p>
                </a>
                <a className='flex items-center gap-2'>
                    <MdOutlineSearch/>
                    <p className='md:hidden lg:block'>{t('sidebar.search')}</p>
                </a>
                <a className='flex items-center gap-2'>
                    <MdOutlineMessage/>
                    <p className='md:hidden lg:block'>{t('sidebar.messages')}</p>
                </a>
                <a className='flex items-center gap-2'>
                    <MdOutlineNotifications/>
                    <p className='md:hidden lg:block'>{t('sidebar.notifications')}</p>
                </a>
                <a className='flex items-center gap-2'>
                    <MdOutlineCalendarMonth/>
                    <p className='md:hidden lg:block'>{t('sidebar.calendar')}</p>
                </a>
                <a className='flex items-center gap-2'>
                    <FaTasks/>
                    <p className='md:hidden lg:block'>{t('sidebar.tasks')}</p>
                </a>
                <a className='flex items-center gap-2'>
                    <RiBankFill/>
                    <p className='md:hidden lg:block'>{t('sidebar.payements')}</p>
                </a>
                <div className="md:w-1/2 lg:w-full h-px border border-black mt-4"/>
                <a className='flex items-center gap-2'>
                    <MdOutlineSettings/>
                    <p className='md:hidden lg:block'>{t('sidebar.settings')}</p>
                </a>
                <a className='flex items-center gap-2'>
                    <MdOutlineLogout/>
                    <p className='md:hidden lg:block'>{t('sidebar.logout')}</p>
                </a>
                </div>
        </aside>
    );
};

export default Sidebar;