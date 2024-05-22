import {useAuthStore} from "@/store/Store";
import HomeHero from "@/components/custom/HomeHero";


const HeroBanner = () => {
    const {isAuthenticated} = useAuthStore();
    return (
        <>
            {!isAuthenticated && (
                <HomeHero/>
            )}
            {isAuthenticated && (
                <section className='flex items-center gap-x-4'>
                    <h3>Hero log</h3>
                </section>
            )}
        </>
    )
}

export default HeroBanner
