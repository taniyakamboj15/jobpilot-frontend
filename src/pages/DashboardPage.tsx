import { useState, useEffect } from 'react';
import { Plus } from '../components/icons';
import { analyticsService } from '../services/analytics.service';
import { StatCard, ApplicationChart } from '../components/DashboardStats';
import { Button } from '../components/FormElements';
import { Link } from 'react-router-dom';
import type { AnalyticsResponse } from '../types/analytics.types';
import { DASHBOARD_STATS_CONFIG, PLACEHOLDER_CHART_DATA, APP_ROUTES } from '../constants';

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

    const stats = DASHBOARD_STATS_CONFIG(data);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
                </div>
                <Link to={APP_ROUTES.JOBS.ADD}>
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
                    <ApplicationChart data={PLACEHOLDER_CHART_DATA} />
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
