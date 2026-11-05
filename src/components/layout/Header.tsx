import React, { useEffect } from 'react';
import { Search, Sun, Moon, Menu, Bookmark, BookmarkCheck } from 'lucide-react';
import { PageId } from '../../types';
import { PrintButton } from './PrintButton';

interface HeaderProps {
  currentPage: PageId;
  onOpenSearch: () => void;
  onToggleSidebar: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  bookmarks: string[];
  onToggleBookmark: (page: PageId) => void;
}

const PAGE_METADATA: Record<PageId, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Tableau de Bord & Fiche d’Identité',
    subtitle: 'Marché 88/DR9/C/I/2026 — ONEE Branche Eau (Lot 3 DR9)',
  },
  ccafp: {
    title: 'Partie I — CCAFP',
    subtitle: 'Cahier des Clauses Administratives et Financières Particulières (Articles 1 à 19)',
  },
  planning: {
    title: 'Planning & Pénalités de Retard',
    subtitle: 'Gantt contractuel 12 mois, calcul d’échéances et simulateur de pénalités',
  },
  finances: {
    title: 'Finances & Modalités de Paiement',
    subtitle: 'Simulateur d’avance 10%, retenue de garantie 7%, et échéancier 40/20/20/20',
  },
  reception: {
    title: 'Réception & Garanties',
    subtitle: 'Parcours d’essais semi-industriels, industriels et checklist de réception provisoire',
  },
  cctp: {
    title: 'Partie II — CCTP (Technique)',
    subtitle: 'Architecture On-Premise, synoptique interactif, catalogue d’équipements et configurateur',
  },
  formation: {
    title: 'Formation & Transfert de Compétences',
    subtitle: 'Modules Exploitation & Maintenance (15 agents) et mini-quiz de validation (seuil 75%)',
  },
  maintenance: {
    title: 'Partie III — Marché de Maintenance (5 ans)',
    subtitle: 'Maintenance préventive (10 sem), curative (≤ 48h / 6j) et simulateur de pénalités',
  },
  hse: {
    title: 'Partie IV — Environnement, Social & HSE',
    subtitle: 'Protocole amiante-ciment pas-à-pas, exigences BAD, EPI et checklist chantier',
  },
  bpde: {
    title: 'Partie V — Bordereau des Prix (BPDE)',
    subtitle: '26 prix travaux (4 composants) et 9 prix maintenance avec simulateur et export CSV',
  },
  compliance: {
    title: 'Matrice de Suivi de Conformité',
    subtitle: 'Suivi exhaustif des exigences administratives, techniques, financières et HSE',
  },
  glossary: {
    title: 'Glossaire & FAQ Contractuelle',
    subtitle: 'Définitions complètes des termes, acronymes et normes du CPS',
  },
};

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onOpenSearch,
  onToggleSidebar,
  darkMode,
  onToggleDarkMode,
  bookmarks,
  onToggleBookmark,
}) => {
  const meta = PAGE_METADATA[currentPage] || { title: 'Dossier Interactif', subtitle: '' };
  const isBookmarked = bookmarks.includes(currentPage);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 no-print transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 truncate">
              {meta.title}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate hidden sm:block">
              {meta.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Search Button */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
            title="Recherche globale (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-onee-600 dark:text-onee-400" />
            <span className="hidden md:inline">Rechercher...</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.2 text-[10px] font-mono bg-white dark:bg-slate-900 text-slate-500 rounded border border-slate-300 dark:border-slate-600 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={() => onToggleBookmark(currentPage)}
            className={`p-2 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-600 dark:text-amber-400'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
            title={isBookmarked ? 'Page marquée en favori' : 'Ajouter cette page aux favoris'}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>

          {/* Print Button */}
          <div className="hidden sm:block">
            <PrintButton />
          </div>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            aria-label="Basculer thème clair/sombre"
            title={darkMode ? 'Activer le mode clair' : 'Activer le mode sombre'}
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
