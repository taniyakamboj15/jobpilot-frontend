import { Search } from '../icons';
import type { SearchBarProps } from '../../types/ui.types';
import { cn } from '../../utils/cn';

export const SearchBar = ({ className, containerClassName, ...props }: SearchBarProps) => {
    return (
        <div className={cn("relative", containerClassName)}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
                type="text"
                className={cn(
                    "pl-10 h-10 w-full rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all",
                    className
                )}
                {...props}
            />
        </div>
    );
};
