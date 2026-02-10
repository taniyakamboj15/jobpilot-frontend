import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import ProtectedLayout from '../components/ProtectedLayout';
import { Spinner } from '../components/icons';

// Loading fallback component
export const PageLoader = () => (
    <div className="flex h-screen w-full items-center justify-center">
        <Spinner size={32} className="text-primary-600" />
    </div>
);

const router = createBrowserRouter([
    {
        path: '/login',
        lazy: () => import('../pages/LoginPage').then(m => ({ Component: m.default })),
    },
    {
        path: '/register',
        lazy: () => import('../pages/RegisterPage').then(m => ({ Component: m.default })),
    },
    {
        path: '/',
        element: <ProtectedLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" replace />,
            },
            {
                path: 'dashboard',
                lazy: () => import('../pages/DashboardPage').then(m => ({ Component: m.default })),
            },
            {
                path: 'jobs',
                lazy: () => import('../pages/JobsPage').then(m => ({ Component: m.default })),
            },
            {
                path: 'jobs/add',
                lazy: () => import('../pages/AddJobPage').then(m => ({ Component: m.default })),
            },
            {
                path: 'jobs/edit/:id',
                lazy: () => import('../pages/EditJobPage').then(m => ({ Component: m.default })),
            },
            {
                path: 'interviews',
                lazy: () => import('../pages/InterviewsPage').then(m => ({ Component: m.default })),
            },
            {
                path: 'interviews/schedule',
                lazy: () => import('../pages/ScheduleInterviewPage').then(m => ({ Component: m.default })),
            },
            {
                path: 'interviews/edit/:id',
                lazy: () => import('../pages/ScheduleInterviewPage').then(m => ({ Component: m.default })),
            },

            {
                path: 'analytics',
                lazy: () => import('../pages/AnalyticsPage').then(m => ({ Component: m.AnalyticsPage })),
            },
        ],
    },
], {
    hydrationData: undefined, // Optional: for SSR/Hydration
});

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};
