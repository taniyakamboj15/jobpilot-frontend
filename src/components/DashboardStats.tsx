import React from 'react';
import type { StatCardProps, ChartProps } from '../types/dashboard.types';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from 'recharts';

import { theme } from '../styles/theme';

export const ApplicationChart = ({ data, title = "Applications Overview", height = 350, color = theme.colors.primary[500] }: ChartProps) => {
    return (
        <div
            className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm"
            style={{ height }}
        >
            <h3 className="text-lg font-bold text-gray-900 mb-6">{title}</h3>
            <div style={{ width: '100%', height: height - 80 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id={`color-${title.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.1} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.colors.charts.grid} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: theme.colors.charts.text, fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: theme.colors.charts.text, fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="count"
                            stroke={color}
                            strokeWidth={3}
                            fillOpacity={1}
                            fill={`url(#color-${title.replace(/\s/g, '')})`}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export const StatCard = React.memo(({ title, value, icon: Icon, trend, subtext, className }: StatCardProps) => {
    return (
        <div className={`bg-white rounded-xl border border-gray-100 p-6 shadow-sm ${className}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <div className="mt-2 flex items-end">
                        <span className="text-3xl font-bold text-gray-900">{value}</span>
                        {subtext && <span className="ml-2 text-sm text-gray-500 mb-1">{subtext}</span>}
                    </div>
                </div>
                {Icon && (
                    <div className="bg-primary-50 p-2.5 rounded-lg">
                        <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                )}
            </div>
            <TrendIndicator trend={trend} />
        </div>
    );
});

const TrendIndicator = ({ trend }: { trend?: { value: number; isPositive: boolean } }) => {
    if (!trend) return null;

    return (
        <div className="mt-4 flex items-center text-sm">
            <span className={trend.isPositive ? 'text-green-600' : 'text-red-600'}>
                {trend.isPositive ? '+' : '-'}{trend.value}%
            </span>
            <span className="ml-1.5 text-gray-500">vs last month</span>
        </div>
    );
};
