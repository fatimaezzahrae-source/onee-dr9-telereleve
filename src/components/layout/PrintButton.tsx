import React from 'react';
import { Printer } from 'lucide-react';

interface PrintButtonProps {
  label?: string;
  className?: string;
}

export const PrintButton: React.FC<PrintButtonProps> = ({
  label = 'Imprimer / Exporter PDF',
  className = '',
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors shadow-sm no-print ${className}`}
      title="Imprimer ou enregistrer cette vue en PDF"
    >
      <Printer className="w-3.5 h-3.5 text-onee-600 dark:text-onee-400" />
      <span>{label}</span>
    </button>
  );
};
