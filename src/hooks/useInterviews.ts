import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { interviewService } from '../services/interview.service';
import type { CreateInterviewData, Interview } from '../types/interview.types';

export const useInterviews = () => {
    const query = useQuery({
        queryKey: ['interviews'],
        queryFn: () => interviewService.getAllInterviews(),
    });

    return {
        interviews: (query.data?.data ?? []) as Interview[],
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
    };
};

export const useInterview = (id: string) => {
    return useQuery({
        queryKey: ['interview', id],
        queryFn: () => interviewService.getInterviewById(id),
        enabled: !!id,
    });
};

export const useInterviewMutations = () => {
    const queryClient = useQueryClient();

    const createInterviewMutation = useMutation({
        mutationFn: (data: CreateInterviewData) => interviewService.createInterview(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['interviews'] });
        },
    });

    const updateInterviewMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<CreateInterviewData> }) =>
            interviewService.updateInterview(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['interviews'] });
            queryClient.invalidateQueries({ queryKey: ['interview'] });
        },
    });

    const deleteInterviewMutation = useMutation({
        mutationFn: (id: string) => interviewService.deleteInterview(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['interviews'] });
        },
    });

    return {
        createInterview: createInterviewMutation.mutateAsync,
        updateInterview: updateInterviewMutation.mutateAsync,
        deleteInterview: deleteInterviewMutation.mutateAsync,
        isCreating: createInterviewMutation.isPending,
        isUpdating: updateInterviewMutation.isPending,
        isDeleting: deleteInterviewMutation.isPending,
    };
};
