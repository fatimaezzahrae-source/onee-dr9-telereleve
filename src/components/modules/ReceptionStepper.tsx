import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Award,
  Clock,
  ShieldCheck,
  FileCheck,
  Sparkles,
  AlertCircle,
  FolderArchive,
  RotateCcw,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { SourceBadge } from '../common/SourceBadge';
import { getStoredValue, setStoredValue } from '../../utils/storage';

interface ChecklistItem {
  id: string;
  titre: string;
  details: string;
  source: string;
}

const CHECKLIST_CONDITIONS: ChecklistItem[] = [
  {
    id: 'rp-cond-1',
    titre: 'Réalisation satisfaisante de la période d’essai industrielle de 1 mois',
    details: 'Essais industriels continus sous surveillance contradictoire des agents ONEE sans dysfonctionnement majeur.',
    source: 'CCAFP – Art. 17 (point 1)',
  },
  {
    id: 'rp-cond-2',
    titre: 'Remise et approbation du DOE en 5 exemplaires papier + 2 clés USB',
    details: 'Plans de récolement DAO, schémas de câblage, notices techniques, fiches de paramétrage validés par le Maître d’Œuvre.',
    source: 'CCAFP – Art. 17 (point 2)',
  },
  {
    id: 'rp-cond-3',
    titre: 'Certificats de garantie et étalonnage complets',
    details: 'Certificats métrologiques d’étalonnage usine pour chaque capteur de pression, turbidimètre, sonde de chlore et datalogger.',
    source: 'CCAFP – Art. 17 (point 3)',
  },
  {
    id: 'rp-cond-4',
    titre: 'Remise en état initiale des lieux et évacuation des déchets',
    details: 'Nettoyage des abords des regards de comptage, évacuation des déblais et bordereau de traçabilité des déchets (amiante-ciment compris).',
    source: 'CCAFP – Art. 17 (point 4)',
  },
];

export const ReceptionStepper: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>(() =>
    getStoredValue<string[]>('reception_checklist', [])
  );

  useEffect(() => {
    setStoredValue('reception_checklist', checkedIds);
  }, [checkedIds]);

  const toggleCheck = (id: string) => {
    setCheckedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const resetChecklist = () => {
    if (confirm('Réinitialiser la checklist de réception provisoire ?')) {
      setCheckedIds([]);
    }
  };

  const progressPct = Math.round((checkedIds.length / CHECKLIST_CONDITIONS.length) * 100);
  const isComplete = progressPct === 100;

  const steps = [
    {
      num: 1,
      title: 'Marche Semi-Industrielle',
      duration: '1 mois continu',
      desc: 'Exploitation probatoire sans incident majeur sur les 5 sites.',
      badge: 'Étape 1',
      source: 'CCAFP – Art. 16',
    },
    {
      num: 2,
      title: 'Essais Industriels & Transfert',
      duration: '1 mois',
      desc: 'Essais sous contrôle ONEE et formation des 15 agents (seuil 75/100).',
      badge: 'Étape 2',
      source: 'CCAFP – Art. 16 & CCTP 3',
    },
    {
      num: 3,
      title: 'Réception Provisoire (RP)',
      duration: 'Jalon Contractuel',
      desc: 'Signature du PV sous réserve des 4 conditions cumulatives vérifiées.',
      badge: 'Étape 3 (Clé)',
      source: 'CCAFP – Art. 17',
    },
    {
      num: 4,
      title: 'Délai de Garantie',
      duration: '12 mois (1 an)',
      desc: 'Remplacement gratuit et immédiat de tout équipement défaillant.',
      badge: 'Étape 4',
      source: 'CCAFP – Art. 18',
    },
    {
      num: 5,
      title: 'Réception Définitive (RD)',
      duration: 'À l’issue des 12 mois',
      desc: 'Levée des réserves et signature obligatoire du contrat de maintenance 5 ans.',
      badge: 'Étape 5 (Finale)',
      source: 'CCAFP – Art. 19',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 5-Step Process Stepper */}
      <Card
        title="Parcours Contractuel de Réception & Garanties"
        subtitle="Séquencement officiel depuis la marche semi-industrielle jusqu’à la réception définitive"
        source="CCAFP – Articles 16, 17, 18 et 19"
      >
        <div className="relative">
          {/* Timeline track for large screens */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
            {steps.map(s => (
              <div
                key={s.num}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-onee-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {s.num}
                    </span>
                    <Badge variant={s.num === 3 ? 'danger' : s.num === 5 ? 'success' : 'secondary'} size="sm">
                      {s.badge}
                    </Badge>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                    {s.title}
                  </h4>
                  <div className="text-[11px] font-semibold text-onee-600 dark:text-onee-400">
                    {s.duration}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block truncate">
                    {s.source}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Interactive Checklist for Provisional Acceptance (Article 17) */}
      <Card
        title="Checklist Interactive de Réception Provisoire"
        subtitle="Les 4 conditions obligatoires et cumulatives du CPS pour prononcer le PV de Réception Provisoire"
        source="CCAFP – Art. 17"
        action={
          <button
            type="button"
            onClick={resetChecklist}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Réinitialiser</span>
          </button>
        }
      >
        <div className="space-y-5">
          {/* Progress bar */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                Progression de conformité à la réception provisoire :
              </span>
              <span className="font-mono font-bold text-sm text-onee-600 dark:text-onee-400">
                {checkedIds.length} / {CHECKLIST_CONDITIONS.length} ({progressPct}%)
              </span>
            </div>
            <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  isComplete ? 'bg-emerald-500' : 'bg-onee-600'
                }`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
            {isComplete ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 pt-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  Toutes les conditions contractuelles sont réunies pour la signature du PV de Réception Provisoire !
                </span>
              </div>
            ) : (
              <p className="text-[11px] text-slate-400">
                Cochez chaque condition dès vérification sur site par le Maître d’Œuvre (Division Industrielle DR9).
              </p>
            )}
          </div>

          {/* Checklist items */}
          <div className="space-y-3">
            {CHECKLIST_CONDITIONS.map((cond, idx) => {
              const isChecked = checkedIds.includes(cond.id);
              return (
                <div
                  key={cond.id}
                  onClick={() => toggleCheck(cond.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isChecked
                      ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}} // handled by parent div
                    className="mt-1 w-4 h-4 accent-emerald-600 rounded cursor-pointer shrink-0"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span
                        className={`text-xs font-bold ${
                          isChecked
                            ? 'text-emerald-900 dark:text-emerald-200 line-through'
                            : 'text-slate-900 dark:text-slate-100'
                        }`}
                      >
                        Condition {idx + 1} : {cond.titre}
                      </span>
                      <SourceBadge source={cond.source} />
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {cond.details}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Crucial requirement: DOE 5 copies + 2 USB */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
            <FolderArchive className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <span className="font-bold">Spécification impérative du DOE (Art. 17) :</span>
              <p className="text-[11px] leading-relaxed">
                Le Dossier des Ouvrages Exécutés doit être obligatoirement remis en <strong>5 exemplaires papier</strong> complets reliés et <strong>2 clés USB</strong> contenant l’intégralité des fichiers natifs, plans DAO et notices d’exploitation.
                Tout retard fait l’objet d’une pénalité de <strong>1/4000è</strong> du marché par jour calendaire (Art. 10).
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
