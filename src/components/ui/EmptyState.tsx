import type { EmptyStateProps } from '../../types/ui.types';
import { cn } from '../../utils/cn';

export const EmptyState = ({ icon: Icon, title, description, action, className }: EmptyStateProps) => {
    return (
        <div className={cn(
            "bg-white rounded-xl border border-gray-100 p-8 shadow-sm flex flex-col items-center justify-center min-h-[300px] text-center",
            className
        )}>
            <div className="bg-primary-50 p-4 rounded-full mb-4">
                <Icon className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-gray-900 font-medium text-lg mb-2">{title}</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-sm">
                {description}
            </p>
            {action && (
                <div className="mt-2">
                    {action}
                </div>
            )}
        </div>
    );
};
