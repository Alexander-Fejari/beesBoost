import {LegalSelector} from '../legal-selector';
import Nav from "@/components/custom/Nav.tsx";
import Logo from "@/components/custom/Logo.tsx";
import LanguageSwitcher from "@/components/custom/LanguageSwitcher.tsx";
import SocialMediaLinks from "@/components/custom/SocialMediaLinks";
import {Separator} from "@/components/ui/separator"


interface FooterProps {
    className?:string
}

const Footer = ({className}:FooterProps) => {
    return (
        <footer className={`${className} flex flex-col items-center gap-y-4`}>
            <Separator />
            <section className={'flex flex-col justify-center items-center gap-y-4'}>
                <Logo link={true} size={'l'}/>
                <Nav puces={true} fontSize={"xs"}/>
            </section>
            <SocialMediaLinks />
            <section className="w-full flex justify-center items-center gap-x-4 md:justify-around">
                <LegalSelector />
                <LanguageSwitcher />
            </section>
        </footer>
    );
};
export default Footer;
