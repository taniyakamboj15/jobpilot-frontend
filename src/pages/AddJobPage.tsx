import { useNavigate } from 'react-router-dom';
import { useJobMutations } from '../hooks/useJobs';
import { JobForm } from '../components/JobForm';
import type { JobFormData } from '../schemas/job.schema';

const AddJobPage = () => {
    const navigate = useNavigate();
    const { createJob, isCreating } = useJobMutations();

    const handleSubmit = async (data: JobFormData) => {
        try {
            await createJob(data);
            navigate('/jobs');
        } catch (error) {
            console.error("Failed to add job", error);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Add New Application</h1>
                <p className="text-gray-500">Log details of your new job application.</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
                <JobForm
                    onSubmit={handleSubmit}
                    loading={isCreating}
                    onCancel={() => navigate('/jobs')}
                />
            </div>
        </div>
    );
};

export default AddJobPage;
