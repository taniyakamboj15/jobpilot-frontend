import api from './api';
import type { Interview, CreateInterviewData } from '../types/interview.types';
import { API_ENDPOINTS } from '../constants';

export type { Interview, CreateInterviewData };

export const interviewService = {
    getAllInterviews: async () => {
        return await api.get(API_ENDPOINTS.INTERVIEWS.BASE);
    },

    getInterviewById: async (id: string) => {
        return await api.get(API_ENDPOINTS.INTERVIEWS.BY_ID(id));
    },

    createInterview: async (data: CreateInterviewData) => {
        return await api.post(API_ENDPOINTS.INTERVIEWS.BASE, data);
    },

    updateInterview: async (id: string, data: Partial<CreateInterviewData>) => {
        return await api.put(API_ENDPOINTS.INTERVIEWS.BY_ID(id), data);
    },

    deleteInterview: async (id: string) => {
        return await api.delete(API_ENDPOINTS.INTERVIEWS.BY_ID(id));
    }
};
