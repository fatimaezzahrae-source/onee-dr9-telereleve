import React from 'react';
import { BookOpen } from 'lucide-react';

interface SourceBadgeProps {
  source: string;
  className?: string;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({ source, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 ${className}`}
      title={`Référence contractuelle : ${source}`}
    >
      <BookOpen className="w-3 h-3 text-onee-600 dark:text-onee-400 shrink-0" />
      <span>{source}</span>
    </span>
  );
};
