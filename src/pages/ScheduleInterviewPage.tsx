import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useSearchParams, useParams, Link } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';
import { useInterview, useInterviewMutations } from '../hooks/useInterviews';
import { Button, Input } from '../components/FormElements';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { ArrowLeft } from '../components/icons';
import { INTERVIEW_TYPE_OPTIONS, INTERVIEW_TYPE_MAP } from '../constants';

import { interviewSchema } from '../schemas/interview.schema';
import type { ScheduleInterviewFormData } from '../types/interview.types';
import { getJobDetails, getFormTitle, getFormDescription } from '../utils/helpers';
import type { Job } from '../types/job.types';
import { APP_ROUTES } from '../constants';

const ScheduleInterviewPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const preSelectedJobId = searchParams.get('jobId');
    const { id } = useParams();
    const isEditMode = !!id;

    const { jobs, isLoading: isJobsLoading } = useJobs();
    const { data: interviewData, isLoading: isInterviewLoading } = useInterview(id!);
    const { createInterview, updateInterview, isCreating, isUpdating } = useInterviewMutations();

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<ScheduleInterviewFormData>({
        resolver: yupResolver(interviewSchema),
        defaultValues: {
            jobId: preSelectedJobId || '',
            interviewType: '',
            date: '',
            time: '',
            interviewerName: '',
            meetingLink: '',
            notes: ''
        }
    });

    useEffect(() => {
        if (preSelectedJobId && !isEditMode) {
            setValue('jobId', preSelectedJobId);
        }
    }, [preSelectedJobId, isEditMode, setValue]);

    useEffect(() => {
        if (!isEditMode || !interviewData) return;

        try {
            const data = interviewData.data || interviewData; // Handle potential response structure

            const interviewDateTime = new Date(data.interviewDate);
            const dateStr = interviewDateTime.toISOString().split('T')[0];
            const timeStr = interviewDateTime.toTimeString().split(' ')[0].substring(0, 5);

            let interviewerName = '';
            let meetingLink = '';
            let notes = data.notes || '';

            const interviewerMatch = notes.match(/Interviewer: (.*?)(\n|$)/);
            if (interviewerMatch) {
                interviewerName = interviewerMatch[1];
                notes = notes.replace(interviewerMatch[0], '');
            }

            const linkMatch = notes.match(/Link: (.*?)(\n|$)/);
            if (linkMatch) {
                meetingLink = linkMatch[1];
                notes = notes.replace(linkMatch[0], '');
            }

            notes = notes.trim();

            const { id: jobId } = getJobDetails(data.jobId);

            reset({
                jobId: jobId,
                interviewType: INTERVIEW_TYPE_MAP[data.interviewType] || 'Other',
                date: dateStr,
                time: timeStr,
                interviewerName,
                meetingLink,
                notes
            });
        } catch (error) {
            console.error("Failed to parse interview data", error);
        }
    }, [interviewData, isEditMode, reset]);


    const onSubmit = async (data: ScheduleInterviewFormData) => {
        try {
            const dateTime = new Date(`${data.date}T${data.time}`);

            const payload = {
                jobId: data.jobId,
                interviewDate: dateTime.toISOString(),
                interviewType: data.interviewType.toUpperCase(),
                notes: `Interviewer: ${data.interviewerName || 'N/A'}\nLink: ${data.meetingLink || 'N/A'}\n\n${data.notes || ''}`.trim()
            };

            if (isEditMode) {
                await updateInterview({ id: id!, data: payload });
            } else {
                await createInterview(payload);
            }
            navigate(APP_ROUTES.INTERVIEWS.LIST);
        } catch (error) {
            console.error("Failed to save interview", error);
        }
    };

    if (isJobsLoading || (isEditMode && isInterviewLoading)) {
        return <div className="flex justify-center p-8">Loading...</div>;
    }

    const title = getFormTitle(isEditMode, 'Interview');
    const description = getFormDescription(isEditMode, 'Update interview details.', 'Plan your upcoming interview.');
    const buttonText = isEditMode ? 'Update Interview' : 'Schedule Interview';

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link to={APP_ROUTES.INTERVIEWS.LIST} className="flex items-center text-gray-500 hover:text-gray-700 mb-4">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Interviews
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="text-gray-500">{description}</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Select
                        label="Job Application"
                        error={errors.jobId?.message?.toString()}
                        {...register('jobId')}
                        disabled={isEditMode}
                    >
                        <option value="">Select a job...</option>
                        {jobs.map((job: Job) => (
                            <option key={job._id} value={job._id}>
                                {job.company} - {job.role}
                            </option>
                        ))}
                    </Select>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Select
                            label="Interview Type"
                            error={errors.interviewType?.message?.toString()}
                            {...register('interviewType')}
                        >
                            <option value="">Select type...</option>
                            {INTERVIEW_TYPE_OPTIONS.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Select>

                        <Input
                            label="Interviewer Name (Optional)"
                            placeholder="e.g. Jane Smith"
                            {...register('interviewerName')}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Date"
                            type="date"
                            error={errors.date?.message?.toString()}
                            {...register('date')}
                        />
                        <Input
                            label="Time"
                            type="time"
                            error={errors.time?.message?.toString()}
                            {...register('time')}
                        />
                    </div>

                    <Input
                        label="Meeting Link / Location"
                        placeholder="https://meet.google.com/..."
                        error={errors.meetingLink?.message?.toString()}
                        {...register('meetingLink')}
                    />

                    <Textarea
                        label="Notes"
                        placeholder="Topics to prepare, questions to ask..."
                        rows={4}
                        error={errors.notes?.message?.toString()}
                        {...register('notes')}
                    />

                    <div className="flex justify-end pt-4">
                        <Button type="submit" isLoading={isCreating || isUpdating}>
                            {buttonText}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ScheduleInterviewPage;
