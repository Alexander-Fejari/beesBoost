import {HiOutlineMenuAlt4, HiX} from 'react-icons/hi';
import {LuLayoutDashboard} from 'react-icons/lu';
import {Button} from "@/components/ui/button";
import {useTranslation} from "react-i18next";

interface BtnMenuProps {
    isOpen: boolean
    target: 'header' | 'sidebar'
    size?: number
    onClick?: () => void
    className?: string
}

const BtnMenu = ({isOpen, target, size, onClick, className}: BtnMenuProps) => {
    const {t} = useTranslation();

    if (target === 'header') {
        return (
            <Button className={`${className}`} variant={'ghost'} onClick={onClick}>
                {isOpen && (
                    <HiOutlineMenuAlt4 size={size}/>
                )}
                {!isOpen && (
                    <HiX size={size}/>
                )}
            </Button>
        );

    } else if (target === 'sidebar') {
        return (
            <Button className={`${className} ${isOpen? 'flex items-center gap-x-1.5 leading-none' : ''}`} variant={'ghost'} onClick={onClick}>
                <LuLayoutDashboard />
                {isOpen && (
                    <p>{t('sidebar.dashboard')}</p>
                )}
            </Button>
        );

    } else {
        throw new Error(`Invalid target prop: ${target}`);
    }
};

export default BtnMenu;