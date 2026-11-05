import React, { useState } from 'react';
import {
  CircleDollarSign,
  ShieldCheck,
  CreditCard,
  PieChart as PieIcon,
  HelpCircle,
  Clock,
  ArrowRight,
  TrendingDown,
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { SourceBadge } from '../common/SourceBadge';
import { formatDH } from '../../utils/formatters';
import { MARKET_INFO } from '../../data/marketInfo';

export const FinanceSimulator: React.FC = () => {
  const [montantTTC, setMontantTTC] = useState<number>(MARKET_INFO.montantTravauxTTC);
  const [demandeAvance, setDemandeAvance] = useState<boolean>(true);

  // Derived financial values
  const cautionProvisoire = 167500.0;
  const cautionDefinitivePct = 3.0;
  const cautionDefinitive = (montantTTC * cautionDefinitivePct) / 100;

  const retenueGarantiePlafondPct = 7.0;
  const retenueGarantiePlafond = (montantTTC * retenueGarantiePlafondPct) / 100;

  const avancePct = 10.0;
  const montantAvance = demandeAvance ? (montantTTC * avancePct) / 100 : 0;
  const precomptePct = 12.5;

  const plafondDossierExecPct = 1.5;
  const plafondDossierExec = (montantTTC * plafondDossierExecPct) / 100;

  // Chart data
  const pieData = [
    { name: 'Fourniture & Pose Équipements (Estimé)', value: montantTTC * 0.75, color: '#0284c7' },
    { name: 'Plateforme & Postes de Contrôle', value: montantTTC * 0.15, color: '#0ea5e9' },
    { name: 'Études & Dossier d’exécution (Plafond 1.5%)', value: plafondDossierExec, color: '#38bdf8' },
    { name: 'Formation & Prestations Diverses', value: montantTTC * 0.085, color: '#10b981' },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Guarantees and Payment terms */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Caution Provisoire */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Caution Provisoire</span>
            <ShieldCheck className="w-4 h-4 text-onee-600 dark:text-onee-400" />
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-slate-100 font-mono">
            {formatDH(cautionProvisoire)}
          </div>
          <p className="text-[11px] text-slate-400">Montant fixe forfaitaire</p>
          <div className="text-[10px] font-mono text-onee-600 dark:text-onee-400">CCAFP Art. 15</div>
        </div>

        {/* Caution Définitive */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Caution Définitive (3%)</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            {formatDH(cautionDefinitive)}
          </div>
          <p className="text-[11px] text-slate-400">À déposer sous 20 jours</p>
          <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">CCAFP Art. 15</div>
        </div>

        {/* Retenue de Garantie */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Retenue Garantie (Plaf. 7%)</span>
            <ShieldCheck className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-bold text-amber-600 dark:text-amber-400 font-mono">
            {formatDH(retenueGarantiePlafond)}
          </div>
          <p className="text-[11px] text-slate-400">10% prélevés / acompte</p>
          <div className="text-[10px] font-mono text-amber-600 dark:text-amber-400">CCAFP Art. 15</div>
        </div>

        {/* Délai de Paiement */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Délai de Paiement</span>
            <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-xl font-bold text-purple-600 dark:text-purple-400 font-mono">
            90 jours
          </div>
          <p className="text-[11px] text-slate-400">Virement après attachement</p>
          <div className="text-[10px] font-mono text-purple-600 dark:text-purple-400">CCAFP Art. 14</div>
        </div>
      </div>

      {/* Interactive Simulator */}
      <Card
        title="Simulateur Financier des Règlements & Avances"
        subtitle="Ajustez le montant total du marché pour recalculer les garanties, précomptes et jalons d’acompte"
        source="CCAFP – Art. 11, 12, 13, 15"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs & Settings */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Montant du Marché Travaux TTC (DH) :
              </label>
              <input
                type="number"
                value={montantTTC}
                onChange={e => setMontantTTC(Number(e.target.value) || 0)}
                step={500000}
                className="w-full px-3 py-2 text-sm font-mono font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-onee-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Régime : Prix fermes non révisables</span>
                <span>TVA marocaine : 20%</span>
              </div>
            </div>

            {/* Toggle Avance */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Demande d’Avance forfaitaire (10%) :
                </span>
                <input
                  type="checkbox"
                  checked={demandeAvance}
                  onChange={e => setDemandeAvance(e.target.checked)}
                  className="w-4 h-4 accent-onee-600 rounded cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Sous réserve de caution bancaire personnelle et solidaire de 100% de l’avance.
              </p>
              {demandeAvance && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-xs">
                  <span className="text-onee-700 dark:text-onee-300 font-medium">Montant Avance :</span>
                  <span className="font-mono font-bold text-onee-700 dark:text-onee-300">
                    {formatDH(montantAvance)}
                  </span>
                </div>
              )}
            </div>

            {/* Repayment rule */}
            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 space-y-1">
              <span className="font-bold">Modalités d’amortissement de l’avance :</span>
              <p className="text-[11px] leading-relaxed">
                Remboursement par précompte systématique de <strong>12,5%</strong> sur chaque décompte
                mensuel jusqu’à apurement total du montant versé (CCAFP Art. 12).
              </p>
            </div>
          </div>

          {/* Breakdown of Payment Steps (Article 13) */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Échéancier de Paiement Réglementaire (Article 13)
            </h4>

            {/* Table / Step cards */}
            <div className="space-y-2.5">
              {/* Dossier d'exécution */}
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    1. Dossier d’exécution
                  </div>
                  <div className="text-[11px] text-slate-500">
                    100% à l’approbation par l’ONEE (plafonné à 1,5% du marché)
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                    {formatDH(plafondDossierExec)}
                  </span>
                  <div className="text-[10px] text-slate-400 font-mono">Max 1,5%</div>
                </div>
              </div>

              {/* Fourniture équipements : 40% livraison */}
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    2. Équipements : Livraison sur site
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Réception sur site avec accord formel pour montage
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <Badge variant="primary" size="sm">
                    40 % du poste
                  </Badge>
                </div>
              </div>

              {/* Équipements : 20% montage */}
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    3. Équipements : Fin du montage physique
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Pose physique terminée sur les postes de terrain
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <Badge variant="info" size="sm">
                    20 % du poste
                  </Badge>
                </div>
              </div>

              {/* Équipements : 20% marche semi-indus */}
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    4. Équipements : Fin marche semi-industrielle
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Période de 1 mois continu validée sans panne
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <Badge variant="warning" size="sm">
                    20 % du poste
                  </Badge>
                </div>
              </div>

              {/* Équipements : 20% solde réception provisoire */}
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    5. Équipements : Solde Réception Provisoire
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Au prononcé officiel du PV de réception provisoire
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <Badge variant="success" size="sm">
                    20 % (Solde)
                  </Badge>
                </div>
              </div>

              {/* Installation & Repliement */}
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    6. Installation et Repliement de chantier
                  </div>
                  <div className="text-[11px] text-slate-500">
                    50% au premier décompte, 50% au repliement final et remise en état des lieux
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                    50% / 50%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
