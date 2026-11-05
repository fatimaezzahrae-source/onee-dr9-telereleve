import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Breadcrumbs } from './components/layout/Breadcrumbs';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';

// Modules
import { Dashboard } from './components/modules/Dashboard';
import { CcafpViewer } from './components/modules/CcafpViewer';
import { PlanningSimulator } from './components/modules/PlanningSimulator';
import { FinanceSimulator } from './components/modules/FinanceSimulator';
import { ReceptionStepper } from './components/modules/ReceptionStepper';
import { CctpArchitecture } from './components/modules/CctpArchitecture';
import { FormationModule } from './components/modules/FormationModule';
import { MaintenanceModule } from './components/modules/MaintenanceModule';
import { HseModule } from './components/modules/HseModule';
import { BpdeTable } from './components/modules/BpdeTable';
import { ComplianceTracker } from './components/modules/ComplianceTracker';
import { GlossaryFaq } from './components/modules/GlossaryFaq';

import { getStoredValue, setStoredValue } from './utils/storage';
import { MARKET_INFO } from './data/marketInfo';

export const App: React.FC = () => {
  // Read initial page from URL hash if valid
  const getPageFromHash = (): PageId => {
    const hash = window.location.hash.replace('#', '') as PageId;
    const validPages: PageId[] = [
      'dashboard',
      'ccafp',
      'planning',
      'finances',
      'reception',
      'cctp',
      'formation',
      'maintenance',
      'hse',
      'bpde',
      'compliance',
      'glossary',
    ];
    return validPages.includes(hash) ? hash : 'dashboard';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getPageFromHash);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Dark Mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = getStoredValue<boolean | null>('dark_mode', null);
    if (saved !== null) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Bookmarks state
  const [bookmarks, setBookmarks] = useState<string[]>(() =>
    getStoredValue<string[]>('bookmarks', [])
  );

  // Update HTML class for dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setStoredValue('dark_mode', darkMode);
  }, [darkMode]);

  // Sync hash with page
  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to hash change
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const toggleBookmark = (page: PageId) => {
    setBookmarks(prev => {
      const next = prev.includes(page) ? prev.filter(p => p !== page) : [...prev, page];
      setStoredValue('bookmarks', next);
      return next;
    });
  };

  const handleSearchResultSelect = (page: PageId) => {
    navigateTo(page);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={navigateTo}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        bookmarks={bookmarks}
      />

      {/* Main Content Area (offset by sidebar width on large screens) */}
      <div className="lg:pl-72 flex flex-col flex-1 min-w-0">
        {/* Header */}
        <Header
          currentPage={currentPage}
          onOpenSearch={() => setIsSearchOpen(true)}
          onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          bookmarks={bookmarks}
          onToggleBookmark={toggleBookmark}
        />

        {/* Breadcrumbs Trail */}
        <div className="px-4 sm:px-6 pt-3">
          <Breadcrumbs currentPage={currentPage} onNavigate={navigateTo} />
        </div>

        {/* Dynamic Page Component */}
        <main className="flex-1 px-4 sm:px-6 py-4 sm:py-6 max-w-7xl w-full mx-auto">
          {currentPage === 'dashboard' && <Dashboard onNavigate={navigateTo} />}
          {currentPage === 'ccafp' && <CcafpViewer />}
          {currentPage === 'planning' && <PlanningSimulator />}
          {currentPage === 'finances' && <FinanceSimulator />}
          {currentPage === 'reception' && <ReceptionStepper />}
          {currentPage === 'cctp' && <CctpArchitecture />}
          {currentPage === 'formation' && <FormationModule />}
          {currentPage === 'maintenance' && <MaintenanceModule />}
          {currentPage === 'hse' && <HseModule />}
          {currentPage === 'bpde' && <BpdeTable />}
          {currentPage === 'compliance' && <ComplianceTracker />}
          {currentPage === 'glossary' && <GlossaryFaq />}
        </main>

        {/* Global Footer */}
        <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 px-4 sm:px-6 py-5 text-xs text-slate-500 dark:text-slate-400 no-print">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {MARKET_INFO.entite}
              </span>{' '}
              — {MARKET_INFO.direction}
              <div className="text-[11px] text-slate-400 mt-0.5">
                Marché n° {MARKET_INFO.numero} • Financement {MARKET_INFO.financement}
              </div>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              Dossier Interactif Web 100% Statique • Version 1.0.0
            </div>
          </div>
        </footer>
      </div>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSearchResultSelect}
      />
    </div>
  );
};

export default App;
