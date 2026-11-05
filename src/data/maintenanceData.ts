export const MAINTENANCE_INFO = {
  montantTotalTTC: 4749996.0,
  dureeAnnees: 5,
  plafondPenalitesPct: 10,
  plafondPenalitesDH: 474999.6,
  source: 'CPS Partie III – Art. 1 à 4',
};

export const PREVENTIVE_SPECS = {
  dureeCampagneSemaines: 10,
  semainesTerrain: 8,
  semainesRapports: 2,
  frequence: 'Campagne annuelle systématique selon planning validé par l’ONEE',
  penaliteRetardJourPct: 3.0,
  prestations: [
    'Nettoyage soigné des regards, coffrets et antennes GSM',
    'Contrôle complet d’étanchéité des boîtiers IP68 et presse-étoupes',
    'Étalonnage et calibration des capteurs de pression (0-16 / 0-25 bar)',
    'Étalonnage et vérification des turbidimètres (solutions étalons ISO 7027)',
    'Calibrage et contrôle des analyseurs de chlore libre (compensation pH/T°)',
    'Test de transmission radio / cellulaire et analyse de couverture GSM-IP',
    'Sauvegarde intégrale des bases de données de supervision locales et centrales',
    'Application des correctifs de sécurité logicielle et firmwares',
    'Rédaction et remise des rapports détaillés de visite préventive sous 2 semaines',
  ],
  source: 'CPS Partie III – Art. 2',
};

export const CURATIVE_SPECS = {
  delaiReponseMaxHeures: 48,
  delaiReparationMaxJours: 6,
  moyensNotification: 'Fax ou e-mail officiel de l’ONEE',
  penaliteReponseHeurePct: 2.0,
  penaliteReparationHeurePct: 2.0,
  engagements: [
    'Astreinte technique permanente opérationnelle',
    'Arrivée sur site sous un délai impératif ≤ 48 heures après notification',
    'Délai de résolution et remise en état nominale ≤ 6 jours calendaires',
    'Mise à disposition immédiate de pièces de rechange d’origine garanties',
    'Rapport d’intervention curative contresigné contradictoirement avec le chef de secteur',
  ],
  source: 'CPS Partie III – Art. 3 & 4',
};
