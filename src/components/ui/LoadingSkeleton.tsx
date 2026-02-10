import { cn } from '../../utils/cn';

import type { LoadingSkeletonProps } from '../../types/ui.types';

export const LoadingSkeleton = ({ count = 3, height = "h-16", className }: LoadingSkeletonProps) => {
    return (
        <div className="space-y-4 w-full">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={cn("bg-gray-100 animate-pulse rounded-lg", height, className)}
                />
            ))}
        </div>
    );
};
