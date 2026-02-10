import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, FileText } from './icons';
import { formatDate } from '../utils/format';
import { getJobDetails } from '../utils/helpers';
import { Button } from './FormElements';
import { StatusBadge } from './ui/StatusBadge';
import type { InterviewCardProps } from '../types/interview.types';

export const InterviewCard = React.memo(({ interview }: InterviewCardProps) => {
    const { company, role } = getJobDetails(interview.jobId);

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                        {company}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {role}
                    </p>
                </div>
                <StatusBadge status={interview.status} />
            </div>

            <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{formatDate(interview.interviewDate)}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{new Date(interview.interviewDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({interview.interviewType})</span>
                </div>
            </div>

            {interview.notes && (
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 mb-4">
                    <div className="flex items-center mb-1 text-gray-900 font-medium">
                        <FileText className="h-3 w-3 mr-1.5" />
                        Notes
                    </div>
                    <p className="line-clamp-2">{interview.notes}</p>
                </div>
            )}

            <div className="flex justify-end pt-2 border-t border-gray-50">
                <Link to={`/interviews/edit/${interview._id}`}>
                    <Button variant="ghost" className="text-xs text-gray-500 hover:text-gray-900 h-8 px-3">
                        Edit Details
                    </Button>
                </Link>
            </div>
        </div>
    );
});
