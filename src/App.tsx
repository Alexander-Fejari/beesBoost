import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import NotFound from '@/pages/notFound/NotFound.tsx';
import DesignSystem from '@/pages/designSystem/DesignSystem.tsx';
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from './components/ProtectedRoute';
import Profile from "@/pages/dashboard/nested/Profile";
import Settings from "@/pages/dashboard/nested/Settings";
import PostJobForm from "@/pages/dashboard/nested/Post";
import JobListMain from "./pages/dashboard/nested/Joblist";
import EditPostForm from "./components/custom/JobsControlDetail";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path="*" element={<NotFound />} />
            <Route path="design-system" element={<DesignSystem />} />
            <Route index element={<Dashboard />} />
            <Route path="dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="dashboard/post" element={<ProtectedRoute><PostJobForm /></ProtectedRoute>} />
            <Route path="dashboard/jobs" element={<ProtectedRoute><JobListMain /></ProtectedRoute>} />
            <Route path="/edit/:jobId" element={<ProtectedRoute><EditPostForm /></ProtectedRoute>} />
        </Route>
    )
);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
