import {FaFacebook, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube} from 'react-icons/fa';
import {Link} from "react-router-dom";

interface SocialMediaLinkProps {
    href: string;
    icon: React.ReactElement;
}

const SocialMediaLink = ({href, icon}: SocialMediaLinkProps) => {
    return (
        <Link to={href} target="_blank" rel="noopener noreferrer"
              className="transition ease-in-out delay-150 hover:scale-125 hover:text-primary">
            {icon}
        </Link>
    );
};
const SocialMediaLinks = () => {
    return (
        <section className={`flex justify-center gap-4`}>
            <SocialMediaLink href="https://www.facebook.com/beesboost"
                             icon={<FaFacebook/>}
            />
            <SocialMediaLink href="https://www.instagram.com/beesboost/"
                             icon={<FaInstagram/>}
            />
            <SocialMediaLink href="https://www.tiktok.com/@beesboost"
                             icon={<FaTiktok/>}
            />
            <SocialMediaLink href="https://www.linkedin.com/company/bees-boost/"
                             icon={<FaLinkedinIn/>}
            />
            <SocialMediaLink href="https://www.youtube.com/@beesboost"
                             icon={<FaYoutube/>}
            />
        </section>
    );
};

export default SocialMediaLinks;
