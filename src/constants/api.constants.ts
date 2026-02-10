export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH_TOKEN: '/auth/refresh-token',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
    },
    JOBS: {
        BASE: '/jobs',
        BY_ID: (id: string) => `/jobs/${id}`,
    },
    INTERVIEWS: {
        BASE: '/interviews',
        BY_ID: (id: string) => `/interviews/${id}`,
    },
    ANALYTICS: {
        DASHBOARD: '/analytics/dashboard',
        USER_ANALYTICS: '/analytics',
    },
} as const;
