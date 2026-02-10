import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobService } from '../services/job.service';
import type { JobData, JobQueryParams } from '../types/job.types';

export const useJobs = (params?: JobQueryParams) => {
    const jobsQuery = useQuery({
        queryKey: ['jobs', params],
        queryFn: () => jobService.getAllJobs(params),
    });

    return {
        jobs: jobsQuery.data?.jobs ?? [],
        isLoading: jobsQuery.isLoading,
        isError: jobsQuery.isError,
        error: jobsQuery.error,
    };
};

export const useJobMutations = () => {
    const queryClient = useQueryClient();

    const createJobMutation = useMutation({
        mutationFn: (data: JobData) => jobService.createJob(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
        },
    });

    const updateJobMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<JobData> }) =>
            jobService.updateJob(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            queryClient.invalidateQueries({ queryKey: ['job'] });
        },
    });

    const deleteJobMutation = useMutation({
        mutationFn: (id: string) => jobService.deleteJob(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
        },
    });

    return {
        createJob: createJobMutation.mutateAsync,
        updateJob: updateJobMutation.mutateAsync,
        deleteJob: deleteJobMutation.mutateAsync,
        isCreating: createJobMutation.isPending,
        isUpdating: updateJobMutation.isPending,
        isDeleting: deleteJobMutation.isPending,
    };
};

export const useJob = (id: string) => {
    return useQuery({
        queryKey: ['job', id],
        queryFn: () => jobService.getJobById(id),
        enabled: !!id,
    });
};
