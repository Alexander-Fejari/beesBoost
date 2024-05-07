import Header from "@/components/custom/Header"
import Footer from "@/components/custom/Footer"
import Sidebar from "@/components/custom/Sidebar.tsx";

interface LayoutProps {
    children?: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
    return (
        <section className={'h-dvh p-6 grid grid-cols-mobile grid-rows-mobile md:grid-cols-desktop md:grid-rows-desktop'}>
            <Header className="col-span-5 h-full" />
            <Sidebar className="w-full col-span-5 row-start-2 md:row-span-3 md:col-span-1" />
            <main className="col-span-4 row-span-3 row-start-3 h-full overflow-y-auto md:col-start-2 md:row-start-2">
                {children}
            </main>
            <Footer className="h-max col-span-5 md:row-start-5" />
        </section>
    )
}

export default Layout
