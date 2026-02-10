import {
    LayoutDashboard,
    Briefcase,
    Calendar,
    BarChart3,
    type LucideIcon
} from '../components/icons';

export const APP_ROUTES = {
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    JOBS: {
        LIST: '/jobs',
        ADD: '/jobs/add',
        EDIT_RAW: '/jobs/edit/:id',
        EDIT: (id: string) => `/jobs/edit/${id}`,
    },
    INTERVIEWS: {
        LIST: '/interviews',
        SCHEDULE: '/interviews/schedule',
        EDIT_RAW: '/interviews/edit/:id',
        EDIT: (id: string) => `/interviews/edit/${id}`,
    },
    ANALYTICS: '/analytics',
} as const;

export interface NavItem {
    name: string;
    icon: LucideIcon;
    path: string;
}

export const NAV_ITEMS: NavItem[] = [
    { name: 'Dashboard', icon: LayoutDashboard, path: APP_ROUTES.DASHBOARD },
    { name: 'My Jobs', icon: Briefcase, path: APP_ROUTES.JOBS.LIST },
    { name: 'Interviews', icon: Calendar, path: APP_ROUTES.INTERVIEWS.LIST },
    { name: 'Analytics', icon: BarChart3, path: APP_ROUTES.ANALYTICS },
];
