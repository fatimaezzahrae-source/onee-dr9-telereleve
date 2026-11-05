export const HSE_GENERAL_CLAUSES = [
  {
    titre: 'Respect du PGES (Plan de Gestion Environnemental et Social)',
    description: 'Le titulaire s’engage au respect rigoureux de la réglementation marocaine en vigueur (loi 12-03 sur les études d’impact) et de la Politique de Sauvegarde Intégrée de la Banque Africaine de Développement (BAD - PDRAP).',
    source: 'CPS Partie IV – Art. 1',
  },
  {
    titre: 'Équipements de Protection Individuelle (EPI)',
    description: 'Port obligatoire et permanent sur chantier : casque de sécurité, gants de manutention adaptés, chaussures de sécurité coquées S3, gilet haute visibilité classe 2.',
    source: 'CPS Partie IV – Art. 2',
  },
  {
    titre: 'Balisage et Signalisation des Voies Publiques',
    description: 'Signalisation temporaire de chantier conforme au code de la route marocain, feux clignotants, barrières K16 et déviations sécurisées pour les usagers.',
    source: 'CPS Partie IV – Art. 2',
  },
  {
    titre: 'Vitesse de Chantier & Bâchage',
    description: 'Vitesse maximale autorisée des engins et camionnettes de chantier limitée à 20 km/h. Bâchage obligatoire de toutes les bennes de transport de déblais pour limiter les poussières.',
    source: 'CPS Partie IV – Art. 2',
  },
];

export const AMIANTE_CIMENT_PROCEDURE = {
  titre: 'Procédure Impérative pour Travaux sur Conduites en Amiante-Ciment',
  sousTitre: 'Obligations strictes lors du carottage ou découpe de canalisations pour pose de compteurs et capteurs',
  source: 'CPS Partie IV – Art. 3',
  reglesCritiques: [
    {
      etape: 1,
      titre: 'Interdiction Absolue de Découpe à Sec',
      type: 'interdiction',
      description: 'Toute tentative de coupe, meulage ou sciage à sec est formellement prohibée en raison du risque mortel de libération de fibres d’amiante dans l’air.',
      action: 'Zéro coupe à sec',
      alerte: 'DANGER MORTEL : Les fibres d’amiante inhalées provoquent des pathologies pulmonaires irréversibles (asbestose, mésothéliome).',
    },
    {
      etape: 2,
      titre: 'Humidification & Arrosage Permanent',
      type: 'obligation',
      description: 'Arrosage continu et abondant à l’eau pulvérisée tout au long de la zone de coupe pour piéger les fibres dans les boues liquides et éviter toute dispersion aérienne.',
      action: 'Jet d’eau sous pression continue ou pulvérisateur maintenu actif',
      alerte: 'L’arrosage doit débuter avant le contact de l’outil et se poursuivre jusqu’à l’arrêt complet du sciage.',
    },
    {
      etape: 3,
      titre: 'Outils Autorisés vs Outillage Prohibé',
      type: 'reglementation',
      description: 'Sélection stricte des technologies de coupe :',
      outilsAutorises: [
        'Coupe-tube mécanique manuel à molettes',
        'Scie sabre électrique à vitesse lente avec arrosage intégré',
        'Scie manuelle à métaux à dentures larges humidifiée',
      ],
      outilsInterdits: [
        'Disqueuse / Meuleuse angulaire à grande vitesse (INTERDIT ABSOLU)',
        'Tronçonneuse thermique ou électrique (INTERDIT ABSOLU)',
        'Tout outil rotatif à haute vitesse provoquant un nuage de poussières',
      ],
      alerte: 'L’usage d’une disqueuse à haute vitesse entraîne l’arrêt immédiat du chantier et l’exclusion des opérateurs.',
    },
    {
      etape: 4,
      titre: 'Pack EPI Amiante Obligatoire',
      type: 'epi',
      description: 'Équipement individuel hermétique requis pour chaque intervenant dans la fouille :',
      itemsEpi: [
        'Combinaison étanche jetable Type 5/6 avec capuche scotchée',
        'Masque de protection respiratoire jetable FFP3 ou masque à cartouche P3',
        'Gants étanches en latex ou nitrile renforcé',
        'Lunettes-masque de sécurité totalement étanches aux projections liquides',
        'Bottes de sécurité étanches décontaminables',
      ],
      alerte: 'Chaque combinaison et masque FFP3 est à usage unique et doit être jeté avec les déchets d’amiante.',
    },
    {
      etape: 5,
      titre: 'Conditionnement & Évacuation en Filière Agréée',
      type: 'dechets',
      description: 'Gestion sécurisée des tronçons de conduites et des boues de coupe :',
      consignes: [
        'Double ensachage dans des sacs spécifiques étanches d’épaisseur ≥ 100 microns',
        'Scellage hermétique par ruban adhésif résistant',
        'Étiquetage réglementaire visible rouge et noir : "DANGER AMIANTE"',
        'Stockage transitoire sous bâche fermée à clé',
        'Transport sécurisé et dépotage exclusivement dans un centre d’enfouissement technique agréé pour amiante avec bordereau de suivi des déchets (BSD)',
      ],
      alerte: 'Le certificat de dépotage fourni par la décharge agréée est une pièce obligatoire pour la réception.',
    },
  ],
};

export const HSE_CHECKLIST_TEMPLATE = [
  { id: 'hse-1', label: 'Plan de Sécurité et PGES déposé et approuvé par le Maître d’Œuvre', categorie: 'Administratif' },
  { id: 'hse-2', label: 'Port effectif des EPI complets par 100% des ouvriers présents sur le chantier', categorie: 'Terrain' },
  { id: 'hse-3', label: 'Balisage temporaire, cônes et panneaux de limitation de vitesse posés', categorie: 'Voirie' },
  { id: 'hse-4', label: 'Limitation de vitesse à 20 km/h respectée par les véhicules de chantier', categorie: 'Voirie' },
  { id: 'hse-5', label: 'Bâchage effectif des camions transportant déblais et gravats', categorie: 'Environnement' },
  { id: 'hse-6', label: 'Kit complet de protection Amiante (EPI Type 5/6, masques FFP3) disponible dans le camion', categorie: 'Amiante' },
  { id: 'hse-7', label: 'Pulvérisateur d’eau sous pression opérationnel avant toute coupe de conduite', categorie: 'Amiante' },
  { id: 'hse-8', label: 'Absence d’outils à haute vitesse (disqueuses prohibées vérifiées)', categorie: 'Amiante' },
  { id: 'hse-9', label: 'Sacs étanches étiquetés "DANGER AMIANTE" et adhésifs de scellage présents', categorie: 'Amiante' },
  { id: 'hse-10', label: 'Trousse de premiers secours et numéros d’urgence affichés', categorie: 'Sécurité' },
];
