import logo from "@/assets/logo.png";

interface LogoProps {
    size: 'sm' | 'l'
}

const Logo = ({size}:LogoProps) => {
    let sizesClasses;
    switch (size) {
        case "sm":
            sizesClasses = 'w-40 h-auto'
            break;
        case "l":
            sizesClasses = 'w-52 h-auto'
    }
    return  (
        <>
            <img className={`${sizesClasses}`} src={logo} alt={'logo Bees Boost'}/>

        </>
    )
}

export default Logo
