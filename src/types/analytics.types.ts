export interface AnalyticsResponse {
    statusBreakdown: Record<string, number>;
    applicationsPerWeek: {
        _id: {
            year: number;
            week: number;
        };
        count: number;
    }[];
    totalApplications: number;
    companyPerformance: {
        _id: string;
        totalApplications: number;
        interviews: number;
        offers: number;
    }[];
}
