import { useState } from 'react';
import LanguageSwitcher from '@/components/custom/LanguageSwitcher';
import { ModeToggle } from "@/components/mode-toggle";
import CTALogsUser from "@/components/custom/CTALogsUser.tsx";
import Logo from "@/components/custom/Logo";
import Nav from "@/components/custom/Nav";
import BtnMenu from "@/components/custom/BtnMenu";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-card relative flex justify-between items-center md:h-20">
            <Logo link={true} size={'sm'} />
            <BtnMenu className={'z-20 md:hidden'} onClick={toggleMenu} isOpen={!isOpen} size={32} />
            <section className={`${isOpen ? 'h-full' : 'hidden h-auto md:flex md:items-center'} bg-card w-full fixed top-0 left-0 z-10 md:z-0 md:static transform transition-transform duration-1000 ease-in-out`}>
                <Nav className={'h-1/2'} />
                <section className="h-1/2 flex flex-col justify-center items-center gap-y-4 md:flex-row md:items-center md:gap-x-4">
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
