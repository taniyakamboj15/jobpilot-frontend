interface JobLike {
    _id?: string;
    company?: string;
    role?: string;
}

/**
 * Safely extracts company and role from a Job object or ID string.
 */
export const getJobDetails = (jobId: string | JobLike | undefined | null) => {
    if (typeof jobId === 'object' && jobId !== null) {
        return {
            company: jobId.company || 'Unknown Company',
            role: jobId.role || 'Unknown Role',
            id: jobId._id
        };
    }
    return {
        company: 'Unknown Company',
        role: 'Unknown Role',
        id: jobId as string
    };
};

/**
 * Calculates a percentage rate safely, avoiding division by zero.
 */
export const calculateRate = (count: number, total: number, decimals: number = 1): string => {
    if (total <= 0) return "0";
    return ((count / total) * 100).toFixed(decimals);
};

/**
 * Formats a date string for HTML date inputs (YYYY-MM-DD).
 * Defaults to today if no date is provided.
 */
export const formatDateInput = (dateString?: string | Date): string => {
    if (!dateString) return new Date().toISOString().split('T')[0];
    const date = new Date(dateString);
    return isNaN(date.getTime())
        ? new Date().toISOString().split('T')[0]
        : date.toISOString().split('T')[0];
};

/**
 * Formats a title based on edit mode.
 */
export const getFormTitle = (isEditMode: boolean, entityName: string): string => {
    return isEditMode ? `Edit ${entityName}` : `Schedule ${entityName}`;
};

/**
 * Formats a description based on edit mode.
 */
export const getFormDescription = (isEditMode: boolean, editDesc: string, createDesc: string): string => {
    return isEditMode ? editDesc : createDesc;
};
