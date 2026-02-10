import { Suspense, useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { APP_ROUTES } from '../constants';
import { Sidebar, Navbar } from './Navigation';
import { PageLoader } from '../app/router';

const ProtectedLayout = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate(APP_ROUTES.LOGIN);
        }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) {
        return <PageLoader />;
    }

    if (!isAuthenticated) return null;

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />

            <div className="flex flex-col flex-1 min-w-0">
                <Navbar toggleSidebar={() => setIsSidebarOpen(true)} />

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Suspense fallback={<PageLoader />}>
                            <Outlet />
                        </Suspense>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProtectedLayout;
