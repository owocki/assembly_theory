const fs = require('fs');
const path = require('path');

// Read README.md
const readmePath = path.join(__dirname, '../README.md');
let content = fs.readFileSync(readmePath, 'utf8');

// Define comprehensive mappings for all broken links
const linkMappings = {
    // Technological late age items that are missing
    'domains/technological/weapons/atlatl.md': 'domains/technological/early_human_technology/atlatl.md',
    'domains/technological/crafts/basket.md': 'domains/technological/early_human_technology/basket_weaving.md',
    'domains/technological/weapons/bow_arrow.md': 'domains/technological/early_human_technology/bow_and_arrow.md',
    'domains/technological/machines/inclined_plane.md': 'domains/technological/early_human_technology/inclined_plane.md',
    'domains/technological/machines/lever.md': 'domains/technological/early_human_technology/lever.md',
    'domains/technological/machines/pulley.md': 'domains/technological/middle_age_technology/pulley.md',
    'domains/technological/machines/water_wheel.md': 'domains/technological/middle_age_technology/water_wheel.md',
    'domains/technological/machines/windmill.md': 'domains/technological/middle_age_technology/windmill.md',
    'domains/technological/industry/furnace.md': 'domains/technological/middle_age_technology/metallurgy.md',
    'domains/technological/instruments/clock.md': 'domains/technological/middle_age_technology/mechanical_clock.md',
    'domains/technological/information/printing_press.md': 'domains/technological/middle_age_technology/printing_press.md',
    'domains/technological/transport/sailing_ship.md': 'domains/technological/middle_age_technology/sailing_ship.md',
    'domains/technological/infrastructure/aqueduct.md': 'domains/technological/middle_age_technology/aqueduct_system.md',
    'domains/technological/architecture/castle.md': 'domains/technological/middle_age_technology/castle.md',
    'domains/technological/architecture/cathedral.md': 'domains/technological/middle_age_technology/cathedral.md',
    'domains/technological/transport/steam_locomotive.md': 'domains/technological/late_age_technology/steam_locomotive.md',
    'domains/technological/media/photography.md': 'domains/technological/late_age_technology/photography.md',
    'domains/technological/communication/telegraph.md': 'domains/technological/tools/telegraph.md',
    'domains/technological/communication/radio.md': 'domains/technological/late_age_technology/radio_broadcasting.md',
    'domains/technological/engines/internal_combustion.md': 'domains/technological/late_age_technology/internal_combustion_engine.md',
    'domains/technological/manufacturing/assembly_line.md': 'domains/technological/late_age_technology/assembly_line.md',
    'domains/technological/infrastructure/power_grid.md': 'domains/technological/late_age_technology/electric_power_grid.md',
    'domains/technological/economic/financial_system.md': 'domains/technological/late_age_technology/global_financial_system.md',
    'domains/technological/logistics/supply_chain.md': 'domains/technological/late_age_technology/supply_chain_network.md',
    'domains/technological/transport/network.md': 'domains/technological/late_age_technology/transportation_network.md',
    'domains/technological/urban/smart_city.md': 'domains/technological/late_age_technology/smart_city.md',
    'domains/technological/medical/healthcare.md': 'domains/technological/late_age_technology/healthcare_system.md',
    'domains/technological/economic/trade.md': 'domains/cognitive/economic_systems/trade.md',
    'domains/technological/navigation/gps.md': 'domains/technological/late_age_technology/gps_system.md',
    'domains/technological/space/satellites.md': 'domains/technological/late_age_technology/satellite_constellation.md',
    'domains/technological/computing/cloud.md': 'domains/technological/late_age_technology/cloud_computing.md',
    'domains/technological/social/social_media.md': 'domains/technological/late_age_technology/social_media.md',
    'domains/technological/data/database.md': 'domains/technological/late_age_technology/database_system.md',
    'domains/technological/information/search.md': 'domains/technological/late_age_technology/search_engine.md',
    'domains/technological/software/operating_system.md': 'domains/technological/late_age_technology/operating_system.md',
    'domains/technological/distributed/blockchain.md': 'domains/technological/late_age_technology/blockchain.md',
    'domains/technological/transport/autonomous.md': 'domains/technological/late_age_technology/autonomous_vehicle.md',
    'domains/technological/quantum/computer.md': 'domains/technological/late_age_technology/quantum_computer.md',
    'domains/technological/networks/ai.md': 'domains/technological/late_age_technology/ai_system.md',
    
    // Biological multicellular fixes
    'domains/biological/multicellular/sponge.md': 'domains/biological/multicellular/sponges/basic_sponge.md',
    'domains/biological/multicellular/insect.md': 'domains/biological/multicellular/animals/invertebrates/insect.md',
    
    // Cognitive fixes
    'domains/cognitive/institutions/legal.md': 'domains/cognitive/institutions/legal_system.md',
    'domains/cognitive/institutions/science.md': 'domains/cognitive/institutions/scientific_method.md',
    'domains/cognitive/media/mass_media.md': 'domains/cognitive/culture/mass_media.md',
    'domains/cognitive/navigation/echolocation.md': 'domains/cognitive/communication/echolocation.md',
    'domains/cognitive/social/primate_cognition.md': 'domains/cognitive/neural_networks/primate_brain.md',
    'domains/cognitive/social/pack_hierarchy.md': 'domains/cognitive/culture/wolf_pack_hierarchy.md',
    'domains/cognitive/collective/ant_colony.md': 'domains/cognitive/communication/ant_pheromones.md',
    
    // Hybrid fixes
    'domains/hybrid/medical/gene_therapy.md': 'domains/technological/late_age_technology/gene_therapy.md',
    'domains/hybrid/biotechnology/synthetic_biology.md': 'domains/technological/late_age_technology/synthetic_biology.md',
    'domains/hybrid/neural/brain_computer.md': 'domains/technological/late_age_technology/brain_computer_interface.md',
    
    // Materials that don't exist - remove these lines entirely
    'domains/technological/materials/pigments.md': null,
    'domains/technological/materials/ceramic.md': null,
    
    // Biological systems/structures that don't exist yet
    'domains/biological/proteins/ferredoxin.md': null,
    'domains/biological/proteins/cytochrome_c.md': null,
    'domains/biological/proteins/actin.md': null,
    'domains/biological/proteins/tubulin.md': null,
    'domains/biological/proteins/histone.md': null,
    'domains/biological/proteins/keratin.md': null,
    'domains/biological/proteins/myosin.md': null,
    'domains/biological/proteins/collagen.md': null,
    'domains/biological/proteins/ion_channel.md': null,
    'domains/biological/proteins/chaperone.md': null,
    'domains/biological/proteins/receptor.md': null,
    'domains/biological/proteins/antibody.md': null,
    'domains/biological/cofactors/heme.md': null,
    'domains/biological/cofactors/nadh.md': null,
    'domains/biological/cofactors/coenzyme_a.md': null,
    'domains/biological/polymers/cellulose.md': null,
    'domains/biological/polymers/peptidoglycan.md': null,
    'domains/biological/polymers/chitin.md': null,
    'domains/biological/polymers/lignin.md': null,
    'domains/biological/hormones/insulin.md': null,
    'domains/biological/membranes/complex_bilayer.md': null,
    'domains/biological/enzymes/atp_synthase.md': null,
    'domains/biological/enzymes/restriction.md': null,
    'domains/biological/enzymes/topoisomerase.md': null,
    'domains/biological/enzymes/helicase.md': null,
    'domains/biological/enzymes/rna_polymerase.md': null,
    'domains/biological/enzymes/complex.md': null,
    'domains/biological/structures/archaea_wall.md': null,
    'domains/biological/structures/spore.md': null,
    'domains/biological/structures/nuclear_envelope.md': null,
    'domains/biological/structures/nuclear_pore.md': null,
    'domains/biological/structures/cytoskeleton.md': null,
    'domains/biological/structures/spindle.md': null,
    'domains/biological/structures/mollusk_shell.md': null,
    'domains/biological/structures/spine.md': null,
    'domains/biological/organelles/centriole.md': null,
    'domains/biological/organelles/vacuole.md': null,
    'domains/biological/organelles/peroxisome.md': null,
    'domains/biological/organelles/lysosome.md': null,
    'domains/biological/organelles/golgi.md': null,
    'domains/biological/organelles/er.md': null,
    'domains/biological/complexes/ribosome_assembly.md': null,
    'domains/biological/complexes/proteasome.md': null,
    'domains/biological/complexes/dna_repair.md': null,
    'domains/biological/complexes/spliceosome.md': null,
    'domains/biological/pumps/chemiosmotic.md': null,
    'domains/biological/rna/trna_complex.md': null,
    'domains/biological/rna/mrna.md': null,
    'domains/biological/rna/rrna.md': null,
    'domains/biological/genetics/plasmid.md': null,
    'domains/biological/genetics/bacterial_chromosome.md': null,
    'domains/biological/motors/flagellar.md': null,
    'domains/biological/immunity/crispr.md': 'domains/technological/late_age_technology/crispr.md',
    'domains/biological/immunity/complex_immune.md': null,
    'domains/biological/communities/biofilm.md': null,
    'domains/biological/nervous_systems/cnidarian.md': null,
    'domains/biological/nervous_systems/flatworm.md': null,
    'domains/biological/sensory/compound_eye.md': null,
    'domains/biological/systems/water_vascular.md': null,
    'domains/biological/systems/excretory.md': null,
    'domains/biological/systems/vascular.md': null,
    'domains/biological/systems/respiratory.md': null,
    'domains/biological/systems/skeletal.md': null,
    'domains/biological/systems/digestive.md': null,
    'domains/biological/systems/photosynthetic.md': null,
    'domains/biological/systems/endocrine.md': null,
    'domains/biological/systems/circulatory.md': null,
    'domains/biological/systems/reproductive.md': null,
    'domains/biological/systems/immune.md': null,
    'domains/biological/systems/muscular.md': null,
    'domains/biological/reproduction/seed_dispersal.md': null,
    'domains/biological/reproduction/flower.md': null,
    'domains/biological/reproduction/placenta.md': null,
    'domains/biological/symbiosis/mycorrhizal.md': null,
    'domains/biological/physiology/endothermic.md': null,
    'domains/biological/locomotion/avian_flight.md': null,
    'domains/biological/locomotion/bipedalism.md': null,
    'domains/biological/navigation/migration.md': null,
    'domains/biological/ecology/forest_succession.md': null,
    'domains/biological/ecology/food_web.md': null,
    
    // Geological fixes
    'domains/geological/minerals/pyrite.md': null,
    'domains/geological/minerals/calcite.md': null,
    'domains/geological/minerals/olivine.md': null,
    'domains/geological/minerals/gypsum.md': null,
    'domains/geological/minerals/magnetite.md': null,
    'domains/geological/minerals/pyroxene.md': null,
    'domains/geological/minerals/mica.md': null,
    'domains/geological/minerals/garnet.md': null,
    'domains/geological/minerals/amphibole.md': null,
    'domains/geological/minerals/zeolite.md': null,
    'domains/geological/minerals/complex_clay.md': null,
    'domains/geological/minerals/metamorphic.md': null,
    'domains/geological/rocks/sedimentary.md': null,
    'domains/geological/processes/rock_cycle.md': null,
    'domains/geological/systems/climate.md': null,
    
    // Cosmic molecules that don't exist
    'domains/cosmic/molecules/hydrogen_sulfide.md': null,
    'domains/cosmic/molecules/oxygen_gas.md': null,
    'domains/cosmic/molecules/carbon_monoxide.md': null,
    'domains/cosmic/molecules/nitrogen_gas.md': null,
    'domains/cosmic/molecules/acetylene.md': null,
    'domains/cosmic/molecules/ethane.md': null,
    'domains/cosmic/molecules/formaldehyde.md': null,
    'domains/cosmic/molecules/methanol.md': null,
    'domains/cosmic/molecules/acetone.md': null,
};

