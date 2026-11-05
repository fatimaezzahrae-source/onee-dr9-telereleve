import { MarketIdentity } from '../types';

export const MARKET_INFO: MarketIdentity = {
  numero: '88/DR9/C/I/2026',
  objet: 'La mise en œuvre d’une solution digitale pour la relève automatique des compteurs de gestion au niveau des adducteurs (Lot 3 : DR9)',
  entite: 'Office National de l’Électricité et de l’Eau Potable (ONEE) – Branche Eau',
  direction: 'Direction Régionale de Production Tanger - Tétouan - Al Hoceima (DR9)',
  modePassation: 'Appel d’offres ouvert sur offres de prix en deux temps',
  reglement: 'Règlement des Achats de l’ONEE (Avril 2021)',
  financement: 'Banque Africaine de Développement (BAD - PDRAP)',
  maitreOuvrage: 'L’Office National de l’Électricité et de l’Eau Potable (ONEE) – Branche Eau (Directeur Général ou délégataire)',
  maitreOeuvre: 'Le Chef de la Division Industrielle relevant de la DR9 (Tanger - Tétouan - Al Hoceima)',
  montantTravauxTTC: 12000000.0,
  montantMaintenanceTTC: 4749996.0,
  delaiGlobalMois: 12,
  garantieMois: 12,
  sitesCount: 5,
  agentsCount: 15,
};

export const SITES_DR9 = [
  { id: 'dr9-tanger', nom: 'Direction Régionale DR9 (Tanger)', type: 'Direction Régionale', description: 'Frontal centralisé DR9 & Poste de supervision maître régional' },
  { id: 'sec-tanger', nom: 'Secteur de Production Tanger', type: 'Secteur de Production', description: 'Frontal de communication secteur & Poste de contrôle local Tanger' },
  { id: 'sec-tetouan', nom: 'Secteur de Production Tétouan', type: 'Secteur de Production', description: 'Frontal de communication secteur & Poste de contrôle local Tétouan' },
  { id: 'sec-larache', nom: 'Secteur de Production Larache', type: 'Secteur de Production', description: 'Frontal de communication secteur & Poste de contrôle local Larache' },
  { id: 'sec-alhoceima', nom: 'Secteur de Production Al Hoceima', type: 'Secteur de Production', description: 'Frontal de communication secteur & Poste de contrôle local Al Hoceima' },
];

export const TIMELINE_PHASES = [
  {
    phase: 'Travaux & Mise en service',
    duree: '12 mois',
    description: 'De l’Ordre de Service à la Réception Provisoire',
    subPhases: [
      { nom: 'Dossier d’exécution', dureeMois: 2, pct: 16.7, details: 'Programme, mémoire technique, études & plans d’exécution' },
      { nom: 'Travaux et installations sur site', dureeMois: 8, pct: 66.6, details: 'Pose dataloggers, capteurs, compteurs, câblage, raccordements' },
      { nom: 'Mise en service semi-industrielle', dureeMois: 1, pct: 8.3, details: '1 mois continu sans incident majeur' },
      { nom: 'Essais industriels & Formations', dureeMois: 1, pct: 8.3, details: '1 mois sous contrôle ONEE avec formation des 15 agents' },
    ],
  },
  {
    phase: 'Période de Garantie',
    duree: '12 mois (1 an)',
    description: 'À compter de la Réception Provisoire jusqu’à la Réception Définitive. Remplacement immédiat de tout équipement défaillant aux frais du titulaire.',
    subPhases: [
      { nom: 'Garantie totale pièces & main d’œuvre', dureeMois: 12, pct: 100, details: 'Levée des réserves & préparation contrat de maintenance' },
    ],
  },
  {
    phase: 'Marché de Maintenance',
    duree: '5 années consécutives',
    description: 'Entretien préventif (campagnes annuelles de 10 semaines) et curatif (astreinte ≤ 48h, résolution ≤ 6 jours). Montant : 4 749 996 DH TTC.',
    subPhases: [
      { nom: 'Année 1 Maintenance', dureeMois: 12, pct: 20, details: 'Visites préventives & interventions curatives' },
      { nom: 'Année 2 Maintenance', dureeMois: 12, pct: 20, details: 'Visites préventives & interventions curatives' },
      { nom: 'Année 3 Maintenance', dureeMois: 12, pct: 20, details: 'Visites préventives & interventions curatives' },
      { nom: 'Année 4 Maintenance', dureeMois: 12, pct: 20, details: 'Visites préventives & interventions curatives' },
      { nom: 'Année 5 Maintenance', dureeMois: 12, pct: 20, details: 'Visites préventives & bilan de clôture' },
    ],
  },
];
