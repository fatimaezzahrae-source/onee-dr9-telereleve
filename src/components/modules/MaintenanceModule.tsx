import React, { useState } from 'react';
import {
  Wrench,
  Clock,
  ShieldAlert,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Activity,
  TrendingDown,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { SourceBadge } from '../common/SourceBadge';
import {
  MAINTENANCE_INFO,
  PREVENTIVE_SPECS,
  CURATIVE_SPECS,
} from '../../data/maintenanceData';
import { formatDH } from '../../utils/formatters';

export const MaintenanceModule: React.FC = () => {
  // Penalty simulator state
  const [interventionCost, setInterventionCost] = useState<number>(35000); // Montant de l'intervention de maintenance concernée
  const [retardPreventifJours, setRetardPreventifJours] = useState<number>(5);
  const [retardReponseHeures, setRetardReponseHeures] = useState<number>(8); // au-delà des 48h
  const [retardReparationHeures, setRetardReparationHeures] = useState<number>(12); // au-delà des 6 jours

  // Calculations
  const penalitePreventif = interventionCost * (PREVENTIVE_SPECS.penaliteRetardJourPct / 100) * retardPreventifJours;
  const penaliteReponse = interventionCost * (CURATIVE_SPECS.penaliteReponseHeurePct / 100) * retardReponseHeures;
  const penaliteReparation = interventionCost * (CURATIVE_SPECS.penaliteReparationHeurePct / 100) * retardReparationHeures;

  const rawTotalPenalite = penalitePreventif + penaliteReponse + penaliteReparation;
  const isCeilingReached = rawTotalPenalite >= MAINTENANCE_INFO.plafondPenalitesDH;
  const finalPenalite = Math.min(rawTotalPenalite, MAINTENANCE_INFO.plafondPenalitesDH);

  const pctPlafond = Math.min((rawTotalPenalite / MAINTENANCE_INFO.plafondPenalitesDH) * 100, 100);

  return (
    <div className="space-y-6">
      {/* Overview 5 years and 4.75M DH */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Montant Total */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Budget Global TTC</span>
            <Wrench className="w-4 h-4 text-onee-600 dark:text-onee-400" />
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-slate-100 font-mono">
            {formatDH(MAINTENANCE_INFO.montantTotalTTC)}
          </div>
          <p className="text-[11px] text-slate-400">Marché sur 5 ans fermes</p>
          <div className="text-[10px] font-mono text-onee-600 dark:text-onee-400">Partie III Art. 1</div>
        </div>

        {/* Durée */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Durée du Contrat</span>
            <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            {MAINTENANCE_INFO.dureeAnnees} années
          </div>
          <p className="text-[11px] text-slate-400">Prise d'effet après RD</p>
          <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">Partie III Art. 1</div>
        </div>

        {/* Campagne Préventive */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Campagne Préventive</span>
            <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400 font-mono">
            {PREVENTIVE_SPECS.dureeCampagneSemaines} semaines
          </div>
          <p className="text-[11px] text-slate-400">8 sem terrain + 2 rapports</p>
          <div className="text-[10px] font-mono text-blue-600 dark:text-blue-400">Partie III Art. 2</div>
        </div>

        {/* Astreinte Curative */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Astreinte Curative</span>
            <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-xl font-bold text-purple-600 dark:text-purple-400 font-mono">
            ≤ 48h / ≤ 6j
          </div>
          <p className="text-[11px] text-slate-400">Arrivée site ≤ 48h / Solde ≤ 6j</p>
          <div className="text-[10px] font-mono text-purple-600 dark:text-purple-400">Partie III Art. 3</div>
        </div>
      </div>

      {/* Two Pillars: Preventive vs Curative */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1: Preventive */}
        <Card
          title="Maintenance Préventive (Campagne Annuelle de 10 Semaines)"
          subtitle="8 semaines d’interventions sur site + 2 semaines de vérifications & rapports"
          source="CPS Partie III – Art. 2"
        >
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-onee-50/60 dark:bg-onee-950/40 border border-onee-200 dark:border-onee-800 text-xs text-onee-900 dark:text-onee-200 flex justify-between">
              <span>Pénalité de retard préventif :</span>
              <strong className="font-mono">3% de l’intervention / jour calendaire</strong>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Prestations Contractuelles Incluses :
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {PREVENTIVE_SPECS.prestations.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-onee-600 dark:text-onee-400 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Pillar 2: Curative */}
        <Card
          title="Maintenance Curative & Délais d’Intervention"
          subtitle="Notification officielle par fax ou e-mail de l’ONEE"
          source="CPS Partie III – Art. 3 & 4"
        >
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-rose-50/60 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 flex justify-between">
              <span>Pénalités retard réponse & réparation :</span>
              <strong className="font-mono">2% de l’intervention / heure de retard</strong>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Engagements de Service (SLA) :
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {CURATIVE_SPECS.engagements.map((e, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
              📞 <strong>Astreinte 24/7 :</strong> Toute notification officielle déclenche le chronomètre des 48 heures contractuelles pour l'arrivée des équipes sur place.
            </div>
          </div>
        </Card>
      </div>

      {/* Interactive Maintenance Penalty Simulator */}
      <Card
        title="Simulateur Interactif des Pénalités de Maintenance"
        subtitle="Calcul des pénalités selon l'Art. 4 (3%/j préventif, 2%/h réponse, 2%/h réparation) avec jauge du plafond de 10%"
        source="CPS Partie III – Art. 4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between">
                <span>Montant estimé de l’intervention concernée (DH HT) :</span>
                <span className="font-mono text-onee-600 dark:text-onee-400">
                  {formatDH(interventionCost)}
                </span>
              </label>
              <input
                type="number"
                value={interventionCost}
                onChange={e => setInterventionCost(Number(e.target.value) || 0)}
                step={5000}
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-onee-500"
              />
            </div>

            {/* Slider 1: Retard Préventif */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Retard maintenance préventive (3% / jour) :
                </span>
                <span className="font-mono font-bold text-onee-600 dark:text-onee-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                  {retardPreventifJours} jour(s)
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                value={retardPreventifJours}
                onChange={e => setRetardPreventifJours(Number(e.target.value))}
                className="w-full accent-onee-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0 jour</span>
                <span>Pénalité calculée : {formatDH(penalitePreventif)}</span>
                <span>30 jours</span>
              </div>
            </div>

            {/* Slider 2: Retard Réponse Curative (> 48h) */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Retard d’arrivée sur site &gt; 48h (2% / heure) :
                </span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                  {retardReponseHeures} heure(s)
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={48}
                value={retardReponseHeures}
                onChange={e => setRetardReponseHeures(Number(e.target.value))}
                className="w-full accent-amber-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0 heure</span>
                <span>Pénalité calculée : {formatDH(penaliteReponse)}</span>
                <span>48 heures</span>
              </div>
            </div>

            {/* Slider 3: Retard Réparation (> 6j) */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Retard d’achèvement de la réparation &gt; 6 jours (2% / heure) :
                </span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                  {retardReparationHeures} heure(s)
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={72}
                value={retardReparationHeures}
                onChange={e => setRetardReparationHeures(Number(e.target.value))}
                className="w-full accent-rose-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0 heure</span>
                <span>Pénalité calculée : {formatDH(penaliteReparation)}</span>
                <span>72 heures</span>
              </div>
            </div>
          </div>

          {/* Results & Global Ceiling Gauge (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Bilan des Pénalités de Maintenance
              </span>

              <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Pénalité Préventive :</span>
                  <span className="font-mono font-semibold">{formatDH(penalitePreventif)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pénalité Réponse (&gt;48h) :</span>
                  <span className="font-mono font-semibold">{formatDH(penaliteReponse)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pénalité Réparation (&gt;6j) :</span>
                  <span className="font-mono font-semibold">{formatDH(penaliteReparation)}</span>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-baseline">
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Total Pénalités Cumulées :
                  </span>
                  <span className="font-mono font-extrabold text-lg text-rose-600 dark:text-rose-400">
                    {formatDH(finalPenalite)}
                  </span>
                </div>
              </div>

              {/* Ceiling Gauge: 10% of 4 749 996 = 474 999.60 DH */}
              <div className="pt-3 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Plafond légal 10% Maintenance :</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {formatDH(MAINTENANCE_INFO.plafondPenalitesDH)}
                  </span>
                </div>

                <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isCeilingReached
                        ? 'bg-rose-600'
                        : pctPlafond > 70
                        ? 'bg-amber-500'
                        : 'bg-onee-600'
                    }`}
                    style={{ width: `${pctPlafond}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Consommation du plafond :</span>
                  <span className="font-mono font-bold">{pctPlafond.toFixed(1)} %</span>
                </div>
              </div>

              {isCeilingReached && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-start gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-rose-900 dark:text-rose-200 leading-tight">
                    <strong>PLAFOND DE 10% ATTEINT :</strong> Risque de résiliation du contrat de maintenance aux torts du titulaire.
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
