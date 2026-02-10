import api from './api';

export interface Interview {
    _id: string;
    jobId: {
        _id: string;
        company: string;
        role: string;
    } | string; // Populated or ID
    companyName?: string; // Derived from populated jobId
    jobRole?: string;    // Derived from populated jobId
    interviewType: 'Technical' | 'HR' | 'Managerial' | 'Final' | 'Other';
    interviewDate: string;
    // time is part of interviewDate
    interviewerName?: string; // Not in backend yet, but kept for future? Or remove.
    meetingLink?: string;     // Not in backend yet
    notes?: string;
    status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface CreateInterviewData {
    jobId: string;
    interviewType: string;
    interviewDate: string; // ISO Date string
    notes?: string;
    // Frontend-only fields if needed, but for payload these are not part of request body usually
    // but the service function takes this type. So we should use a separate type or loosen this.
    // For now, let's match the backend payload.
}

export const interviewService = {
    getAllInterviews: async () => {
        return await api.get('/interviews');
    },

    getInterviewById: async (id: string) => {
        return await api.get(`/interviews/${id}`);
    },

    createInterview: async (data: CreateInterviewData) => {
        return await api.post('/interviews', data);
    },

    updateInterview: async (id: string, data: Partial<CreateInterviewData>) => {
        return await api.put(`/interviews/${id}`, data);
    },

    deleteInterview: async (id: string) => {
        return await api.delete(`/interviews/${id}`);
    }
};
