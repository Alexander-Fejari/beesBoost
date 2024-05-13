import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import {AuthProvider} from './context/AuthContext';
import NotFound from '@/pages/notFound/NotFound.tsx';
import DesignSystem from '@/pages/designSystem/DesignSystem.tsx';
import Home from '@/pages/home/Home.tsx';
import Faq from '@/pages/FAQ/Faq.tsx';
import Contact from '@/pages/contact/Contact.tsx';
import Blog from '@/pages/blog/Blog.tsx';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from "@/pages/dashboard/nested/Profile";
import Settings from "@/pages/dashboard/nested/Settings";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path="*" element={<NotFound/>}/>
            <Route path="design-system" element={<DesignSystem/>}/>
            <Route index element={<Home/>}/>
            <Route path="faq" element={<Faq/>}/>
            <Route path="contact" element={<Contact/>}/>
            <Route path="blog" element={<Blog/>}/>
            <Route path="dashboard/profile" element={<ProtectedRoute><Profile></Profile></ProtectedRoute>}/>
            <Route path="dashboard/settings" element={<ProtectedRoute><Settings></Settings></ProtectedRoute>}/>
        </Route>
    )
);

function App() {

    return (
        <>
            <AuthProvider>
                <RouterProvider router={router}/>
            </AuthProvider>
        </>
    )
}

export default App