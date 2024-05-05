import {FaFacebook, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube} from 'react-icons/fa';
import {Link} from "react-router-dom";

interface SocialMediaLinkProps {
    href: string;
    icon: React.ReactElement;
}

const SocialMediaLink = ({href, icon}: SocialMediaLinkProps) => {
    return (
        <Link to={href} target="_blank" rel="noopener noreferrer">
            {icon}
        </Link>
    );
};
const SocialMediaLinks = () => {
    return (
        <section className={`flex justify-center gap-4`}>
            <SocialMediaLink href="https://www.facebook.com/beesboost"
                             icon={<FaFacebook
                                 className="transition-transform transform hover:scale-125 hover:text-primary"/>}
            />
            <SocialMediaLink href="https://www.instagram.com/beesboost/"
                             icon={<FaInstagram
                                 className="transition-transform transform hover:scale-125 hover:text-primary"/>}
            />
            <SocialMediaLink href="https://www.tiktok.com/@beesboost"
                             icon={<FaTiktok
                                 className="transition-transform transform hover:scale-125 hover:text-primary"/>}
            />
            <SocialMediaLink href="https://www.linkedin.com/company/bees-boost/"
                             icon={<FaLinkedinIn
                                 className="transition-transform transform hover:scale-125 hover:text-primary"/>}
            />
            <SocialMediaLink href="https://www.youtube.com/@beesboost"
                             icon={<FaYoutube
                                 className="transition-transform transform hover:scale-125 hover:text-primary"/>}
            />
        </section>
    );
};

export default SocialMediaLinks;
