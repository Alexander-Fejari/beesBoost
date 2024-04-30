import {HiOutlineMenuAlt4, HiX} from 'react-icons/hi';
import {Button} from "@/components/ui/button";

interface btnMenuProps {
    isOpen: boolean
    size?: number
    onClick?: () => void
    className?: string
}

const btnMenu = ({isOpen, size, onClick, className}: btnMenuProps) => {
    return (
        <Button className={`${className}`} variant={'ghost'} onClick={onClick}>
            {isOpen && (
                <HiOutlineMenuAlt4 size={size}/>
            )}
            {!isOpen && (
                <HiX size={size}/>
            )}
        </Button>
    )
}
export default btnMenu;
