import { ExternalLink, Pencil, Trash2 } from './icons';
import { formatDate } from '../utils/format';
import { StatusBadge } from './ui/StatusBadge';
import type { JobTableProps } from '../types/job.types';

export const JobTable = ({ jobs, onEdit, onDelete }: JobTableProps) => {
    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 font-semibold text-gray-900">Company & Role</th>
                        <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-4 font-semibold text-gray-900">Date Applied</th>
                        <th className="px-6 py-4 font-semibold text-gray-900">Link</th>
                        <th className="px-6 py-4 text-right font-semibold text-gray-900">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {jobs.length > 0 ? jobs.map((job) => (
                        <tr key={job._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="font-medium text-gray-900">{job.company}</div>
                                <div className="text-gray-500">{job.role}</div>
                            </td>
                            <td className="px-6 py-4">
                                <StatusBadge status={job.status} />
                            </td>
                            <td className="px-6 py-4 text-gray-500 text-xs">
                                {formatDate(job.dateApplied)}
                            </td>
                            <td className="px-6 py-4">
                                {job.jobLink ? (
                                    <a href={job.jobLink} target="_blank" rel="noreferrer" className="text-primary-600 hover:text-primary-700">
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                ) : '-'}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end space-x-2">
                                    <button onClick={() => onEdit(job)} className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
                                        <Pencil className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => onDelete(job._id)} className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">
                                No job applications found. Start by adding one!
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
