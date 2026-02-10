import { cn } from '../../utils/cn';

interface StatusBadgeProps {
    status: string;
    className?: string;
}

const statusColors: Record<string, string> = {
    // Job Statuses
    APPLIED: 'bg-blue-50 text-blue-700 border-blue-100',
    INTERVIEW: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    OFFER: 'bg-green-50 text-green-700 border-green-100',
    REJECTED: 'bg-red-50 text-red-700 border-red-100',

    // Interview Statuses
    SCHEDULED: 'bg-blue-100 text-blue-800 border-blue-200',
    COMPLETED: 'bg-green-100 text-green-800 border-green-200',
    CANCELLED: 'bg-red-100 text-red-800 border-red-200',
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
    const normalizedStatus = status.toUpperCase();
    const colorClass = statusColors[normalizedStatus] || "bg-gray-50 text-gray-700 border-gray-100";

    return (
        <span className={cn(
            "px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wide",
            colorClass,
            className
        )}>
            {status}
        </span>
    );
};
