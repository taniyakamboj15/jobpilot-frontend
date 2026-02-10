/**
 * Centralized icon exports for better maintainability.
 * This file serves as a single source of truth for all icon imports.
 */

// Custom SVG icons
export { Spinner } from './Spinner';

// Re-export commonly used lucide-react icons for centralized access
export {
    // Navigation & UI
    LayoutDashboard,
    Briefcase,
    Calendar,
    ChartBarBig as BarChart3,
    LogOut,
    Menu,
    X,
    User,

    // Actions
    Plus,
    Pencil,
    Trash2,
    ArrowLeft,
    Search,
    ExternalLink,

    // Status & Time
    Clock,
    CircleCheck as CheckCircle2,
    CircleX as XCircle,
    ChevronLeft,
    ChevronRight,

    // Content
    FileText,
    LayoutGrid,

    // Type exports
    type LucideIcon,
} from 'lucide-react';
