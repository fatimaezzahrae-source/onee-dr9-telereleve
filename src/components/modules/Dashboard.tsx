import React from 'react';
import {
  Clock,
  CircleDollarSign,
  ShieldCheck,
  Building2,
  Users,
  Award,
  ArrowRight,
  Droplets,
  Calendar,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';
import { PageId } from '../../types';
import { MARKET_INFO, SITES_DR9, TIMELINE_PHASES } from '../../data/marketInfo';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { SourceBadge } from '../common/SourceBadge';
import { formatDH } from '../../utils/formatters';

interface DashboardProps {
  onNavigate: (page: PageId) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      {/* Hero / ID Card */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-onee-900 via-onee-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-onee-700/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="info" size="sm" className="bg-cyan-500/20 text-cyan-200 border-cyan-400/30">
              Royaume du Maroc
            </Badge>
            <Badge variant="primary" size="sm" className="bg-white/10 text-white border-white/20">
              ONEE – Branche Eau
            </Badge>
            <Badge variant="secondary" size="sm" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
              Financement BAD-PDRAP
            </Badge>
            <SourceBadge source="CPS Page de Garde" className="bg-black/20 text-cyan-200 border-white/10" />
          </div>

          <div className="space-y-2 max-w-4xl">
            <span className="text-xs uppercase tracking-wider font-mono text-cyan-300 font-semibold">
              Marché Public N° {MARKET_INFO.numero} • Lot 3 DR9
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {MARKET_INFO.objet}
            </h2>
          </div>

          {/* Quick identity meta */}
          <div className="pt-4 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-300">
            <div>
              <span className="text-slate-400 block font-medium">Maître d’Ouvrage :</span>
              <span className="text-white font-semibold">{MARKET_INFO.maitreOuvrage}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Maître d’Œuvre :</span>
              <span className="text-white font-semibold">{MARKET_INFO.maitreOeuvre}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Mode de Passation :</span>
              <span className="text-white font-semibold">{MARKET_INFO.modePassation}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Règlement d’Achat :</span>
              <span className="text-white font-semibold">{MARKET_INFO.reglement}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Key Figure Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Card 1: Délai */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs hover:border-onee-400 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Délai Global
            </span>
            <Clock className="w-4 h-4 text-onee-600 dark:text-onee-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {MARKET_INFO.delaiGlobalMois} <span className="text-sm font-normal text-slate-500">mois</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Dossier + Travaux + Essais</p>
          <div className="mt-2 text-[10px] font-mono text-onee-600 dark:text-onee-400">CCAFP Art. 8</div>
        </div>

        {/* Card 2: Montant Travaux */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs hover:border-onee-400 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Travaux TTC
            </span>
            <CircleDollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 truncate">
            {formatDH(MARKET_INFO.montantTravauxTTC)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Prix fermes non révisables</p>
          <div className="mt-2 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">CCAFP Art. 11</div>
        </div>

        {/* Card 3: Montant Maintenance */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs hover:border-onee-400 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Maintenance 5 ans
            </span>
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400 truncate">
            {formatDH(MARKET_INFO.montantMaintenanceTTC)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Préventif 10 sem + Curatif</p>
          <div className="mt-2 text-[10px] font-mono text-blue-600 dark:text-blue-400">Partie III Art. 1</div>
        </div>

        {/* Card 4: Garantie */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs hover:border-onee-400 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Garantie
            </span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {MARKET_INFO.garantieMois} <span className="text-sm font-normal text-slate-500">mois</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">À compter de la réception prov.</p>
          <div className="mt-2 text-[10px] font-mono text-amber-600 dark:text-amber-400">CCAFP Art. 18</div>
        </div>

        {/* Card 5: Sites */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs hover:border-onee-400 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Postes Contrôle
            </span>
            <Building2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {MARKET_INFO.sitesCount} <span className="text-sm font-normal text-slate-500">sites</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">DR9 + 4 Secteurs</p>
          <div className="mt-2 text-[10px] font-mono text-purple-600 dark:text-purple-400">CCTP 2.4</div>
        </div>

        {/* Card 6: Agents formés */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs hover:border-onee-400 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Personnel Formé
            </span>
            <Users className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {MARKET_INFO.agentsCount} <span className="text-sm font-normal text-slate-500">agents</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Seuil validation ≥ 75/100</p>
          <div className="mt-2 text-[10px] font-mono text-teal-600 dark:text-teal-400">CCTP Chapitre 3</div>
        </div>
      </div>

      {/* Visual Timeline of the Contract */}
      <Card
        title="Frise Chronologique Globale du Marché"
        subtitle="Séquencement officiel : Travaux (12 mois), Garantie (12 mois) et Contrat de Maintenance (5 ans)"
        source="CCAFP Art. 8 & 18, CPS Partie III Art. 1"
        action={
          <button
            onClick={() => onNavigate('planning')}
            className="text-xs font-semibold text-onee-600 dark:text-onee-400 hover:underline flex items-center gap-1"
          >
            <span>Simulateur de planning</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TIMELINE_PHASES.map((p, idx) => {
              const bgColors = [
                'border-l-4 border-l-onee-500 bg-onee-50/40 dark:bg-onee-950/20',
                'border-l-4 border-l-amber-500 bg-amber-50/40 dark:bg-amber-950/20',
                'border-l-4 border-l-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20',
              ];
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border border-slate-200 dark:border-slate-800 ${bgColors[idx]} space-y-3`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Phase {idx + 1}
                    </span>
                    <Badge variant={idx === 0 ? 'primary' : idx === 1 ? 'warning' : 'success'} size="sm">
                      {p.duree}
                    </Badge>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {p.phase}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {p.description}
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                    {p.subPhases.map((sp, sIdx) => (
                      <div key={sIdx} className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-700 dark:text-slate-300 truncate font-medium">
                          • {sp.nom}
                        </span>
                        <span className="text-slate-500 font-mono shrink-0 ml-2">
                          {sp.dureeMois} m
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Alert box on critical constraints */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <span className="font-bold">Contraintes Majeures du CPS :</span>
              <p>
                1. <strong>Sous-traitance strictement interdite</strong> (CCAFP Art. 6) — 100% exécuté en propre.
                <br />
                2. <strong>Zéro prolongation pour intempéries</strong> (CCAFP Art. 9) — Réputées incluses dans les 12 mois.
                <br />
                3. <strong>Pénalités de retard</strong> : 1/1000 par jour, résiliation possible au plafond de 8% TTC (CCAFP Art. 10).
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* 5 Sites of DR9 */}
      <Card
        title="Périmètre Géographique : Les 5 Postes de Contrôle DR9"
        subtitle="Un frontal centralisé régional à Tanger et 4 frontaux de communication de secteur avec double transmission GSM-IP redondante"
        source="CCTP Chapitre 1.2 & 2.4"
        action={
          <button
            onClick={() => onNavigate('cctp')}
            className="text-xs font-semibold text-onee-600 dark:text-onee-400 hover:underline flex items-center gap-1"
          >
            <span>Voir l’architecture & équipements</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {SITES_DR9.map(site => (
            <div
              key={site.id}
              className={`p-3.5 rounded-xl border transition-all ${
                site.type === 'Direction Régionale'
                  ? 'border-onee-300 dark:border-onee-700 bg-onee-50/60 dark:bg-onee-950/40'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-4 h-4 text-onee-600 dark:text-onee-400 shrink-0" />
                <Badge
                  variant={site.type === 'Direction Régionale' ? 'primary' : 'secondary'}
                  size="sm"
                >
                  {site.type}
                </Badge>
              </div>
              <h5 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                {site.nom}
              </h5>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {site.description}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Shortcuts Grid to all modules */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
          Raccourcis vers les Modules du CPS
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { id: 'ccafp', title: 'Partie I — CCAFP', desc: '19 articles administratifs & juridiques', badge: 'Art. 1-19' },
            { id: 'planning', title: 'Planning & Pénalités', desc: 'Simulateur 1/1000 & 1/4000, Gantt', badge: 'Simulateur' },
            { id: 'finances', title: 'Finances & Paiements', desc: 'Avance 10%, Décomptes, Retenue 7%', badge: 'Calculateur' },
            { id: 'reception', title: 'Réception & Garanties', desc: 'Essais, DOE 5 ex., Checklists', badge: 'Parcours' },
            { id: 'cctp', title: 'Partie II — CCTP', desc: 'Synoptique SVG & Catalogue matériel', badge: 'Interactif' },
            { id: 'formation', title: 'Formation & Quiz', desc: '2 modules, 15 agents, test 75%', badge: 'Quiz' },
            { id: 'maintenance', title: 'Maintenance 5 ans', desc: 'Préventif 10 sem, Curatif 48h, Pénalités', badge: '4.75M DH' },
            { id: 'hse', title: 'HSE & Amiante-Ciment', desc: 'Procédure découpe & checklist chantier', badge: 'Critique' },
            { id: 'bpde', title: 'Bordereau BPDE', desc: '26 prix travaux + 9 prix maintenance', badge: 'Export CSV' },
            { id: 'compliance', title: 'Suivi de Conformité', desc: 'Matrice globale d’exigences contractuelles', badge: 'Pilotage' },
            { id: 'glossary', title: 'Glossaire & FAQ', desc: '24 sigles & définitions du marché', badge: 'Référence' },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => onNavigate(m.id as PageId)}
              className="text-left p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-onee-400 dark:hover:border-onee-600 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold text-onee-600 dark:text-onee-400 bg-onee-50 dark:bg-onee-950 px-2 py-0.5 rounded-full">
                    {m.badge}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-onee-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 group-hover:text-onee-600 dark:group-hover:text-onee-400 transition-colors">
                  {m.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {m.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
