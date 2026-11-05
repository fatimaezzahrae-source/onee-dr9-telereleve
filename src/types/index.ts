export type PageId =
  | 'dashboard'
  | 'ccafp'
  | 'planning'
  | 'finances'
  | 'reception'
  | 'cctp'
  | 'formation'
  | 'maintenance'
  | 'hse'
  | 'bpde'
  | 'compliance'
  | 'glossary';

export interface MarketIdentity {
  numero: string;
  objet: string;
  entite: string;
  direction: string;
  modePassation: string;
  reglement: string;
  financement: string;
  maitreOuvrage: string;
  maitreOeuvre: string;
  montantTravauxTTC: number;
  montantMaintenanceTTC: number;
  delaiGlobalMois: number;
  garantieMois: number;
  sitesCount: number;
  agentsCount: number;
}

export interface CcafpArticle {
  id: number;
  numero: string;
  titre: string;
  chapitre: string;
  contenu: string;
  pointsCles: string[];
  alertes?: {
    type: 'danger' | 'warning' | 'info' | 'success';
    message: string;
  }[];
  source: string;
}

export interface EquipmentSpec {
  id: string;
  nom: string;
  categorie: 'datalogger' | 'capteur' | 'analyseur' | 'poste_controle' | 'reseau';
  description: string;
  caracteristiques: { [key: string]: string };
  conformiteNormes: string[];
  pointsCritiques: string[];
  source: string;
}

export interface SiteControlRoom {
  siteId: string;
  nom: string;
  type: 'Direction Régionale' | 'Secteur de Production';
  pcSupervision: number;
  tvAffichage: number;
  onduleur: number;
  imprimante: number;
  climatisation: number;
  pcPortable: number;
  mobilier: number;
  mdm: boolean;
}

export interface BpdeItem {
  numero: string;
  composantId?: string;
  composantNom?: string;
  libelle: string;
  unite: 'U' | 'Ft' | 'Jour';
  prixUnitaireDefaut?: number;
  quantiteDefaut?: number;
  type: 'travaux' | 'maintenance';
}

export interface ComplianceItem {
  id: string;
  categorie: 'Administratif' | 'Financier' | 'Technique' | 'HSE' | 'Réception' | 'Maintenance';
  titre: string;
  exigence: string;
  source: string;
  statut: 'A_FAIRE' | 'EN_COURS' | 'CONFORME';
  responsable?: string;
  commentaire?: string;
  critique?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explication: string;
  source: string;
}

export interface GlossaryItem {
  terme: string;
  sigle?: string;
  definition: string;
  contexteONEE: string;
  source?: string;
}
