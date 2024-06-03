import {useAuthStore} from "@/store/Store.tsx";
import HomeHero from "@/components/custom/Dashboard/HomeHero.tsx";


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
