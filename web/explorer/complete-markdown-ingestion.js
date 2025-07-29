class CompleteMarkdownIngestion {
    constructor() {
        this.domainColors = {
            cosmic: '#0066CC',
            geological: '#8B4513',
            biological: '#228B22',
            cognitive: '#FFD700',
            technological: '#DC143C',
            hybrid: '#9932CC'
        };
        
        // Complete list of all markdown files in the repository
        this.markdownFiles = [
            // Cosmic domain - 128 files
            '/domains/cosmic/PATHWAYS.md',
            '/domains/cosmic/atoms/carbon.md',
            '/domains/cosmic/atoms/deuterium.md',
            '/domains/cosmic/atoms/helium.md',
            '/domains/cosmic/atoms/hydrogen.md',
            '/domains/cosmic/atoms/lithium.md',
            '/domains/cosmic/atoms/nitrogen.md',
            '/domains/cosmic/atoms/oxygen.md',
            '/domains/cosmic/atoms/tritium.md',
            '/domains/cosmic/elements/actinium.md',
            '/domains/cosmic/elements/aluminum.md',
            '/domains/cosmic/elements/americium.md',
            '/domains/cosmic/elements/antimony.md',
            '/domains/cosmic/elements/argon.md',
            '/domains/cosmic/elements/arsenic.md',
            '/domains/cosmic/elements/astatine.md',
            '/domains/cosmic/elements/barium.md',
            '/domains/cosmic/elements/berkelium.md',
            '/domains/cosmic/elements/beryllium.md',
            '/domains/cosmic/elements/bismuth.md',
            '/domains/cosmic/elements/boron.md',
            '/domains/cosmic/elements/bromine.md',
            '/domains/cosmic/elements/cadmium.md',
            '/domains/cosmic/elements/calcium.md',
            '/domains/cosmic/elements/californium.md',
            '/domains/cosmic/elements/carbon.md',
            '/domains/cosmic/elements/cerium.md',
            '/domains/cosmic/elements/cesium.md',
            '/domains/cosmic/elements/chlorine.md',
            '/domains/cosmic/elements/chromium.md',
            '/domains/cosmic/elements/cobalt.md',
            '/domains/cosmic/elements/copper.md',
            '/domains/cosmic/elements/curium.md',
            '/domains/cosmic/elements/dysprosium.md',
            '/domains/cosmic/elements/einsteinium.md',
            '/domains/cosmic/elements/erbium.md',
            '/domains/cosmic/elements/europium.md',
            '/domains/cosmic/elements/fermium.md',
            '/domains/cosmic/elements/fluorine.md',
            '/domains/cosmic/elements/francium.md',
            '/domains/cosmic/elements/gadolinium.md',
            '/domains/cosmic/elements/gallium.md',
            '/domains/cosmic/elements/germanium.md',
            '/domains/cosmic/elements/gold.md',
            '/domains/cosmic/elements/hafnium.md',
            '/domains/cosmic/elements/helium.md',
            '/domains/cosmic/elements/holmium.md',
            '/domains/cosmic/elements/hydrogen.md',
            '/domains/cosmic/elements/indium.md',
            '/domains/cosmic/elements/iodine.md',
            '/domains/cosmic/elements/iridium.md',
            '/domains/cosmic/elements/iron.md',
            '/domains/cosmic/elements/krypton.md',
            '/domains/cosmic/elements/lanthanum.md',
            '/domains/cosmic/elements/lead.md',
            '/domains/cosmic/elements/lithium.md',
            '/domains/cosmic/elements/lutetium.md',
            '/domains/cosmic/elements/magnesium.md',
            '/domains/cosmic/elements/manganese.md',
            '/domains/cosmic/elements/mercury.md',
            '/domains/cosmic/elements/molybdenum.md',
            '/domains/cosmic/elements/neodymium.md',
            '/domains/cosmic/elements/neon.md',
            '/domains/cosmic/elements/neptunium.md',
            '/domains/cosmic/elements/nickel.md',
            '/domains/cosmic/elements/niobium.md',
            '/domains/cosmic/elements/nitrogen.md',
            '/domains/cosmic/elements/osmium.md',
            '/domains/cosmic/elements/oxygen.md',
            '/domains/cosmic/elements/palladium.md',
            '/domains/cosmic/elements/phosphorus.md',
            '/domains/cosmic/elements/platinum.md',
            '/domains/cosmic/elements/plutonium.md',
            '/domains/cosmic/elements/polonium.md',
            '/domains/cosmic/elements/potassium.md',
            '/domains/cosmic/elements/praseodymium.md',
            '/domains/cosmic/elements/promethium.md',
            '/domains/cosmic/elements/protactinium.md',
            '/domains/cosmic/elements/radium.md',
            '/domains/cosmic/elements/radon.md',
            '/domains/cosmic/elements/rhenium.md',
            '/domains/cosmic/elements/rhodium.md',
            '/domains/cosmic/elements/rubidium.md',
            '/domains/cosmic/elements/ruthenium.md',
            '/domains/cosmic/elements/samarium.md',
            '/domains/cosmic/elements/scandium.md',
            '/domains/cosmic/elements/selenium.md',
            '/domains/cosmic/elements/silicon.md',
            '/domains/cosmic/elements/silver.md',
            '/domains/cosmic/elements/sodium.md',
            '/domains/cosmic/elements/strontium.md',
            '/domains/cosmic/elements/sulfur.md',
            '/domains/cosmic/elements/tantalum.md',
            '/domains/cosmic/elements/technetium.md',
            '/domains/cosmic/elements/tellurium.md',
            '/domains/cosmic/elements/terbium.md',
            '/domains/cosmic/elements/thallium.md',
            '/domains/cosmic/elements/thorium.md',
            '/domains/cosmic/elements/thulium.md',
            '/domains/cosmic/elements/tin.md',
            '/domains/cosmic/elements/titanium.md',
            '/domains/cosmic/elements/tungsten.md',
            '/domains/cosmic/elements/uranium.md',
            '/domains/cosmic/elements/vanadium.md',
            '/domains/cosmic/elements/xenon.md',
            '/domains/cosmic/elements/ytterbium.md',
            '/domains/cosmic/elements/yttrium.md',
            '/domains/cosmic/elements/zinc.md',
            '/domains/cosmic/elements/zirconium.md',
            '/domains/cosmic/forces/strong_nuclear.md',
            '/domains/cosmic/forces/weak_nuclear.md',
            '/domains/cosmic/galaxies/milky_way.md',
            '/domains/cosmic/ions/hydronium.md',
            '/domains/cosmic/ions/hydroxide.md',
            '/domains/cosmic/molecules/ammonia.md',
            '/domains/cosmic/molecules/co2.md',
            '/domains/cosmic/molecules/hydrogen_gas.md',
            '/domains/cosmic/molecules/methane.md',
            '/domains/cosmic/molecules/water.md',
            '/domains/cosmic/particles/electron.md',
            '/domains/cosmic/particles/muon.md',
            '/domains/cosmic/particles/neutrino.md',
            '/domains/cosmic/particles/neutron.md',
            '/domains/cosmic/particles/photon.md',
            '/domains/cosmic/particles/proton.md',
            '/domains/cosmic/particles/quark.md',
            '/domains/cosmic/quantum_fields/electromagnetic_field.md',
            '/domains/cosmic/stars/main_sequence.md',
            
            // Geological domain - 76 files
            '/domains/geological/PATHWAYS.md',
            '/domains/geological/compounds/silica_unit.md',
            '/domains/geological/formations/alluvial_deposit.md',
            '/domains/geological/formations/banded_iron_formation.md',
            '/domains/geological/formations/coal.md',
            '/domains/geological/formations/epithermal_deposit.md',
            '/domains/geological/formations/karst.md',
            '/domains/geological/formations/kimberlite.md',
            '/domains/geological/formations/limestone.md',
            '/domains/geological/formations/ophiolite.md',
            '/domains/geological/formations/pegmatite.md',
            '/domains/geological/formations/porphyry_deposit.md',
            '/domains/geological/formations/reef.md',
            '/domains/geological/formations/sandstone.md',
            '/domains/geological/formations/shale.md',
            '/domains/geological/formations/skarn.md',
            '/domains/geological/minerals/actinolite.md',
            '/domains/geological/minerals/andalusite.md',
            '/domains/geological/minerals/beryl.md',
            '/domains/geological/minerals/carbonates/dolomite.md',
            '/domains/geological/minerals/carbonates/siderite.md',
            '/domains/geological/minerals/cassiterite.md',
            '/domains/geological/minerals/chlorite.md',
            '/domains/geological/minerals/chromite.md',
            '/domains/geological/minerals/clay.md',
            '/domains/geological/minerals/cordierite.md',
            '/domains/geological/minerals/diamond.md',
            '/domains/geological/minerals/diopside.md',
            '/domains/geological/minerals/epidote.md',
            '/domains/geological/minerals/graphite.md',
            '/domains/geological/minerals/halides/fluorite.md',
            '/domains/geological/minerals/halides/halite.md',
            '/domains/geological/minerals/halides/sylvite.md',
            '/domains/geological/minerals/hornblende.md',
            '/domains/geological/minerals/iron_oxide.md',
            '/domains/geological/minerals/k_feldspar.md',
            '/domains/geological/minerals/kyanite.md',
            '/domains/geological/minerals/oxides/corundum.md',
            '/domains/geological/minerals/oxides/hematite.md',
            '/domains/geological/minerals/phosphates/apatite.md',
            '/domains/geological/minerals/plagioclase.md',
            '/domains/geological/minerals/quartz.md',
            '/domains/geological/minerals/rutile.md',
            '/domains/geological/minerals/salt.md',
            '/domains/geological/minerals/scheelite.md',
            '/domains/geological/minerals/serpentine.md',
            '/domains/geological/minerals/sillimanite.md',
            '/domains/geological/minerals/spinel.md',
            '/domains/geological/minerals/staurolite.md',
            '/domains/geological/minerals/sulfates/anhydrite.md',
            '/domains/geological/minerals/sulfates/barite.md',
            '/domains/geological/minerals/sulfides/bornite.md',
            '/domains/geological/minerals/sulfides/chalcopyrite.md',
            '/domains/geological/minerals/sulfides/galena.md',
            '/domains/geological/minerals/sulfides/molybdenite.md',
            '/domains/geological/minerals/sulfides/sphalerite.md',
            '/domains/geological/minerals/talc.md',
            '/domains/geological/minerals/topaz.md',
            '/domains/geological/minerals/tourmaline.md',
            '/domains/geological/minerals/tremolite.md',
            '/domains/geological/minerals/vesuvianite.md',
            '/domains/geological/minerals/wolframite.md',
            '/domains/geological/minerals/wollastonite.md',
            '/domains/geological/minerals/zircon.md',
            '/domains/geological/planetary_systems/earth_system.md',
            '/domains/geological/processes/erosion.md',
            '/domains/geological/processes/hydrothermal_alteration.md',
            '/domains/geological/processes/plate_tectonics.md',
            '/domains/geological/processes/volcanism.md',
            '/domains/geological/processes/weathering.md',
            '/domains/geological/rocks/basalt.md',
            '/domains/geological/rocks/gabbro.md',
            '/domains/geological/rocks/gneiss.md',
            '/domains/geological/rocks/granite.md',
            '/domains/geological/rocks/obsidian.md',
            '/domains/geological/rocks/schist.md',
            
            // Biological domain - 18 files
            '/domains/biological/PATHWAYS.md',
            '/domains/biological/amino_acids/glycine.md',
            '/domains/biological/ecosystems/coral_reef.md',
            '/domains/biological/eukaryotic/chloroplast.md',
            '/domains/biological/eukaryotic/mitochondrion.md',
            '/domains/biological/modern/mrna_vaccine_platforms.md',
            '/domains/biological/multicellular/insect.md',
            '/domains/biological/prebiotic/amino_acids.md',
            '/domains/biological/prebiotic/membranes.md',
            '/domains/biological/prebiotic/nucleotides.md',
            '/domains/biological/prebiotic/peptides.md',
            '/domains/biological/prebiotic/sugars.md',
            '/domains/biological/prokaryotic/bacteria.md',
            '/domains/biological/prokaryotic/dna_polymerase.md',
            '/domains/biological/prokaryotic/photosystem.md',
            '/domains/biological/prokaryotic/ribosome.md',
            '/domains/biological/prokaryotic/trna.md',
            '/domains/biological/prokaryotic/virus.md',
            
            // Cognitive domain - 101 files
            '/domains/cognitive/PATHWAYS.md',
            '/domains/cognitive/basic_cognition/attention.md',
            '/domains/cognitive/basic_cognition/consciousness.md',
            '/domains/cognitive/belief_systems/worldview.md',
            '/domains/cognitive/collective_intelligence/complex_systems.md',
            '/domains/cognitive/collective_intelligence/emergence.md',
            '/domains/cognitive/collective_intelligence/network_effects.md',
            '/domains/cognitive/collective_intelligence/swarm_intelligence.md',
            '/domains/cognitive/communication/language_acquisition.md',
            '/domains/cognitive/communication/language_evolution.md',
            '/domains/cognitive/communication/nonverbal_communication.md',
            '/domains/cognitive/communication/symbolic_communication.md',
            '/domains/cognitive/competition/competition.md',
            '/domains/cognitive/consciousness/emergence.md',
            '/domains/cognitive/cooperation/altruism.md',
            '/domains/cognitive/cooperation/cooperative_behavior.md',
            '/domains/cognitive/cooperation/reciprocity.md',
            '/domains/cognitive/cultural_systems/cultural_transmission.md',
            '/domains/cognitive/cultural_systems/norm.md',
            '/domains/cognitive/cultural_systems/ritual.md',
            '/domains/cognitive/culture/cultural_evolution.md',
            '/domains/cognitive/decision_making/bounded_rationality.md',
            '/domains/cognitive/decision_making/cognitive_bias.md',
            '/domains/cognitive/decision_making/collective_decision.md',
            '/domains/cognitive/decision_making/heuristics.md',
            '/domains/cognitive/decision_making/rational_choice.md',
            '/domains/cognitive/decision_making/self_control.md',
            '/domains/cognitive/economic_systems/banking.md',
            '/domains/cognitive/economic_systems/capitalism.md',
            '/domains/cognitive/economic_systems/currency.md',
            '/domains/cognitive/economic_systems/economic_theory.md',
            '/domains/cognitive/economic_systems/market.md',
            '/domains/cognitive/economic_systems/market_economy.md',
            '/domains/cognitive/economic_systems/trade.md',
            '/domains/cognitive/emotions/compassion.md',
            '/domains/cognitive/emotions/emotional_intelligence.md',
            '/domains/cognitive/emotions/emotional_regulation.md',
            '/domains/cognitive/emotions/fear.md',
            '/domains/cognitive/emotions/gratitude.md',
            '/domains/cognitive/emotions/mental_health.md',
            '/domains/cognitive/emotions/moral_emotions.md',
            '/domains/cognitive/emotions/positive_emotion.md',
            '/domains/cognitive/emotions/psychological_wellbeing.md',
            '/domains/cognitive/governance/accountability.md',
            '/domains/cognitive/governance/authority.md',
            '/domains/cognitive/governance/democracy.md',
            '/domains/cognitive/governance/digital_democracy.md',
            '/domains/cognitive/governance/government.md',
            '/domains/cognitive/governance/justice.md',
            '/domains/cognitive/governance/open_government.md',
            '/domains/cognitive/governance/rule_of_law.md',
            '/domains/cognitive/governance/transparency.md',
            '/domains/cognitive/group_dynamics/social_influence.md',
            '/domains/cognitive/information_systems/knowledge_representation.md',
            '/domains/cognitive/information_systems/symbol_systems.md',
            '/domains/cognitive/information_systems/writing_system.md',
            '/domains/cognitive/institutions/bureaucracy.md',
            '/domains/cognitive/institutions/democracy.md',
            '/domains/cognitive/institutions/education_system.md',
            '/domains/cognitive/institutions/healthcare_system.md',
            '/domains/cognitive/institutions/legal_system.md',
            '/domains/cognitive/institutions/market_economy.md',
            '/domains/cognitive/institutions/marriage.md',
            '/domains/cognitive/institutions/military.md',
            '/domains/cognitive/institutions/money.md',
            '/domains/cognitive/institutions/property_rights.md',
            '/domains/cognitive/institutions/public_administration.md',
            '/domains/cognitive/institutions/religion.md',
            '/domains/cognitive/institutions/science.md',
            '/domains/cognitive/institutions/state.md',
            '/domains/cognitive/institutions/university.md',
            '/domains/cognitive/knowledge_systems/collective_knowledge.md',
            '/domains/cognitive/knowledge_systems/conceptual_knowledge.md',
            '/domains/cognitive/language/human_language.md',
            '/domains/cognitive/learning/associative_learning.md',
            '/domains/cognitive/learning/habit_formation.md',
            '/domains/cognitive/learning/imitation.md',
            '/domains/cognitive/learning/metacognition.md',
            '/domains/cognitive/learning/skill_acquisition.md',
            '/domains/cognitive/learning/social_learning.md',
            '/domains/cognitive/legal_systems/contract.md',
            '/domains/cognitive/legal_systems/judicial_system.md',
            '/domains/cognitive/legal_systems/property_law.md',
            '/domains/cognitive/memory/autobiographical_memory.md',
            '/domains/cognitive/memory/episodic_memory.md',
            '/domains/cognitive/memory/semantic_memory.md',
            '/domains/cognitive/memory/working_memory.md',
            '/domains/cognitive/neural_networks/human_brain.md',
            '/domains/cognitive/perception/object_recognition.md',
            '/domains/cognitive/perception/pattern_recognition.md',
            '/domains/cognitive/perception/sensory_integration.md',
            '/domains/cognitive/perception/visual_perception.md',
            '/domains/cognitive/perception/visual_processing.md',
            '/domains/cognitive/political_systems/constitution.md',
            '/domains/cognitive/political_systems/federalism.md',
            '/domains/cognitive/reasoning/abstract_thinking.md',
            '/domains/cognitive/reasoning/analogical_reasoning.md',
            '/domains/cognitive/reasoning/critical_thinking.md',
            '/domains/cognitive/reasoning/executive_function.md',
            '/domains/cognitive/reasoning/heuristics.md',
            '/domains/cognitive/reasoning/logical_reasoning.md',
            '/domains/cognitive/reasoning/moral_reasoning.md',
            '/domains/cognitive/social_cognition/empathy.md',
            '/domains/cognitive/social_cognition/fairness.md',
            '/domains/cognitive/social_cognition/leadership.md',
            '/domains/cognitive/social_cognition/stereotype.md',
            '/domains/cognitive/social_cognition/theory_of_mind.md',
            '/domains/cognitive/social_structures/kinship.md',
            '/domains/cognitive/social_structures/social_class.md',
            '/domains/cognitive/social_structures/social_control.md',
            '/domains/cognitive/social_structures/social_inequality.md',
            '/domains/cognitive/social_structures/social_network.md',
            '/domains/cognitive/social_structures/tribe.md',
            '/domains/cognitive/trust/interpersonal_trust.md',
            
            // Technological domain - 267 files
            '/domains/technological/PATHWAYS.md',
            '/domains/technological/computers/microprocessor.md',
            '/domains/technological/early_human_technology/adze.md',
            '/domains/technological/early_human_technology/antler_pick.md',
            '/domains/technological/early_human_technology/atlatl.md',
            '/domains/technological/early_human_technology/awl.md',
            '/domains/technological/early_human_technology/bark_cloth.md',
            '/domains/technological/early_human_technology/basket.md',
            '/domains/technological/early_human_technology/blowgun.md',
            '/domains/technological/early_human_technology/bola.md',
            '/domains/technological/early_human_technology/bone_awl.md',
            '/domains/technological/early_human_technology/bone_flute.md',
            '/domains/technological/early_human_technology/bone_harpoon.md',
            '/domains/technological/early_human_technology/bone_needle.md',
            '/domains/technological/early_human_technology/boomerang.md',
            '/domains/technological/early_human_technology/bow_and_arrow.md',
            '/domains/technological/early_human_technology/clay_vessel.md',
            '/domains/technological/early_human_technology/cordage.md',
            '/domains/technological/early_human_technology/digging_stick.md',
            '/domains/technological/early_human_technology/drill.md',
            '/domains/technological/early_human_technology/fire.md',
            '/domains/technological/early_human_technology/fire_drill.md',
            '/domains/technological/early_human_technology/fishhook.md',
            '/domains/technological/early_human_technology/fishing_net.md',
            '/domains/technological/early_human_technology/fishing_spear.md',
            '/domains/technological/early_human_technology/flint_blade.md',
            '/domains/technological/early_human_technology/flute.md',
            '/domains/technological/early_human_technology/grinding_stone.md',
            '/domains/technological/early_human_technology/hammer_stone.md',
            '/domains/technological/early_human_technology/hand_axe.md',
            '/domains/technological/early_human_technology/harpoon.md',
            '/domains/technological/early_human_technology/hide_scraper.md',
            '/domains/technological/early_human_technology/knife.md',
            '/domains/technological/early_human_technology/lance.md',
            '/domains/technological/early_human_technology/leather_pouch.md',
            '/domains/technological/early_human_technology/loom.md',
            '/domains/technological/early_human_technology/mallet.md',
            '/domains/technological/early_human_technology/mortar_pestle.md',
            '/domains/technological/early_human_technology/oar.md',
            '/domains/technological/early_human_technology/obsidian_knife.md',
            '/domains/technological/early_human_technology/oil_lamp.md',
            '/domains/technological/early_human_technology/plant_fiber_net.md',
            '/domains/technological/early_human_technology/pressure_flaker.md',
            '/domains/technological/early_human_technology/quern.md',
            '/domains/technological/early_human_technology/raft.md',
            '/domains/technological/early_human_technology/rope.md',
            '/domains/technological/early_human_technology/shell_scraper.md',
            '/domains/technological/early_human_technology/skin_tent.md',
            '/domains/technological/early_human_technology/sling.md',
            '/domains/technological/early_human_technology/snare.md',
            '/domains/technological/early_human_technology/spear.md',
            '/domains/technological/early_human_technology/stone_chisel.md',
            '/domains/technological/early_human_technology/stone_tools.md',
            '/domains/technological/early_human_technology/tanning_rack.md',
            '/domains/technological/early_human_technology/throwing_stick.md',
            '/domains/technological/early_human_technology/torch.md',
            '/domains/technological/early_human_technology/travois.md',
            '/domains/technological/early_human_technology/wooden_bowl.md',
            '/domains/technological/late_age_technology/3d_printer.md',
            '/domains/technological/late_age_technology/3d_scanner.md',
            '/domains/technological/late_age_technology/5g_network.md',
            '/domains/technological/late_age_technology/accelerometer.md',
            '/domains/technological/late_age_technology/air_conditioner.md',
            '/domains/technological/late_age_technology/artificial_heart.md',
            '/domains/technological/late_age_technology/augmented_reality.md',
            '/domains/technological/late_age_technology/autonomous_vehicle.md',
            '/domains/technological/late_age_technology/barometer.md',
            '/domains/technological/late_age_technology/battery_storage.md',
            '/domains/technological/late_age_technology/bioreactor.md',
            '/domains/technological/late_age_technology/blender.md',
            '/domains/technological/late_age_technology/blockchain.md',
            '/domains/technological/late_age_technology/carbon_nanotube.md',
            '/domains/technological/late_age_technology/chromatograph.md',
            '/domains/technological/late_age_technology/circuit_breaker.md',
            '/domains/technological/late_age_technology/cochlear_implant.md',
            '/domains/technological/late_age_technology/coffee_maker.md',
            '/domains/technological/late_age_technology/computer_vision.md',
            '/domains/technological/late_age_technology/computers/microprocessor.md',
            '/domains/technological/late_age_technology/crispr.md',
            '/domains/technological/late_age_technology/cryptocurrency.md',
            '/domains/technological/late_age_technology/ct_scanner.md',
            '/domains/technological/late_age_technology/deep_learning.md',
            '/domains/technological/late_age_technology/defibrillator.md',
            '/domains/technological/late_age_technology/desktop_computer.md',
            '/domains/technological/late_age_technology/dialysis_machine.md',
            '/domains/technological/late_age_technology/dishwasher.md',
            '/domains/technological/late_age_technology/drone.md',
            '/domains/technological/late_age_technology/edge_ai.md',
            '/domains/technological/late_age_technology/electric_car.md',
            '/domains/technological/late_age_technology/electric_motor.md',
            '/domains/technological/late_age_technology/electric_stove.md',
            '/domains/technological/late_age_technology/electron_microscope.md',
            '/domains/technological/late_age_technology/encoder.md',
            '/domains/technological/late_age_technology/facial_recognition.md',
            '/domains/technological/late_age_technology/fiber_optics.md',
            '/domains/technological/late_age_technology/flow_meter.md',
            '/domains/technological/late_age_technology/fluorescent_light.md',
            '/domains/technological/late_age_technology/food_processor.md',
            '/domains/technological/late_age_technology/fuel_cell.md',
            '/domains/technological/late_age_technology/fusion_reactor.md',
            '/domains/technological/late_age_technology/gene_sequencer.md',
            '/domains/technological/late_age_technology/gps.md',
            '/domains/technological/late_age_technology/graphene_transistor.md',
            '/domains/technological/late_age_technology/gyroscope.md',
            '/domains/technological/late_age_technology/haptic_feedback.md',
            '/domains/technological/late_age_technology/high_speed_rail.md',
            '/domains/technological/late_age_technology/humidity_sensor.md',
            '/domains/technological/late_age_technology/hybrid_vehicle.md',
            '/domains/technological/late_age_technology/incandescent_bulb.md',
            '/domains/technological/late_age_technology/instant_pot.md',
            '/domains/technological/late_age_technology/insulin_pump.md',
            '/domains/technological/late_age_technology/integrated_circuit.md',
            '/domains/technological/late_age_technology/internal_combustion_engine.md',
            '/domains/technological/late_age_technology/iot_sensor.md',
            '/domains/technological/late_age_technology/jet_engine.md',
            '/domains/technological/late_age_technology/laptop.md',
            '/domains/technological/late_age_technology/laser.md',
            '/domains/technological/late_age_technology/laser_surgery.md',
            '/domains/technological/late_age_technology/led_light.md',
            '/domains/technological/late_age_technology/lidar.md',
            '/domains/technological/late_age_technology/load_cell.md',
            '/domains/technological/late_age_technology/machines/steam_engine.md',
            '/domains/technological/late_age_technology/maglev_train.md',
            '/domains/technological/late_age_technology/magnetometer.md',
            '/domains/technological/late_age_technology/mainframe.md',
            '/domains/technological/late_age_technology/mass_spectrometer.md',
            '/domains/technological/late_age_technology/memristor.md',
            '/domains/technological/late_age_technology/metamaterial.md',
            '/domains/technological/late_age_technology/microwave_oven.md',
            '/domains/technological/late_age_technology/mixed_reality.md',
            '/domains/technological/late_age_technology/modern/README.md',
            '/domains/technological/late_age_technology/modern/ai_native_applications.md',
            '/domains/technological/late_age_technology/modern/amazon_fulfillment.md',
            '/domains/technological/late_age_technology/modern/defi_yield_farming.md',
            '/domains/technological/late_age_technology/modern/edge_computing.md',
            '/domains/technological/late_age_technology/modern/layer2_rollups.md',
            '/domains/technological/late_age_technology/modern/llm_token_systems.md',
            '/domains/technological/late_age_technology/modern/react_server_components.md',
            '/domains/technological/late_age_technology/modern/tesla_gigafactory.md',
            '/domains/technological/late_age_technology/modern/tsmc_semiconductor.md',
            '/domains/technological/late_age_technology/motion_capture.md',
            '/domains/technological/late_age_technology/mri_scanner.md',
            '/domains/technological/late_age_technology/multimeter.md',
            '/domains/technological/late_age_technology/natural_language_processing.md',
            '/domains/technological/late_age_technology/networks/ai.md',
            '/domains/technological/late_age_technology/networks/internet.md',
            '/domains/technological/late_age_technology/neural_network.md',
            '/domains/technological/late_age_technology/neuromorphic_chip.md',
            '/domains/technological/late_age_technology/nuclear_reactor.md',
            '/domains/technological/late_age_technology/oscilloscope.md',
            '/domains/technological/late_age_technology/pacemaker.md',
            '/domains/technological/late_age_technology/particle_accelerator.md',
            '/domains/technological/late_age_technology/pcr_machine.md',
            '/domains/technological/late_age_technology/photodiode.md',
            '/domains/technological/late_age_technology/photoelectric_sensor.md',
            '/domains/technological/late_age_technology/photonic_processor.md',
            '/domains/technological/late_age_technology/piezoelectric_sensor.md',
            '/domains/technological/late_age_technology/pressure_sensor.md',
            '/domains/technological/late_age_technology/prosthetic_limb.md',
            '/domains/technological/late_age_technology/proximity_sensor.md',
            '/domains/technological/late_age_technology/quantum_computer.md',
            '/domains/technological/late_age_technology/radar.md',
            '/domains/technological/late_age_technology/radio.md',
            '/domains/technological/late_age_technology/refrigerator.md',
            '/domains/technological/late_age_technology/reinforcement_learning.md',
            '/domains/technological/late_age_technology/resolver.md',
            '/domains/technological/late_age_technology/robot.md',
            '/domains/technological/late_age_technology/robotic_surgery.md',
            '/domains/technological/late_age_technology/rocket.md',
            '/domains/technological/late_age_technology/satellite.md',
            '/domains/technological/late_age_technology/semiconductor.md',
            '/domains/technological/late_age_technology/smart_contract.md',
            '/domains/technological/late_age_technology/smart_grid.md',
            '/domains/technological/late_age_technology/smartphone.md',
            '/domains/technological/late_age_technology/solar_cell.md',
            '/domains/technological/late_age_technology/solar_panel.md',
            '/domains/technological/late_age_technology/space_shuttle.md',
            '/domains/technological/late_age_technology/space_station.md',
            '/domains/technological/late_age_technology/spectrophotometer.md',
            '/domains/technological/late_age_technology/starlink.md',
            '/domains/technological/late_age_technology/steam_engine.md',
            '/domains/technological/late_age_technology/strain_gauge.md',
            '/domains/technological/late_age_technology/supercomputer.md',
            '/domains/technological/late_age_technology/superconductor.md',
            '/domains/technological/late_age_technology/synthetic_biology.md',
            '/domains/technological/late_age_technology/tablet.md',
            '/domains/technological/late_age_technology/telephone.md',
            '/domains/technological/late_age_technology/television.md',
            '/domains/technological/late_age_technology/thermoelectric_generator.md',
            '/domains/technological/late_age_technology/thermometer.md',
            '/domains/technological/late_age_technology/toaster.md',
            '/domains/technological/late_age_technology/torque_sensor.md',
            '/domains/technological/late_age_technology/transformer.md',
            '/domains/technological/late_age_technology/transistor.md',
            '/domains/technological/late_age_technology/turbine_generator.md',
            '/domains/technological/late_age_technology/ultrasound.md',
            '/domains/technological/late_age_technology/vacuum_cleaner.md',
            '/domains/technological/late_age_technology/ventilator.md',
            '/domains/technological/late_age_technology/virtual_reality.md',
            '/domains/technological/late_age_technology/voice_assistant.md',
            '/domains/technological/late_age_technology/washing_machine.md',
            '/domains/technological/late_age_technology/wind_turbine.md',
            '/domains/technological/late_age_technology/x_ray_machine.md',
            '/domains/technological/machines/steam_engine.md',
            '/domains/technological/middle_age_technology/alembic.md',
            '/domains/technological/middle_age_technology/aqueduct.md',
            '/domains/technological/middle_age_technology/arquebus.md',
            '/domains/technological/middle_age_technology/astrolabe.md',
            '/domains/technological/middle_age_technology/battering_ram.md',
            '/domains/technological/middle_age_technology/bellows.md',
            '/domains/technological/middle_age_technology/blast_furnace.md',
            '/domains/technological/middle_age_technology/cam_shaft.md',
            '/domains/technological/middle_age_technology/canal_lock.md',
            '/domains/technological/middle_age_technology/cannon.md',
            '/domains/technological/middle_age_technology/catapult.md',
            '/domains/technological/middle_age_technology/chainmail.md',
            '/domains/technological/middle_age_technology/compass.md',
            '/domains/technological/middle_age_technology/crop_rotation.md',
            '/domains/technological/middle_age_technology/crossbow.md',
            '/domains/technological/middle_age_technology/crucible.md',
            '/domains/technological/middle_age_technology/distillation_apparatus.md',
            '/domains/technological/middle_age_technology/draw_plate.md',
            '/domains/technological/middle_age_technology/drawbridge.md',
            '/domains/technological/middle_age_technology/flail.md',
            '/domains/technological/middle_age_technology/flying_buttress.md',
            '/domains/technological/middle_age_technology/fulling_mill.md',
            '/domains/technological/middle_age_technology/gear_mechanism.md',
            '/domains/technological/middle_age_technology/gothic_arch.md',
            '/domains/technological/middle_age_technology/gunpowder.md',
            '/domains/technological/middle_age_technology/harpsichord.md',
            '/domains/technological/middle_age_technology/heavy_plow.md',
            '/domains/technological/middle_age_technology/horizontal_loom.md',
            '/domains/technological/middle_age_technology/horse_collar.md',
            '/domains/technological/middle_age_technology/horseshoe.md',
            '/domains/technological/middle_age_technology/hourglass.md',
            '/domains/technological/middle_age_technology/lance.md',
            '/domains/technological/middle_age_technology/longbow.md',
            '/domains/technological/middle_age_technology/mace.md',
            '/domains/technological/middle_age_technology/mechanical_clock.md',
            '/domains/technological/middle_age_technology/oil_painting.md',
            '/domains/technological/middle_age_technology/paper.md',
            '/domains/technological/middle_age_technology/paper_mill.md',
            '/domains/technological/middle_age_technology/pipe_organ.md',
            '/domains/technological/middle_age_technology/plate_armor.md',
            '/domains/technological/middle_age_technology/plow.md',
            '/domains/technological/middle_age_technology/portcullis.md',
            '/domains/technological/middle_age_technology/pottery_wheel.md',
            '/domains/technological/middle_age_technology/printing_press.md',
            '/domains/technological/middle_age_technology/screw_press.md',
            '/domains/technological/middle_age_technology/sickle.md',
            '/domains/technological/middle_age_technology/siege_tower.md',
            '/domains/technological/middle_age_technology/spectacles.md',
            '/domains/technological/middle_age_technology/spinning_wheel.md',
            '/domains/technological/middle_age_technology/stained_glass.md',
            '/domains/technological/middle_age_technology/stirrup.md',
            '/domains/technological/middle_age_technology/sundial.md',
            '/domains/technological/middle_age_technology/sword.md',
            '/domains/technological/middle_age_technology/three_field_system.md',
            '/domains/technological/middle_age_technology/tide_mill.md',
            '/domains/technological/middle_age_technology/treadmill_crane.md',
            '/domains/technological/middle_age_technology/trebuchet.md',
            '/domains/technological/middle_age_technology/trip_hammer.md',
            '/domains/technological/middle_age_technology/watermill.md',
            '/domains/technological/middle_age_technology/waterwheel.md',
            '/domains/technological/middle_age_technology/wheelbarrow.md',
            '/domains/technological/middle_age_technology/windmill.md',
            '/domains/technological/middle_age_technology/wire_drawing.md',
            '/domains/technological/modern/README.md',
            '/domains/technological/modern/ai_native_applications.md',
            '/domains/technological/modern/amazon_fulfillment.md',
            '/domains/technological/modern/defi_yield_farming.md',
            '/domains/technological/modern/edge_computing.md',
            '/domains/technological/modern/layer2_rollups.md',
            '/domains/technological/modern/llm_token_systems.md',
            '/domains/technological/modern/react_server_components.md',
            '/domains/technological/modern/tesla_gigafactory.md',
            '/domains/technological/modern/tsmc_semiconductor.md',
            '/domains/technological/networks/ai.md',
            '/domains/technological/networks/internet.md',
            '/domains/technological/tools/bow_and_arrow.md',
            '/domains/technological/tools/fishhook.md',
            '/domains/technological/tools/plow.md',
            '/domains/technological/tools/pottery_wheel.md',
            '/domains/technological/tools/sickle.md',
            '/domains/technological/tools/spear.md',
            '/domains/technological/tools/spinning_jenny.md',
            '/domains/technological/tools/steam_engine.md',
            '/domains/technological/tools/stone_tools.md',
            '/domains/technological/tools/telegraph.md'
        ];
    }
    
    // Generate data from file list without fetching markdown files
    generateDataFromFileList() {
        const nodes = [];
        const edges = [];
        
        console.log(`Generating data for ${this.markdownFiles.length} files...`);
        
        // Process each file path to create nodes
        for (const filePath of this.markdownFiles) {
            // Skip PATHWAYS.md and README.md files
            if (filePath.includes('PATHWAYS.md') || filePath.includes('README.md')) {
                continue;
            }
            
            // Create node from path
            const node = this.createPlaceholderFromPath(filePath);
            nodes.push(node);
        }
        
        console.log(`✅ Generated ${nodes.length} nodes from file list`);
        
        // Generate edges based on relationships
        const generatedEdges = this.generateComprehensiveEdges(nodes);
        edges.push(...generatedEdges);
        
        // Return complete dataset
        return {
            nodes: nodes,
            edges: edges,
            metadata: {
                visualization_type: 'complete_file_list_ingestion',
                total_files: this.markdownFiles.length,
                total_nodes: nodes.length,
                total_edges: edges.length,
                domains: Object.keys(this.domainColors),
                extraction_date: new Date().toISOString(),
                data_source: 'file_list'
            }
        };
    }
    
    // Load all markdown files and parse them
    async loadAllMarkdownFiles() {
        const parser = new MarkdownAssemblyParser();
        const nodes = [];
        const edges = [];
        const failedFiles = [];
        const successfulFiles = [];
        
        console.log(`Starting complete markdown ingestion of ${this.markdownFiles.length} files...`);
        
        // Process each file
        for (const filePath of this.markdownFiles) {
            // Skip PATHWAYS.md and README.md files
            if (filePath.includes('PATHWAYS.md') || filePath.includes('README.md')) {
                continue;
            }
            
            try {
                // Try to fetch the file content
                const response = await fetch(filePath);
                if (response.ok) {
                    const content = await response.text();
                    const parsedAssembly = parser.parseAssemblyFile(content, filePath);
                    const normalizedNode = parser.normalizeAssemblyNode(parsedAssembly);
                    nodes.push(normalizedNode);
                    successfulFiles.push(filePath);
                } else {
                    // Create placeholder node for files that can't be fetched
                    const placeholderNode = this.createPlaceholderFromPath(filePath);
                    nodes.push(placeholderNode);
                    failedFiles.push(filePath);
                }
            } catch (error) {
                // Create placeholder node on error
                const placeholderNode = this.createPlaceholderFromPath(filePath);
                nodes.push(placeholderNode);
                failedFiles.push(filePath);
            }
        }
        
        console.log(`✅ Successfully parsed: ${successfulFiles.length} files`);
        console.log(`⚠️  Created placeholders for: ${failedFiles.length} files`);
        
        // Generate edges based on relationships
        const generatedEdges = this.generateComprehensiveEdges(nodes);
        edges.push(...generatedEdges);
        
        // Return complete dataset
        return {
            nodes: nodes,
            edges: edges,
            metadata: {
                visualization_type: 'complete_markdown_ingestion',
                total_files: this.markdownFiles.length,
                successful_files: successfulFiles.length,
                failed_files: failedFiles.length,
                total_nodes: nodes.length,
                total_edges: edges.length,
                domains: Object.keys(this.domainColors),
                extraction_date: new Date().toISOString(),
                data_source: 'markdown_files'
            }
        };
    }
    
    // Create placeholder node from file path
    createPlaceholderFromPath(filePath) {
        const pathParts = filePath.split('/');
        const fileName = pathParts[pathParts.length - 1].replace('.md', '');
        const domain = pathParts[2]; // /domains/[domain]/...
        const subdomain = pathParts[3] || 'general';
        
        // Generate human-readable name
        const name = fileName
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        
        // Estimate assembly index based on type
        const ai = this.estimateAssemblyIndexFromPath(filePath);
        const tier = this.getAssemblyTier(ai);
        
        return {
            id: fileName,
            name: name,
            assembly_index: ai,
            domain: domain,
            subdomain: subdomain,
            tier: tier.tier,
            visual_complexity: tier.symbol,
            color: this.domainColors[domain] || '#666666',
            radius: this.getNodeRadius(tier.tier),
            time_origin: this.estimateTimeOrigin(domain, subdomain, fileName),
            description: `${name} - Assembly in the ${domain} domain`,
            copy_number: this.estimateCopyNumber(ai, domain),
            github_url: `https://github.com/owocki/assembly_theory/tree/master${filePath}`,
            source_type: 'markdown_placeholder',
            file_path: filePath,
            components: [],
            properties: {},
            cross_references: [],
            applications: []
        };
    }
    
    // Estimate assembly index from file path and name
    estimateAssemblyIndexFromPath(filePath) {
        const fileName = filePath.split('/').pop().replace('.md', '');
        
        // Comprehensive mapping based on all files
        const aiMap = {
            // Cosmic particles
            'photon': 1, 'electron': 1, 'neutrino': 1, 'quark': 1,
            'proton': 2, 'neutron': 2, 'muon': 2,
            // Cosmic atoms/elements
            'hydrogen': 2, 'helium': 2, 'deuterium': 3, 'tritium': 4,
            'lithium': 3, 'beryllium': 4, 'boron': 5, 'carbon': 6, 'nitrogen': 7, 'oxygen': 8,
            'fluorine': 9, 'neon': 10, 'sodium': 11, 'magnesium': 12, 'aluminum': 13,
            'silicon': 14, 'phosphorus': 15, 'sulfur': 16, 'chlorine': 17, 'argon': 18,
            'potassium': 19, 'calcium': 20, 'scandium': 21, 'titanium': 22, 'vanadium': 23,
            'chromium': 24, 'manganese': 25, 'iron': 26, 'cobalt': 27, 'nickel': 28,
            'copper': 29, 'zinc': 30, 'gallium': 31, 'germanium': 32, 'arsenic': 33,
            'selenium': 34, 'bromine': 35, 'krypton': 36, 'rubidium': 37, 'strontium': 38,
            'yttrium': 39, 'zirconium': 40, 'niobium': 41, 'molybdenum': 42, 'technetium': 43,
            'ruthenium': 44, 'rhodium': 45, 'palladium': 46, 'silver': 47, 'cadmium': 48,
            'indium': 49, 'tin': 50, 'antimony': 51, 'tellurium': 52, 'iodine': 53,
            'xenon': 54, 'cesium': 55, 'barium': 56, 'lanthanum': 57, 'cerium': 58,
            'praseodymium': 59, 'neodymium': 60, 'promethium': 61, 'samarium': 62,
            'europium': 63, 'gadolinium': 64, 'terbium': 65, 'dysprosium': 66,
            'holmium': 67, 'erbium': 68, 'thulium': 69, 'ytterbium': 70, 'lutetium': 71,
            'hafnium': 72, 'tantalum': 73, 'tungsten': 74, 'rhenium': 75, 'osmium': 76,
            'iridium': 77, 'platinum': 78, 'gold': 79, 'mercury': 80, 'thallium': 81,
            'lead': 82, 'bismuth': 83, 'polonium': 84, 'astatine': 85, 'radon': 86,
            'francium': 87, 'radium': 88, 'actinium': 89, 'thorium': 90, 'protactinium': 91,
            'uranium': 92, 'neptunium': 93, 'plutonium': 94, 'americium': 95,
            'curium': 96, 'berkelium': 97, 'californium': 98, 'einsteinium': 99, 'fermium': 100,
            // Cosmic molecules
            'hydrogen_gas': 4, 'water': 18, 'ammonia': 17, 'methane': 16, 'co2': 22,
            // Cosmic ions
            'hydroxide': 9, 'hydronium': 11,
            // Cosmic forces/fields
            'electromagnetic_field': 5, 'strong_nuclear': 10, 'weak_nuclear': 10,
            // Cosmic large structures
            'main_sequence': 1000000, 'milky_way': 1000000000000,
            
            // Geological minerals
            'quartz': 25, 'diamond': 25, 'graphite': 20, 'salt': 20, 'halite': 20,
            'clay': 50, 'iron_oxide': 30, 'hematite': 35, 'corundum': 40,
            'fluorite': 30, 'sylvite': 25, 'galena': 45, 'sphalerite': 50,
            'chalcopyrite': 55, 'bornite': 60, 'molybdenite': 45,
            'dolomite': 40, 'siderite': 35, 'anhydrite': 30, 'barite': 50,
            'apatite': 60, 'silica_unit': 15,
            // More minerals
            'actinolite': 80, 'andalusite': 70, 'beryl': 90, 'cassiterite': 85,
            'chlorite': 75, 'chromite': 80, 'cordierite': 85, 'diopside': 75,
            'epidote': 80, 'hornblende': 90, 'k_feldspar': 60, 'kyanite': 70,
            'plagioclase': 65, 'rutile': 45, 'scheelite': 75, 'serpentine': 70,
            'sillimanite': 70, 'spinel': 55, 'staurolite': 85, 'talc': 40,
            'topaz': 60, 'tourmaline': 100, 'tremolite': 85, 'vesuvianite': 95,
            'wolframite': 80, 'wollastonite': 70, 'zircon': 75,
            // Geological rocks
            'granite': 1000, 'basalt': 800, 'obsidian': 600, 'gabbro': 900,
            'gneiss': 1200, 'schist': 1100,
            // Geological formations
            'limestone': 5000, 'coal': 10000, 'sandstone': 2000, 'shale': 3000,
            'alluvial_deposit': 8000, 'epithermal_deposit': 15000, 'karst': 20000,
            'kimberlite': 25000, 'ophiolite': 30000, 'pegmatite': 12000,
            'porphyry_deposit': 35000, 'reef': 50000, 'skarn': 18000,
            'banded_iron_formation': 40000,
            // Geological processes
            'erosion': 50000, 'weathering': 30000, 'volcanism': 100000,
            'plate_tectonics': 1000000, 'hydrothermal_alteration': 80000,
            // Geological systems
            'earth_system': 1000000000,
            
            // Biological molecules
            'glycine': 85, 'amino_acids': 150, 'nucleotides': 300, 'sugars': 100,
            'peptides': 500, 'membranes': 1000,
            // Biological prokaryotic
            'ribosome': 5000, 'bacteria': 100000, 'trna': 2000, 'virus': 50000,
            'photosystem': 10000, 'dna_polymerase': 4000,
            // Biological eukaryotic
            'mitochondrion': 50000, 'chloroplast': 60000,
            // Biological multicellular
            'insect': 10000000,
            // Biological ecosystems
            'coral_reef': 1000000000,
            // Biological modern
            'mrna_vaccine_platforms': 100000000,
            
            // Cognitive basic
            'attention': 1000000, 'consciousness': 10000000000, 'visual_perception': 5000000,
            'visual_processing': 5000000, 'worldview': 100000000,
            // Cognitive memory
            'working_memory': 10000000, 'episodic_memory': 50000000,
            'semantic_memory': 100000000, 'autobiographical_memory': 80000000,
            // Cognitive learning
            'associative_learning': 1000000, 'habit_formation': 5000000,
            'metacognition': 50000000, 'imitation': 1000000, 'skill_acquisition': 10000000,
            'social_learning': 20000000,
            // Cognitive social
            'empathy': 100000000, 'stereotype': 10000000, 'theory_of_mind': 500000000,
            'fairness': 50000000, 'leadership': 100000000,
            // Cognitive language
            'human_language': 50000000000, 'language_acquisition': 1000000,
            'language_evolution': 10000000, 'nonverbal_communication': 100000,
            'symbolic_communication': 5000000,
            // Cognitive reasoning
            'analogical_reasoning': 10000000, 'critical_thinking': 50000000,
            'executive_function': 100000000, 'abstract_thinking': 20000000,
            'logical_reasoning': 30000000, 'moral_reasoning': 80000000,
            'heuristics': 5000000,
            // Cognitive consciousness/emergence
            'emergence': 10000000000, 'complex_systems': 1000000000,
            'network_effects': 100000000,
            // Cognitive culture
            'cultural_evolution': 100000000000, 'cultural_transmission': 10000000,
            'norm': 5000000, 'ritual': 20000000,
            // Cognitive collective
            'swarm_intelligence': 1000000000, 'collective_decision': 50000000,
            'collective_knowledge': 100000000, 'conceptual_knowledge': 50000000,
            // Cognitive neural
            'human_brain': 10000000000,
            // Cognitive structures
            'kinship': 1000000, 'tribe': 10000000, 'social_class': 50000000,
            'social_control': 30000000, 'social_inequality': 80000000,
            'social_network': 100000000,
            // Cognitive institutions
            'democracy': 100000000, 'bureaucracy': 50000000, 'education_system': 200000000,
            'healthcare_system': 300000000, 'legal_system': 150000000,
            'market_economy': 500000000, 'marriage': 50000000, 'military': 100000000,
            'money': 200000000, 'property_rights': 80000000, 'religion': 150000000,
            'science': 300000000, 'state': 200000000, 'university': 100000000,
            'public_administration': 150000000,
            // Cognitive systems
            'authority': 50000000, 'market': 100000000, 'rational_choice': 10000000,
            'reciprocity': 50000000, 'social_influence': 20000000,
            'interpersonal_trust': 30000000, 'emotional_intelligence': 80000000,
            'moral_emotions': 60000000, 'altruism': 30000000, 'cooperative_behavior': 40000000,
            'competition': 20000000, 'bounded_rationality': 15000000,
            'cognitive_bias': 10000000, 'self_control': 25000000,
            // Cognitive economic
            'banking': 200000000, 'capitalism': 500000000, 'currency': 100000000,
            'economic_theory': 300000000, 'trade': 50000000,
            // Cognitive emotions
            'compassion': 80000000, 'emotional_regulation': 60000000,
            'fear': 10000000, 'gratitude': 40000000, 'mental_health': 200000000,
            'positive_emotion': 50000000, 'psychological_wellbeing': 150000000,
            // Cognitive governance
            'accountability': 80000000, 'digital_democracy': 500000000,
            'government': 200000000, 'justice': 100000000, 'open_government': 300000000,
            'rule_of_law': 150000000, 'transparency': 120000000,
            // Cognitive information
            'knowledge_representation': 50000000, 'symbol_systems': 30000000,
            'writing_system': 10000000,
            // Cognitive legal
            'contract': 100000000, 'judicial_system': 200000000, 'property_law': 150000000,
            // Cognitive perception
            'object_recognition': 10000000, 'pattern_recognition': 20000000,
            'sensory_integration': 30000000,
            // Cognitive political
            'constitution': 300000000, 'federalism': 200000000,
            
            // Technological early tools
            'stone_tools': 1000, 'fire': 50, 'spear': 80, 'bow_and_arrow': 150,
            'fishhook': 60, 'adze': 100, 'antler_pick': 80, 'atlatl': 120,
            'awl': 40, 'bark_cloth': 60, 'basket': 100, 'blowgun': 80,
            'bola': 70, 'bone_awl': 50, 'bone_flute': 150, 'bone_harpoon': 100,
            'bone_needle': 80, 'boomerang': 90, 'clay_vessel': 200,
            'cordage': 40, 'digging_stick': 20, 'drill': 60, 'fire_drill': 40,
            'fishing_net': 150, 'fishing_spear': 70, 'flint_blade': 80,
            'flute': 200, 'grinding_stone': 50, 'hammer_stone': 30,
            'hand_axe': 60, 'harpoon': 100, 'hide_scraper': 40, 'knife': 50,
            'lance': 70, 'leather_pouch': 80, 'loom': 300, 'mallet': 40,
            'mortar_pestle': 60, 'oar': 50, 'obsidian_knife': 60,
            'oil_lamp': 100, 'plant_fiber_net': 120, 'pressure_flaker': 40,
            'quern': 80, 'raft': 200, 'rope': 60, 'shell_scraper': 30,
            'skin_tent': 250, 'sling': 50, 'snare': 40, 'stone_chisel': 50,
            'tanning_rack': 100, 'throwing_stick': 40, 'torch': 30,
            'travois': 150, 'wooden_bowl': 60,
            // Technological middle age
            'plow': 180, 'sickle': 75, 'pottery_wheel': 120, 'spinning_jenny': 250,
            'telegraph': 350, 'alembic': 200, 'aqueduct': 5000, 'arquebus': 500,
            'astrolabe': 300, 'battering_ram': 200, 'bellows': 100,
            'blast_furnace': 800, 'cam_shaft': 150, 'canal_lock': 1000,
            'cannon': 600, 'catapult': 300, 'chainmail': 400, 'compass': 150,
            'crop_rotation': 50, 'crossbow': 250, 'crucible': 100,
            'distillation_apparatus': 300, 'draw_plate': 200, 'drawbridge': 500,
            'flail': 80, 'flying_buttress': 2000, 'fulling_mill': 400,
            'gear_mechanism': 200, 'gothic_arch': 1500, 'gunpowder': 100,
            'harpsichord': 800, 'heavy_plow': 300, 'horizontal_loom': 400,
            'horse_collar': 100, 'horseshoe': 80, 'hourglass': 200,
            'longbow': 150, 'mace': 100, 'mechanical_clock': 1000,
            'oil_painting': 300, 'paper': 200, 'paper_mill': 500,
            'pipe_organ': 2000, 'plate_armor': 600, 'portcullis': 300,
            'printing_press': 2000, 'screw_press': 400, 'siege_tower': 800,
            'spectacles': 200, 'spinning_wheel': 300, 'stained_glass': 500,
            'stirrup': 100, 'sundial': 150, 'sword': 200,
            'three_field_system': 100, 'tide_mill': 600, 'treadmill_crane': 800,
            'trebuchet': 1000, 'trip_hammer': 400, 'watermill': 500,
            'waterwheel': 300, 'wheelbarrow': 150, 'windmill': 800,
            'wire_drawing': 300,
            // Technological machines
            'steam_engine': 10000000,
            // Technological computers/modern
            'microprocessor': 1000000000, '3d_printer': 100000000,
            '3d_scanner': 50000000, '5g_network': 10000000000,
            'accelerometer': 1000000, 'air_conditioner': 10000000,
            'artificial_heart': 100000000, 'augmented_reality': 100000000,
            'autonomous_vehicle': 1000000000, 'barometer': 100000,
            'battery_storage': 10000000, 'bioreactor': 50000000,
            'blender': 100000, 'blockchain': 100000000, 'carbon_nanotube': 10000000,
            'chromatograph': 10000000, 'circuit_breaker': 100000,
            'cochlear_implant': 50000000, 'coffee_maker': 100000,
            'computer_vision': 100000000, 'crispr': 1000000000,
            'cryptocurrency': 100000000, 'ct_scanner': 100000000,
            'deep_learning': 1000000000, 'defibrillator': 10000000,
            'desktop_computer': 100000000, 'dialysis_machine': 50000000,
            'dishwasher': 1000000, 'drone': 10000000, 'edge_ai': 100000000,
            'electric_car': 100000000, 'electric_motor': 1000000,
            'electric_stove': 100000, 'electron_microscope': 100000000,
            'encoder': 100000, 'facial_recognition': 100000000,
            'fiber_optics': 10000000, 'flow_meter': 100000,
            'fluorescent_light': 100000, 'food_processor': 100000,
            'fuel_cell': 10000000, 'fusion_reactor': 1000000000,
            'gene_sequencer': 100000000, 'gps': 1000000000,
            'graphene_transistor': 10000000, 'gyroscope': 1000000,
            'haptic_feedback': 10000000, 'high_speed_rail': 100000000,
            'humidity_sensor': 100000, 'hybrid_vehicle': 50000000,
            'incandescent_bulb': 10000, 'instant_pot': 1000000,
            'insulin_pump': 10000000, 'integrated_circuit': 100000000,
            'internal_combustion_engine': 10000000, 'iot_sensor': 1000000,
            'jet_engine': 100000000, 'laptop': 100000000, 'laser': 10000000,
            'laser_surgery': 100000000, 'led_light': 1000000, 'lidar': 10000000,
            'load_cell': 100000, 'maglev_train': 1000000000,
            'magnetometer': 100000, 'mainframe': 100000000,
            'mass_spectrometer': 50000000, 'memristor': 1000000,
            'metamaterial': 10000000, 'microwave_oven': 1000000,
            'mixed_reality': 100000000, 'motion_capture': 10000000,
            'mri_scanner': 100000000, 'multimeter': 100000,
            'natural_language_processing': 100000000, 'neural_network': 100000000,
            'neuromorphic_chip': 100000000, 'nuclear_reactor': 1000000000,
            'oscilloscope': 1000000, 'pacemaker': 10000000,
            'particle_accelerator': 10000000000, 'pcr_machine': 10000000,
            'photodiode': 100000, 'photoelectric_sensor': 100000,
            'photonic_processor': 100000000, 'piezoelectric_sensor': 100000,
            'pressure_sensor': 100000, 'prosthetic_limb': 50000000,
            'proximity_sensor': 100000, 'quantum_computer': 10000000000,
            'radar': 10000000, 'radio': 1000000, 'refrigerator': 1000000,
            'reinforcement_learning': 100000000, 'resolver': 100000,
            'robot': 10000000, 'robotic_surgery': 100000000,
            'rocket': 100000000, 'satellite': 100000000,
            'semiconductor': 1000000, 'smart_contract': 10000000,
            'smart_grid': 1000000000, 'smartphone': 1000000000,
            'solar_cell': 1000000, 'solar_panel': 10000000,
            'space_shuttle': 10000000000, 'space_station': 100000000000,
            'spectrophotometer': 1000000, 'starlink': 10000000000,
            'strain_gauge': 100000, 'supercomputer': 10000000000,
            'superconductor': 1000000, 'synthetic_biology': 100000000,
            'tablet': 100000000, 'telephone': 1000000, 'television': 10000000,
            'thermoelectric_generator': 1000000, 'thermometer': 10000,
            'toaster': 10000, 'torque_sensor': 100000, 'transformer': 100000,
            'transistor': 1000, 'turbine_generator': 10000000,
            'ultrasound': 10000000, 'vacuum_cleaner': 100000,
            'ventilator': 10000000, 'virtual_reality': 100000000,
            'voice_assistant': 100000000, 'washing_machine': 1000000,
            'wind_turbine': 10000000, 'x_ray_machine': 10000000,
            // Technological networks
            'internet': 100000000000000, 'ai': 10000000000000,
            // Technological modern
            'ai_native_applications': 1000000000000, 'amazon_fulfillment': 10000000000,
            'defi_yield_farming': 1000000000, 'edge_computing': 100000000000,
            'layer2_rollups': 10000000000, 'llm_token_systems': 100000000000,
            'react_server_components': 1000000000, 'tesla_gigafactory': 100000000000,
            'tsmc_semiconductor': 1000000000000
        };
        
        return aiMap[fileName] || 1000; // Default to 1000 if not found
    }
    
    // Estimate time origin based on domain and type
    estimateTimeOrigin(domain, subdomain, fileName) {
        // Specific time origins for known files
        const timeMap = {
            // Cosmic
            'photon': '13.8 Gyr ago', 'electron': '13.8 Gyr ago', 'proton': '13.8 Gyr ago',
            'hydrogen': '13.8 Gyr ago', 'helium': '13.7 Gyr ago', 'carbon': '13.0 Gyr ago',
            'water': '13.4 Gyr ago', 'milky_way': '13.2 Gyr ago',
            // Geological
            'quartz': '4.4 Gyr ago', 'granite': '4.0 Gyr ago', 'earth_system': '4.5 Gyr ago',
            'plate_tectonics': '3.2 Gyr ago', 'limestone': '3.8 Gyr ago',
            // Biological
            'amino_acids': '4.2 Gyr ago', 'ribosome': '3.8 Gyr ago', 'bacteria': '3.8 Gyr ago',
            'mitochondrion': '2.0 Gyr ago', 'chloroplast': '1.5 Gyr ago',
            'coral_reef': '500 Myr ago', 'insect': '400 Myr ago',
            // Cognitive
            'human_brain': '300 kyr ago', 'human_language': '100 kyr ago',
            'cultural_evolution': '50 kyr ago', 'democracy': '2.5 kyr ago',
            // Technological
            'stone_tools': '3.3 Myr ago', 'steam_engine': '1712 CE',
            'microprocessor': '1971 CE', 'internet': '1969 CE',
            'ai_native_applications': '2022 CE'
        };
        
        if (timeMap[fileName]) return timeMap[fileName];
        
        // Default by domain
        const domainDefaults = {
            cosmic: '13.8 Gyr ago',
            geological: '4.5 Gyr ago',
            biological: '3.8 Gyr ago',
            cognitive: '500 kyr ago',
            technological: '10 kyr ago'
        };
        
        return domainDefaults[domain] || 'Unknown';
    }
    
    // Generate edges between nodes
    generateComprehensiveEdges(nodes) {
        const edges = [];
        const nodeMap = new Map(nodes.map(n => [n.id, n]));
        
        // Key relationships from assembly theory
        const relationships = [
            // Cosmic foundations
            { from: 'hydrogen', to: 'water', type: 'chemical_bonding', symbol: '→', weight: 95 },
            { from: 'carbon', to: 'methane', type: 'chemical_bonding', symbol: '→', weight: 90 },
            { from: 'oxygen', to: 'water', type: 'chemical_bonding', symbol: '→', weight: 95 },
            { from: 'carbon', to: 'co2', type: 'chemical_bonding', symbol: '→', weight: 90 },
            
            // Cosmic to geological
            { from: 'carbon', to: 'diamond', type: 'crystallization', symbol: '→', weight: 80 },
            { from: 'carbon', to: 'graphite', type: 'crystallization', symbol: '→', weight: 80 },
            { from: 'silica_unit', to: 'quartz', type: 'crystallization', symbol: '→', weight: 85 },
            
            // Cosmic to biological
            { from: 'water', to: 'amino_acids', type: 'enables', symbol: '→', weight: 90 },
            { from: 'carbon', to: 'amino_acids', type: 'component', symbol: '→', weight: 95 },
            { from: 'amino_acids', to: 'peptides', type: 'polymerization', symbol: '→', weight: 90 },
            { from: 'nucleotides', to: 'trna', type: 'polymerization', symbol: '→', weight: 85 },
            
            // Biological assembly
            { from: 'ribosome', to: 'bacteria', type: 'component', symbol: '×', weight: 90 },
            { from: 'bacteria', to: 'mitochondrion', type: 'endosymbiosis', symbol: '⇒', weight: 85 },
            { from: 'bacteria', to: 'chloroplast', type: 'endosymbiosis', symbol: '⇒', weight: 85 },
            
            // Biological to cognitive
            { from: 'human_brain', to: 'human_language', type: 'enables', symbol: '→', weight: 95 },
            { from: 'human_brain', to: 'consciousness', type: 'emergence', symbol: '⇒', weight: 90 },
            { from: 'human_language', to: 'cultural_evolution', type: 'enables', symbol: '→', weight: 90 },
            
            // Cognitive to technological
            { from: 'human_brain', to: 'stone_tools', type: 'creates', symbol: '→', weight: 85 },
            { from: 'cultural_evolution', to: 'science', type: 'enables', symbol: '→', weight: 90 },
            { from: 'science', to: 'steam_engine', type: 'enables', symbol: '→', weight: 85 },
            { from: 'microprocessor', to: 'internet', type: 'enables', symbol: '→', weight: 90 },
            { from: 'internet', to: 'ai', type: 'enables', symbol: '→', weight: 85 },
            
            // Cross-domain convergence
            { from: 'human_brain', to: 'ai', type: 'inspires', symbol: '≈', weight: 70 },
            { from: 'swarm_intelligence', to: 'internet', type: 'analogy', symbol: '≈', weight: 65 },
            { from: 'coral_reef', to: 'market_economy', type: 'complexity_analogy', symbol: '≈', weight: 60 }
        ];
        
        // Create edges where both nodes exist
        relationships.forEach(rel => {
            if (nodeMap.has(rel.from) && nodeMap.has(rel.to)) {
                edges.push({
                    source: rel.from,
                    target: rel.to,
                    type: rel.type,
                    symbol: rel.symbol,
                    weight: rel.weight
                });
            }
        });
        
        // Add domain proximity edges
        nodes.forEach((node, i) => {
            nodes.slice(i + 1).forEach(otherNode => {
                if (node.domain === otherNode.domain) {
                    const aiRatio = Math.max(node.assembly_index, otherNode.assembly_index) / 
                                   Math.min(node.assembly_index, otherNode.assembly_index);
                    
                    if (aiRatio < 10) {
                        edges.push({
                            source: node.id,
                            target: otherNode.id,
                            type: 'domain_proximity',
                            symbol: '↔',
                            weight: 1 / aiRatio
                        });
                    }
                }
            });
        });
        
        return edges;
    }
    
    // Helper methods from parser
    getAssemblyTier(assemblyIndex) {
        const tiers = [
            { min: 0, max: 10, tier: 1, symbol: '•' },
            { min: 10, max: 100, tier: 2, symbol: '••' },
            { min: 100, max: 1000, tier: 3, symbol: '•••' },
            { min: 1000, max: 10000, tier: 4, symbol: '••••' },
            { min: 10000, max: 100000, tier: 5, symbol: '•••••' },
            { min: 100000, max: 1000000, tier: 6, symbol: '••••••' },
            { min: 1000000, max: 1000000000, tier: 7, symbol: '•••••••' },
            { min: 1000000000, max: Infinity, tier: 8, symbol: '••••••••' }
        ];
        
        return tiers.find(tier => 
            assemblyIndex >= tier.min && assemblyIndex < tier.max
        ) || tiers[0];
    }
    
    getNodeRadius(tier) {
        return 3 + (tier * 2);
    }
    
    estimateCopyNumber(assemblyIndex, domain) {
        const baseCopies = {
            cosmic: 1e20,
            geological: 1e15,
            biological: 1e10,
            cognitive: 1e6,
            technological: 1e3,
            hybrid: 1e2
        };
        
        const base = baseCopies[domain] || 1e6;
        return Math.max(1, Math.floor(base / Math.pow(assemblyIndex, 0.5)));
    }
}