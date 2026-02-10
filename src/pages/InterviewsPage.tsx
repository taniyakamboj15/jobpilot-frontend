import { useState } from 'react';
import { Plus, Calendar, LayoutGrid, Calendar as CalendarIcon } from '../components/icons';
import { Link } from 'react-router-dom';
import { Button } from '../components/FormElements';
import { useInterviews } from '../hooks/useInterviews';
import { cn } from '../utils/cn';
import CalendarView from '../components/CalendarView';
import { PageHeader } from '../components/ui/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { InterviewCard } from '../components/InterviewCard';
import { APP_ROUTES } from '../constants';

const InterviewsPage = () => {
    const { interviews, isLoading } = useInterviews();
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

    if (isLoading) {
        return <div className="flex justify-center p-8">Loading interviews...</div>;
    }

    return (
        <div className="space-y-8">
            <PageHeader
                title="Interviews"
                description="Keep track of your upcoming interviews and prep notes."
            >
                <div className="bg-white border boundary-gray-200 rounded-lg p-1 flex">
                    <button
                        onClick={() => setViewMode('list')}
                        className={cn(
                            "p-2 rounded-md transition-colors",
                            viewMode === 'list' ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        )}
                        title="List View"
                    >
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode('calendar')}
                        className={cn(
                            "p-2 rounded-md transition-colors",
                            viewMode === 'calendar' ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        )}
                        title="Calendar View"
                    >
                        <CalendarIcon className="w-4 h-4" />
                    </button>
                </div>
                <Link to={APP_ROUTES.INTERVIEWS.SCHEDULE}>
                    <Button className="flex items-center">
                        <Plus className="mr-2 h-4 w-4" />
                        Schedule Interview
                    </Button>
                </Link>
            </PageHeader>

            {interviews.length === 0 ? (
                <EmptyState
                    icon={Calendar}
                    title="No interviews scheduled yet."
                    description="Once you get an interview call, schedule it here to keep track of dates, times, and preparation notes."
                    action={
                        <Link to={APP_ROUTES.INTERVIEWS.SCHEDULE}>
                            <Button variant="outline">Schedule your first interview</Button>
                        </Link>
                    }
                />
            ) : (
                <>
                    {viewMode === 'calendar' ? (
                        <CalendarView interviews={interviews} />
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {interviews.map((interview) => (
                                <InterviewCard key={interview._id} interview={interview} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default InterviewsPage;
