import { useState, useEffect } from 'react';
import { Briefcase, Clock, CheckCircle2, XCircle, Plus } from '../components/icons';
import { analyticsService } from '../services/analytics.service';
import { StatCard, ApplicationChart } from '../components/DashboardStats';
import { Button } from '../components/FormElements';
import { Link } from 'react-router-dom';
import type { AnalyticsResponse } from '../types/analytics.types';

const DashboardPage = () => {
    const [data, setData] = useState<AnalyticsResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await analyticsService.getDashboardAnalytics();
                setData(response);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-xl" />)}
                </div>
                <div className="h-[350px] bg-gray-200 animate-pulse rounded-xl" />
            </div>
        );
    }

    const stats = [
        { title: 'Total Applications', value: data?.totalApplications || 0, icon: Briefcase },
        { title: 'Interviews', value: data?.statusBreakdown?.INTERVIEW || 0, icon: Clock },
        { title: 'Offers', value: data?.statusBreakdown?.OFFER || 0, icon: CheckCircle2 },
        { title: 'Rejections', value: data?.statusBreakdown?.REJECTED || 0, icon: XCircle },
    ];

    // Placeholder chart data if empty
    const chartData = [
        { name: 'Mon', count: 4 },
        { name: 'Tue', count: 7 },
        { name: 'Wed', count: 5 },
        { name: 'Thu', count: 8 },
        { name: 'Fri', count: 6 },
        { name: 'Sat', count: 3 },
        { name: 'Sun', count: 2 },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
                </div>
                <Link to="/jobs/add">
                    <Button className="flex items-center">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Application
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, idx) => (
                    <StatCard key={idx} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ApplicationChart data={chartData} />
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        <p className="text-sm text-gray-500 italic">No recent activity to show.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
