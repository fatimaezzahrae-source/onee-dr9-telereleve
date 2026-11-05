# Matrice Exhaustive de Couverture du CPS
## Marché N° 88/DR9/C/I/2026 — ONEE Branche Eau (Lot 3 DR9)
**Solution Digitale de Télérelève des Compteurs de Gestion au Niveau des Adducteurs**

Ce document atteste de la correspondance point par point entre le **Cahier des Prescriptions Spéciales (CPS)** et les composants de l'application web interactive. **Aucune clause, chiffre, délai, pénalité ou équipement n'a été omis.**

---

## 1. Dispositions Générales & Page de Garde

| Exigence / Donnée du CPS | Valeur / Règle contractuelle | Emplacement dans l'Application | Statut |
| :--- | :--- | :--- | :---: |
| **Numéro du marché** | Marché n° 88/DR9/C/I/2026 | `Dashboard.tsx`, `Header.tsx`, `Sidebar.tsx`, `marketInfo.ts` | Conforme |
| **Objet du marché** | Solution digitale relève compteurs adducteurs DR9 | `Dashboard.tsx`, `marketInfo.ts` | Conforme |
| **Maître d'Ouvrage** | ONEE – Branche Eau (Directeur Général ou délégataire) | `Dashboard.tsx`, `CcafpViewer.tsx` (Art. 2) | Conforme |
| **Maître d'Œuvre** | Chef Division Industrielle DR9 (Tanger-Tétouan-Al Hoceima) | `Dashboard.tsx`, `CcafpViewer.tsx` (Art. 2) | Conforme |
| **Mode de passation** | Appel d'offres ouvert sur offres de prix en 2 temps | `Dashboard.tsx`, `marketInfo.ts` | Conforme |
| **Règlement des Achats** | Règlement des Achats ONEE (Avril 2021) | `Dashboard.tsx`, `CcafpViewer.tsx` (Art. 4) | Conforme |
| **Financement** | Banque Africaine de Développement (BAD - PDRAP) | `Dashboard.tsx`, `Sidebar.tsx`, `marketInfo.ts` | Conforme |
| **Montant estimatif travaux** | 12 000 000,00 DH TTC | `Dashboard.tsx`, `FinanceSimulator.tsx`, `BpdeTable.tsx` | Conforme |
| **Montant estimatif maintenance** | 4 749 996,00 DH TTC | `Dashboard.tsx`, `MaintenanceModule.tsx`, `BpdeTable.tsx` | Conforme |

---

## 2. Partie I — CCAFP (Articles 1 à 19)

