import api from './api';
import type { JobData, JobQueryParams } from '../types/job.types';

export const jobService = {
    async getAllJobs(params: JobQueryParams = {}) {
        const response = await api.get('/jobs', { params });
        return response.data;
    },

    async getJobById(id: string) {
        const response = await api.get(`/jobs/${id}`);
        return response.data;
    },

    async createJob(data: JobData) {
        const response = await api.post('/jobs', data);
        return response.data;
    },

    async updateJob(id: string, data: Partial<JobData>) {
        const response = await api.patch(`/jobs/${id}`, data);
        return response.data;
    },

    async deleteJob(id: string) {
        const response = await api.delete(`/jobs/${id}`);
        return response.data;
    }
};
