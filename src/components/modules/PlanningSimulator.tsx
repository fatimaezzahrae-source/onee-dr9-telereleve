import React, { useState, useMemo } from 'react';
import {
  Calendar,
  AlertTriangle,
  Clock,
  ShieldAlert,
  CalendarCheck,
  TrendingUp,
  FileCheck2,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { SourceBadge } from '../common/SourceBadge';
import { formatDH, formatDateFr, addMonths, addDays } from '../../utils/formatters';
import { MARKET_INFO } from '../../data/marketInfo';

export const PlanningSimulator: React.FC = () => {
  // Start date from OS (Ordre de Service)
  const [startDateStr, setStartDateStr] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  // Delay penalty simulator state
  const [contractAmount, setContractAmount] = useState<number>(MARKET_INFO.montantTravauxTTC);
  const [retardJoursTravaux, setRetardJoursTravaux] = useState<number>(15);
  const [retardJoursDoe, setRetardJoursDoe] = useState<number>(0);

  // Computed theoretical milestone dates
  const planningSchedule = useMemo(() => {
    const start = new Date(startDateStr);
    if (isNaN(start.getTime())) return null;

    const endDossier = addMonths(start, 2);
    const endTravaux = addMonths(endDossier, 8);
    const endSemiIndus = addMonths(endTravaux, 1);
    const endEssais = addMonths(endSemiIndus, 1);
    const endGarantie = addMonths(endEssais, 12);
    const endMaintenance = addMonths(endGarantie, 60);

    return [
      {
        id: 'p1',
        nom: 'Dossier d’exécution',
        duree: '2 mois',
        debut: start,
        fin: endDossier,
        description: 'Programme, mémoire technique, notes de calcul, plans d’exécution',
        color: 'bg-blue-500',
        textColor: 'text-blue-600 dark:text-blue-400',
        badge: 'Étape 1',
      },
      {
        id: 'p2',
        nom: 'Travaux et installations sur site',
        duree: '8 mois',
        debut: endDossier,
        fin: endTravaux,
        description: 'Pose des dataloggers, capteurs de pression, turbidimètres, chlore, câblage',
        color: 'bg-emerald-500',
        textColor: 'text-emerald-600 dark:text-emerald-400',
        badge: 'Étape 2',
      },
      {
        id: 'p3',
        nom: 'Mise en service semi-industrielle',
        duree: '1 mois',
        debut: endTravaux,
        fin: endSemiIndus,
        description: 'Fonctionnement continu de 1 mois sans incident majeur sur les 5 sites',
        color: 'bg-amber-500',
        textColor: 'text-amber-600 dark:text-amber-400',
        badge: 'Étape 3',
      },
      {
        id: 'p4',
        nom: 'Essais de mise en service industrielle & Formations',
        duree: '1 mois',
        debut: endSemiIndus,
        fin: endEssais,
        description: 'Essais sous contrôle ONEE + Formation des 15 agents (seuil 75/100)',
        color: 'bg-purple-500',
        textColor: 'text-purple-600 dark:text-purple-400',
        badge: 'Étape 4 (RP)',
      },
      {
        id: 'p5',
        nom: 'Période de Garantie Contractuelle',
        duree: '12 mois (1 an)',
        debut: endEssais,
        fin: endGarantie,
        description: 'Garantie intégrale pièces et main d’œuvre. Levée des réserves.',
        color: 'bg-teal-500',
        textColor: 'text-teal-600 dark:text-teal-400',
        badge: 'Garantie',
      },
      {
        id: 'p6',
        nom: 'Marché de Maintenance (5 ans)',
        duree: '5 années',
        debut: endGarantie,
        fin: endMaintenance,
        description: 'Prestations préventives (10 sem/an) et curatives (≤ 48h / 6j)',
        color: 'bg-indigo-500',
        textColor: 'text-indigo-600 dark:text-indigo-400',
        badge: 'Maintenance',
      },
    ];
  }, [startDateStr]);

  // Calculations for penalties
  const rateTravaux = 1 / 1000;
  const ceilingPct = 8.0;
  const ceilingAmount = (contractAmount * ceilingPct) / 100;

  const rawPenaliteTravaux = contractAmount * rateTravaux * retardJoursTravaux;
  const isCeilingReached = rawPenaliteTravaux >= ceilingAmount;
  const finalPenaliteTravaux = Math.min(rawPenaliteTravaux, ceilingAmount);

  const rateDoe = 1 / 4000;
  const penaliteDoe = contractAmount * rateDoe * retardJoursDoe;
  const totalPenalites = finalPenaliteTravaux + penaliteDoe;

  const pctAtteint = Math.min((rawPenaliteTravaux / ceilingAmount) * 100, 100);

  return (
    <div className="space-y-6">
      {/* Top OS Date Input & Milestones */}
      <Card
        title="Simulateur d’Échéancier Contractuel (Délai 12 mois)"
        subtitle="Saisissez la date de notification de l’Ordre de Service (OS) pour recalculer automatiquement toutes les dates jalons"
        source="CCAFP – Art. 8 & Art. 18"
      >
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-onee-600 dark:text-onee-400" />
              <label htmlFor="os-date" className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Date de l’Ordre de Service (OS) de démarrage :
              </label>
            </div>
            <input
              id="os-date"
              type="date"
              value={startDateStr}
              onChange={e => setStartDateStr(e.target.value)}
              className="px-3 py-1.5 text-xs font-mono font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-onee-500"
            />
            {planningSchedule && (
              <span className="text-xs text-slate-500">
                Fin contractuelle des 12 mois :{' '}
                <strong className="text-slate-900 dark:text-slate-100 font-mono">
                  {formatDateFr(planningSchedule[3].fin)}
                </strong>
              </span>
            )}
          </div>

          {/* Interactive Gantt / Timeline visualization */}
          {planningSchedule && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold uppercase tracking-wider">
                  Diagramme des Phases & Échéances Clés
                </span>
                <span>Délai global : 12 mois (hors garantie & maintenance)</span>
              </div>

              <div className="space-y-2.5">
                {planningSchedule.map((phase, idx) => (
                  <div
                    key={phase.id}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${phase.color}`} />
                        <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                          {phase.nom}
                        </span>
                        <Badge variant="secondary" size="sm">
                          {phase.duree}
                        </Badge>
                      </div>
                      <div className="text-xs font-mono text-slate-600 dark:text-slate-400">
                        Du <strong className="text-slate-800 dark:text-slate-200">{formatDateFr(phase.debut)}</strong> au{' '}
                        <strong className="text-slate-800 dark:text-slate-200">{formatDateFr(phase.fin)}</strong>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {phase.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Weather clause reminder */}
          <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-onee-600 dark:text-onee-400" />
              <span>
                <strong>Article 9 (Intempéries) :</strong> Aucune prolongation de délai pour intempéries ne sera accordée.
              </span>
            </div>
            <SourceBadge source="CCAFP – Art. 9" />
          </div>
        </div>
      </Card>

      {/* Simulator of Delay Penalties */}
      <Card
        title="Simulateur Interactif des Pénalités de Retard"
        subtitle="Calcul des pénalités contractuelles (1/1000 par jour travaux, 1/4000 par jour DOE) et contrôle du plafond de 8%"
        source="CCAFP – Art. 10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Montant du marché */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between">
                <span>Montant du Marché TTC pris en compte :</span>
                <span className="font-mono text-onee-600 dark:text-onee-400">
                  {formatDH(contractAmount)}
                </span>
              </label>
              <input
                type="number"
                value={contractAmount}
                onChange={e => setContractAmount(Number(e.target.value) || 0)}
                step={100000}
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-onee-500"
              />
              <p className="text-[11px] text-slate-400">
                Par défaut : 12 000 000,00 DH TTC (Montant estimatif initial du marché)
              </p>
            </div>

            {/* Retard Travaux Slider */}
            <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Retard sur travaux / mise en service (Taux 1/1000e par jour) :
                </span>
                <span className="font-mono font-bold text-sm text-onee-600 dark:text-onee-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                  {retardJoursTravaux} jour(s)
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={120}
                value={retardJoursTravaux}
                onChange={e => setRetardJoursTravaux(Number(e.target.value))}
                className="w-full accent-onee-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0 jour (Délai respecté)</span>
                <span>80 jours (Seuil critique 8%)</span>
                <span>120 jours</span>
              </div>
            </div>

            {/* Retard DOE Slider */}
            <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Retard remise DOE & repliement (Taux 1/4000e par jour) :
                </span>
                <span className="font-mono font-bold text-sm text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                  {retardJoursDoe} jour(s)
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={60}
                value={retardJoursDoe}
                onChange={e => setRetardJoursDoe(Number(e.target.value))}
                className="w-full accent-amber-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0 jour</span>
                <span>30 jours</span>
                <span>60 jours</span>
              </div>
            </div>
          </div>

          {/* Calculation & Gauge Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Bilan des Pénalités Calculées
              </span>

              {/* Detail lines */}
              <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Pénalité journalière travaux (1/1000) :
                  </span>
                  <span className="font-mono font-semibold">
                    {formatDH(contractAmount * rateTravaux)} / jour
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Sous-total travaux ({retardJoursTravaux} j) :
                  </span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                    {formatDH(finalPenaliteTravaux)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Pénalité journalière DOE (1/4000) :
                  </span>
                  <span className="font-mono font-semibold">
                    {formatDH(contractAmount * rateDoe)} / jour
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Sous-total DOE ({retardJoursDoe} j) :
                  </span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                    {formatDH(penaliteDoe)}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-baseline">
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Total Pénalités :
                  </span>
                  <span className="font-mono font-extrabold text-lg text-rose-600 dark:text-rose-400">
                    {formatDH(totalPenalites)}
                  </span>
                </div>
              </div>

              {/* Ceiling Gauge */}
              <div className="pt-2 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Plafond légal 8% TTC :</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {formatDH(ceilingAmount)}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isCeilingReached
                        ? 'bg-rose-600'
                        : pctAtteint > 70
                        ? 'bg-amber-500'
                        : 'bg-onee-600'
                    }`}
                    style={{ width: `${pctAtteint}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Consommation du plafond :</span>
                  <span className="font-mono font-bold">{pctAtteint.toFixed(1)} %</span>
                </div>
              </div>

              {/* Alert if ceiling reached */}
              {isCeilingReached && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-start gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-rose-900 dark:text-rose-200 leading-tight">
                    <strong>PLAFOND DE 8% ATTEINT :</strong> L’ONEE se réserve le droit de
                    prononcer la résiliation du marché de plein droit aux torts exclusifs du
                    titulaire (Art. 10 point 2).
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
