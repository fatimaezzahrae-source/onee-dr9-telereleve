import React, { useState, useMemo } from 'react';
import {
  TableProperties,
  Search,
  Download,
  RotateCcw,
  CircleDollarSign,
  PieChart as PieIcon,
  TrendingUp,
  TrendingDown,
  Info,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { SourceBadge } from '../common/SourceBadge';
import { BPDE_ITEMS, BPDE_COMPOSANTS } from '../../data/bpdePrices';
import { BpdeItem } from '../../types';
import { formatDH, formatNumber, formatPct } from '../../utils/formatters';
import { downloadCsv } from '../../utils/exportCsv';
import { getStoredValue, setStoredValue } from '../../utils/storage';
import { MARKET_INFO } from '../../data/marketInfo';

export const BpdeTable: React.FC = () => {
  // Local state for user entered prices and quantities
  const [userValues, setUserValues] = useState<Record<string, { qte: number; pu: number }>>(() => {
    const saved = getStoredValue<Record<string, { qte: number; pu: number }>>('bpde_values', {});
    if (Object.keys(saved).length > 0) return saved;

    // Fallback to default realistic estimates
    const init: Record<string, { qte: number; pu: number }> = {};
    BPDE_ITEMS.forEach(it => {
      init[it.numero] = {
        qte: it.quantiteDefaut || 1,
        pu: it.prixUnitaireDefaut || 0,
      };
    });
    return init;
  });

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const handleUpdate = (numero: string, field: 'qte' | 'pu', value: number) => {
    setUserValues(prev => {
      const current = prev[numero] || { qte: 1, pu: 0 };
      const updated = {
        ...prev,
        [numero]: {
          ...current,
          [field]: Math.max(0, value),
        },
      };
      setStoredValue('bpde_values', updated);
      return updated;
    });
  };

  const handleResetDefaults = () => {
    if (confirm('Réinitialiser tous les prix et quantités aux valeurs estimatives par défaut ?')) {
      const init: Record<string, { qte: number; pu: number }> = {};
      BPDE_ITEMS.forEach(it => {
        init[it.numero] = {
          qte: it.quantiteDefaut || 1,
          pu: it.prixUnitaireDefaut || 0,
        };
      });
      setUserValues(init);
      setStoredValue('bpde_values', init);
    }
  };

  // Calculations for works (Prix 1 to 26)
  const worksItems = useMemo(() => BPDE_ITEMS.filter(it => it.type === 'travaux'), []);
  const maintItems = useMemo(() => BPDE_ITEMS.filter(it => it.type === 'maintenance'), []);

  // Totals for works
  const totalWorksHT = useMemo(() => {
    return worksItems.reduce((acc, it) => {
      const vals = userValues[it.numero] || { qte: 0, pu: 0 };
      return acc + vals.qte * vals.pu;
    }, 0);
  }, [worksItems, userValues]);

  const tvaWorks = totalWorksHT * 0.2;
  const totalWorksTTC = totalWorksHT + tvaWorks;

  const ecartWorksTTC = totalWorksTTC - MARKET_INFO.montantTravauxTTC;
  const ecartWorksPct = ((totalWorksTTC - MARKET_INFO.montantTravauxTTC) / MARKET_INFO.montantTravauxTTC) * 100;

  // Totals for maintenance (Prix M1 to M9)
  const totalMaintHT = useMemo(() => {
    return maintItems.reduce((acc, it) => {
      const vals = userValues[it.numero] || { qte: 0, pu: 0 };
      return acc + vals.qte * vals.pu;
    }, 0);
  }, [maintItems, userValues]);

  const tvaMaint = totalMaintHT * 0.2;
  const totalMaintTTC = totalMaintHT + tvaMaint;

  // Breakdown by component for chart
  const compBreakdown = useMemo(() => {
    const list = [
      { name: 'Comp. 1 — Études', key: 'comp-1', total: 0, color: '#38bdf8' },
      { name: 'Comp. 2 — Terrain', key: 'comp-2', total: 0, color: '#0284c7' },
      { name: 'Comp. 3 — Postes', key: 'comp-3', total: 0, color: '#0f766e' },
      { name: 'Comp. 4 — Divers', key: 'comp-4', total: 0, color: '#10b981' },
    ];

    worksItems.forEach(it => {
      const vals = userValues[it.numero] || { qte: 0, pu: 0 };
      const rowTotal = vals.qte * vals.pu * 1.2; // TTC
      const comp = list.find(c => c.key === it.composantId);
      if (comp) comp.total += rowTotal;
    });

    return list;
  }, [worksItems, userValues]);

  // Filtered items
  const filteredItems = useMemo(() => {
    return BPDE_ITEMS.filter(it => {
      const matchFilter =
        activeFilter === 'all' ||
        (activeFilter === 'travaux' && it.type === 'travaux') ||
        (activeFilter === 'maintenance' && it.type === 'maintenance') ||
        it.composantId === activeFilter;

      const matchSearch =
        search === '' ||
        it.numero.toLowerCase().includes(search.toLowerCase()) ||
        it.libelle.toLowerCase().includes(search.toLowerCase());

      return matchFilter && matchSearch;
    });
  }, [activeFilter, search]);

  // Export CSV
  const handleExportCsv = () => {
    const headers = [
      'Type',
      'Composant',
      'N° Prix',
      'Libellé de la Prestation',
      'Unité',
      'Quantité',
      'Prix Unitaire HT (DH)',
      'Total HT (DH)',
      'TVA 20% (DH)',
      'Total TTC (DH)',
    ];

    const rows = BPDE_ITEMS.map(it => {
      const vals = userValues[it.numero] || { qte: 0, pu: 0 };
      const rowHt = vals.qte * vals.pu;
      const rowTva = rowHt * 0.2;
      const rowTtc = rowHt + rowTva;

      return [
        it.type === 'travaux' ? 'Marché Travaux' : 'Maintenance (5 ans)',
        it.composantNom || 'Maintenance',
        it.numero,
        it.libelle,
        it.unite,
        vals.qte,
        vals.pu.toFixed(2),
        rowHt.toFixed(2),
        rowTva.toFixed(2),
        rowTtc.toFixed(2),
      ];
    });

    // Add totals
    rows.push(['TOTAL TRAVAUX HT', '', '', '', '', '', '', totalWorksHT.toFixed(2), tvaWorks.toFixed(2), totalWorksTTC.toFixed(2)]);
    rows.push(['ESTIMATION OFFICIELLE TRAVAUX TTC', '', '', '', '', '', '', '', '', MARKET_INFO.montantTravauxTTC.toFixed(2)]);
    rows.push(['TOTAL MAINTENANCE TTC', '', '', '', '', '', '', totalMaintHT.toFixed(2), tvaMaint.toFixed(2), totalMaintTTC.toFixed(2)]);

    downloadCsv('Bordereau_BPDE_ONEE_DR9_Marche_88', rows, headers);
  };

  return (
    <div className="space-y-6">
      {/* Financial Summary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Travaux Chiffré */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Travaux Chiffrés TTC</span>
            <CircleDollarSign className="w-4 h-4 text-onee-600 dark:text-onee-400" />
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-slate-100 font-mono truncate">
            {formatDH(totalWorksTTC)}
          </div>
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Total HT : {formatDH(totalWorksHT)}</span>
          </div>
        </div>

        {/* Estimation Marché */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Estimation Travaux CPS</span>
            <Badge variant="primary" size="sm">Ferme</Badge>
          </div>
          <div className="text-xl font-bold text-onee-600 dark:text-onee-400 font-mono">
            {formatDH(MARKET_INFO.montantTravauxTTC)}
          </div>
          <div className="text-[11px] text-slate-400">Régime : Prix fermes non révisables</div>
        </div>

        {/* Écart vs Estimation */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Écart vs Estimation</span>
            {ecartWorksTTC > 0 ? (
              <TrendingUp className="w-4 h-4 text-rose-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-emerald-500" />
            )}
          </div>
          <div
            className={`text-xl font-bold font-mono truncate ${
              Math.abs(ecartWorksPct) <= 5
                ? 'text-emerald-600 dark:text-emerald-400'
                : ecartWorksTTC > 0
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-amber-600 dark:text-amber-400'
            }`}
          >
            {ecartWorksTTC > 0 ? `+${formatDH(ecartWorksTTC)}` : formatDH(ecartWorksTTC)}
          </div>
          <div className="text-[11px] text-slate-400">
            Différence relative : <strong>{ecartWorksPct > 0 ? `+${formatPct(ecartWorksPct)}` : formatPct(ecartWorksPct)}</strong>
          </div>
        </div>

        {/* Maintenance Chiffrée */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Maintenance TTC (M1-M9)</span>
            <Badge variant="secondary" size="sm">5 Ans</Badge>
          </div>
          <div className="text-xl font-bold text-teal-600 dark:text-teal-400 font-mono truncate">
            {formatDH(totalMaintTTC)}
          </div>
          <div className="text-[11px] text-slate-400">
            Estimé CPS : {formatDH(MARKET_INFO.montantMaintenanceTTC)}
          </div>
        </div>
      </div>

      {/* Breakdown Chart */}
      <Card
        title="Répartition Budgétaire par Composant (Travaux TTC)"
        subtitle="Ventilation du montant chiffré sur les 4 composants du marché principal"
        source="CPS Partie V"
      >
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={compBreakdown} layout="vertical" margin={{ left: 120, right: 30, top: 10, bottom: 10 }}>
              <XAxis type="number" tickFormatter={val => `${(val / 1000000).toFixed(1)}M`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} />
              <Tooltip formatter={(val: any) => formatDH(Number(val))} />
              <Bar dataKey="total" radius={[0, 8, 8, 0]}>
                {compBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Main Interactive Table */}
      <Card
        title={`Bordereau des Prix Détail Estimatif (${filteredItems.length} lignes)`}
        subtitle="Saisissez ou modifiez les quantités et prix unitaires HT pour simuler votre offre ou suivre les décomptes"
        source="CPS Partie V – Définition des Prix"
        action={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
              title="Réinitialiser aux valeurs moyennes"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Réinitialiser</span>
            </button>
            <button
              type="button"
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-onee-600 hover:bg-onee-700 rounded-lg shadow-xs transition-colors"
              title="Télécharger le bordereau renseigné en fichier CSV / Excel"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exporter CSV / Excel</span>
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher par numéro ou libellé (ex. Prix 11, datalogger, turbidimètre, etc.)..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-onee-500"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <select
                value={activeFilter}
                onChange={e => setActiveFilter(e.target.value)}
                className="text-xs py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
              >
                <option value="all">Toutes les lignes (35 prix)</option>
                <option value="travaux">Marché Travaux (Prix 1 à 26)</option>
                <option value="comp-1">Composant 1 : Études & Doc (Prix 1-2)</option>
                <option value="comp-2">Composant 2 : Équipements Terrain (Prix 3-12)</option>
                <option value="comp-3">Composant 3 : Plateforme & Postes (Prix 13-21)</option>
                <option value="comp-4">Composant 4 : Divers & Annexes (Prix 22-26)</option>
                <option value="maintenance">Marché Maintenance (Prix M1 à M9)</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3 w-24">N° Prix</th>
                  <th className="p-3">Libellé des Prestations du CPS</th>
                  <th className="p-3 text-center w-16">Unité</th>
                  <th className="p-3 text-right w-24">Quantité</th>
                  <th className="p-3 text-right w-36">Prix Unit. HT (DH)</th>
                  <th className="p-3 text-right w-36">Total HT (DH)</th>
                  <th className="p-3 text-right w-36">Total TTC (20%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredItems.map(it => {
                  const vals = userValues[it.numero] || { qte: 1, pu: 0 };
                  const rowHt = vals.qte * vals.pu;
                  const rowTtc = rowHt * 1.2;

                  return (
                    <tr
                      key={it.numero}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="p-3 font-mono font-bold text-onee-600 dark:text-onee-400 whitespace-nowrap">
                        {it.numero}
                      </td>
                      <td className="p-3 font-medium text-slate-800 dark:text-slate-200">
                        <div>{it.libelle}</div>
                        {it.composantNom && (
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {it.composantNom}
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[11px] font-bold">
                          {it.unite}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <input
                          type="number"
                          min={0}
                          value={vals.qte}
                          onChange={e =>
                            handleUpdate(it.numero, 'qte', Number(e.target.value) || 0)
                          }
                          className="w-20 px-2 py-1 text-right font-mono text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-onee-500"
                        />
                      </td>
                      <td className="p-3 text-right">
                        <input
                          type="number"
                          min={0}
                          step={500}
                          value={vals.pu}
                          onChange={e =>
                            handleUpdate(it.numero, 'pu', Number(e.target.value) || 0)
                          }
                          className="w-28 px-2 py-1 text-right font-mono text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-onee-500"
                        />
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                        {formatDH(rowHt)}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-onee-600 dark:text-onee-400 whitespace-nowrap">
                        {formatDH(rowTtc)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center gap-2">
            <Info className="w-4 h-4 text-onee-600 shrink-0" />
            <span>
              <strong>Note méthodologique :</strong> Le CPS ne comporte aucun prix unitaire préétabli. Les montants par défaut correspondent à l’estimation macro-économique d’environ 12 000 000 DH TTC pour les travaux et 4 749 996 DH TTC pour la maintenance sur 5 ans.
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
