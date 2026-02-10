export const INTERVIEW_TYPE_OPTIONS = [
    { value: 'Technical', label: 'Technical' },
    { value: 'HR', label: 'HR' },
    { value: 'Managerial', label: 'Managerial' },
    { value: 'Final', label: 'Final' },
    { value: 'Other', label: 'Other' },
];

export const INTERVIEW_STATUS_OPTIONS = [
    { value: 'Scheduled', label: 'Scheduled' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Cancelled', label: 'Cancelled' },
];

export const INTERVIEW_TYPE_MAP: Record<string, string> = {
    'TECHNICAL': 'Technical',
    'HR': 'HR',
    'MANAGERIAL': 'Managerial',
    'FINAL': 'Final',
    'OTHER': 'Other'
};
