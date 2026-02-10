import api from './api';
import type { LoginCredentials, RegisterData, ResetPasswordData } from '../types/auth.types';


export const authService = {
    async login(credentials: LoginCredentials) {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    async register(userData: RegisterData) {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    async logout() {
        const response = await api.post('/auth/logout');
        return response.data;
    },

    async forgotPassword(email: string) {
        const response = await api.post('/auth/forgot-password', { email });
        return response.data;
    },

    async resetPassword(data: ResetPasswordData) {
        const response = await api.post('/auth/reset-password', data);
        return response.data;
    }
};
