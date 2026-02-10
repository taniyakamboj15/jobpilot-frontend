import * as yup from 'yup';

export const interviewSchema = yup.object().shape({
    jobId: yup.string().required('Please select a job application'),
    interviewType: yup.string().required('Interview type is required'),
    date: yup.string().required('Date is required'),
    time: yup.string().required('Time is required'),
    interviewerName: yup.string().optional().default(''),
    meetingLink: yup.string().url('Must be a valid URL').optional().default(''),
    notes: yup.string().optional().default(''),
});
