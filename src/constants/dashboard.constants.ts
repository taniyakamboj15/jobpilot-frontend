import { Briefcase, Clock, CheckCircle2, XCircle } from '../components/icons';

export const DASHBOARD_STATS_CONFIG = (data: any) => [
    { title: 'Total Applications', value: data?.totalApplications || 0, icon: Briefcase },
    { title: 'Interviews', value: data?.statusBreakdown?.INTERVIEW || 0, icon: Clock },
    { title: 'Offers', value: data?.statusBreakdown?.OFFER || 0, icon: CheckCircle2 },
    { title: 'Rejections', value: data?.statusBreakdown?.REJECTED || 0, icon: XCircle },
];

export const PLACEHOLDER_CHART_DATA = [
    { name: 'Mon', count: 4 },
    { name: 'Tue', count: 7 },
    { name: 'Wed', count: 5 },
    { name: 'Thu', count: 8 },
    { name: 'Fri', count: 6 },
    { name: 'Sat', count: 3 },
    { name: 'Sun', count: 2 },
];
