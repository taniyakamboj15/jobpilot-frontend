import api from './api';
import type { AnalyticsResponse } from '../types/analytics.types';

export const analyticsService = {
    async getDashboardAnalytics() {
        const response = await api.get<AnalyticsResponse>('/analytics/dashboard');
        return response.data;
    }
};
