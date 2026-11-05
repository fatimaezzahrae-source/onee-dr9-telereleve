import React from 'react';
import {
  LayoutDashboard,
  FileText,
  CalendarClock,
  CircleDollarSign,
  Award,
  Cpu,
  GraduationCap,
  Wrench,
  ShieldAlert,
  TableProperties,
  CheckSquare2,
  BookOpen,
  X,
  Droplets,
  Bookmark,
} from 'lucide-react';
import { PageId } from '../../types';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isOpen: boolean;
  onClose: () => void;
  bookmarks: string[];
}

interface NavItem {
  id: PageId;
  label: string;
  badge?: string;
  icon: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isOpen,
  onClose,
  bookmarks,
}) => {
  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Tableau de bord',
      icon: <LayoutDashboard className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'ccafp',
      label: 'Partie I — CCAFP',
      badge: 'Art. 1-19',
      icon: <FileText className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'planning',
      label: 'Planning & Pénalités',
      badge: '12 mois',
      icon: <CalendarClock className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'finances',
      label: 'Finances & Paiements',
      badge: '12M DH',
      icon: <CircleDollarSign className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'reception',
      label: 'Réception & Garanties',
      badge: '1 an',
      icon: <Award className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'cctp',
      label: 'Partie II — CCTP',
      badge: 'Synoptique',
      icon: <Cpu className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'formation',
      label: 'Formation & Quiz',
      badge: '15 agents',
      icon: <GraduationCap className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'maintenance',
      label: 'Partie III — Maintenance',
      badge: '5 ans',
      icon: <Wrench className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'hse',
      label: 'Partie IV — HSE & Amiante',
      badge: 'Critique',
      icon: <ShieldAlert className="w-4 h-4 shrink-0 text-rose-500" />,
    },
    {
      id: 'bpde',
      label: 'Partie V — Bordereau BPDE',
      badge: '26+9 prix',
      icon: <TableProperties className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'compliance',
      label: 'Suivi de Conformité',
      badge: 'Matrice',
      icon: <CheckSquare2 className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'glossary',
      label: 'Glossaire & FAQ',
      badge: '24 termes',
      icon: <BookOpen className="w-4 h-4 shrink-0" />,
    },
  ];

  const handleSelect = (page: PageId) => {
    onNavigate(page);
    onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } no-print`}
      >
        {/* Top Brand Banner */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-linear-to-br from-onee-800 to-onee-950 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden absolute top-3.5 right-3.5 p-1 rounded-md text-white/80 hover:text-white hover:bg-white/10"
            aria-label="Fermer la navigation"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
              <Droplets className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <div className="text-[10px] font-semibold tracking-wider uppercase text-cyan-300">
                ONEE • Branche Eau
              </div>
              <h2 className="text-sm font-bold text-white tracking-tight leading-snug">
                Télérelève DR9
              </h2>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-[11px] text-cyan-100/90 font-mono">
            <span>Marché 88/DR9/C/I/2026</span>
            <span className="px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-200 font-sans text-[10px] font-semibold">
              BAD-PDRAP
            </span>
          </div>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 px-3 pb-1">
            Modules du Dossier
          </div>
          {navItems.map(item => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-xl transition-all ${
                  isActive
                    ? 'bg-onee-50 text-onee-900 dark:bg-onee-950/60 dark:text-onee-200 font-semibold shadow-xs border border-onee-200/60 dark:border-onee-800'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={isActive ? 'text-onee-600 dark:text-onee-400' : 'text-slate-400 dark:text-slate-500'}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`ml-2 px-1.5 py-0.5 text-[10px] rounded-md font-mono shrink-0 ${
                      isActive
                        ? 'bg-onee-200 dark:bg-onee-800 text-onee-900 dark:text-onee-100 font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Bookmarks Section if any */}
          {bookmarks.length > 0 && (
            <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="text-[10px] uppercase tracking-wider font-bold text-amber-500 dark:text-amber-400 px-3 pb-1 flex items-center gap-1.5">
                <Bookmark className="w-3 h-3" />
                <span>Mes Favoris ({bookmarks.length})</span>
              </div>
              {bookmarks.map(bm => {
                const item = navItems.find(n => n.id === bm);
                if (!item) return null;
                return (
                  <button
                    key={bm}
                    type="button"
                    onClick={() => handleSelect(item.id)}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 rounded-lg transition-colors truncate"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom summary card */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-2xs">
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>Budget Travaux</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">12 000 000 DH</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              <span>Maintenance (5 ans)</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">4 749 996 DH</span>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>Régime : Prix fermes</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">TTC</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
