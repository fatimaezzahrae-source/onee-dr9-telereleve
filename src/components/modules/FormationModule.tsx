import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  HelpCircle,
  FileText,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { SourceBadge } from '../common/SourceBadge';
import { QUIZ_QUESTIONS } from '../../data/quizQuestions';

export const FormationModule: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
  };

  // Calculate score
  const correctCount = QUIZ_QUESTIONS.reduce((acc, q) => {
    return userAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const scorePct = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
  const isValidated = scorePct >= 75;

  return (
    <div className="space-y-6">
      {/* 2 Formation Modules Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Module Exploitation */}
        <Card
          title="Module 1 : Exploitation & Supervision (2 Jours)"
          badge={<Badge variant="primary" size="sm">2 Jours sur site</Badge>}
          source="CCTP – Chapitre 3"
        >
          <div className="space-y-3 text-xs">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Dédié aux exploitants et techniciens de distribution et de télégestion de la DR9 et des 4 secteurs.
            </p>
            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[10px]">
                Programme Pédagogique :
              </span>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-onee-600 shrink-0" />
                  <span>Prise en main des synoptiques et masques de supervision</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-onee-600 shrink-0" />
                  <span>Gestion et acquittement des alarmes de pression, fuites et débits</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-onee-600 shrink-0" />
                  <span>Édition des rapports journaliers et mensuels de consommation</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-onee-600 shrink-0" />
                  <span>Analyse des courbes de tendance et bilans frontaliers SRM</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Module Maintenance */}
        <Card
          title="Module 2 : Maintenance & Diagnostic (2 Jours)"
          badge={<Badge variant="success" size="sm">2 Jours sur site</Badge>}
          source="CCTP – Chapitre 3"
        >
          <div className="space-y-3 text-xs">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Dédié aux ingénieurs et techniciens de maintenance électromécanique et instrumentation.
            </p>
            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[10px]">
                Programme Pédagogique :
              </span>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Configuration et paramétrage local des dataloggers (pile et secteur)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Étalonnage des capteurs de pression et analyseurs (turbidité, chlore)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Diagnostic des communications GSM-IP et tests d’antennes</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Sauvegardes des bases de données et administration MDM</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Target Audience & Validation Threshold */}
      <div className="p-4 rounded-xl bg-linear-to-r from-onee-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              Cible contractuelle : 15 agents ONEE – Branche Eau
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Formation théorique et pratique assurée durant le mois d’essais industriels.
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xs text-cyan-200 uppercase font-mono">Seuil d’homologation</div>
          <div className="text-2xl font-black text-amber-400 font-mono">≥ 75 / 100</div>
        </div>
      </div>

      {/* Interactive Quiz */}
      <Card
        title="Quiz d’Auto-Évaluation du CPS (10 Questions)"
        subtitle="Testez vos connaissances sur les clauses administratives, pénalités, équipements et règles HSE du marché"
        source="CCTP Chapitre 3 & CCAFP"
        action={
          isSubmitted && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-onee-600 hover:text-onee-800 dark:text-onee-400 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Recommencer le test</span>
            </button>
          )
        }
      >
        <div className="space-y-6">
          {/* Result Banner if submitted */}
          {isSubmitted && (
            <div
              className={`p-5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                isValidated
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100'
              }`}
            >
              <div className="flex items-center gap-3">
                {isValidated ? (
                  <Sparkles className="w-8 h-8 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-8 h-8 text-rose-600 dark:text-rose-400 shrink-0" />
                )}
                <div>
                  <h4 className="text-base font-bold">
                    {isValidated
                      ? 'Félicitations ! Seuil de validation atteint.'
                      : 'Score insuffisant pour la validation (Seuil 75/100).'}
                  </h4>
                  <p className="text-xs mt-0.5 opacity-90">
                    Vous avez obtenu {correctCount} / {QUIZ_QUESTIONS.length} réponses correctes.
                    Consultez les explications détaillées ci-dessous.
                  </p>
                </div>
              </div>
              <div className="text-center font-mono shrink-0">
                <span className="text-3xl font-extrabold">{scorePct} / 100</span>
                <span className="block text-[10px] uppercase tracking-wider font-semibold">
                  {isValidated ? 'Admis' : 'Non validé'}
                </span>
              </div>
            </div>
          )}

          {/* Questions list */}
          <div className="space-y-6">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const selectedOption = userAnswers[q.id];
              const isAnswered = selectedOption !== undefined;
              const isCorrect = selectedOption === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                      Question {idx + 1} : {q.question}
                    </span>
                    <SourceBadge source={q.source} className="shrink-0" />
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt, oIdx) => {
                      const isOptionSelected = selectedOption === oIdx;
                      let optionStyle =
                        'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300';

                      if (isSubmitted) {
                        if (oIdx === q.correctIndex) {
                          optionStyle =
                            'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-100 font-bold';
                        } else if (isOptionSelected && !isCorrect) {
                          optionStyle =
                            'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-100 line-through';
                        }
                      } else if (isOptionSelected) {
                        optionStyle =
                          'border-onee-600 bg-onee-50 dark:bg-onee-950 text-onee-900 dark:text-onee-100 font-bold ring-2 ring-onee-500/20';
                      }

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleSelectOption(q.id, oIdx)}
                          className={`p-3 text-left rounded-lg border text-xs transition-all flex items-center justify-between gap-2 ${optionStyle}`}
                          disabled={isSubmitted}
                        >
                          <span>{opt}</span>
                          {isSubmitted && oIdx === q.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {isSubmitted && isOptionSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation when submitted */}
                  {isSubmitted && (
                    <div className="mt-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                      <div className="font-semibold text-onee-700 dark:text-onee-300">
                        Explication & Référence :
                      </div>
                      <p className="text-[11px] leading-relaxed">{q.explication}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit / Reset Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {Object.keys(userAnswers).length} / {QUIZ_QUESTIONS.length} question(s) renseignée(s)
            </span>

            {!isSubmitted ? (
              <button
                type="button"
                onClick={() => setIsSubmitted(true)}
                disabled={Object.keys(userAnswers).length === 0}
                className="px-5 py-2.5 bg-onee-600 hover:bg-onee-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-md transition-colors"
              >
                Valider mes réponses & Calculer mon score
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-xs shadow-md transition-colors"
              >
                Recommencer le test
              </button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
