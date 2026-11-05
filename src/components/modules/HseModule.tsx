import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Droplets,
  Ban,
  CheckCircle2,
  HardHat,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { SourceBadge } from '../common/SourceBadge';
import {
  HSE_GENERAL_CLAUSES,
  AMIANTE_CIMENT_PROCEDURE,
  HSE_CHECKLIST_TEMPLATE,
} from '../../data/hseData';
import { getStoredValue, setStoredValue } from '../../utils/storage';

export const HseModule: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [checkedHseIds, setCheckedHseIds] = useState<string[]>(() =>
    getStoredValue<string[]>('hse_checklist', [])
  );

  useEffect(() => {
    setStoredValue('hse_checklist', checkedHseIds);
  }, [checkedHseIds]);

  const toggleCheck = (id: string) => {
    setCheckedHseIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const resetChecklist = () => {
    if (confirm('Réinitialiser la checklist HSE de chantier ?')) {
      setCheckedHseIds([]);
    }
  };

  const hseProgress = Math.round(
    (checkedHseIds.length / HSE_CHECKLIST_TEMPLATE.length) * 100
  );

  const currentStepData = AMIANTE_CIMENT_PROCEDURE.reglesCritiques.find(
    s => s.etape === activeStep
  );

  return (
    <div className="space-y-6">
      {/* General HSE & BAD Safeguards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {HSE_GENERAL_CLAUSES.map((clause, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <SourceBadge source={clause.source} />
              </div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                {clause.titre}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {clause.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Step-by-Step Asbestos-Cement (Amiante-Ciment) Procedure */}
      <Card
        title="Procédure Critique : Travaux sur Conduites en Amiante-Ciment"
        subtitle="Protocole de sécurité sanitaire obligatoire lors de toute insertion de compteur ou capteur sur conduites existantes"
        source={AMIANTE_CIMENT_PROCEDURE.source}
        badge={
          <Badge variant="danger" size="sm">
            Strictement Obligatoire
          </Badge>
        }
      >
        <div className="space-y-6">
          {/* Step Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {AMIANTE_CIMENT_PROCEDURE.reglesCritiques.map(s => {
              const isSelected = activeStep === s.etape;
              return (
                <button
                  key={s.etape}
                  type="button"
                  onClick={() => setActiveStep(s.etape)}
                  className={`p-3 text-left rounded-xl border transition-all ${
                    isSelected
                      ? 'border-rose-600 bg-rose-50 dark:bg-rose-950/60 font-bold text-rose-900 dark:text-rose-100 ring-2 ring-rose-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-mono text-[10px] flex items-center justify-center font-bold">
                      {s.etape}
                    </span>
                    <span className="text-[10px] uppercase font-mono text-rose-600 dark:text-rose-400">
                      Étape {s.etape}
                    </span>
                  </div>
                  <div className="text-xs truncate">{s.titre}</div>
                </button>
              );
            })}
          </div>

          {/* Active Step Content */}
          {currentStepData && (
            <div className="p-5 rounded-2xl border-2 border-rose-300 dark:border-rose-800 bg-rose-50/30 dark:bg-rose-950/20 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-200 dark:border-rose-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-rose-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                    {currentStepData.etape}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-rose-950 dark:text-rose-100">
                      {currentStepData.titre}
                    </h3>
                    <p className="text-xs text-rose-800 dark:text-rose-300">
                      Règle de sécurité sanitaire absolue
                    </p>
                  </div>
                </div>
                <Badge variant="danger" size="md">
                  Action : {currentStepData.action}
                </Badge>
              </div>

              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {currentStepData.description}
              </p>

              {/* Tools Authorized vs Forbidden */}
              {currentStepData.outilsAutorises && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Outils Autorisés :
                    </span>
                    <ul className="text-xs text-emerald-950 dark:text-emerald-200 space-y-1">
                      {currentStepData.outilsAutorises.map((oa, i) => (
                        <li key={i}>• {oa}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                      <Ban className="w-4 h-4 text-rose-600" />
                      Outillage Formellement Prohibé :
                    </span>
                    <ul className="text-xs text-rose-950 dark:text-rose-200 space-y-1">
                      {currentStepData.outilsInterdits?.map((oi, i) => (
                        <li key={i}>❌ {oi}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* PPE Items */}
              {currentStepData.itemsEpi && (
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <HardHat className="w-4 h-4 text-onee-600" />
                    Équipements de Protection Individuelle (EPI) Requis :
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {currentStepData.itemsEpi.map((epi, i) => (
                      <div
                        key={i}
                        className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-2"
                      >
                        <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                        <span>{epi}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Disposal instructions */}
              {currentStepData.consignes && (
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-amber-600" />
                    Consignes d’Évacuation & Traçabilité des Déchets :
                  </span>
                  <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                    {currentStepData.consignes.map((c, i) => (
                      <li key={i}>• {c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Alert box */}
              <div className="p-3.5 rounded-xl bg-rose-100/80 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 flex items-start gap-2.5">
                <ShieldAlert className="w-5 h-5 text-rose-700 dark:text-rose-400 shrink-0 mt-0.5" />
                <div className="text-xs font-semibold text-rose-950 dark:text-rose-200 leading-relaxed">
                  {currentStepData.alerte}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Interactive HSE Site Checklist */}
      <Card
        title="Checklist Interactive de Contrôle HSE de Chantier"
        subtitle="Vérifications de terrain quotidiennes à valider avant chaque intervention"
        source="CPS Partie IV – Articles 1, 2, 3"
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
        <div className="space-y-4">
          {/* Progress bar */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
              <span>Taux de conformité HSE de chantier :</span>
              <span className="font-mono text-onee-600 dark:text-onee-400">
                {checkedHseIds.length} / {HSE_CHECKLIST_TEMPLATE.length} ({hseProgress}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  hseProgress === 100 ? 'bg-emerald-500' : 'bg-onee-600'
                }`}
                style={{ width: `${hseProgress}%` }}
              />
            </div>
          </div>

          {/* Checklist items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {HSE_CHECKLIST_TEMPLATE.map(item => {
              const isChecked = checkedHseIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isChecked
                      ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-0.5 w-4 h-4 accent-emerald-600 rounded cursor-pointer shrink-0"
                  />
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`text-xs font-medium ${
                          isChecked
                            ? 'text-emerald-900 dark:text-emerald-200 line-through'
                            : 'text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {item.label}
                      </span>
                      <Badge variant="secondary" size="sm" className="shrink-0 text-[10px]">
                        {item.categorie}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};
