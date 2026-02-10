import api from './api';
import type { AnalyticsResponse } from '../types/analytics.types';
import { API_ENDPOINTS } from '../constants';

export const analyticsService = {
    async getDashboardAnalytics() {
        const response = await api.get<AnalyticsResponse>(API_ENDPOINTS.ANALYTICS.DASHBOARD);
        return response.data;
    }
};
