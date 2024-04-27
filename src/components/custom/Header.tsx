import LanguageSwitcher from '@/components/custom/LanguageSwitcher';
import {ModeToggle} from "@/components/mode-toggle";
import CTALogsUser from "@/components/custom/CTALogsUser.tsx";
import Logo from "@/components/custom/Logo";
import Nav from "@/components/custom/Nav";


const Header = () => {

    return (
        <header>
            <Logo size={'sm'}/>
            <Nav/>
            <LanguageSwitcher/>
            <ModeToggle/>
            <CTALogsUser isLog={false}/>
        </header>
    );
};

export default Header;
