import { useTranslation } from 'react-i18next';
// import LanguageSwitcher from '@/components/custom/LanguageSwitcher';
import { LegalSelector } from '../legal-selector';
import { LuHexagon } from "react-icons/lu";// import {ModeToggle} from "@/components/mode-toggle";

import logo from '@/assets/logo.png';
import { FaFacebook, FaInstagram, FaTiktok, FaLinkedinIn, FaYoutube } from "react-icons/fa6";


const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="w-full h-auto flex flex-col justify-around items-center p-4 gap-y-2">
            {/* LOGO */}
            <div className="flex flex-col items-center w-full">
                <img className='h-[3rem] w-auto pb-4' src={logo} alt="logo" />
            </div>
            {/* NAVBAR */}
            <ul className='md:flex gap-4 gap-y-2 text-xs'>
                <li className='flex gap-1 items-center group'>
                    <LuHexagon className={`text-primary ${'group-hover:fill-primary'}`} />
                    <a href="/">{t('navbar.home')}</a>
                </li>
                <li className='flex gap-1 items-center group'>
                <LuHexagon className={`text-primary ${'group-hover:fill-primary'}`} />
                    <a href="/services">{t('navbar.services')}</a>
                </li>
                <li className='flex gap-1 items-center group'>
                <LuHexagon className={`text-primary ${'group-hover:fill-primary'}`} />
                    <a href="/contact">Contact</a>
                </li>
                <li className='flex gap-1 items-center group'>
                <LuHexagon className={`text-primary ${'group-hover:fill-primary'}`} />
                    <a href="/faq">FAQ</a>
                </li>
            </ul>
            {/* SERVICES */}
            <div className='flex flex-col md:flex-row w-full justify-between items-center'>
                <div className="order-last md:order-first md:basis-1/3 md:flex md:justify-start">
                    <LegalSelector />
                </div>
                <div className="md:basis-1/3 md:flex md:justify-center ">
                    <div className="gap-2 flex justify-center">
                        <a href="https://www.facebook.com/beesboost" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="transition-transform transform hover:scale-110" />
                        </a>
                        <a href="https://www.instagram.com/beesboost/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="transition-transform transform hover:scale-110" />
                        </a>
                        <a href="https://www.tiktok.com/@beesboost" target="_blank" rel="noopener noreferrer">
                            <FaTiktok className="transition-transform transform hover:scale-110" />
                        </a>
                        <a href="https://www.linkedin.com/company/bees-boost/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedinIn className="transition-transform transform hover:scale-110" />
                        </a>
                        <a href="https://www.youtube.com/@beesboost" target="_blank" rel="noopener noreferrer">
                            <FaYoutube className="transition-transform transform hover:scale-110" />
                        </a>
                    </div>
                </div>
                <div className="order-first md:order-last md:basis-1/3 md:flex md:justify-end">
                    {/* <LanguageSwitcher />  CHANGER LE SWITCHER EN TXT*/}
                </div>
            </div>
            <hr />
            {/* COPYRIGHT */}
            <div className="text-center pt-4 text-neutral-400 text-sm font-normal font-['Poppins'] leading-none w-full">Copyrights © 2023 Bees Boost | Powered by Bees Boost</div>
        </footer>
    );
};

export default Footer;