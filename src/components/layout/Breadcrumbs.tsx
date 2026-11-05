import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { PageId } from '../../types';

interface BreadcrumbsProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  subItem?: string;
}

const PAGE_NAMES: Record<PageId, string> = {
  dashboard: 'Tableau de bord',
  ccafp: 'Partie I – CCAFP (Clauses Administratives)',
  planning: 'Planning & Pénalités',
  finances: 'Finances & Modalités de Paiement',
  reception: 'Réception & Garanties',
  cctp: 'Partie II – CCTP (Clauses Techniques)',
  formation: 'Formation & Quiz de Validation',
  maintenance: 'Partie III – Maintenance (5 ans)',
  hse: 'Partie IV – Environnement, Social & HSE',
  bpde: 'Partie V – Bordereau des Prix (BPDE)',
  compliance: 'Suivi de Conformité Global',
  glossary: 'Glossaire & FAQ Contractuelle',
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentPage,
  onNavigate,
  subItem,
}) => {
  return (
    <nav className="flex items-center text-xs text-slate-500 dark:text-slate-400 py-1.5 px-1 overflow-x-auto whitespace-nowrap scrollbar-none no-print">
      <button
        onClick={() => onNavigate('dashboard')}
        className="flex items-center gap-1 hover:text-onee-600 dark:hover:text-onee-400 transition-colors font-medium"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Accueil</span>
      </button>

      {currentPage !== 'dashboard' && (
        <>
          <ChevronRight className="w-3 h-3 mx-1 text-slate-400 shrink-0" />
          <button
            onClick={() => onNavigate(currentPage)}
            className={`font-medium transition-colors ${
              !subItem
                ? 'text-onee-700 dark:text-onee-300 font-semibold'
                : 'hover:text-onee-600 dark:hover:text-onee-400'
            }`}
          >
            {PAGE_NAMES[currentPage]}
          </button>
        </>
      )}

      {subItem && (
        <>
          <ChevronRight className="w-3 h-3 mx-1 text-slate-400 shrink-0" />
          <span className="text-slate-800 dark:text-slate-200 font-semibold">{subItem}</span>
        </>
      )}
    </nav>
  );
};
