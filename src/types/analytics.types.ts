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

export interface CompanyPerformance {
    _id: string;
    totalApplications: number;
    interviews: number;
    offers: number;
}

export interface CompanyTableProps {
    data: CompanyPerformance[];
}

export interface StatusChartProps {
    data: { name: string; value: number }[];
    colors?: readonly string[];
}
