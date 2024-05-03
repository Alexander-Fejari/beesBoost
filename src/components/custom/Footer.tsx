import {LegalSelector} from '../legal-selector';
import Nav from "@/components/custom/Nav.tsx";
import Logo from "@/components/custom/Logo.tsx";
import LanguageSwitcher from "@/components/custom/LanguageSwitcher.tsx";
import SocialMediaLinks from "@/components/custom/SocialIcon";


const Footer = () => {
    return (
        <footer className="before:border-t before:rounded-full before:border-t-4 before:border-primary before:w-10/12 w-full h-auto flex flex-col justify-around items-center gap-y-4">
            {/* LOGO */}
            <Logo size={'xs'} link={true}/>
            {/* NAVBAR */}
            <Nav puces={true}/>
            {/* SERVICES */}
            <div className='flex flex-col lg:flex-row w-full justify-between items-center'>
                <div className="order-last lg:order-first lg:basis-1/3 lg:flex lg:justify-start">
                    <LegalSelector />
                </div>
                <div className="lg:basis-1/3 lg:flex lg:justify-center ">
                    <SocialMediaLinks />
                </div>
                <div className="order-first lg:order-last lg:basis-1/3 lg:flex lg:justify-end">
                    <LanguageSwitcher />
                </div>
            </div>
            <hr/>
            {/* COPYRIGHT */}
            <div className="text-center pt-4 text-neutral-400 text-sm font-normal font-poppins leading-none w-full">
                <p>
                    Copyrights © 2023 Bees Boost | Powered by Bees Boost
                </p>
            </div>
        </footer>
    );
};

export default Footer;
