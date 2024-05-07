import { useState } from 'react';
import LanguageSwitcher from '@/components/custom/LanguageSwitcher';
import { ModeToggle } from "@/components/mode-toggle";
import CTALogsUser from "@/components/custom/CTALogsUser.tsx";
import Logo from "@/components/custom/Logo";
import Nav from "@/components/custom/Nav";
import BtnMenu from "@/components/custom/BtnMenu";

interface HeaderProps {
    className?:string
}
const Header = ({className}: HeaderProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className={`${className} bg-background relative flex justify-between items-center`}>
            <Logo link={true} size={'l'} />
            <BtnMenu target={'header'} className={'z-20 lg:hidden'} onClick={toggleMenu} isOpen={!isOpen} size={32} />
            <section className={`${isOpen ? 'bg-background h-dvh fixed top-0 left-0 z-10' : 'hidden h-auto lg:flex lg:items-center'}  w-full  lg:z-0 lg:static`}>
                <Nav />
                <section className="h-1/2 flex flex-col justify-center items-center gap-y-4 lg:flex-row lg:items-center lg:gap-x-4">
                    <section className="flex items-center gap-x-4">
                        <LanguageSwitcher/>
                        <ModeToggle/>
                    </section>
                    <CTALogsUser isLog={false} />
                </section>
            </section>
        </header>
    );
};

export default Header;
