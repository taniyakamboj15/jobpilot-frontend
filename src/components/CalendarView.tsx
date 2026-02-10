import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from './icons';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';
import { getJobDetails } from '../utils/helpers';

import type { Interview } from '../types/interview.types';

interface CalendarViewProps {
    interviews: Interview[];
}

const CalendarView = ({ interviews }: CalendarViewProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 is Sunday

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    // Initialize calendar days array
    const calendarDays = useMemo(() => {
        const days = [];
        // Add empty slots for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        // Add actual days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
        }
        return days;
    }, [currentDate, daysInMonth, startingDayOfWeek]);

    const getInterviewsForDate = (date: Date) => {
        return interviews.filter(interview => {
            const iDate = new Date(interview.interviewDate);
            return (
                iDate.getDate() === date.getDate() &&
                iDate.getMonth() === date.getMonth() &&
                iDate.getFullYear() === date.getFullYear()
            );
        });
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                    <h2 className="text-lg font-bold text-gray-900">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <div className="flex space-x-1">
                        <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <button
                    onClick={goToToday}
                    className="text-sm font-medium text-primary-600 hover:text-primary-700 px-3 py-1 bg-primary-50 rounded-md"
                >
                    Today
                </button>
            </div>

            {/* Weekdays Header */}
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 auto-rows-fr bg-gray-200 gap-px border-b border-gray-200">
                {calendarDays.map((date, index) => {
                    if (!date) {
                        return <div key={`empty-${index}`} className="bg-gray-50 min-h-[120px]" />;
                    }

                    const dayInterviews = getInterviewsForDate(date);
                    const isCurrentDay = isToday(date);

                    return (
                        <div key={date.toISOString()} className={cn(
                            "bg-white min-h-[120px] p-2 transition-colors hover:bg-gray-50 relative group",
                            isCurrentDay && "bg-blue-50/30"
                        )}>
                            <div className="flex justify-between items-start mb-1">
                                <span className={cn(
                                    "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full",
                                    isCurrentDay ? "bg-primary-600 text-white" : "text-gray-700"
                                )}>
                                    {date.getDate()}
                                </span>
                                {dayInterviews.length > 0 && (
                                    <span className="text-xs font-medium text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded-full">
                                        {dayInterviews.length}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-1 mt-1 overflow-y-auto max-h-[80px] custom-scrollbar">
                                {dayInterviews.map((interview) => (
                                    <Link
                                        to={`/interviews/edit/${interview._id}`}
                                        key={interview._id}
                                        className="block bg-primary-50 border border-primary-100 rounded px-1.5 py-1 hover:bg-primary-100 transition-colors group/item"
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-semibold text-primary-900 truncate">
                                                {new Date(interview.interviewDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                        <p className="text-[10px] text-primary-700 truncate font-medium">
                                            {getJobDetails(interview.jobId).company}
                                        </p>
                                        <p className="text-[10px] text-primary-600 truncate opacity-80">
                                            {interview.interviewType}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarView;