// Function to remove table rows containing null mappings
function removeNullMappingRows(content, mapping) {
    for (const [oldPath, newPath] of Object.entries(mapping)) {
        if (newPath === null) {
            // Find and remove the entire table row containing this link
            const regex = new RegExp(`\\|[^|]*\\[[^\\]]+\\]\\(https://github\\.com/owocki/assembly_theory/tree/master/${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)[^|]*\\|[^|]*\\|[^|]*\\|[^|]*\\|[^|\\n]*\\|\\n`, 'g');
            content = content.replace(regex, '');
        }
    }
    return content;
}

// First remove rows with null mappings
content = removeNullMappingRows(content, linkMappings);

// Then fix the remaining links
let fixCount = 0;
for (const [oldPath, newPath] of Object.entries(linkMappings)) {
    if (newPath !== null) {
        const oldLink = `https://github.com/owocki/assembly_theory/tree/master/${oldPath}`;
        const newLink = `https://github.com/owocki/assembly_theory/tree/master/${newPath}`;
        
        const regex = new RegExp(oldLink.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const replacements = content.match(regex);
        if (replacements) {
            content = content.replace(regex, newLink);
            fixCount += replacements.length;
        }
    }
}

console.log(`Fixed ${fixCount} links`);
console.log(`Removed entries for links that don't have corresponding files`);

// Write back
fs.writeFileSync(readmePath, content);
console.log('README.md updated successfully!');