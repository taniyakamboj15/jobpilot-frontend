interface CompanyPerformance {
    _id: string;
    totalApplications: number;
    interviews: number;
    offers: number;
}

interface CompanyTableProps {
    data: CompanyPerformance[];
}

export const CompanyTable = ({ data }: CompanyTableProps) => {
    return (
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm overflow-hidden">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Top Companies</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Company</th>
                            <th className="px-6 py-3">Applications</th>
                            <th className="px-6 py-3">Interviews</th>
                            <th className="px-6 py-3">Offers</th>
                            <th className="px-6 py-3">Success Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(!data || data.length === 0) ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                    No data available.
                                </td>
                            </tr>
                        ) : (
                            data.map((company) => {
                                const successRate = company.totalApplications > 0
                                    ? (((company.interviews + company.offers) / company.totalApplications) * 100).toFixed(0)
                                    : 0;

                                return (
                                    <tr key={company._id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {company._id}
                                        </td>
                                        <td className="px-6 py-4">
                                            {company.totalApplications}
                                        </td>
                                        <td className="px-6 py-4 text-secondary-600 font-medium">
                                            {company.interviews}
                                        </td>
                                        <td className="px-6 py-4 text-green-600 font-medium">
                                            {company.offers}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 max-w-[100px]">
                                                    <div
                                                        className="bg-primary-600 h-2.5 rounded-full"
                                                        style={{ width: `${successRate}%` }}
                                                    ></div>
                                                </div>
                                                <span>{successRate}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
