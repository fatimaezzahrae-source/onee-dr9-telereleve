import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  Radio,
  Server,
  ShieldCheck,
  Check,
  Building,
  Activity,
  Droplets,
  Gauge,
  Sliders,
  Settings,
  Tv,
  Printer,
  Wind,
  Laptop,
  Lock,
  ArrowRight,
  Info,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { SourceBadge } from '../common/SourceBadge';
import { Tabs } from '../common/Tabs';
import { Modal } from '../common/Modal';
import {
  CCTP_OBJECTIVES,
  CYBERSECURITY_SPECS,
  EQUIPMENT_CATALOG,
  SITES_CONTROL_ROOMS,
  CONTROL_ROOM_ITEM_SPECS,
} from '../../data/cctpData';
import { EquipmentSpec } from '../../types';

export const CctpArchitecture: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('schema');
  const [selectedNodeModal, setSelectedNodeModal] = useState<string | null>(null);

  // Configurateur state
  const [configAlim, setConfigAlim] = useState<'pile' | 'secteur'>('pile');
  const [configDebit, setConfigDebit] = useState<'mecanique' | 'convertisseur' | 'mag8000'>('mecanique');
  const [configPression, setConfigPression] = useState<'none' | '16bar' | '25bar'>('16bar');
  const [configQualite, setConfigQualite] = useState<'none' | 'turb' | 'chlore' | 'both'>('none');

  // Node details dictionary for SVG clicks
  const nodeDetails: Record<string, { title: string; subtitle: string; content: React.ReactNode }> = {
    'satellites': {
      title: 'Postes de Terrain & Sites Satellites',
      subtitle: 'Points frontaliers SRM & grands adducteurs DR9',
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <p>
            Les sites satellites sont implantés dans des regards inondables ou stations techniques.
            Ils intègrent soit un <strong>datalogger autonome sur pile (IP68)</strong> soit un <strong>datalogger secteur (24 VDC / IP65)</strong>.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-1 font-mono text-[11px]">
            <div>• Entrées : 2x TOR comptage + 2x 4-20 mA + 1x RS485 Modbus</div>
            <div>• Autonomie pile : ≥ 5 ans à 1 transmission/jour</div>
            <div>• Mémoire interne : ≥ 15 jours à pas de 15 minutes</div>
          </div>
          <SourceBadge source="CCTP – 2.1" />
        </div>
      ),
    },
    'gsm': {
      title: 'Réseau Cellulaire Sécurisé GSM-IP (3G/4G)',
      subtitle: 'Tunnels de communication chiffrés',
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <p>
            La transmission s’effectue via le réseau mobile marocain en liaison IP chiffrée.
            Chaque trame utilise le protocole <strong>TLS 1.3</strong> ou <strong>MQTT sur TLS</strong>.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-1 font-mono text-[11px]">
            <div>• SIM durcie M2M avec APN privé sécurisé</div>
            <div>• Émission cyclique quotidienne + alertes SMS instantanées (dataloggers secteur)</div>
          </div>
          <SourceBadge source="CCTP – 1.2" />
        </div>
      ),
    },
    'double-trans': {
      title: 'Double Transmission Simultanée & Redondante',
      subtitle: 'Cœur de la fiabilité architecturale DR9',
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <p className="font-semibold text-onee-600 dark:text-onee-400">
            Exigence majeure du CCTP (Art. 1.2) :
          </p>
          <p>
            Chaque datalogger expédie simultanément et de façon totalement autonome ses données horodatées à deux destinataires :
          </p>
          <ol className="list-decimal pl-4 space-y-1 font-medium">
            <li>Le frontal de communication du <strong>Secteur de Production</strong> concerné (Tanger, Tétouan, Larache ou Al Hoceima).</li>
            <li>Le frontal centralisé de la <strong>Direction Régionale DR9</strong> à Tanger.</li>
          </ol>
          <p className="text-[11px] text-slate-500">
            Cette redondance garantit la continuité de service en cas de maintenance ou de panne de l’un des frontaux.
          </p>
          <SourceBadge source="CCTP – 1.2" />
        </div>
      ),
    },
    'frontal-dr9': {
      title: 'Frontal Centralisé DR9 (Tanger)',
      subtitle: 'Supervision Régionale Maître',
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <p>
            Serveur dédié haute disponibilité assurant la centralisation régionale de l’ensemble des compteurs de la région Tanger-Tétouan-Al Hoceima.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-1 font-mono text-[11px]">
            <div>• Hébergement : 100% On-Premise dans la salle serveur DR9</div>
            <div>• Protocoles : OPC UA avec certificats X.509 et 2FA obligatoire</div>
            <div>• Couplage : Écran d’affichage 65" UHD 4K professionnel</div>
          </div>
          <SourceBadge source="CCTP – 1.1 & 2.4" />
        </div>
      ),
    },
    'frontal-secteur': {
      title: 'Frontaux des Secteurs de Production',
      subtitle: 'Tanger • Tétouan • Larache • Al Hoceima',
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <p>
            Chaque secteur de production dispose de son propre frontal et poste de supervision dédié pour le suivi opérationnel au quotidien des débits et des pressions locales.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-1 font-mono text-[11px]">
            <div>• PC de supervision Intel i7 / 16 Go RAM / SSD 1 To</div>
            <div>• Onduleur On-Line 4 heures d’autonomie</div>
            <div>• PC portable terrain avec suite MDM</div>
          </div>
          <SourceBadge source="CCTP – 2.4" />
        </div>
      ),
    },
  };

  const tabs = [
    { id: 'schema', label: 'Schéma d’Architecture SVG', icon: <Layers className="w-4 h-4" /> },
    { id: 'catalogue', label: 'Catalogue d’Équipements', icon: <Cpu className="w-4 h-4" /> },
    { id: 'postes', label: 'Postes de Contrôle (5 sites)', icon: <Building className="w-4 h-4" /> },
    { id: 'configurateur', label: 'Configurateur de Poste', icon: <Sliders className="w-4 h-4" /> },
    { id: 'cyber', label: 'Cybersécurité & Souveraineté', icon: <Lock className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Top Objectives summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {CCTP_OBJECTIVES.map((obj, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-1.5"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-onee-500" />
              <h5 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                {obj.titre}
              </h5>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {obj.description}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs navigation */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab 1: Interactive SVG Architecture */}
      {activeTab === 'schema' && (
        <Card
          title="Schéma Synoptique d’Architecture de la Solution Digitale"
          subtitle="Double transmission simultanée redondante vers le frontal Secteur ET le frontal régional DR9 Tanger (Cliquez sur un composant pour afficher sa fiche)"
          source="CCTP – Chapitre 1.1 & 1.2"
        >
          <div className="space-y-4">
            <div className="w-full overflow-x-auto bg-slate-900 rounded-xl p-4 sm:p-6 border border-slate-800 shadow-inner">
              <svg
                viewBox="0 0 960 480"
                className="w-full min-w-[750px] h-auto select-none"
                style={{ maxHeight: '520px' }}
              >
                <defs>
                  <linearGradient id="gradSat" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#0369a1" />
                  </linearGradient>
                  <linearGradient id="gradFrontal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0f766e" />
                    <stop offset="100%" stopColor="#115e59" />
                  </linearGradient>
                  <linearGradient id="gradDr9" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4338ca" />
                    <stop offset="100%" stopColor="#3730a3" />
                  </linearGradient>
                  <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3" />
                  </filter>
                  <marker
                    id="arrowhead"
                    markerWidth="8"
                    markerHeight="6"
                    refX="7"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3, 0 6" fill="#38bdf8" />
                  </marker>
                  <marker
                    id="arrowhead-green"
                    markerWidth="8"
                    markerHeight="6"
                    refX="7"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3, 0 6" fill="#34d399" />
                  </marker>
                </defs>

                {/* Background grid dots */}
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#1e293b" />
                </pattern>
                <rect width="960" height="480" fill="url(#grid)" />

                {/* ZONE 1: Sites Satellites (Left) */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setSelectedNodeModal('satellites')}
                >
                  <rect
                    x="40"
                    y="60"
                    width="230"
                    height="360"
                    rx="16"
                    fill="#0f172a"
                    stroke="#0284c7"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <text x="55" y="90" fill="#38bdf8" fontSize="12" fontWeight="bold">
                    POSTES DE TERRAIN (SATELLITES)
                  </text>
                  <text x="55" y="108" fill="#94a3b8" fontSize="10">
                    Regards inondables & Adducteurs
                  </text>

                  {/* Satellite 1: Datalogger pile */}
                  <rect
                    x="60"
                    y="130"
                    width="190"
                    height="75"
                    rx="10"
                    fill="url(#gradSat)"
                    filter="url(#shadow)"
                  />
                  <text x="75" y="155" fill="#ffffff" fontSize="11" fontWeight="bold">
                    Datalogger Pile (IP68)
                  </text>
                  <text x="75" y="172" fill="#e0f2fe" fontSize="9">
                    • Pile Lithium ≥ 5 ans
                  </text>
                  <text x="75" y="187" fill="#e0f2fe" fontSize="9">
                    • 2x TOR + 2x 4-20mA + RS485
                  </text>

                  {/* Satellite 2: Datalogger secteur */}
                  <rect
                    x="60"
                    y="225"
                    width="190"
                    height="75"
                    rx="10"
                    fill="url(#gradSat)"
                    filter="url(#shadow)"
                  />
                  <text x="75" y="250" fill="#ffffff" fontSize="11" fontWeight="bold">
                    Datalogger Secteur (IP65)
                  </text>
                  <text x="75" y="267" fill="#e0f2fe" fontSize="9">
                    • 24 VDC + Batterie 2x12V
                  </text>
                  <text x="75" y="282" fill="#e0f2fe" fontSize="9">
                    • Alertes SMS instantanées
                  </text>

                  {/* Sensors icons banner */}
                  <rect x="60" y="320" width="190" height="75" rx="10" fill="#1e293b" />
                  <text x="75" y="342" fill="#38bdf8" fontSize="10" fontWeight="bold">
                    Capteurs & Analyseurs raccordés :
                  </text>
                  <text x="75" y="360" fill="#cbd5e1" fontSize="9">
                    • Pression 0-16 / 0-25 bar (IP68)
                  </text>
                  <text x="75" y="375" fill="#cbd5e1" fontSize="9">
                    • Turbidimètre 0-10 NTU (sans pompe)
                  </text>
                  <text x="75" y="390" fill="#cbd5e1" fontSize="9">
                    • Chlore 0-2 mg/l • MAG 8000 RS485
                  </text>
                </g>

                {/* ZONE 2: Double Transmission Cellulaire (Middle) */}
                <g
                  className="cursor-pointer"
                  onClick={() => setSelectedNodeModal('double-trans')}
                >
                  {/* Transmission Path A: to Secteur */}
                  <path
                    d="M 270 170 C 370 170, 390 120, 480 120"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3"
                    markerEnd="url(#arrowhead)"
                  />

                  {/* Transmission Path B: to DR9 Tanger */}
                  <path
                    d="M 270 260 C 370 260, 390 320, 480 320"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="3"
                    markerEnd="url(#arrowhead-green)"
                  />

                  {/* Central Double Transmission badge */}
                  <rect
                    x="310"
                    y="190"
                    width="150"
                    height="60"
                    rx="12"
                    fill="#0f172a"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                  />
                  <text x="325" y="213" fill="#38bdf8" fontSize="10" fontWeight="bold">
                    DOUBLE TRANSMISSION
                  </text>
                  <text x="325" y="228" fill="#e2e8f0" fontSize="9">
                    SIMULTANÉE GSM-IP
                  </text>
                  <text x="325" y="242" fill="#94a3b8" fontSize="8">
                    TLS 1.3 / MQTT sur TLS
                  </text>
                </g>

                {/* ZONE 3: Frontal Secteurs de Production (Top Right) */}
                <g
                  className="cursor-pointer"
                  onClick={() => setSelectedNodeModal('frontal-secteur')}
                >
                  <rect
                    x="480"
                    y="60"
                    width="210"
                    height="140"
                    rx="14"
                    fill="url(#gradFrontal)"
                    filter="url(#shadow)"
                  />
                  <text x="500" y="88" fill="#ffffff" fontSize="12" fontWeight="bold">
                    1. FRONTAL SECTEUR
                  </text>
                  <text x="500" y="105" fill="#ccfbf1" fontSize="9">
                    Tanger • Tétouan • Larache • Al Hoceima
                  </text>
                  <line x1="500" y1="115" x2="670" y2="115" stroke="#14b8a6" strokeWidth="1" />
                  <text x="500" y="133" fill="#ffffff" fontSize="10">
                    • Serveur local de communication
                  </text>
                  <text x="500" y="150" fill="#ffffff" fontSize="10">
                    • PC Supervision i7 / 16 Go / 1 To
                  </text>
                  <text x="500" y="167" fill="#ffffff" fontSize="10">
                    • Onduleur On-Line 4h & Clim 12k
                  </text>
                  <text x="500" y="184" fill="#ffffff" fontSize="10">
                    • Écran TV 65" 4K UHD Pro
                  </text>
                </g>

                {/* ZONE 4: Frontal Centralisé DR9 Tanger (Bottom Right) */}
                <g
                  className="cursor-pointer"
                  onClick={() => setSelectedNodeModal('frontal-dr9')}
                >
                  <rect
                    x="480"
                    y="250"
                    width="210"
                    height="140"
                    rx="14"
                    fill="url(#gradDr9)"
                    filter="url(#shadow)"
                  />
                  <text x="500" y="278" fill="#ffffff" fontSize="12" fontWeight="bold">
                    2. FRONTAL CENTRALISÉ DR9
                  </text>
                  <text x="500" y="295" fill="#e0e7ff" fontSize="9">
                    Direction Régionale Tanger (Maître)
                  </text>
                  <line x1="500" y1="305" x2="670" y2="305" stroke="#6366f1" strokeWidth="1" />
                  <text x="500" y="323" fill="#ffffff" fontSize="10">
                    • Serveur Central haute dispo
                  </text>
                  <text x="500" y="340" fill="#ffffff" fontSize="10">
                    • Salle de contrôle régionale aménagée
                  </text>
                  <text x="500" y="357" fill="#ffffff" fontSize="10">
                    • OPC UA sécurisé X.509 & 2FA
                  </text>
                  <text x="500" y="374" fill="#ffffff" fontSize="10">
                    • Plateforme MDM & Sauvegardes
                  </text>
                </g>

                {/* ZONE 5: Postes de Contrôle Clients (Far Right) */}
                <g>
                  {/* Link from Frontal to Screens */}
                  <line
                    x1="690"
                    y1="130"
                    x2="740"
                    y2="130"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                  />
                  <line
                    x1="690"
                    y1="320"
                    x2="740"
                    y2="320"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                  />

                  {/* Terminal 1 */}
                  <rect x="740" y="80" width="180" height="90" rx="10" fill="#1e293b" />
                  <text x="755" y="105" fill="#38bdf8" fontSize="10" fontWeight="bold">
                    Postes de Contrôle Locaux
                  </text>
                  <text x="755" y="123" fill="#e2e8f0" fontSize="9">
                    • TV 65" UHD 4K (16/7)
                  </text>
                  <text x="755" y="138" fill="#e2e8f0" fontSize="9">
                    • Imprimante A4/A3 réseau
                  </text>
                  <text x="755" y="153" fill="#e2e8f0" fontSize="9">
                    • PC portable diagnostic i7
                  </text>

                  {/* Terminal 2 */}
                  <rect x="740" y="270" width="180" height="90" rx="10" fill="#1e293b" />
                  <text x="755" y="295" fill="#a5b4fc" fontSize="10" fontWeight="bold">
                    Poste Maître DR9 Tanger
                  </text>
                  <text x="755" y="313" fill="#e2e8f0" fontSize="9">
                    • Mur d’affichage & bilans
                  </text>
                  <text x="755" y="328" fill="#e2e8f0" fontSize="9">
                    • Rapports agrégés SRM
                  </text>
                  <text x="755" y="343" fill="#e2e8f0" fontSize="9">
                    • Souveraineté 100% On-Premise
                  </text>
                </g>

                {/* Footer text in SVG */}
                <text x="40" y="455" fill="#64748b" fontSize="10" fontFamily="sans-serif">
                  * Architecture 100% On-Premise sans aucun recours au Cloud public (CCTP Art. 1.1) • Double flux cellulaire étanche
                </text>
              </svg>
            </div>

            <p className="text-xs text-slate-500 text-center">
              💡 <em>Astuce : Cliquez sur un bloc du schéma (Sites satellites, Double transmission, Frontal Secteur, Frontal DR9) pour consulter ses spécifications détaillées.</em>
            </p>
          </div>
        </Card>
      )}

      {/* Tab 2: Equipment Catalog & Side-by-Side Comparison */}
      {activeTab === 'catalogue' && (
        <div className="space-y-6">
          {/* Side-by-side comparison: Datalogger Pile vs Secteur */}
          <Card
            title="Comparateur Face-à-Face : Dataloggers Autonome vs Secteur"
            subtitle="Analyse comparative détaillée des deux types de dataloggers prévus au marché"
            source="CCTP – 2.1 & BPDE Prix 3, 4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Datalogger Pile */}
              <div className="p-4 rounded-xl border-2 border-onee-400 dark:border-onee-700 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="primary" size="md">
                    Datalogger Autonome sur Pile
                  </Badge>
                  <span className="font-mono text-xs font-bold text-onee-600 dark:text-onee-400">
                    IP68
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Installation en regard inondable (zéro 230V)
                </h4>
                <div className="space-y-2 text-xs divide-y divide-slate-100 dark:divide-slate-800">
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Alimentation :</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      Pile Lithium haute capacité
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Autonomie :</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      ≥ 5 ans (envoi quotidien)
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Entrées de mesure :</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      2x TOR + 2x 4-20 mA
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Bus série :</span>
                    <span className="font-medium">Modbus RTU RS485</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Mémoire interne :</span>
                    <span className="font-medium">≥ 15 jours à pas de 15 min</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Protection :</span>
                    <span className="font-bold text-onee-600">IP68 immersion permanente</span>
                  </div>
                </div>
              </div>

              {/* Datalogger Secteur */}
              <div className="p-4 rounded-xl border-2 border-emerald-400 dark:border-emerald-700 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="success" size="md">
                    Datalogger Alimenté Secteur
                  </Badge>
                  <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    IP65
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Local technique, station de pompage ou regard électrifié
                </h4>
                <div className="space-y-2 text-xs divide-y divide-slate-100 dark:divide-slate-800">
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Alimentation :</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      230 VAC réseau converti en 24 VDC
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Secours d’énergie :</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      Batterie interne 2x 12V 12Ah
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Entrées / Sorties :</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      TOR, 4-20 mA, relais alarmes, RS485
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Alarmes :</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      SMS instantanés sur seuil
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Transmission :</span>
                    <span className="font-medium">GSM-IP double flux redondant</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Protection :</span>
                    <span className="font-medium">IP65 coffret mural</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Full Grid of Sensors and Instruments */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EQUIPMENT_CATALOG.slice(2).map(eq => (
              <Card
                key={eq.id}
                title={eq.nom}
                badge={<Badge variant="secondary" size="sm">{eq.categorie}</Badge>}
                source={eq.source}
                className="flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {eq.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    {Object.entries(eq.caracteristiques).slice(0, 4).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-[11px]">
                        <span className="text-slate-400">{k} :</span>
                        <span className="font-medium text-slate-800 dark:text-slate-200 text-right ml-2">
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-onee-600 dark:text-onee-400 block mb-1">
                      Points critiques :
                    </span>
                    <ul className="text-[11px] text-slate-500 space-y-0.5">
                      {eq.pointsCritiques.map((pc, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                          <span>{pc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Postes de Contrôle (5 sites) */}
      {activeTab === 'postes' && (
        <div className="space-y-6">
          <Card
            title="Consistance Matérielle des Postes de Contrôle"
            subtitle="Inventaire contractuel complet déployé sur chacun des 5 sites de la DR9 (Tanger, Tétouan, Larache, Al Hoceima + DR9 Tanger)"
            source="CCTP – 2.4 & BPDE Prix 18, 19, 20, 21"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {CONTROL_ROOM_ITEM_SPECS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-lg bg-onee-50 dark:bg-onee-950 text-onee-600 dark:text-onee-400 flex items-center justify-center font-bold text-xs">
                        #{idx + 1}
                      </span>
                      <Badge variant="primary" size="sm">
                        Total 5 sites : {item.total5Sites}
                      </Badge>
                    </div>
                    <h5 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                      {item.item}
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      {item.specs}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between text-[10px] text-slate-400">
                    <span>Par site : {item.qteParSite}</span>
                    <span className="font-mono">{item.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Allocation by site */}
          <Card
            title="Dotation par Site de Contrôle"
            subtitle="Répartition des équipements informatiques et d’aménagement"
            source="CCTP – 2.4"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Site / Secteur</th>
                    <th className="p-3">Type</th>
                    <th className="p-3 text-center">PC Sup. i7</th>
                    <th className="p-3 text-center">TV 65" 4K</th>
                    <th className="p-3 text-center">Onduleur 4h</th>
                    <th className="p-3 text-center">Imprimante</th>
                    <th className="p-3 text-center">Clim 12k</th>
                    <th className="p-3 text-center">PC Portable</th>
                    <th className="p-3 text-center">MDM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {SITES_CONTROL_ROOMS.map(s => (
                    <tr
                      key={s.siteId}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 font-medium"
                    >
                      <td className="p-3 font-bold text-slate-900 dark:text-slate-100">
                        {s.nom}
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={s.type === 'Direction Régionale' ? 'primary' : 'secondary'}
                          size="sm"
                        >
                          {s.type}
                        </Badge>
                      </td>
                      <td className="p-3 text-center font-mono">{s.pcSupervision}</td>
                      <td className="p-3 text-center font-mono">{s.tvAffichage}</td>
                      <td className="p-3 text-center font-mono">{s.onduleur}</td>
                      <td className="p-3 text-center font-mono">{s.imprimante}</td>
                      <td className="p-3 text-center font-mono">{s.climatisation}</td>
                      <td className="p-3 text-center font-mono">{s.pcPortable}</td>
                      <td className="p-3 text-center">
                        <Badge variant="success" size="sm">Actif</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Tab 4: Configurateur de poste de comptage */}
      {activeTab === 'configurateur' && (
        <Card
          title="Configurateur Interactif de Poste de Comptage"
          subtitle="Sélectionnez les caractéristiques hydrauliques et électriques du site pour générer la nomenclature exacte du matériel requis selon le CPS"
          source="CCTP – Chapitre 2 & BPDE"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Options configuration (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Type d'alimentation */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  1. Implantation & Alimentation Électrique :
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setConfigAlim('pile')}
                    className={`p-3 text-left rounded-xl border text-xs transition-all ${
                      configAlim === 'pile'
                        ? 'border-onee-500 bg-onee-50 dark:bg-onee-950/50 font-bold text-onee-700 dark:text-onee-300 ring-2 ring-onee-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div>Regard isolé (Sur pile)</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-normal">
                      Autonome ≥ 5 ans • IP68
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfigAlim('secteur')}
                    className={`p-3 text-left rounded-xl border text-xs transition-all ${
                      configAlim === 'secteur'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 font-bold text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div>Station électrifiée (230V)</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-normal">
                      24 VDC secouru 2x12V • IP65
                    </div>
                  </button>
                </div>
              </div>

              {/* Type de débitmètre */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  2. Type de Compteur / Débitmètre existant :
                </label>
                <select
                  value={configDebit}
                  onChange={e => setConfigDebit(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-onee-500"
                >
                  <option value="mecanique">Compteur mécanique existant (Tête émettrice d’impulsions passives)</option>
                  <option value="convertisseur">Débitmètre électromagnétique (Remplacement par convertisseur numérique Modbus)</option>
                  <option value="mag8000">Siemens MAG 8000 existant (Ajout module de communication RS485)</option>
                </select>
              </div>

              {/* Capteur de pression */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  3. Mesure de Pression de service :
                </label>
                <select
                  value={configPression}
                  onChange={e => setConfigPression(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-onee-500"
                >
                  <option value="16bar">Capteur de pression 0 - 16 bar (Inox, ±0.5%, IP68, 4-20mA)</option>
                  <option value="25bar">Capteur de pression 0 - 25 bar (Inox, ±0.5%, IP68, 4-20mA)</option>
                  <option value="none">Aucun capteur de pression sur ce poste</option>
                </select>
              </div>

              {/* Analyseurs de qualité */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  4. Surveillance Qualité de l’Eau :
                </label>
                <select
                  value={configQualite}
                  onChange={e => setConfigQualite(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-onee-500"
                >
                  <option value="none">Aucun analyseur de qualité (Comptage & Pression seuls)</option>
                  <option value="turb">Turbidimètre en ligne 0-10 NTU seul (Néphélométrie sans pompe)</option>
                  <option value="chlore">Analyseur de chlore libre 0-2 mg/l seul (Ampérométrique sur platine)</option>
                  <option value="both">Pack Complet Qualité : Turbidimètre 0-10 NTU + Chlore libre 0-2 mg/l</option>
                </select>
              </div>
            </div>

            {/* Generated Bill of Materials (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Nomenclature Générée du Poste de Comptage
                  </span>
                  <Badge variant="primary" size="sm">
                    {configAlim === 'pile' ? 'Regard IP68 Autonome' : 'Poste Secteur IP65'}
                  </Badge>
                </div>

                {/* Material list */}
                <div className="space-y-2 text-xs divide-y divide-slate-100 dark:divide-slate-800">
                  {/* Datalogger */}
                  <div className="pt-2 flex justify-between items-start gap-2">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {configAlim === 'pile'
                          ? 'Datalogger autonome sur pile (IP68)'
                          : 'Datalogger secteur (IP65) avec coffret et 2 batteries 12V 12Ah'}
                      </span>
                      <p className="text-[11px] text-slate-500">
                        {configAlim === 'pile'
                          ? 'Modem 4G, carte SIM, autonomie ≥ 5 ans, mémoire ≥ 15j'
                          : 'Alimentation 24 VDC régulée, alarmes SMS instantanées'}
                      </p>
                    </div>
                    <span className="font-mono text-onee-600 dark:text-onee-400 font-bold">
                      {configAlim === 'pile' ? 'Prix 4' : 'Prix 3'}
                    </span>
                  </div>

                  {/* Pose & MES */}
                  <div className="pt-2 flex justify-between items-start gap-2">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        Pose, raccordement, paramétrage et mise en service
                      </span>
                      <p className="text-[11px] text-slate-500">
                        Câblage blindé, fixation murale ou potence en inox
                      </p>
                    </div>
                    <span className="font-mono text-onee-600 dark:text-onee-400 font-bold">
                      Prix 5
                    </span>
                  </div>

                  {/* Flowmeter component */}
                  {configDebit === 'mecanique' && (
                    <div className="pt-2 flex justify-between items-start gap-2">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          Tête émettrice d’impulsions étanche
                        </span>
                        <p className="text-[11px] text-slate-500">
                          Raccordement sur entrée TOR du datalogger sans masquage d’index
                        </p>
                      </div>
                      <span className="font-mono text-onee-600 dark:text-onee-400 font-bold">
                        Prix 10
                      </span>
                    </div>
                  )}

                  {configDebit === 'convertisseur' && (
                    <div className="pt-2 flex justify-between items-start gap-2">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          Convertisseur électronique numérique pour débitmètre
                        </span>
                        <p className="text-[11px] text-slate-500">
                          Liaison série Modbus RTU RS485 + sortie 4-20mA vers datalogger
                        </p>
                      </div>
                      <span className="font-mono text-onee-600 dark:text-onee-400 font-bold">
                        Prix 6
                      </span>
                    </div>
                  )}

                  {configDebit === 'mag8000' && (
                    <div className="pt-2 flex justify-between items-start gap-2">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          Module de communication RS485 pour Siemens MAG 8000
                        </span>
                        <p className="text-[11px] text-slate-500">
                          Module interne enfichable transmettant volumes +/- et alertes
                        </p>
                      </div>
                      <span className="font-mono text-onee-600 dark:text-onee-400 font-bold">
                        Prix 7
                      </span>
                    </div>
                  )}

                  {/* Pressure sensor */}
                  {configPression !== 'none' && (
                    <div className="pt-2 flex justify-between items-start gap-2">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          Capteur de pression {configPression === '16bar' ? '0 - 16 bar' : '0 - 25 bar'} (IP68)
                        </span>
                        <p className="text-[11px] text-slate-500">
                          Corps inox 316L, précision ±0,5%, boucle 4-20 mA, vanne 1/2" et purge
                        </p>
                      </div>
                      <span className="font-mono text-onee-600 dark:text-onee-400 font-bold">
                        {configPression === '16bar' ? 'Prix 8' : 'Prix 9'}
                      </span>
                    </div>
                  )}

                  {/* Turbidity */}
                  {(configQualite === 'turb' || configQualite === 'both') && (
                    <div className="pt-2 flex justify-between items-start gap-2">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          Turbidimètre en ligne (0-10 NTU) avec transmetteur LCD
                        </span>
                        <p className="text-[11px] text-slate-500">
                          Chambre de passage sans pompe mécanique, précision ±2%, IP65
                        </p>
                      </div>
                      <span className="font-mono text-onee-600 dark:text-onee-400 font-bold">
                        Prix 11
                      </span>
                    </div>
                  )}

                  {/* Chlorine */}
                  {(configQualite === 'chlore' || configQualite === 'both') && (
                    <div className="pt-2 flex justify-between items-start gap-2">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          Analyseur de chlore libre (0-2 mg/l) sur platine
                        </span>
                        <p className="text-[11px] text-slate-500">
                          Cellule ampérométrique continue, compensation pH et température, IP65
                        </p>
                      </div>
                      <span className="font-mono text-onee-600 dark:text-onee-400 font-bold">
                        Prix 12
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                  ℹ️ <strong>Raccordement réseau :</strong> Intégré avec carte SIM GSM-IP pour double émission simultanée vers le frontal Secteur et le frontal DR9.
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Tab 5: Cybersécurité & Souveraineté */}
      {activeTab === 'cyber' && (
        <Card
          title="Exigences de Cybersécurité & Souveraineté Numérique"
          subtitle="Conformité stricte aux directives nationales marocaines (DGSSI, Loi 09-08) et standards industriels"
          source="CCTP – 1.1 & 1.2"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-linear-to-r from-onee-950 to-slate-900 border border-onee-800 text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-cyan-300 font-bold">
                  SOUVERAINETÉ 100% LOCALE
                </span>
                <h4 className="text-base font-bold text-white mt-1">
                  Architecture On-Premise Intégrale — Interdiction du Cloud
                </h4>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  Toutes les données de mesure de débit, pression et qualité de l’eau sont traitées et stockées exclusivement sur les infrastructures physiques de l’ONEE.
                </p>
              </div>
              <Lock className="w-10 h-10 text-cyan-400 shrink-0 hidden sm:block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CYBERSECURITY_SPECS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <Badge variant="primary" size="sm">
                      {item.norme}
                    </Badge>
                    <h5 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                      {item.domaine}
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <SourceBadge source={item.source} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Detail Modal for SVG nodes */}
      <Modal
        isOpen={selectedNodeModal !== null}
        onClose={() => setSelectedNodeModal(null)}
        title={selectedNodeModal ? nodeDetails[selectedNodeModal]?.title : ''}
        subtitle={selectedNodeModal ? nodeDetails[selectedNodeModal]?.subtitle : ''}
      >
        {selectedNodeModal && nodeDetails[selectedNodeModal]?.content}
      </Modal>
    </div>
  );
};
