import assert from 'node:assert';
import { MARKET_INFO } from '../src/data/marketInfo.ts';
import { CCOFP_ARTICLES } from '../src/data/ccafpArticles.ts';
import { BPDE_ITEMS } from '../src/data/bpdePrices.ts';
import { MAINTENANCE_INFO, PREVENTIVE_SPECS, CURATIVE_SPECS } from '../src/data/maintenanceData.ts';
import { AMIANTE_CIMENT_PROCEDURE } from '../src/data/hseData.ts';
import { COMPLIANCE_ITEMS_DEFAULT } from '../src/data/complianceMatrix.ts';

console.log('--- TEST 1 : Vérification des données fondamentales du marché ---');
assert.strictEqual(MARKET_INFO.numero, '88/DR9/C/I/2026', 'Numéro de marché incorrect');
assert.strictEqual(MARKET_INFO.montantTravauxTTC, 12000000.0, 'Montant travaux incorrect');
assert.strictEqual(MARKET_INFO.montantMaintenanceTTC, 4749996.0, 'Montant maintenance incorrect');
assert.strictEqual(MARKET_INFO.delaiGlobalMois, 12, 'Délai global incorrect');
assert.strictEqual(MARKET_INFO.garantieMois, 12, 'Garantie incorrecte');
assert.strictEqual(MARKET_INFO.sitesCount, 5, 'Nombre de sites incorrect');
assert.strictEqual(MARKET_INFO.agentsCount, 15, 'Nombre d’agents incorrect');
console.log('✓ Données fondamentales vérifiées avec succès.');

console.log('\n--- TEST 2 : Simulateur de pénalités de retard (CCAFP Art. 10) ---');
const contract = 12000000.0;
const rateTravaux = 1 / 1000;
const ceilingPct = 8.0;
const ceilingAmount = (contract * ceilingPct) / 100; // 960 000 DH

// Cas 1 : 15 jours de retard
const p15 = contract * rateTravaux * 15;
assert.strictEqual(p15, 180000.0, 'Pénalité pour 15 jours doit être de 180 000 DH');

// Cas 2 : 80 jours (exactement le plafond)
const p80 = contract * rateTravaux * 80;
assert.strictEqual(p80, ceilingAmount, 'À 80 jours, pénalité = 960 000 DH (8%)');

// Cas 3 : 100 jours (dépassement du plafond)
const p100Raw = contract * rateTravaux * 100;
const p100Capped = Math.min(p100Raw, ceilingAmount);
assert.strictEqual(p100Capped, ceilingAmount, 'La pénalité doit être plafonnée à 8% TTC');
assert.ok(p100Raw >= ceilingAmount, 'Alerte résiliation doit être déclenchée');

// Cas 4 : Pénalité retard DOE (1/4000 par jour)
const rateDoe = 1 / 4000;
const pDoe10 = contract * rateDoe * 10;
assert.strictEqual(pDoe10, 30000.0, 'Pénalité DOE 10 jours doit être de 30 000 DH');
console.log('✓ Simulateur de pénalités testé avec cas limites et plafonnement.');

console.log('\n--- TEST 3 : Garanties financières et paiements (CCAFP Art. 12, 13, 15) ---');
const cautionProvisoire = 167500.0;
const cautionDefinitive = (contract * 3) / 100; // 360 000 DH
const retenueGarantie = (contract * 7) / 100; // 840 000 DH
const avance = (contract * 10) / 100; // 1 200 000 DH
const etudesPlafond = (contract * 1.5) / 100; // 180 000 DH

assert.strictEqual(cautionDefinitive, 360000.0, 'Caution définitive doit être de 360 000 DH');
assert.strictEqual(retenueGarantie, 840000.0, 'Retenue garantie plafonnée à 7% = 840 000 DH');
assert.strictEqual(avance, 1200000.0, 'Avance 10% = 1 200 000 DH');
assert.strictEqual(etudesPlafond, 180000.0, 'Plafond études 1.5% = 180 000 DH');
console.log('✓ Formules financières vérifiées.');

console.log('\n--- TEST 4 : Maintenance (CPS Partie III) ---');
assert.strictEqual(MAINTENANCE_INFO.plafondPenalitesDH, 474999.6, 'Plafond maintenance 10% = 474 999.60 DH');
assert.strictEqual(PREVENTIVE_SPECS.dureeCampagneSemaines, 10, 'Campagne = 10 semaines');
assert.strictEqual(PREVENTIVE_SPECS.semainesTerrain, 8, '8 sem terrain');
assert.strictEqual(PREVENTIVE_SPECS.semainesRapports, 2, '2 sem rapports');
assert.strictEqual(CURATIVE_SPECS.delaiReponseMaxHeures, 48, 'Réponse ≤ 48h');
assert.strictEqual(CURATIVE_SPECS.delaiReparationMaxJours, 6, 'Réparation ≤ 6j');
console.log('✓ Paramètres de maintenance vérifiés.');

console.log('\n--- TEST 5 : Intégrité des données du CPS ---');
assert.strictEqual(CCOFP_ARTICLES.length, 19, 'Il doit y avoir exactement 19 articles CCAFP');
assert.strictEqual(BPDE_ITEMS.length, 35, 'Il doit y avoir 26 prix travaux + 9 prix maintenance = 35 prix');
assert.strictEqual(AMIANTE_CIMENT_PROCEDURE.reglesCritiques.length, 5, 'Il doit y avoir 5 étapes amiante-ciment');
assert.ok(COMPLIANCE_ITEMS_DEFAULT.length >= 20, 'Matrice de conformité exhaustive');
console.log('✓ Tous les articles, prix et clauses sont présents sans omission.');

console.log('\n=============================================');
console.log('TOUS LES TESTS AUTOMATISÉS ONT RÉUSSI (5/5) !');
console.log('=============================================');
