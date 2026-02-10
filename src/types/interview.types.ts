export interface Interview {
    _id: string;
    jobId: {
        _id: string;
        company: string;
        role: string;
    } | string; // Populated or ID
    companyName?: string; // Derived from populated jobId
    jobRole?: string;    // Derived from populated jobId
    interviewType: 'Technical' | 'HR' | 'Managerial' | 'Final' | 'Other';
    interviewDate: string;
    // time is part of interviewDate
    interviewerName?: string; // Not in backend yet, but kept for future? Or remove.
    meetingLink?: string;     // Not in backend yet
    notes?: string;
    status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface CreateInterviewData {
    jobId: string;
    interviewType: string;
    interviewDate: string; // ISO Date string
    notes?: string;
}
