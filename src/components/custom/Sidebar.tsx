import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Separator} from "@/components/ui/separator.tsx";
import BtnMenu from "@/components/custom/BtnMenu.tsx";
import {LuUser2} from "react-icons/lu";


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
        <aside className={`${className} w-full`}>
            <nav>
                <Separator/>
                <BtnMenu target={'sidebar'} onClick={toggleSidebar} isOpen={!isToggle}/>
                <Separator/>
                <ul className={`${isToggle ? 'h-full flex flex-col ' : 'hidden md:flex-col'} `}>
                    <li className={'flex items-center gap-x-1.5'}>
                        <LuUser2/>
                        {isToggle && (
                            <p>
                                {t('sidebar.user')}
                            </p>
                        )}
                    </li>
                </ul>
            </nav>

        </aside>
    )
}

export default Sidebar
