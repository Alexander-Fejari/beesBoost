import { createContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuLayoutDashboard, LuUser2 } from 'react-icons/lu';
import { MdOutlineSearch, MdOutlineMessage, MdOutlineNotifications, MdOutlineCalendarMonth, MdOutlineSettings, MdOutlineLogout } from 'react-icons/md';
import { FaTasks } from 'react-icons/fa';
import { RiBankFill } from 'react-icons/ri';

interface SidebarContextType {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const SidebarTest = () => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  const toggleExpanded = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <aside className={`h-screen transition-none duration-0 ${expanded ? 'w-fit' : 'w-11'}`}>
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center header">

        </div>

        <SidebarContext.Provider value={{ expanded, setExpanded: toggleExpanded }}>
          <ul className="flex-1 px-3">
            <li onClick={toggleExpanded} className="py-2 flex items-center">
              <div className="w-6 mr-2">
                <LuLayoutDashboard />
              </div>
              <span className={`transition-all duration-300 ${expanded ? 'opacity-100' : 'opacity-0'}`}>{t('sidebar.dashboard')}</span>
            </li>
            <li onClick={toggleExpanded} className="py-2 flex items-center">
              <div className="w-6 mr-2">
                <LuUser2 />
              </div>
              <span className={`transition-all duration-300 ${expanded ? 'opacity-100' : 'opacity-0'}`}>{t('sidebar.user')}</span>
            </li>
            <li onClick={toggleExpanded} className="py-2 flex items-center">
              <div className="w-6 mr-2">
                <MdOutlineSearch />
              </div>
              <span className={`transition-all duration-300 ${expanded ? 'opacity-100' : 'opacity-0'}`}>{t('sidebar.search')}</span>
            </li>
            <li onClick={toggleExpanded} className="py-2 flex items-center">
              <div className="w-6 mr-2">
                <MdOutlineMessage />
              </div>
              <span className={`transition-all duration-300 ${expanded ? 'opacity-100' : 'opacity-0'}`}>{t('sidebar.messages')}</span>
           </li>
            <li onClick={toggleExpanded} className="py-2 flex items-center">
              <div className="w-6 mr-2">
                <MdOutlineNotifications />
              </div>
              <span className={`transition-all duration-300 ${expanded ? 'opacity-100' : 'opacity-0'}`}>{t('sidebar.notifications')}</span>
            </li>
            <li onClick={toggleExpanded} className="py-2 flex items-center">
              <div className="w-6 mr-2">
                <MdOutlineCalendarMonth />
              </div>
              <span className={`transition-all duration-300 ${expanded ? 'opacity-100' : 'opacity-0'}`}>{t('sidebar.calendar')}</span>
            </li>
            <li onClick={toggleExpanded} className="py-2 flex items-center">
              <div className="w-6 mr-2">
                <FaTasks />
              </div>
              <span className={`transition-all duration-300 ${expanded ? 'opacity-100' : 'opacity-0'}`}>{t('sidebar.tasks')}</span>
            </li>
            <li onClick={toggleExpanded} className="py-2 flex items-center">
              <div className="w-6 mr-2">
                <RiBankFill />
              </div>
              <span className={`transition-all duration-300 ${expanded ? 'opacity-100' : 'opacity-0'}`}>{t('sidebar.payements')}</span>
            </li>
            <li onClick={toggleExpanded} className="py-2 flex items-center">
              <div className="w-6 mr-2">
                <MdOutlineSettings />
              </div>
              <span className={`transition-all duration-300 ${expanded ? 'opacity-100' : 'opacity-0'}`}>{t('sidebar.settings')}</span>
            </li>
            <li onClick={toggleExpanded} className="py-2 flex items-center">
              <div className="w-6 mr-2">
                <MdOutlineLogout />
              </div>
              <span className={`transition-all duration-300 ${expanded ? 'opacity-100' : 'opacity-0'}`}>{t('sidebar.logout')}</span>
            </li>
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
};

export default SidebarTest;