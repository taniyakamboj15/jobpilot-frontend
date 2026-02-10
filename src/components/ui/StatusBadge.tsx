import { cn } from '../../utils/cn';

import type { StatusBadgeProps } from '../../types/ui.types';
import { STATUS_COLORS } from '../../constants';

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
    const normalizedStatus = status.toUpperCase();
    const colorClass = STATUS_COLORS[normalizedStatus] || "bg-gray-50 text-gray-700 border-gray-100";

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
