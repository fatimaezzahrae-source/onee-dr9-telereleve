import React, { useState, useMemo, useEffect } from 'react';
import {
  CheckSquare2,
  Search,
  Filter,
  Download,
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  RotateCcw,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { SourceBadge } from '../common/SourceBadge';
import { COMPLIANCE_ITEMS_DEFAULT } from '../../data/complianceMatrix';
import { ComplianceItem } from '../../types';
import { getStoredValue, setStoredValue } from '../../utils/storage';
import { downloadCsv } from '../../utils/exportCsv';

export const ComplianceTracker: React.FC = () => {
  const [items, setItems] = useState<ComplianceItem[]>(() =>
    getStoredValue<ComplianceItem[]>('compliance_items', COMPLIANCE_ITEMS_DEFAULT)
  );

  const [search, setSearch] = useState<string>('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [selectedStatut, setSelectedStatut] = useState<string>('all');

  useEffect(() => {
    setStoredValue('compliance_items', items);
  }, [items]);

  const handleStatusChange = (id: string, newStatus: ComplianceItem['statut']) => {
    setItems(prev =>
      prev.map(it => (it.id === id ? { ...it, statut: newStatus } : it))
    );
  };

  const handleCommentChange = (id: string, comment: string) => {
    setItems(prev =>
      prev.map(it => (it.id === id ? { ...it, commentaire: comment } : it))
    );
  };

  const handleReset = () => {
    if (confirm('Réinitialiser l’ensemble de la matrice de conformité aux valeurs par défaut du CPS ?')) {
      setItems(COMPLIANCE_ITEMS_DEFAULT);
      setStoredValue('compliance_items', COMPLIANCE_ITEMS_DEFAULT);
    }
  };

  // Metrics
  const totalCount = items.length;
  const conformeCount = items.filter(it => it.statut === 'CONFORME').length;
  const inProgressCount = items.filter(it => it.statut === 'EN_COURS').length;
  const todoCount = items.filter(it => it.statut === 'A_FAIRE').length;

  const globalProgress = Math.round((conformeCount / totalCount) * 100);

  // Category breakdown
  const categories = ['Administratif', 'Financier', 'Technique', 'Réception', 'Maintenance', 'HSE'] as const;

  const categoryStats = useMemo(() => {
    return categories.map(cat => {
      const catItems = items.filter(it => it.categorie === cat);
      const conf = catItems.filter(it => it.statut === 'CONFORME').length;
      const pct = catItems.length > 0 ? Math.round((conf / catItems.length) * 100) : 0;
      return {
        cat,
        total: catItems.length,
        conforme: conf,
        pct,
      };
    });
  }, [items]);

  // Filtered items
  const filteredItems = useMemo(() => {
    return items.filter(it => {
      const matchCat = selectedCat === 'all' || it.categorie === selectedCat;
      const matchStatut = selectedStatut === 'all' || it.statut === selectedStatut;
      const matchSearch =
        search === '' ||
        it.titre.toLowerCase().includes(search.toLowerCase()) ||
        it.exigence.toLowerCase().includes(search.toLowerCase()) ||
        it.source.toLowerCase().includes(search.toLowerCase()) ||
        (it.responsable && it.responsable.toLowerCase().includes(search.toLowerCase()));

      return matchCat && matchStatut && matchSearch;
    });
  }, [items, selectedCat, selectedStatut, search]);

  // Export CSV
  const handleExportCsv = () => {
    const headers = [
      'Identifiant',
      'Catégorie',
      'Titre Exigence',
      'Description / Exigence',
      'Référence Contractuelle',
      'Statut',
      'Responsable',
      'Commentaire / Preuve',
    ];

    const rows = items.map(it => [
      it.id,
      it.categorie,
      it.titre,
      it.exigence,
      it.source,
      it.statut === 'CONFORME' ? 'Conforme' : it.statut === 'EN_COURS' ? 'En cours' : 'À faire',
      it.responsable || '',
      it.commentaire || '',
    ]);

    downloadCsv('Matrice_Conformite_CPS_ONEE_DR9', rows, headers);
  };

  return (
    <div className="space-y-6">
      {/* Global Compliance KPI & Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Overall progress */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Conformité Globale</span>
            <CheckSquare2 className="w-4 h-4 text-onee-600 dark:text-onee-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono">
            {globalProgress} %
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-onee-600 transition-all duration-300"
              style={{ width: `${globalProgress}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400 flex justify-between">
            <span>{conformeCount} conformes</span>
            <span>{totalCount} exigences</span>
          </div>
        </div>

        {/* Conforme */}
        <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 shadow-2xs space-y-1">
          <div className="flex justify-between text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
            <span>Conformes</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            {conformeCount}
          </div>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
            Clauses validées sans réserve
          </p>
        </div>

        {/* En cours */}
        <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 shadow-2xs space-y-1">
          <div className="flex justify-between text-xs text-amber-800 dark:text-amber-300 font-semibold">
            <span>En Cours</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 font-mono">
            {inProgressCount}
          </div>
          <p className="text-[11px] text-amber-700 dark:text-amber-400">
            Dossiers / Déploiements actifs
          </p>
        </div>

        {/* À faire */}
        <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 shadow-2xs space-y-1">
          <div className="flex justify-between text-xs text-rose-800 dark:text-rose-300 font-semibold">
            <span>À Faire</span>
            <AlertCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 font-mono">
            {todoCount}
          </div>
          <p className="text-[11px] text-rose-700 dark:text-rose-400">
            Jalons ou réceptions futurs
          </p>
        </div>
      </div>

      {/* Category breakdown chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {categoryStats.map(cs => (
          <div
            key={cs.cat}
            className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-1.5"
          >
            <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
              <span>{cs.cat}</span>
              <span className="font-mono text-onee-600 dark:text-onee-400">{cs.pct}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-onee-600 rounded-full"
                style={{ width: `${cs.pct}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-400">
              {cs.conforme} / {cs.total} validés
            </div>
          </div>
        ))}
      </div>

      {/* Main Table / Tracker Card */}
      <Card
        title={`Matrice des Exigences Contractuelles (${filteredItems.length} affichées)`}
        subtitle="Suivi contradictoire des clauses administratives, financières, techniques, HSE et réception"
        source="CPS N° 88/DR9/C/I/2026"
        action={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
              title="Réinitialiser la matrice aux valeurs par défaut"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Réinitialiser</span>
            </button>
            <button
              type="button"
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-onee-600 hover:bg-onee-700 rounded-lg shadow-xs transition-colors"
              title="Exporter la matrice de conformité en format CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exporter CSV</span>
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Filtrer les exigences (titre, responsable, source, mot-clé)..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-onee-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedCat}
                onChange={e => setSelectedCat(e.target.value)}
                className="text-xs py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
              >
                <option value="all">Toutes les catégories</option>
                {categories.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatut}
                onChange={e => setSelectedStatut(e.target.value)}
                className="text-xs py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
              >
                <option value="all">Tous les statuts</option>
                <option value="CONFORME">Conforme</option>
                <option value="EN_COURS">En cours</option>
                <option value="A_FAIRE">À faire</option>
              </select>
            </div>
          </div>

          {/* List of Requirements */}
          <div className="space-y-3">
            {filteredItems.map(it => (
              <div
                key={it.id}
                className={`p-4 rounded-xl border transition-all ${
                  it.statut === 'CONFORME'
                    ? 'border-emerald-200 dark:border-emerald-900 bg-emerald-50/20 dark:bg-emerald-950/10'
                    : it.statut === 'EN_COURS'
                    ? 'border-amber-200 dark:border-amber-900 bg-amber-50/20 dark:bg-amber-950/10'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                } space-y-3`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="space-y-1 min-w-0 max-w-3xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" size="sm">
                        {it.categorie}
                      </Badge>
                      {it.critique && (
                        <Badge variant="danger" size="sm">
                          Critique
                        </Badge>
                      )}
                      <SourceBadge source={it.source} />
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                      {it.titre}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {it.exigence}
                    </p>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={it.statut}
                      onChange={e => handleStatusChange(it.id, e.target.value as any)}
                      className={`text-xs font-bold py-1.5 px-3 rounded-lg border focus:outline-none ${
                        it.statut === 'CONFORME'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                          : it.statut === 'EN_COURS'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                      }`}
                    >
                      <option value="CONFORME">Conforme</option>
                      <option value="EN_COURS">En cours</option>
                      <option value="A_FAIRE">À faire</option>
                    </select>
                  </div>
                </div>

                {/* Meta: Responsable & Comment */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="text-slate-500">
                    Responsable :{' '}
                    <strong className="text-slate-700 dark:text-slate-300">
                      {it.responsable || 'Non assigné'}
                    </strong>
                  </div>

                  <div className="flex-1 max-w-md">
                    <input
                      type="text"
                      value={it.commentaire || ''}
                      onChange={e => handleCommentChange(it.id, e.target.value)}
                      placeholder="Ajouter une note de suivi ou référence de PV..."
                      className="w-full px-2.5 py-1 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-onee-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
