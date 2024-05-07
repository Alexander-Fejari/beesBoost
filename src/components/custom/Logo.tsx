import {NavLink} from "react-router-dom";
import logoBlack from "@/assets/logoBlack.png";
import logoOrange from "@/assets/logoOrange.png";
import {useTheme} from "@/components/theme-provider"


interface LogoProps {
    size: 'xs' | 'sm' | 'l',
    link: boolean
}

const Logo = ({size, link}: LogoProps) => {
    const {theme} = useTheme()
    const logoSrc = theme === 'dark'? logoOrange : logoBlack;

    let sizesClasses;
    switch (size) {
        case "xs":
            sizesClasses = 'w-28 h-auto'
            break
        case "l":
            sizesClasses = 'w-36 h-auto'
            break
    }
    return (
        <>
            {!link && (
                <img className={`${sizesClasses}`} src={logoSrc} alt={'logo Bees Boost'}/>
            )}
            {link && (
                <NavLink to={'/'}>
                    <img className={`${sizesClasses}`} src={logoSrc} alt={'logo Bees Boost'}/>
                </NavLink>
            )}
        </>
    )
}

export default Logo
