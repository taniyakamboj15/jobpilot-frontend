import { useState, useCallback } from 'react';
import { Plus } from '../components/icons';
import { useNavigate } from 'react-router-dom';
import { useJobs, useJobMutations } from '../hooks/useJobs';
import { useDebounce } from '../hooks/useDebounce';
import { JobTable } from '../components/JobTable';
import { Button } from '../components/FormElements';
import { PageHeader } from '../components/ui/PageHeader';
import { SearchBar } from '../components/ui/SearchBar';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { APP_ROUTES } from '../constants';

const JobsPage = () => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);
    const navigate = useNavigate();

    const { jobs, isLoading } = useJobs({ search: debouncedSearch });
    const { deleteJob } = useJobMutations();

    const handleDelete = useCallback(async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this application?')) return;
        try {
            await deleteJob(id);
        } catch (error) {
            console.error("Failed to delete job", error);
        }
    }, [deleteJob]);

    return (
        <div className="space-y-8">
            <PageHeader
                title="Job Applications"
                description="View and manage all your active job pursuits."
            >
                <Button onClick={() => navigate(APP_ROUTES.JOBS.ADD)} className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    New Application
                </Button>
            </PageHeader>

            <div className="flex flex-col sm:flex-row gap-4">
                <SearchBar
                    placeholder="Search by company or role..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    containerClassName="flex-1"
                />
            </div>

            {isLoading ? (
                <LoadingSkeleton count={5} height="h-16" />
            ) : (
                <JobTable
                    jobs={jobs}
                    onEdit={(job) => navigate(APP_ROUTES.JOBS.EDIT(job._id), { state: { job } })}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default JobsPage;
