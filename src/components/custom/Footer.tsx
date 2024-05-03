import {FaFacebook, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube} from "react-icons/fa6";
import {LegalSelector} from '../legal-selector';
import Nav from "@/components/custom/Nav.tsx";
import Logo from "@/components/custom/Logo.tsx";
import LanguageSwitcher from "@/components/custom/LanguageSwitcher.tsx";


const Footer = () => {
    return (
        <footer className="w-full h-auto flex flex-col justify-around items-center p-4 gap-y-4">
            {/* LOGO */}
            <Logo size={'xs'} link={true}/>
            {/* NAVBAR */}
            <Nav puces={true}/>
            {/* SERVICES */}
            <div className='flex flex-col md:flex-row w-full justify-between items-center'>
                <div className="order-last md:order-first md:basis-1/3 md:flex md:justify-start">
                    <LegalSelector />
                </div>
                <div className="md:basis-1/3 md:flex md:justify-center ">
                    <div className="gap-2 flex justify-center">
                        <a href="https://www.facebook.com/beesboost" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="transition-transform transform hover:scale-110"/>
                        </a>
                        <a href="https://www.instagram.com/beesboost/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="transition-transform transform hover:scale-110"/>
                        </a>
                        <a href="https://www.tiktok.com/@beesboost" target="_blank" rel="noopener noreferrer">
                            <FaTiktok className="transition-transform transform hover:scale-110"/>
                        </a>
                        <a href="https://www.linkedin.com/company/bees-boost/" target="_blank"
                           rel="noopener noreferrer">
                            <FaLinkedinIn className="transition-transform transform hover:scale-110"/>
                        </a>
                        <a href="https://www.youtube.com/@beesboost" target="_blank" rel="noopener noreferrer">
                            <FaYoutube className="transition-transform transform hover:scale-110"/>
                        </a>
                    </div>
                </div>
                <div className="order-first md:order-last md:basis-1/3 md:flex md:justify-end">
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
