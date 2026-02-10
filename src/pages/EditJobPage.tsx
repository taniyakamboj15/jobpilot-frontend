import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useJobMutations } from '../hooks/useJobs';
import { JobForm } from '../components/JobForm';
import type { JobFormData } from '../schemas/job.schema';
import { APP_ROUTES } from '../constants';

const EditJobPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const { updateJob, isUpdating } = useJobMutations();

    // Attempt to get job data from navigation state, otherwise we might need to fetch it
    const initialJob = location.state?.job;

    const handleSubmit = async (data: JobFormData) => {
        if (!id) return;
        try {
            await updateJob({ id, data });
            navigate(APP_ROUTES.JOBS.LIST);
        } catch (error) {
            console.error("Failed to update job", error);
        }
    };

    if (!initialJob) {
        // In a real app, we'd fetch the job here if state is missing
        // or check useJob(id) if implemented
        return <div className="p-8 text-center text-gray-500">Job data not found. Please return to the job list.</div>;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Application</h1>
                <p className="text-gray-500">Update the details of your application for {initialJob.company}.</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
                <JobForm
                    initialData={initialJob}
                    onSubmit={handleSubmit}
                    loading={isUpdating}
                    onCancel={() => navigate(APP_ROUTES.JOBS.LIST)}
                />
            </div>
        </div>
    );
};

export default EditJobPage;
