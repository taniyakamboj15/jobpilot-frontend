import { BarChart3 as BarChartIcon } from '../components/icons';
import { PageHeader } from '../components/ui/PageHeader';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { useAnalytics } from '../hooks/useAnalytics';
import { StatCard, ApplicationChart } from '../components/DashboardStats';
import { StatusChart } from '../components/analytics/StatusChart';
import { CompanyTable } from '../components/analytics/CompanyTable';

export const AnalyticsPage = () => {
    const {
        isLoading,
        data,
        statusData,
        weeklyData,
        rates,
        companyPerformance
    } = useAnalytics();

    if (isLoading) {
        return (
            <div className="space-y-8">
                <PageHeader
                    title="Analytics"
                    description="Detailed insights into your job search performance."
                />
                <LoadingSkeleton count={3} height="h-[300px]" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="space-y-8">
                <PageHeader
                    title="Analytics"
                    description="Detailed insights into your job search performance."
                />
                <EmptyState
                    icon={BarChartIcon}
                    title="No Analytics Available"
                    description="Start applying to jobs to see your application insights here."
                />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <PageHeader
                title="Analytics"
                description="Detailed insights into your job search performance."
            />

            {/* Conversion Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Interview Rate"
                    value={`${rates.interviewRate}%`}
                    subtext="of applications"
                />
                <StatCard
                    title="Offer Rate"
                    value={`${rates.offerRate}%`}
                    subtext="of interviews"
                />
                <StatCard
                    title="Total Applications"
                    value={rates.total}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Activity Chart */}
                <ApplicationChart
                    data={weeklyData}
                    title="Weekly Applications"
                    height={400}
                />

                {/* Status Breakdown Chart */}
                <StatusChart data={statusData} />
            </div>

            {/* Best Performing Companies */}
            <CompanyTable data={companyPerformance} />
        </div>
    );
};


