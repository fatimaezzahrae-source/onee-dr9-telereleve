import React, { useState, useMemo } from 'react';
import {
  FileText,
  Search,
  ShieldAlert,
  AlertTriangle,
  Scale,
  ListOrdered,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import { CCOFP_ARTICLES, PIECES_CONSTITUTIVES, TEXTES_REFERENCE } from '../../data/ccafpArticles';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { SourceBadge } from '../common/SourceBadge';
import { Accordion } from '../common/Accordion';

export const CcafpViewer: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedChapitre, setSelectedChapitre] = useState<string>('all');

  const chapitres = useMemo(() => {
    const set = new Set(CCOFP_ARTICLES.map(a => a.chapitre));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredArticles = useMemo(() => {
    return CCOFP_ARTICLES.filter(art => {
      const matchSearch =
        search === '' ||
        art.titre.toLowerCase().includes(search.toLowerCase()) ||
        art.numero.toLowerCase().includes(search.toLowerCase()) ||
        art.contenu.toLowerCase().includes(search.toLowerCase()) ||
        art.pointsCles.some(p => p.toLowerCase().includes(search.toLowerCase()));

      const matchChapitre =
        selectedChapitre === 'all' || art.chapitre === selectedChapitre;

      return matchSearch && matchChapitre;
    });
  }, [search, selectedChapitre]);

  const accordionItems = useMemo(() => {
    return filteredArticles.map(art => {
      const isCritical = art.id === 6 || art.id === 9 || art.id === 10;
      return {
        id: art.id,
        title: (
          <span className="flex items-center gap-2">
            <span className="font-mono text-onee-600 dark:text-onee-400 font-bold">
              {art.numero}
            </span>
            <span>—</span>
            <span>{art.titre}</span>
          </span>
        ),
        subtitle: art.chapitre,
        badge: (
          <div className="flex items-center gap-1.5">
            {isCritical && (
              <Badge variant="danger" size="sm">
                Clause Critique
              </Badge>
            )}
            <SourceBadge source={art.source} />
          </div>
        ),
        content: (
          <div className="space-y-4 pt-2">
            {/* Critical Alert if any */}
            {art.alertes?.map((al, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                  al.type === 'danger'
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                    : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                }`}
              >
                {al.type === 'danger' ? (
                  <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                )}
                <div className="text-xs font-medium leading-relaxed">{al.message}</div>
              </div>
            ))}

            {/* Official Text */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
              {art.contenu}
            </div>

            {/* Key takeaway points */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Points clés & implications opérationnelles :
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {art.pointsCles.map((pt, pIdx) => (
                  <div
                    key={pIdx}
                    className="flex items-start gap-2 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-onee-600 dark:text-onee-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ),
      };
    });
  }, [filteredArticles]);

  return (
    <div className="space-y-6">
      {/* Top Banner & Priority Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Hierarchy of contract documents */}
        <Card
          title="Ordre de Priorité des Pièces Contractuelles"
          subtitle="En cas de contradiction ou de divergence entre les pièces du marché"
          source="CCAFP – Art. 3"
        >
          <div className="space-y-2">
            {PIECES_CONSTITUTIVES.map(p => (
              <div
                key={p.rang}
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-onee-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                    {p.rang}
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {p.nom}
                  </span>
                </div>
                <Badge
                  variant={p.rang === 1 ? 'danger' : p.rang === 2 ? 'primary' : 'secondary'}
                  size="sm"
                  className="shrink-0 font-mono text-[10px]"
                >
                  {p.priorite}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Textes généraux & Assurances */}
        <div className="space-y-4">
          <Card
            title="Textes Réglementaires de Référence"
            subtitle="Textes législatifs et directives régissant l’exécution du marché"
            source="CCAFP – Art. 4"
          >
            <div className="space-y-2">
              {TEXTES_REFERENCE.map((t, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 text-xs flex items-center justify-between"
                >
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {t.ref}
                    </span>
                    <span className="text-slate-400 text-[11px] ml-1.5">({t.date})</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">{t.portee}</p>
                  </div>
                  <Scale className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              ))}
            </div>
          </Card>

          {/* Special notice for Subcontracting & Insurances */}
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div className="text-xs text-rose-900 dark:text-rose-200 space-y-1">
              <span className="font-bold text-sm">
                Alerte Sous-Traitance (Art. 6) & Assurances (Art. 7) :
              </span>
              <p>
                • <strong>Sous-traitance strictement non autorisée</strong> sous peine de résiliation immédiate.
                <br />
                • <strong>3 attestations obligatoires avant tout démarrage</strong> : RC Pro, Véhicules/engins, Accidents du travail. L’attestation de dommage à l’ouvrage n’est pas exigée.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Filtrer parmi les 19 articles du CCAFP (ex. pénalités, délai, caution, etc.)..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-onee-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedChapitre}
            onChange={e => setSelectedChapitre(e.target.value)}
            className="text-xs py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-onee-500"
          >
            <option value="all">Tous les chapitres (19 articles)</option>
            {chapitres
              .filter(c => c !== 'all')
              .map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Articles Accordion */}
      <Card
        title={`Articles du CCAFP (${filteredArticles.length} / 19)`}
        subtitle="Consultation intégrale des clauses administratives et financières particulières"
        source="CCAFP – Articles 1 à 19"
      >
        {filteredArticles.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            Aucun article ne correspond à votre recherche.
          </div>
        ) : (
          <Accordion items={accordionItems} allowMultiple={true} />
        )}
      </Card>
    </div>
  );
};
