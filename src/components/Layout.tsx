import React from 'react';
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import Sidebar from "@/components/custom/Sidebar";
import { useAuth } from "@/context/AuthContext"; 

interface LayoutProps {
    children?: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
    const { isAuthenticated } = useAuth(); 
    return (
        <section className={'h-dvh p-6 grid grid-rows-sm md:grid-cols-lg md:grid-rows-lg'}>
            <Header className="col-span-5" />
            {isAuthenticated && <Sidebar className="w-full col-span-5 row-start-2 md:row-span-3 md:col-span-1" />}
            <main className="col-span-5 row-span-3 row-start-3 md:overflow-y-auto md:h-full md:col-span-4 md:col-start-2 md:row-start-2">
                {children}
            </main>
            <Footer className="col-span-5 md:row-start-5" />
        </section>
    );
};

export default Layout;
