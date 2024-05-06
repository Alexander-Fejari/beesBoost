import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Separator} from "@/components/ui/separator.tsx";
import BtnMenu from "@/components/custom/BtnMenu.tsx";



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
        <aside className={`${className}`}>
            <nav>
                <Separator />
                <BtnMenu onClick={toggleSidebar} isOpen={!isToggle} target={'sidebar'} />
                <Separator />
                <ul className={' leading-none'}>
                    <li>
                        {t('sidebar.user')}
                    </li>
                </ul>
            </nav>

        </aside>
    )
}

export default Sidebar