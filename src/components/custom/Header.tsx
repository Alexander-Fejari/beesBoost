import { useLayoutEffect, useState } from 'react';
import LanguageSwitcher from '@/components/custom/LanguageSwitcher';
import { ModeToggle } from '@/components/mode-toggle';
import CTALogsUser from '@/components/custom/CTALogsUser.tsx';
import Logo from '@/components/custom/Logo';
import Nav from '@/components/custom/Nav';
import BtnMenu from '@/components/custom/BtnMenu';

interface HeaderProps {
    className?: string;
}

const Header = ({ className }: HeaderProps) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    useLayoutEffect(() => {
        const body = document.body;
        if (menuIsOpen) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }

        return () => {
            body.style.overflow = 'auto';
        };
    }, [menuIsOpen]);

    const toggleMenu = () => {
        setMenuIsOpen(!menuIsOpen);
    };

    return (
        <header className={`${className} bg-background relative flex justify-between items-center`}>
            <Logo link={true} size={'l'} />
            <BtnMenu target={'header'} className={'z-20 lg:hidden'} onClick={toggleMenu} isOpen={!menuIsOpen} size={32} />
            <section
                className={`${menuIsOpen ? 'translate-x-0' : 'translate-x-full'} bg-background transition duration-300 ease-in-out fixed top-0 left-0 w-full h-full lg:relative lg:translate-x-0 lg:flex lg:items-center lg:justify-between z-10`}
            >
                <Nav />
                <section className="h-1/2 flex flex-col justify-center items-center gap-y-4 lg:flex-row lg:items-center lg:gap-x-4">
                    <section className="flex items-center gap-x-4">
                        <LanguageSwitcher />
                        <ModeToggle />
                    </section>
                    <CTALogsUser isLog={true} />
                </section>
            </section>
        </header>
    );
};

export default Header;
