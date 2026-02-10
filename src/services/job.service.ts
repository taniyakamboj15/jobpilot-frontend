import api from './api';
import type { JobData, JobQueryParams } from '../types/job.types';
import { API_ENDPOINTS } from '../constants';

export const jobService = {
    async getAllJobs(params: JobQueryParams = {}) {
        const response = await api.get(API_ENDPOINTS.JOBS.BASE, { params });
        return response.data;
    },

    async getJobById(id: string) {
        const response = await api.get(API_ENDPOINTS.JOBS.BY_ID(id));
        return response.data;
    },

    async createJob(data: JobData) {
        const response = await api.post(API_ENDPOINTS.JOBS.BASE, data);
        return response.data;
    },

    async updateJob(id: string, data: Partial<JobData>) {
        const response = await api.patch(API_ENDPOINTS.JOBS.BY_ID(id), data);
        return response.data;
    },

    async deleteJob(id: string) {
        const response = await api.delete(API_ENDPOINTS.JOBS.BY_ID(id));
        return response.data;
    }
};
