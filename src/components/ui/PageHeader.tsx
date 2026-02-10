import React, { type ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface PageHeaderProps {
    title: string;
    description?: string;
    children?: ReactNode; // For action buttons or other controls
    className?: string;
}

export const PageHeader = React.memo(({ title, description, children, className }: PageHeaderProps) => {
    return (
        <div className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8", className)}>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                {description && <p className="text-gray-500 mt-1">{description}</p>}
            </div>
            {children && (
                <div className="flex items-center gap-3">
                    {children}
                </div>
            )}
        </div>
    );
});
