import * as yup from 'yup';
import { JOB_STATUS_VALUES } from '../constants';
import type { JobFormData } from '../types/job.types';
export type { JobFormData };

export const jobSchema = yup.object({
    company: yup.string().required('Company is required'),
    role: yup.string().required('Role is required'),
    status: yup.string().oneOf(JOB_STATUS_VALUES).required('Status is required'),
    jobLink: yup.string().url('Invalid URL format').transform((v) => v === '' ? undefined : v).optional(),
    notes: yup.string().max(500, 'Notes are too long').optional(),
    dateApplied: yup.string().required('Date is required'),
}).defined();

// Create a schema that properly validates the form data
export const jobSchemaTyped: yup.ObjectSchema<JobFormData> = jobSchema as any;
