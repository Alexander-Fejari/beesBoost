import Header from "@/components/custom/Header"
import Footer from "@/components/custom/Footer"
import Sidebar from "@/components/custom/Sidebar"

interface LayoutProps {
    children?: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
    return (
        <section className={'h-dvh p-6 grid grid-cols-mobile grid-rows-mobile md:grid-cols-desktop md:grid-rows-desktop'}>
            <Header className="col-span-5 h-full" />
            <Sidebar className="row-span-3 row-start-2" />
            <main className="col-span-4 row-span-3 row-start-2 h-full overflow-y-auto">
                {children}
            </main>
            <Footer className="col-span-5 row-start-5" />
        </section>
    )
}

export default Layout
