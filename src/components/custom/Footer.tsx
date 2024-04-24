// import { useTranslation } from 'react-i18next';
// import LanguageSwitcher from '@/components/custom/LanguageSwitcher';
// import {ModeToggle} from "@/components/mode-toggle";

import logo from '@/assets/logo.png';


const Footer = () => {
    // const { t } = useTranslation();

    return (
        <footer className="max-w-full h-auto flex justify-between bg-zinc-100">
            <div className="flex-col">
                <div className="justify-center">
                    <img className='h-[3rem] w-auto ' src={logo} alt="logo" />
                    <div className="flex ">
                        <img className="w-7 h-7  " src="https://via.placeholder.com/27x27" />
                        <img className="w-7 h-7 " src="https://via.placeholder.com/27x27" />
                        <img className="w-7 h-7  " src="https://via.placeholder.com/27x28" />
                        <img className="w-7 h-7  " src="https://via.placeholder.com/27x28" />
                        <img className="w-7 h-7  " src="https://via.placeholder.com/27x27" />
                    </div>
                </div>
            </div>

            <div className="w-40 h-3.5 text-right text-black text-base font-light font-['Poppins'] leading-none">Politique de vie privée</div>
            <div className="w-16 h-7 text-black text-base font-normal font-['Poppins'] leading-relaxed">Français</div>
            <div className="w-96 h-3.5  text-center text-neutral-400 text-sm font-normal font-['Poppins'] leading-none">Copyrights © 2023 Bees Boost | Powered by Bees Boost</div>
        </footer>
    );
};

export default Footer;