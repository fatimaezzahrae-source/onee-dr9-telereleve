import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, ArrowRight, BookOpen, Layers, DollarSign, ShieldAlert, Cpu } from 'lucide-react';
import { PageId } from '../../types';
import { CCOFP_ARTICLES } from '../../data/ccafpArticles';
import { EQUIPMENT_CATALOG, CYBERSECURITY_SPECS } from '../../data/cctpData';
import { BPDE_ITEMS } from '../../data/bpdePrices';
import { AMIANTE_CIMENT_PROCEDURE } from '../../data/hseData';
import { GLOSSARY_ITEMS } from '../../data/glossaryData';

interface SearchResult {
  id: string;
  titre: string;
  extrait: string;
  page: PageId;
  categorie: 'Article CCAFP' | 'Technique CCTP' | 'Bordereau BPDE' | 'HSE & Sécurité' | 'Glossaire';
  source: string;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (page: PageId, extraId?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Index search corpus
  const corpus: SearchResult[] = useMemo(() => {
    const list: SearchResult[] = [];

    // Articles CCAFP
    CCOFP_ARTICLES.forEach(art => {
      list.push({
        id: `ccafp-${art.id}`,
        titre: `${art.numero} : ${art.titre}`,
        extrait: `${art.chapitre} — ${art.contenu.slice(0, 150)}...`,
        page: 'ccafp',
        categorie: 'Article CCAFP',
        source: art.source,
      });
    });

    // CCTP Équipements
    EQUIPMENT_CATALOG.forEach(eq => {
      list.push({
        id: `cctp-${eq.id}`,
        titre: eq.nom,
        extrait: `${eq.description} — Caractéristiques: ${Object.entries(eq.caracteristiques).slice(0, 3).map(([k, v]) => `${k}: ${v}`).join('; ')}`,
        page: 'cctp',
        categorie: 'Technique CCTP',
        source: eq.source,
      });
    });

    // Cybersécurité
    CYBERSECURITY_SPECS.forEach(cs => {
      list.push({
        id: `cctp-sec-${cs.domaine}`,
        titre: `Cybersécurité : ${cs.domaine} (${cs.norme})`,
        extrait: cs.description,
        page: 'cctp',
        categorie: 'Technique CCTP',
        source: cs.source,
      });
    });

    // BPDE
    BPDE_ITEMS.forEach(it => {
      list.push({
        id: `bpde-${it.numero}`,
        titre: `${it.numero} : ${it.libelle} (${it.unite})`,
        extrait: `${it.composantNom || 'Maintenance'} — Unité: ${it.unite}`,
        page: 'bpde',
        categorie: 'Bordereau BPDE',
        source: `Partie V – ${it.numero}`,
      });
    });

    // HSE
    AMIANTE_CIMENT_PROCEDURE.reglesCritiques.forEach(rc => {
      list.push({
        id: `hse-ac-${rc.etape}`,
        titre: `Amiante-Ciment Étape ${rc.etape} : ${rc.titre}`,
        extrait: `${rc.description} ${rc.alerte}`,
        page: 'hse',
        categorie: 'HSE & Sécurité',
        source: AMIANTE_CIMENT_PROCEDURE.source,
      });
    });

    // Glossaire
    GLOSSARY_ITEMS.forEach(gl => {
      list.push({
        id: `gloss-${gl.terme}`,
        titre: gl.sigle ? `${gl.terme} (${gl.sigle})` : gl.terme,
        extrait: `${gl.definition} [ONEE: ${gl.contexteONEE}]`,
        page: 'glossary',
        categorie: 'Glossaire',
        source: gl.source || 'Glossaire CPS',
      });
    });

    return list;
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return corpus
      .filter(
        item =>
          item.titre.toLowerCase().includes(q) ||
          item.extrait.toLowerCase().includes(q) ||
          item.source.toLowerCase().includes(q)
      )
      .slice(0, 15);
  }, [corpus, query]);

  if (!isOpen) return null;

  const categoryIcons = {
    'Article CCAFP': <BookOpen className="w-3.5 h-3.5 text-blue-500" />,
    'Technique CCTP': <Cpu className="w-3.5 h-3.5 text-emerald-500" />,
    'Bordereau BPDE': <DollarSign className="w-3.5 h-3.5 text-amber-500" />,
    'HSE & Sécurité': <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />,
    'Glossaire': <Layers className="w-3.5 h-3.5 text-purple-500" />,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Search Palette */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-10 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0 ml-1 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Rechercher dans tout le CPS (articles, capteurs, pénalités, prix, amiante, etc.)..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60 flex-1">
          {query.trim() === '' ? (
            <div className="py-12 px-4 text-center">
              <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Recherche plein texte dans le CPS n° 88/DR9/C/I/2026
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Essayez : <span className="text-onee-600 dark:text-onee-400 font-mono">1/1000</span>,{' '}
                <span className="text-onee-600 dark:text-onee-400 font-mono">amiante</span>,{' '}
                <span className="text-onee-600 dark:text-onee-400 font-mono">datalogger</span>,{' '}
                <span className="text-onee-600 dark:text-onee-400 font-mono">167 500</span>,{' '}
                <span className="text-onee-600 dark:text-onee-400 font-mono">OPC UA</span>,{' '}
                <span className="text-onee-600 dark:text-onee-400 font-mono">Prix 11</span>
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              Aucun résultat trouvé pour « <span className="font-semibold">{query}</span> ».
            </div>
          ) : (
            results.map(res => (
              <button
                key={res.id}
                onClick={() => {
                  onSelectResult(res.page, res.id);
                  onClose();
                }}
                className="w-full text-left p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl transition-colors group flex items-start justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {categoryIcons[res.categorie]}
                      {res.categorie}
                    </span>
                    <span className="text-xs font-mono text-onee-600 dark:text-onee-400">
                      {res.source}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-onee-600 dark:group-hover:text-onee-400 transition-colors">
                    {res.titre}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {res.extrait}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-onee-600 dark:group-hover:text-onee-400 shrink-0 mt-2 transition-transform group-hover:translate-x-1" />
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>{results.length} résultat(s)</span>
          <span>Marché 88/DR9/C/I/2026</span>
        </div>
      </div>
    </div>
  );
};
