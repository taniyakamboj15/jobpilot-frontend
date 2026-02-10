import { NavLink, useNavigate } from 'react-router-dom';
import {
    LogOut,
    Menu,
    X,
    User as UserIcon
} from './icons';
import { useAuth } from '../hooks/useAuth';
import { Button } from './FormElements';

import type { SidebarProps, NavbarProps } from '../types/layout.types';

import { NAV_ITEMS } from '../constants';

export const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:static lg:translate-x-0
            `}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
                        <span className="text-xl font-bold text-primary-600">JobPilot</span>
                        <button onClick={toggleSidebar} className="lg:hidden">
                            <X className="h-6 w-6 text-gray-500" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1">
                        {NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `
                                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                                    ${isActive
                                        ? 'bg-primary-50 text-primary-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                                `}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* User Profile & Logout */}
                    <div className="p-4 border-t border-gray-100">
                        <div className="flex items-center px-4 py-3 mb-4 space-x-3">
                            <div className="shrink-0">
                                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                    <UserIcon className="h-6 w-6 text-primary-600" />
                                </div>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {user?.name || 'User'}
                                </p>
                                <p className="text-xs text-gray-500 truncate lowercase">
                                    {user?.role || 'Job Seeker'}
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full flex items-center justify-center text-red-600 border-red-100 hover:bg-red-50 hover:border-red-200"
                            onClick={handleLogout}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export const Navbar = ({ toggleSidebar }: NavbarProps) => {
    return (
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 lg:hidden">
            <div className="flex items-center justify-between h-16 px-4">
                <div className="flex items-center">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 -ml-2 text-gray-500 rounded-md hover:bg-gray-100 lg:hidden"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="ml-2 text-xl font-bold text-primary-600">JobPilot</span>
                </div>
            </div>
        </header>
    );
};
