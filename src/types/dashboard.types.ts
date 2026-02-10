import type { LucideIcon } from '../components/icons';

export interface StatCardProps {
    title: string;
    value: string | number;
    icon?: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    subtext?: string;
    className?: string;
}

export interface ChartDataPoint {
    name: string;
    count: number;
    [key: string]: any;
}

export interface ChartProps {
    data: ChartDataPoint[];
    title?: string;
    height?: number;
    color?: string;
}
