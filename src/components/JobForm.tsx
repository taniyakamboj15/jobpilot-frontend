import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import type { JobFormProps } from '../types/job.types';

import { Input, Button } from './FormElements';
import { Select } from './ui/Select';
import { Textarea } from './ui/Textarea';

import { jobSchemaTyped } from '../schemas/job.schema';
import { formatDateInput } from '../utils/helpers';

import type { JobFormData } from '../types/job.types';
import { JOB_STATUS_OPTIONS } from '../constants';

export const JobForm = ({ initialData, onSubmit, loading, onCancel }: JobFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<JobFormData>({
        resolver: yupResolver(jobSchemaTyped),
        defaultValues: initialData ? {
            ...initialData,
            jobLink: initialData.jobLink || '',
            notes: initialData.notes || '',
            dateApplied: formatDateInput(initialData.dateApplied)
        } : {
            status: 'APPLIED',
            jobLink: '',
            notes: '',
            dateApplied: formatDateInput()
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Company Name"
                    placeholder="e.g. Google"
                    error={errors.company?.message?.toString()}
                    {...register('company')}
                />
                <Input
                    label="Role"
                    placeholder="e.g. Software Engineer"
                    error={errors.role?.message?.toString()}
                    {...register('role')}
                />
                <Select
                    label="Status"
                    error={errors.status?.message?.toString()}
                    {...register('status')}
                >
                    {JOB_STATUS_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
                <Input
                    label="Date Applied"
                    type="date"
                    error={errors.dateApplied?.message?.toString()}
                    {...register('dateApplied')}
                />
                <div className="md:col-span-2">
                    <Input
                        label="Job Link (Optional)"
                        placeholder="https://original-job-post.com"
                        error={errors.jobLink?.message?.toString()}
                        {...register('jobLink')}
                    />
                </div>
                <div className="md:col-span-2">
                    <Textarea
                        label="Notes (Optional)"
                        placeholder="Add any specific details or follow-up notes..."
                        error={errors.notes?.message?.toString()}
                        {...register('notes')}
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <Button variant="outline" type="button" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" isLoading={loading}>
                    {initialData ? 'Update Job' : 'Add Job Application'}
                </Button>
            </div>
        </form>
    );
};

