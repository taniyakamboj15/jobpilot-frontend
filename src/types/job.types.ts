export interface JobData {
    company: string;
    role: string;
    status: string;
    jobLink?: string;
    notes?: string;
    dateApplied?: string;
}

export interface Job extends JobData {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface JobQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    sort?: string;
}
