import {NavLink} from "react-router-dom";
import logo from "@/assets/logo.png";

interface LogoProps {
    size: 'xs' | 'sm' | 'l',
    link: boolean
}

const Logo = ({size, link}: LogoProps) => {
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
                <img className={`${sizesClasses}`} src={logo} alt={'logo Bees Boost'}/>
            )}
            {link && (
                <NavLink to={'/'}>
                    <img className={`${sizesClasses}`} src={logo} alt={'logo Bees Boost'}/>
                </NavLink>
            )}
        </>
    )
}

export default Logo
