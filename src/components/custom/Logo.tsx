import {NavLink} from "react-router-dom";
import logo from "@/assets/logo.png";

interface LogoProps {
    size: 'sm' | 'l',
    link: boolean
}

const Logo = ({size, link}: LogoProps) => {
    let sizesClasses;
    switch (size) {
        case "sm":
            sizesClasses = 'w-40 h-auto'
            break;
        case "l":
            sizesClasses = 'w-52 h-auto'
    }
    return (
        <>
            {link === false && (
                <img className={`${sizesClasses}`} src={logo} alt={'logo Bees Boost'}/>
            )}
            {link === true && (
                <NavLink to={'/'}>
                    <img className={`${sizesClasses}`} src={logo} alt={'logo Bees Boost'}/>
                </NavLink>
            )}
        </>
    )
}

export default Logo
