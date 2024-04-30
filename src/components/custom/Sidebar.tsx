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
    <aside className={'transition-none duration-0 w-fit'}>
      <nav className="h-full flex flex-col">
        <SidebarContext.Provider value={{ expanded, setExpanded: toggleExpanded }}>
          <ul className="flex flex-col px-3">
            <li onClick={toggleExpanded} className="py-2 flex items-center">
              <div className="w-6 h-6 mr-2 flex justify-center items-center">
                <LuLayoutDashboard />
              </div>
              <div className={`transition-none duration-0 ${expanded ? 'visible' : 'invisible'}`}>{t('sidebar.dashboard')}</div>
            </li>
            <li onClick={toggleExpanded} className="py-2 flex items-center">
              <div className="w-6 h-6 mr-2 flex justify-center items-center">
                <LuUser2 />
              </div>
              <div className={`transition-none duration-0 ${expanded ? 'visible' : 'invisible'}`}>{t('sidebar.user')}</div>
            </li>
            <li onClick={toggleExpanded} className="py-2 flex items-center">
              <div className="w-6 h-6 mr-2 flex justify-center items-center">
                <MdOutlineSearch />
              </div>
              <div className={`transition-none duration-0 ${expanded ? 'visible' : 'invisible'}`}>{t('sidebar.search')}</div>
            </li>
            <li onClick={toggleExpanded} className="py-2 flex items-center">
              <div className="w-6 h-6 mr-2 flex justify-center items-center">
                <MdOutlineMessage />
              </div>
              <div className={`transition-none duration-0 ${expanded ? 'visible' : 'invisible'}`}>{t('sidebar.messages')}</div>
           </li>
            <li onClick={toggleExpanded} className="py-2 flex items-center">
              <div className="w-6 h-6 mr-2 flex justify-center items-center">
                <MdOutlineNotifications />
              </div>
              <div className={`transition-none duration-0 ${expanded ? 'visible' : 'invisible'}`}>{t('sidebar.notifications')}</div>
            </li>
            <li onClick={toggleExpanded} className="py-2 flex items-center">
              <div className="w-6 h-6 mr-2 flex justify-center items-center">
                <MdOutlineCalendarMonth />
              </div>
              <div className={`transition-none duration-0 ${expanded ? 'visible' : 'invisible'}`}>{t('sidebar.calendar')}</div>
            </li>
            <li onClick={toggleExpanded} className="py-2 flex items-center">
              <div className="w-6 h-6 mr-2 flex justify-center items-center">
                <FaTasks />
              </div>
              <div className={`transition-none duration-0 ${expanded ? 'visible' : 'invisible'}`}>{t('sidebar.tasks')}</div>
            </li>
            <li onClick={toggleExpanded} className="py-2 flex items-center">
              <div className="w-6 h-6 mr-2 flex justify-center items-center">
                <RiBankFill />
              </div>
              <div className={`transition-none duration-0 ${expanded ? 'visible' : 'invisible'}`}>{t('sidebar.payements')}</div>
            </li>
            <li onClick={toggleExpanded} className="py-2 flex items-center">
              <div className="w-6 h-6 mr-2 flex justify-center items-center">
                <MdOutlineSettings />
              </div>
              <div className={`transition-none duration-0 ${expanded ? 'visible' : 'invisible'}`}>{t('sidebar.settings')}</div>
            </li>
            <li onClick={toggleExpanded} className="py-2 flex items-center">
              <div className="w-6 h-6 mr-2 flex justify-center items-center">
                <MdOutlineLogout />
              </div>
              <div className={`transition-none duration-0 ${expanded ? 'visible' : 'invisible'}`}>{t('sidebar.logout')}</div>
            </li>
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
};

export default SidebarTest;