| Article | Objet & Stipulations contractuelles | Traitement & Fonctionnalités dans l'Application | Statut |
| :---: | :--- | :--- | :---: |
| **Art. 1** | Objet du Marché (clé en main, débit, pression, qualité) | Accordéon `CcafpViewer.tsx`, fiche `Dashboard.tsx` | Conforme |
| **Art. 2** | Maître d'Ouvrage et Maître d'Œuvre (DG ONEE / Chef Div. Industrielle) | `CcafpViewer.tsx`, badges identité | Conforme |
| **Art. 3** | Pièces constitutives (6 niveaux de priorité décroissante) | Carte dédiée dans `CcafpViewer.tsx`, hiérarchie 1 à 6 | Conforme |
| **Art. 4** | Textes réglementaires (Règlement 2021, Décret 2-14-394, Loi 112-13, Dahir 1913, BAD) | Tableau synoptique dans `CcafpViewer.tsx` | Conforme |
| **Art. 5** | Élection de domicile et délai de préavis 15 jours par LRAR | Fiche Art. 5, point de contrôle dans `ComplianceTracker.tsx` | Conforme |
| **Art. 6** | **Sous-traitance strictement non autorisée** | Alerte rouge `CcafpViewer.tsx`, `Dashboard.tsx`, `GlossaryFaq.tsx` | Conforme |
| **Art. 7** | **3 Assurances obligatoires** (RC Pro, Véhicules, AT ; zéro dommage à l'ouvrage) | Carte alerte `CcafpViewer.tsx`, item critique checklist | Conforme |
| **Art. 8** | **Délai global 12 mois** (2m dossier, 8m travaux, 1m semi-indus, 1m indus) | Gantt interactif `PlanningSimulator.tsx`, calcul dates OS | Conforme |
| **Art. 9** | **Intempéries : zéro prolongation de délai** | Alerte météo `PlanningSimulator.tsx`, `CcafpViewer.tsx`, FAQ | Conforme |
| **Art. 10** | **Pénalités retard travaux** (1/1000e/j, plafond 8% TTC, résiliation de plein droit) | Simulateur interactif avec jauge et alerte `PlanningSimulator.tsx` | Conforme |
| **Art. 10** | **Pénalité retard DOE / repliement** (1/4000e/j) | Calculateur additionnel avec slider dans `PlanningSimulator.tsx` | Conforme |
| **Art. 11** | Caractère des prix : **Fermes et non révisables** (12 000 000 DH TTC) | `FinanceSimulator.tsx`, `BpdeTable.tsx`, `Dashboard.tsx` | Conforme |
| **Art. 12** | **Avance de 10%** (caution 100%, remboursement précompte 12,5%/acompte) | Simulateur d'avance interactif dans `FinanceSimulator.tsx` | Conforme |
| **Art. 13** | **Échéancier de règlement** (Dossier 100% max 1,5% ; Équipements 40/20/20/20 ; Install/Repli 50/50) | Décomposition visuelle étape par étape dans `FinanceSimulator.tsx` | Conforme |
| **Art. 14** | Domiciliation et **Délai de paiement 90 jours** par virement | Carte KPI dans `FinanceSimulator.tsx` | Conforme |
| **Art. 15** | **Caution provisoire** : 167 500,00 DH | KPI `FinanceSimulator.tsx`, quiz, glossary | Conforme |
| **Art. 15** | **Caution définitive** : 3% TTC (constituée sous 20 jours) | Calculateur automatique `FinanceSimulator.tsx` (360 000 DH) | Conforme |
| **Art. 15** | **Retenue de garantie** : 10% plafonnée à 7% TTC | Calculateur `FinanceSimulator.tsx` (840 000 DH), caution de substitution | Conforme |
| **Art. 16** | **Essais** : Marche semi-indus 1 mois + Essais industriels 1 mois avec formation | Parcours 5 étapes (stepper) dans `ReceptionStepper.tsx` | Conforme |
| **Art. 17** | **Réception provisoire** (4 conditions cumulatives, DOE 5 papier + 2 clés USB) | Checklist interactive cochable avec persistance `ReceptionStepper.tsx` | Conforme |
| **Art. 18** | **Délai de garantie 12 mois** (remplacement gratuit immédiat) | Fiche garantie, planning et conditions de levée de réserves | Conforme |
| **Art. 19** | **Réception définitive** (levée réserves + signature contrat maintenance 5 ans) | Étape 5 du parcours, libération retenue de garantie 7% | Conforme |

---

## 3. Partie II — CCTP (Technique)

| Spécification / Équipement | Caractéristiques exactes du CPS | Traitement dans l'Application | Statut |
| :--- | :--- | :--- | :---: |
| **Architecture On-Premise** | 100% On-Premise, hébergement souverain, ZÉRO Cloud | Synoptique SVG interactif, onglet Cybersécurité dans `CctpArchitecture.tsx` | Conforme |
| **Double Transmission** | Redondance simultanée : Frontal Secteur ET Frontal centralisé DR9 | SVG animé avec flux distincts, modal explicatif | Conforme |
| **Datalogger sur pile** | Pile lithium interchangeable ≥ 5 ans (envoi quotidien), 2 TOR, 2x 4-20mA, RS485 Modbus, mémoire ≥ 15j à 15 min, **IP68** | Comparateur côte à côte, configurateur, fiche technique détaillée | Conforme |
| **Datalogger secteur** | 24 VDC secouru batterie 2x12V 12Ah, 230 VAC, alarmes SMS instantanées, **IP65** | Comparateur côte à côte, configurateur | Conforme |
| **Capteurs de pression** | 0-16 bar ou 0-25 bar, précision ±0,5%, corps inox 316L, 4-20 mA, **IP68** | Fiche catalogue, configurateur de poste de comptage | Conforme |
| **Têtes émettrices** | Passives étanches, pour compteurs mécaniques, zéro masquage d'index, **IP68** | Fiche catalogue, configurateur | Conforme |
| **Convertisseurs débitmètres** | Numériques communicants neufs, liaison Modbus RTU RS485 | Fiche catalogue, configurateur | Conforme |
| **Modules MAG 8000** | Modules d'extension RS485 dédiés Siemens Sitrans MAG 8000 | Fiche catalogue, configurateur | Conforme |
| **Turbidimètres en ligne** | 0-10 NTU, néphélométrie ISO 7027, chambre sans pompe, précision ±2%, LCD, Modbus RS485, 4-20 mA, **IP65** | Fiche catalogue, configurateur, quiz | Conforme |
| **Analyseurs chlore libre** | 0-2 mg/l, ampérométrique continu, compensation pH et T°, platine murale, Modbus RS485, alarme, **IP65** | Fiche catalogue, configurateur | Conforme |
| **Postes de contrôle (5 sites)** | Tanger, Tétouan, Larache, Al Hoceima + DR9 : PC i7/16Go/1To, TV 65" 4K 16/7, Onduleur 4h, Imprimante A4/A3, Clim 12k BTU, PC portable diagnostic, MDM | Tableau de répartition par site, fiches matérielles dans `CctpArchitecture.tsx` | Conforme |
| **Cybersécurité** | TLS 1.3, MQTT sur TLS, OPC UA avec certificats X.509, 2FA, Loi 09-08, DGSSI | Grille des 5 piliers de sécurité | Conforme |
| **Formation (15 agents)** | 2 modules de 2 jours (Exploitation & Maintenance), seuil validation ≥ 75/100 | `FormationModule.tsx` + Mini-quiz 10 questions interactif avec score | Conforme |

---

## 4. Partie III — Marché de Maintenance (5 ans)

| Clause Maintenance | Stipulations du CPS | Traitement dans l'Application | Statut |
| :--- | :--- | :--- | :---: |
| **Montant & Durée** | 4 749 996,00 DH TTC, 5 années consécutives | `MaintenanceModule.tsx`, cartes KPIs, `BpdeTable.tsx` | Conforme |
| **Maintenance préventive** | Campagne annuelle de 10 semaines (8 terrain + 2 rapports), nettoyage, étalonnages, sauvegardes | Fiche préventif détaillée avec liste des 9 prestations | Conforme |
| **Maintenance curative** | Arrivée sur site ≤ 48h (notification fax/mail), délai de réparation ≤ 6 jours | Fiche curative avec engagements SLA | Conforme |
| **Pénalités préventif** | 3% du montant de l'intervention par jour calendaire de retard | Simulateur interactif avec slider | Conforme |
| **Pénalités réponse curative** | 2% du montant de l'intervention par heure de retard (> 48h) | Simulateur interactif avec slider | Conforme |
| **Pénalités réparation** | 2% du montant de l'intervention par heure de retard (> 6j) | Simulateur interactif avec slider | Conforme |
| **Plafond pénalités** | **10% du montant global de maintenance** (474 999,60 DH) | Jauge visuelle de plafond et alerte résiliation | Conforme |

---

## 5. Partie IV — Clauses Environnementales et Sociales (HSE)

| Clause HSE | Exigences du CPS & Directives BAD | Traitement dans l'Application | Statut |
| :--- | :--- | :--- | :---: |
| **PGES & Sauvegardes BAD** | Respect réglementation marocaine et Politique de Sauvegarde Intégrée BAD | Fiche générale dans `HseModule.tsx` | Conforme |
| **Sécurité de chantier** | EPI obligatoires, balisage voies publiques, vitesse ≤ 20 km/h, bâchage camions | Fiches thématiques, checklist de chantier | Conforme |
| **Amiante : Coupe à sec** | **INTERDICTION ABSOLUE DE DÉCOUPE À SEC** | Étape 1 du pas-à-pas interactif (Alerte rouge) | Conforme |
| **Amiante : Arrosage** | Arrosage et humidification permanents pendant toute la coupe | Étape 2 du pas-à-pas | Conforme |
| **Amiante : Outils** | Coupe-tube manuel ou scie sabre lente autorisés ; disqueuses haute vitesse INTERDITES | Étape 3 : comparateur outils autorisés / prohibés | Conforme |
| **Amiante : EPI** | Combinaison Type 5/6, masque FFP3, gants latex, lunettes étanches | Étape 4 : inventaire du pack EPI | Conforme |
| **Amiante : Déchets** | Sacs scellés étiquetés « Danger Amiante », évacuation vers décharge agréée avec BSD | Étape 5 : consignes d'évacuation et traçabilité | Conforme |
| **Checklist HSE chantier** | Contrôles quotidiens de terrain (10 points) | Checklist interactive cochable avec persistance locale | Conforme |

---

## 6. Partie V — Bordereau des Prix (BPDE)

| N° Prix | Désignation du CPS | Unité | Présence dans l'App |
| :---: | :--- | :---: | :---: |
| **Prix 1** | Études d’exécution, dossier d’exécution et relevés de terrain | Ft | Inclus |
| **Prix 2** | Dossier de récolement et plans conformes à l’exécution (DOE) | Ft | Inclus |
| **Prix 3** | Fourniture et transport de Datalogger secteur (IP65) avec coffret et batterie | U | Inclus |
| **Prix 4** | Fourniture et transport de Datalogger autonome sur pile (IP68) | U | Inclus |
| **Prix 5** | Pose, raccordement, paramétrage et mise en service de Datalogger | U | Inclus |
| **Prix 6** | Fourniture et transport de convertisseur électronique pour débitmètre | U | Inclus |
| **Prix 7** | Fourniture et transport de module de communication RS485 (MAG 8000) | U | Inclus |
| **Prix 8** | Fourniture et transport de capteur de pression 0 - 16 bar (IP68) | U | Inclus |
| **Prix 9** | Fourniture et transport de capteur de pression 0 - 25 bar (IP68) | U | Inclus |
| **Prix 10** | Fourniture et transport de tête émettrice d’impulsions sur compteur mécanique | U | Inclus |
| **Prix 11** | Fourniture et transport de Turbidimètre en ligne (0-10 NTU) avec transmetteur | U | Inclus |
| **Prix 12** | Fourniture et transport d’Analyseur de chlore libre (0-2 mg/l) sur platine | U | Inclus |
| **Prix 13** | Fourniture de licence du logiciel de monitoring (5 sites) | U | Inclus |
| **Prix 14** | Serveur de monitoring, équipements de sécurité (Firewall, VPN) et MDM | U | Inclus |
| **Prix 15** | Programmation, configuration des synoptiques et masques du logiciel | U | Inclus |
| **Prix 16** | Fourniture et transport du frontal de communication et serveur dédié | U | Inclus |
| **Prix 17** | Fourniture et transport de modem/routeur GSM/4G industriel | U | Inclus |
| **Prix 18** | Mobilier complet et PC de supervision pour poste de contrôle | Ft | Inclus |
| **Prix 19** | Aménagement physique de la salle de contrôle de la Direction Régionale | Ft | Inclus |
| **Prix 20** | Fourniture et transport de PC portable de diagnostic terrain | U | Inclus |
| **Prix 21** | Fourniture et pose de Téléviseur d’affichage 65" UHD 4K professionnel | U | Inclus |
| **Prix 22** | Frais d’abonnement GSM/IP durant les travaux et la période de garantie | Ft | Inclus |
| **Prix 23** | Formation du personnel de l’ONEE (Modules Exploitation & Maintenance) | Ft | Inclus |
| **Prix 24** | Montage, câblage, intégration et mise en marche de l’ensemble du système | Ft | Inclus |
| **Prix 25** | Lot initial de pièces de rechange et outillages de secours | Ft | Inclus |
| **Prix 26** | Réhabilitation et mise à niveau des regards de comptage existants | U | Inclus |
| **Prix M1** | Entretien préventif de poste de télérelève / datalogger | U | Inclus |
| **Prix M2** | Entretien préventif de poste pour turbidimètre et analyseur de chlore | U | Inclus |
| **Prix M3** | Intervention curative (sur appel) - Catégorie Ingénieur | Jour | Inclus |
| **Prix M4** | Intervention curative (sur appel) - Catégorie Technicien | Jour | Inclus |
| **Prix M5** | Pose de datalogger de remplacement (débit, pression, qualité) | U | Inclus |
| **Prix M6** | Pose de turbidimètre de remplacement (0-10 NTU) | U | Inclus |
| **Prix M7** | Pose d’analyseur de chlore libre de remplacement (0-2 mg/l) | U | Inclus |
| **Prix M8** | Mise à jour des logiciels de monitoring et des licences applicatives | U | Inclus |
| **Prix M9** | Provision pour fourniture des pièces de rechange de maintenance | Ft | Inclus |

**Taux de couverture du CPS : 100% (35 prix sur 35, 19 articles sur 19, 5 sites sur 5, toutes règles HSE & financières).**
