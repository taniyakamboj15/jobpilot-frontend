import React from 'react';
import { cn } from '../utils/cn';
import { Spinner } from './icons';
import type { InputProps, ButtonProps } from '../types/ui.types';

export const Input = React.memo(React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label className="text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        error && "border-red-500 focus-visible:ring-red-500",
                        className
                    )}
                    {...props}
                />
                {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
        );
    }
));

import { BUTTON_VARIANTS } from '../constants';

export const Button = React.memo(({
    variant = 'primary',
    isLoading,
    className,
    children,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                BUTTON_VARIANTS[variant],
                className
            )}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? <Spinner className="mr-2" /> : null}
            {children}
        </button>
    );
});
