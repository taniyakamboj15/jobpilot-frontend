import * as yup from 'yup';

export const jobSchema = yup.object({
    company: yup.string().required('Company is required'),
    role: yup.string().required('Role is required'),
    status: yup.string().oneOf(['APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED'] as const).required('Status is required'),
    jobLink: yup.string().url('Invalid URL format').transform((v) => v === '' ? undefined : v).optional(),
    notes: yup.string().max(500, 'Notes are too long').optional(),
    dateApplied: yup.string().required('Date is required'),
}).defined();

// Define the form data type with optional properties
export interface JobFormData {
    company: string;
    role: string;
    status: 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'REJECTED';
    jobLink?: string;
    notes?: string;
    dateApplied: string;
}

// Create a schema that properly validates the form data
export const jobSchemaTyped: yup.ObjectSchema<JobFormData> = jobSchema as any;
