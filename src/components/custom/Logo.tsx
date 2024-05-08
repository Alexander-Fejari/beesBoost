import { NavLink } from "react-router-dom";
import logoBlack from "@/assets/logoBlack.png";
import logoOrange from "@/assets/logoOrange.png";
import { useTheme } from "@/components/theme-provider";

interface LogoProps {
    size: 'xs' | 'l';
    link: boolean;
}

const Logo = ({ size, link }: LogoProps) => {
    const { theme } = useTheme();

    let logoSrc;
    if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        logoSrc = systemTheme === "dark"? logoOrange : logoBlack;
    } else {
        logoSrc = theme === "dark"? logoOrange : logoBlack;
    }

    const sizesClasses = {
        xs: 'w-28 h-auto',
        l: 'w-36 h-auto',
    }[size];

    return (
        <>
            {link? (
                <NavLink to={'/'}>
                    <img className={sizesClasses} src={logoSrc} alt={'logo Bees Boost'} />
                </NavLink>
            ) : (
                <img className={sizesClasses} src={logoSrc} alt={'logo Bees Boost'} />
            )}
        </>
    );
};

export default Logo;
