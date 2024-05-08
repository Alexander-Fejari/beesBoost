import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import NotFound from '@/pages/notFound/NotFound.tsx';
import DesignSystem from '@/pages/designSystem/DesignSystem.tsx';
import Home from '@/pages/home/Home.tsx';
import Faq from '@/pages/FAQ/Faq.tsx';
import Contact from  '@/pages/contact/Contact.tsx';
import Blog from '@/pages/blog/Blog.tsx';
import Dashboard from '@/pages/dashboard/Dashboard.tsx';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="*" element={<NotFound />} />
      <Route path="design-system" element={<DesignSystem/>} />
      <Route index element={<Home />} />
      <Route path="faq" element={<Faq />} />
      <Route path="contact" element={<Contact />} />
      <Route path="blog" element={
        <ProtectedRoute>
          <Blog />
        </ProtectedRoute>
        } />
      <Route path="dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
    </Route>
  )
);

function App() {

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App