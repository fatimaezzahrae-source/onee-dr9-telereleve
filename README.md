# ONEE Branche Eau — Solution Digitale de Télérelève DR9
## Dossier Interactif du Marché N° 88/DR9/C/I/2026 (Lot 3 DR9)

![ONEE DR9 Télérelève](https://img.shields.io/badge/ONEE-Branche_Eau_DR9-0284c7?style=for-the-badge)
![Financement BAD](https://img.shields.io/badge/Bailleur-BAD--PDRAP-059669?style=for-the-badge)
![Statut](https://img.shields.io/badge/Application-100%25_Statique-purple?style=for-the-badge)
![Tests](https://img.shields.io/badge/Tests-5%2F5_R%C3%A9ussis-success?style=for-the-badge)

---

## 🎯 Présentation du Projet

Cette application web interactive transforme l’intégralité du **Cahier des Prescriptions Spéciales (CPS)** du Marché n° **88/DR9/C/I/2026** (Lot 3 : DR9) en un véritable **dossier interactif d'aide à la décision, de simulation et de suivi contractuel**.

L'application couvre **100% des exigences** du CPS (articles, chiffres clés, délais, pourcentages, pénalités, garanties financières, équipements, formation, clauses HSE amiante-ciment, et les 35 lignes du bordereau des prix).

### 🏛️ Identité Contractuelle du Marché
* **Maître d'Ouvrage** : Office National de l'Électricité et de l'Eau Potable (ONEE) – Branche Eau
* **Maître d'Œuvre** : Division Industrielle de la Direction Régionale de Production Tanger - Tétouan - Al Hoceima (DR9)
* **Mode de passation** : Appel d'offres ouvert sur offres de prix en deux temps
* **Financement** : Banque Africaine de Développement (BAD - PDRAP)
* **Budget Travaux estimatif** : **12 000 000,00 DH TTC** (Prix fermes et non révisables)
* **Budget Maintenance estimatif (5 ans)** : **4 749 996,00 DH TTC**
* **Délai global d'exécution** : **12 mois** fermes (sans prolongation intempéries)
* **Période de garantie** : **12 mois (1 an)**
* **Périmètre géographique** : 5 sites de contrôle (Direction Régionale DR9 Tanger + Secteurs Tanger, Tétouan, Larache, Al Hoceima)
* **Formation** : 15 agents ONEE (Validation ≥ 75/100)

---

## 🚀 Les 12 Modules Intégrés

1. **Tableau de Bord & Fiche d'Identité** : Synthèse exécutive, 6 cartes d'indicateurs clés, frise chronologique globale (Travaux, Garantie, Maintenance 5 ans), périmètre des 5 sites et raccourcis.
2. **Partie I – CCAFP (Clauses Administratives & Financières)** : Consultation intégrale des Articles 1 à 19 sous forme d'accordéons, hiérarchie officielle des 6 pièces contractuelles, table des textes de référence, mise en garde rouge sur l'interdiction de sous-traitance et inventaire des 3 attestations d'assurances.
3. **Planning & Pénalités (Simulateur Interactif)** : Décomposition du délai de 12 mois, diagramme de Gantt dynamique calculé à partir de la date de notification de l'OS de démarrage, simulateur de pénalités de retard (1/1000e par jour pour travaux, plafond de 8% TTC avec alerte de résiliation, et 1/4000e par jour pour retard DOE).
4. **Finances & Modalités de Paiement** : Simulateur complet d'avance forfaitaire de 10% (caution 100%, précompte de 12,5% sur chaque acompte), décomposition de l'échéancier des règlements (Dossier 100% max 1,5% ; Équipements 40/20/20/20 ; Chantier 50/50), garanties financières (Caution provisoire 167 500 DH, caution définitive 3% sous 20j, retenue de garantie 10% plafonnée à 7%), délai de paiement 90 jours.
5. **Réception & Garanties** : Parcours en 5 étapes (Marche semi-industrielle 1 mois → Essais industriels 1 mois → Réception provisoire → Garantie 12 mois → Réception définitive). Checklist interactive des 4 conditions de réception provisoire (DOE en 5 exemplaires papier + 2 clés USB, etc.) avec barre de progression et persistance locale.
6. **Partie II – CCTP (Clauses Techniques & Architecture)** :
   - **Synoptique SVG interactif** : Sites satellites → GSM-IP 3G/4G → **Double transmission simultanée redondante** vers le frontal Secteur ET le frontal régional DR9 Tanger → Postes de contrôle. Clic sur chaque nœud pour afficher sa fiche technique.
   - **Catalogue d’équipements & Comparateur** : Comparateur face-à-face Datalogger autonome sur pile (IP68, ≥ 5 ans) vs Datalogger secteur (IP65, 24 VDC secouru 2x12V 12Ah), capteurs de pression 0-16 / 0-25 bar (inox, ±0,5%, IP68), têtes émettrices d'impulsions, convertisseurs numériques Modbus RS485, modules MAG 8000, turbidimètre 0-10 NTU sans pompe (±2%, IP65), analyseur de chlore libre 0-2 mg/l.
   - **Postes de contrôle** : Dotation des 5 sites (PC supervision i7, TV 65" 4K 16/7, onduleur On-Line 4h, imprimante laser A3/A4, clim Inverter 12 000 BTU/h, PC portable diagnostic, mobilier, MDM).
   - **Configurateur de poste de comptage** : Générateur de nomenclature sur mesure selon les caractéristiques du site.
   - **Cybersécurité & Souveraineté** : TLS 1.3, MQTT sur TLS, OPC UA X.509, 2FA, Loi 09-08, DGSSI, 100% On-Premise sans Cloud.
7. **Formation & Transfert de Compétences** : Modules Exploitation (2 jours) et Maintenance (2 jours) pour 15 agents ONEE. **Mini-quiz interactif de 10 questions** réelles avec notation sur 100, contrôle du seuil d'admissibilité (≥ 75/100) et explications avec citations d'articles.
8. **Partie III – Marché de Maintenance (5 ans)** : Maintenance préventive (campagne de 10 semaines : 8 terrain + 2 rapports), maintenance curative (arrivée sur site ≤ 48h, réparation ≤ 6 jours calendaires), simulateur de pénalités (préventif 3%/j, curatif 2%/h réponse et réparation) avec jauge du plafond de 10% (474 999,60 DH TTC).
9. **Partie IV – Environnement, Social & HSE** : PGES, sauvegardes BAD, vitesse de chantier 20 km/h, bâchage des camions, EPI. **Procédure amiante-ciment interactive pas-à-pas** : interdiction absolue de découpe à sec, arrosage permanent, outillage autorisé/prohibé (zéro disqueuse), pack EPI complet (Type 5/6, masque FFP3, gants latex, lunettes étanches), conditionnement étanche « Danger Amiante » vers décharge agréée. Checklist HSE de chantier cochable.
10. **Partie V – Bordereau des Prix (BPDE)** : Tableau interactif des 26 prix travaux (4 composants) et des 9 prix de maintenance (M1 à M9). Saisie libre des quantités et prix unitaires HT, calculs automatiques HT, TVA 20%, TTC, écart vs budget officiel de 12 000 000 DH TTC, graphique de ventilation par composant et export CSV / Excel complet.
11. **Matrice de Suivi de Conformité** : Tableau de bord de pilotage des exigences contractuelles (Administratif, Financier, Technique, HSE, Réception, Maintenance) avec statut (Conforme, En cours, À faire), responsable et commentaires modifiables. Filtres multicritères et export CSV.
12. **Glossaire & FAQ Contractuelle** : Dictionnaire de 24 termes et acronymes (CPS, CCAFP, CCTP, DOE, OS, BPDE, MDM, PGES, BAD, PDRAP, SRM, TOR, Modbus RTU, OPC UA, NTU, IP68, IP65, 2FA, TLS 1.3, On-Premise, MAG 8000...) et réponses aux questions juridiques fréquentes.

---

## 🛠️ Stack Technique

* **Framework** : React 18 + TypeScript + Vite
* **Design & Styles** : Tailwind CSS avec palette institutionnelle ONEE (bleu eau, émeraude, ardoise)
* **Composants d'icônes** : Lucide React
* **Visualisation graphique** : Recharts (graphiques en barres horizontales, jauges de plafond)
* **Persistance locale** : LocalStorage (mémorisation de l'état des checklists, des prix saisis, des favoris et du thème)
* **Architecture** : 100% statique (zéro serveur ou backend requis), compatible GitHub Pages
* **Accessibilité & Responsive** : Conforme WCAG, navigation clavier, mode clair et mode sombre natifs

---

## 💻 Installation & Démarrage en Local

### Prérequis
* Node.js v18+ ou v20+ ou v22+
* npm v9+

### Commandes

```bash
# 1. Cloner le dépôt
git clone https://github.com/VOTRE_COMPTE/onee-dr9-telereleve.git
cd onee-dr9-telereleve

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement local
npm run dev

# 4. Ouvrir l'application dans votre navigateur
# http://localhost:5173
```

### Build de Production & Tests
```bash
# Vérification TypeScript et build statique
npm run build

# Prévisualisation du bundle statique
npm run preview

# Lancer la suite de tests automatisés (calculateurs & intégrité)
npx tsx scripts/test-calculators.ts
```

---

## 🌐 Déploiement Automatique sur GitHub Pages

Le déploiement est entièrement automatisé via GitHub Actions :
* Workflow : `.github/workflows/deploy.yml`
* Déclencheur : Chaque `push` sur la branche `main`
* Configuration Vite : `base: './'` assurant la portabilité sur tous sous-domaines et chemins de dépôt.

---

## 📄 Licence

Ce projet est sous licence MIT — voir le fichier [LICENSE](./LICENSE) pour plus de détails.
Consultez également le fichier [COUVERTURE.md](./COUVERTURE.md) pour la matrice d'exhaustivité réglementaire.
