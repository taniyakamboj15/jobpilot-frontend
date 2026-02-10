import api from './api';
import type { LoginCredentials, RegisterData, ResetPasswordData } from '../types/auth.types';
import { API_ENDPOINTS } from '../constants';

export const authService = {
    async login(credentials: LoginCredentials) {
        const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
        return response.data;
    },

    async register(userData: RegisterData) {
        const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
        return response.data;
    },

    async logout() {
        const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
        return response.data;
    },

    async forgotPassword(email: string) {
        const response = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
        return response.data;
    },

    async resetPassword(data: ResetPasswordData) {
        const response = await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
        return response.data;
    }
};
