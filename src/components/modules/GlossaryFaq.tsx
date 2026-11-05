import React, { useState, useMemo } from 'react';
import { BookOpen, Search, HelpCircle, Layers, ArrowRight } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { SourceBadge } from '../common/SourceBadge';
import { GLOSSARY_ITEMS } from '../../data/glossaryData';
import { Accordion } from '../common/Accordion';

export const GlossaryFaq: React.FC = () => {
  const [search, setSearch] = useState<string>('');

  const filteredGlossary = useMemo(() => {
    if (!search.trim()) return GLOSSARY_ITEMS;
    const q = search.toLowerCase().trim();
    return GLOSSARY_ITEMS.filter(
      it =>
        it.terme.toLowerCase().includes(q) ||
        (it.sigle && it.sigle.toLowerCase().includes(q)) ||
        it.definition.toLowerCase().includes(q) ||
        it.contexteONEE.toLowerCase().includes(q)
    );
  }, [search]);

  const faqItems = [
    {
      id: 'faq-1',
      title: 'La sous-traitance est-elle autorisée pour certaines tâches secondaires ?',
      subtitle: 'CCAFP – Article 6',
      badge: <Badge variant="danger" size="sm">Strictement Interdit</Badge>,
      content: (
        <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
          <p>
            <strong>Non, formellement interdite.</strong> L’article 6 du CCAFP dispose de manière univoque :
            « <em>la sous-traitance des prestations objet du marché est strictement non autorisée</em> ».
            L’adjudicataire doit disposer de toutes les compétences et ressources humaines et matérielles en propre pour la totalité des prestations.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-2',
      title: 'Peut-on demander une prolongation de délai en cas de fortes intempéries ?',
      subtitle: 'CCAFP – Article 9',
      badge: <Badge variant="warning" size="sm">Zéro Prolongation</Badge>,
      content: (
        <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
          <p>
            <strong>Non.</strong> Vu la nature des prestations (installations d’équipements électroniques et de télétransmission),
            l’article 9 exclut expressément toute prolongation pour motif d’intempéries. Les aléas climatiques sont contractuellement réputés inclus dans le délai global de 12 mois.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-3',
      title: 'Quels sont les plafonds de pénalités applicables sur les travaux et la maintenance ?',
      subtitle: 'CCAFP – Art. 10 & CPS Partie III – Art. 4',
      badge: <Badge variant="danger" size="sm">Plafonds 8% & 10%</Badge>,
      content: (
        <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
          <p>
            • <strong>Marché principal de travaux :</strong> Pénalité journalière de 1/1000 par jour calendaire, plafonnée à <strong>8% TTC</strong> (soit 960 000 DH sur 12M DH).
            L’atteinte du plafond autorise l’ONEE à résilier le marché aux torts exclusifs de l’entreprise.
            <br />
            • <strong>Marché de maintenance (5 ans) :</strong> Pénalité de 3%/j en préventif et 2%/h en curatif, avec un plafond général de <strong>10%</strong> du montant global de maintenance (soit 474 999,60 DH).
          </p>
        </div>
      ),
    },
    {
      id: 'faq-4',
      title: 'Comment s’opère le remboursement de l’avance de 10% accordée au démarrage ?',
      subtitle: 'CCAFP – Article 12',
      badge: <Badge variant="primary" size="sm">Précompte 12,5%</Badge>,
      content: (
        <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
          <p>
            L’avance de 10% (1 200 000 DH) est accordée contre caution bancaire de 100%. Son remboursement se fait par
            un précompte systématique de <strong>12,5%</strong> prélevé sur le montant brut de chaque décompte d’acompte mensuel,
            jusqu’à apurement intégral de la dette.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-5',
      title: 'Quelle est la procédure légale lors d’une intervention sur conduite en amiante-ciment ?',
      subtitle: 'CPS Partie IV – Article 3',
      badge: <Badge variant="danger" size="sm">Amiante Critique</Badge>,
      content: (
        <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
          <p>
            1. <strong>Zéro découpe à sec</strong> : arrosage à l’eau permanent et abondant.
            <br />
            2. <strong>Outils autorisés</strong> : Coupe-tube manuel ou scie sabre à vitesse lente. Interdiction formelle des disqueuses et meuleuses à haute vitesse.
            <br />
            3. <strong>EPI complets</strong> : Combinaison jetable Type 5/6, masque FFP3, gants latex, lunettes étanches.
            <br />
            4. <strong>Évacuation</strong> : Sacs scellés étiquetés « Danger Amiante » vers un centre d’enfouissement technique agréé.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="p-6 rounded-2xl bg-linear-to-r from-onee-900 to-slate-900 text-white border border-onee-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-6 h-6 text-cyan-300" />
          <h2 className="text-xl font-bold">Glossaire Technique & FAQ Contractuelle</h2>
        </div>
        <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
          Retrouvez l’ensemble des acronymes administratifs (CPS, CCAFP, DOE, BPDE...), des protocoles industriels (Modbus RTU, OPC UA X.509, TLS 1.3), des indices de protection (IP68, IP65) et les réponses officielles du CPS.
        </p>

        <div className="relative max-w-xl">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un terme (ex. DOE, OPC UA, NTU, amiante, avance)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <Card
        title="Foire Aux Questions (FAQ) Contractuelle & Juridique"
        subtitle="Questions-réponses clés sur l’application et les clauses sensibles du marché"
        source="CCAFP & CCTP"
      >
        <Accordion items={faqItems} allowMultiple={true} />
      </Card>

      {/* Glossary Dictionary */}
      <Card
        title={`Dictionnaire des Termes & Acronymes (${filteredGlossary.length} termes)`}
        subtitle="Définitions officielles et portée opérationnelle dans le cadre du Lot 3 DR9"
        source="Cahier des Prescriptions Spéciales N° 88/DR9/C/I/2026"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGlossary.map((it, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {it.terme}
                  </h4>
                  {it.sigle && (
                    <Badge variant="primary" size="sm" className="font-mono text-[10px]">
                      {it.sigle}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {it.definition}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                <div className="text-[11px] text-onee-700 dark:text-onee-300 font-medium">
                  <strong>Contexte ONEE DR9 :</strong> {it.contexteONEE}
                </div>
                {it.source && (
                  <div className="text-[10px] text-slate-400 font-mono">
                    Source : {it.source}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
