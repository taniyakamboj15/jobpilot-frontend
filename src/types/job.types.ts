import type { SubmitHandler } from 'react-hook-form';
// Removed circular export type { JobFormData } from '../types/job.types';

export interface JobData {
    company: string;
    role: string;
    status: string;
    jobLink?: string;
    notes?: string;
    dateApplied?: string;
}

export interface JobFormData {
    company: string;
    role: string;
    status: 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'REJECTED';
    jobLink?: string;
    notes?: string;
    dateApplied: string;
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


export interface JobTableProps {
    jobs: Job[];
    onEdit: (job: Job) => void;
    onDelete: (id: string) => void;
}

export interface JobFormProps {
    initialData?: JobFormData & { dateApplied?: string };
    onSubmit: SubmitHandler<JobFormData>;
    loading: boolean;
    onCancel: () => void;
}
