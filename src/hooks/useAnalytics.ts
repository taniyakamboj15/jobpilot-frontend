import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '../services/analytics.service';
import { calculateRate } from '../utils/helpers';

export const useAnalytics = () => {
    const query = useQuery({
        queryKey: ['analytics'],
        queryFn: () => analyticsService.getDashboardAnalytics(),
    });

    const data = query.data;

    // Transform Data
    const statusData = data ? Object.entries(data.statusBreakdown || {}).map(([key, value]) => ({
        name: key.charAt(0) + key.slice(1).toLowerCase(), // Title Case
        value: value as number,
    })) : [];

    const weeklyData = data ? (data.applicationsPerWeek || []).map((item: { _id: { week: number }; count: number }) => ({
        name: `Week ${item._id.week}`,
        count: item.count
    })) : [];

    if (weeklyData.length === 0) {
        weeklyData.push({ name: 'No Data', count: 0 });
    }

    const total = data?.totalApplications || 0;
    const interviews = data?.statusBreakdown?.INTERVIEW || 0;
    const offers = data?.statusBreakdown?.OFFER || 0;

    const interviewRate = calculateRate(interviews, total);
    const offerRate = calculateRate(offers, interviews);

    return {
        data: data,
        statusData,
        weeklyData,
        rates: {
            interviewRate,
            offerRate,
            total
        },
        companyPerformance: data?.companyPerformance || [],
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error
    };
};
