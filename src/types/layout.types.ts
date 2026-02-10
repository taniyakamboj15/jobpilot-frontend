import type { ReactNode } from 'react';

export interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export interface NavbarProps {
    toggleSidebar: () => void;
}

export interface ProtectedLayoutProps {
    children?: ReactNode;
}
