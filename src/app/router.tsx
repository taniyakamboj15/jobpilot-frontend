import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import ProtectedLayout from '../components/ProtectedLayout';
import { Spinner } from '../components/icons';
import { APP_ROUTES } from '../constants';

// --- Loading Fallback ---
export const PageLoader = () => (
    <div className="flex h-screen w-full items-center justify-center">
        <Spinner size={32} className="text-primary-600" />
    </div>
);

// --- Lazy-loaded Page Components (Top-level) ---
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const JobsPage = lazy(() => import('../pages/JobsPage'));
const AddJobPage = lazy(() => import('../pages/AddJobPage'));
const EditJobPage = lazy(() => import('../pages/EditJobPage'));
const InterviewsPage = lazy(() => import('../pages/InterviewsPage'));
const ScheduleInterviewPage = lazy(() => import('../pages/ScheduleInterviewPage'));

// AnalyticsPage uses a named export
const AnalyticsPage = lazy(() =>
    import('../pages/AnalyticsPage').then(m => ({ default: m.AnalyticsPage }))
);

/**
 * Route Configuration using React Router v7 Data API
 * Senior pattern: Static structure with top-level lazy declarations and Suspense handling
 */
const router = createBrowserRouter([
    {
        path: APP_ROUTES.LOGIN,
        element: (
            <Suspense fallback={<PageLoader />}>
                <LoginPage />
            </Suspense>
        ),
    },
    {
        path: APP_ROUTES.REGISTER,
        element: (
            <Suspense fallback={<PageLoader />}>
                <RegisterPage />
            </Suspense>
        ),
    },
    {
        path: '/',
        element: (
            <Suspense fallback={<PageLoader />}>
                <ProtectedLayout />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: <Navigate to={APP_ROUTES.DASHBOARD} replace />,
            },
            {
                path: APP_ROUTES.DASHBOARD.split('/')[1],
                element: <DashboardPage />,
            },
            {
                path: APP_ROUTES.JOBS.LIST.split('/')[1],
                element: <JobsPage />,
            },
            {
                path: APP_ROUTES.JOBS.ADD.split('/jobs/')[1],
                element: <AddJobPage />,
            },
            {
                path: APP_ROUTES.JOBS.EDIT_RAW.split('/jobs/')[1],
                element: <EditJobPage />,
            },
            {
                path: APP_ROUTES.INTERVIEWS.LIST.split('/')[1],
                element: <InterviewsPage />,
            },
            {
                path: APP_ROUTES.INTERVIEWS.SCHEDULE.split('/interviews/')[1],
                element: <ScheduleInterviewPage />,
            },
            {
                path: APP_ROUTES.INTERVIEWS.EDIT_RAW.split('/interviews/')[1],
                element: <ScheduleInterviewPage />,
            },
            {
                path: APP_ROUTES.ANALYTICS.split('/')[1],
                element: <AnalyticsPage />,
            },
        ],
    },
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};
