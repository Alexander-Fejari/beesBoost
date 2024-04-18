import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import NotFound from '@/pages/notFound/NotFound.tsx';
import DesignSystem from '@/pages/designSystem/DesignSystem.tsx';
import Home from '@/pages/home/Home.tsx';
import SignIn from '@/pages/signIn/SignIn.tsx';
import Login from '@/pages/login/Login.tsx';
import './App.css'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
          <Route path="*" element={<NotFound />} />
          <Route path="design-system" element={<DesignSystem/>} />
          <Route index element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="login" element={<Login />} />
        </Route>
    )
);


function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
