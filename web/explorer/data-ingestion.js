class DataIngestion {
    constructor() {
        this.domainColors = {
            cosmic: '#0066CC',
            geological: '#8B4513',
            biological: '#228B22',
            cognitive: '#FFD700',
            technological: '#DC143C',
            hybrid: '#9932CC'
        };
        
        this.assemblyData = {
            nodes: [],
            edges: [],
            metadata: {}
        };
    }
    
    // Parse CSV data and convert to network format
    async processCsvData() {
        // Process assembly measurements CSV
        const assemblyMeasurements = await this.parseAssemblyMeasurements();
        
        // Process biological assemblies CSV
        const biologicalAssemblies = await this.parseBiologicalAssemblies();
        
        // Process molecular assemblies CSV
        const molecularAssemblies = await this.parseMolecularAssemblies();
        
        // Process technological assemblies CSV
        const technologicalAssemblies = await this.parseTechnologicalAssemblies();
        
        // Combine all data
        return {
            assemblyMeasurements,
            biologicalAssemblies,
            molecularAssemblies,
            technologicalAssemblies
        };
    }
    
    parseAssemblyMeasurements() {
        const csvData = `object_name,measured_ai,theoretical_ai,measurement_method,measurement_date,research_group,sample_type,confidence_level,notes
Water,3,3,Mass_spectrometry_fragmentation,2021-03-15,Walker_Lab_ASU,Pure_H2O,High,Perfect match with theory
Methane,12,12,MS_fragmentation,2021-03-18,Walker_Lab_ASU,Pure_CH4,High,Consistent with prediction
Ethanol,35,35,MS_fragmentation,2021-04-02,Walker_Lab_ASU,Pure_C2H5OH,High,Alcohol standard
Glucose,90,80-150,MS_fragmentation,2021-04-10,Walker_Lab_ASU,D-glucose,Medium,Ring conformations affect AI
Caffeine,320,350,MS_fragmentation,2021-05-22,Walker_Lab_ASU,Pure_caffeine,Medium,Close to theoretical
Adenosine,280,300,MS_fragmentation,2021-06-08,Walker_Lab_ASU,Pure_nucleoside,Medium,Nucleoside baseline
ATP,420,400,MS_fragmentation,2021-06-15,Walker_Lab_ASU,Disodium_ATP,High,Energy molecule confirmed
Alanine,85,90,MS_fragmentation,2021-07-03,Walker_Lab_ASU,L-alanine,High,Amino acid standard
Glycine,75,80,MS_fragmentation,2021-07-03,Walker_Lab_ASU,Glycine,High,Simplest amino acid
Phenylalanine,180,170,MS_fragmentation,2021-07-12,Walker_Lab_ASU,L-phenylalanine,Medium,Aromatic amino acid
Cholesterol,450,450,MS_fragmentation,2021-08-20,Walker_Lab_ASU,Pure_cholesterol,High,Complex steroid
Palmitic_acid,185,180,MS_fragmentation,2021-09-14,Walker_Lab_ASU,Palmitic_acid,High,Saturated fatty acid
Aspirin,310,300,MS_fragmentation,2021-10-05,Walker_Lab_ASU,Acetylsalicylic_acid,High,Pharmaceutical standard
Penicillin_G,580,600,MS_fragmentation,2021-11-18,Walker_Lab_ASU,Penicillin_G_sodium,Medium,Beta-lactam antibiotic
Chlorophyll_a,820,800,MS_fragmentation,2022-01-25,Walker_Lab_ASU,Extracted_from_spinach,Medium,Photosynthetic pigment
Hemoglobin_subunit,14500,15000,Protein_mass_spec,2022-03-14,Cronin_Lab_Glasgow,Human_hemoglobin,Medium,Oxygen transport protein
Insulin,5800,6000,Protein_mass_spec,2022-04-22,Cronin_Lab_Glasgow,Human_insulin,Medium,Peptide hormone
Lysozyme,14200,14000,Protein_mass_spec,2022-05-18,Cronin_Lab_Glasgow,Chicken_egg_white,High,Well-characterized enzyme
Cytochrome_c,12800,12500,Protein_mass_spec,2022-06-30,Cronin_Lab_Glasgow,Horse_heart,High,Electron transport protein
Ribonuclease_A,13900,14200,Protein_mass_spec,2022-08-15,Cronin_Lab_Glasgow,Bovine_pancreas,High,RNA-degrading enzyme
Myoglobin,17200,17500,Protein_mass_spec,2022-09-12,Cronin_Lab_Glasgow,Sperm_whale,Medium,Oxygen storage protein
BSA,66500,66000,Protein_mass_spec,2022-10-28,Cronin_Lab_Glasgow,Bovine_serum,Medium,Large reference protein
tRNA,45000,50000,RNA_sequencing_AI,2022-12-05,MIT_Assembly_Group,E_coli_tRNA,Medium,Transfer RNA molecule
Small_ribosomal_subunit,1800000,2000000,Ribosome_profiling,2023-02-18,MIT_Assembly_Group,E_coli_30S,Low,Complex ribonucleoprotein
Large_ribosomal_subunit,2800000,3000000,Ribosome_profiling,2023-02-25,MIT_Assembly_Group,E_coli_50S,Low,Complex ribonucleoprotein
Bacteriophage_T4,95000000,100000000,Viral_genome_analysis,2023-04-12,Stanford_Complexity_Lab,T4_bacteriophage,Low,DNA virus
E_coli_genome,4600000000,5000000000,Genomic_assembly_analysis,2023-06-20,Stanford_Complexity_Lab,E_coli_K12,Very_Low,Complete bacterial genome
Yeast_genome,12000000000,12000000000,Genomic_assembly_analysis,2023-08-15,Stanford_Complexity_Lab,S_cerevisiae,Very_Low,Eukaryotic genome
Human_chromosome_21,47000000000,50000000000,Genomic_assembly_analysis,2023-10-30,Stanford_Complexity_Lab,Human_chr21,Very_Low,Smallest human chromosome
Synthetic_DNA_100bp,50000,55000,Custom_synthesis_analysis,2023-11-15,Twist_Bioscience,Synthetic_construct,High,Designed DNA sequence
Synthetic_protein_50aa,2500,2800,Custom_synthesis_analysis,2023-12-01,Zymergen,Synthetic_enzyme,Medium,Designed protein
Carbon_nanotube_SWNT,48000,50000,Electron_microscopy_analysis,2024-01-20,IBM_Research,Single_wall_nanotube,Medium,1D carbon structure
Graphene_sheet_1um2,28000,30000,AFM_analysis,2024-02-14,Cambridge_Graphene,CVD_graphene,Medium,2D carbon sheet
Silicon_microprocessor,8500000000,10000000000,Circuit_analysis,2024-03-25,Intel_Labs,Core_i7_processor,Low,Complex integrated circuit
OLED_display_pixel,5000000,6000000,Device_analysis,2024-04-18,Samsung_Research,Smartphone_display,Low,Organic light emitting diode
Solar_cell_silicon,45000000,50000000,Device_analysis,2024-05-22,NREL,Monocrystalline_silicon,Medium,Photovoltaic device
Lithium_ion_battery_cell,100000000,120000000,Battery_analysis,2024-06-10,Tesla_Research,18650_cell,Low,Energy storage device
LED_white_light,8000000,10000000,Semiconductor_analysis,2024-07-05,Cree_Research,High_power_LED,Medium,Solid state lighting
LCD_display_subpixel,15000000,18000000,Display_analysis,2024-08-12,LG_Display,TFT_LCD,Low,Liquid crystal display
MEMS_accelerometer,50000000,60000000,MEMS_analysis,2024-09-18,Bosch_Sensortec,3-axis_sensor,Medium,Micro-electromechanical system
Quantum_dot,25000,30000,Nanoparticle_analysis,2024-10-25,Quantum_Materials,CdSe_quantum_dot,Medium,Semiconductor nanocrystal
Metamaterial_unit_cell,1000000,1200000,Electromagnetic_analysis,2024-11-15,Meta_Platforms,Negative_index_material,Medium,Engineered electromagnetic response
Synthetic_biology_circuit,500000000,600000000,Genetic_circuit_analysis,2024-12-20,Ginkgo_Bioworks,Engineered_E_coli,Low,Biological computing circuit
E_coli_cell_complete,85000000,100000000,Single_cell_analysis,2020-05-15,Weizmann_Institute,Lab_strain,Very_Low,Complete bacterial cell
Yeast_cell_complete,950000000,1000000000,Single_cell_analysis,2020-08-22,Weizmann_Institute,S_cerevisiae,Very_Low,Complete eukaryotic cell
HeLa_cell_complete,8500000000,10000000000,Single_cell_analysis,2021-01-30,Broad_Institute,Human_cancer_cell,Very_Low,Complex human cell
Neuron_complete,15000000000,20000000000,Connectome_analysis,2021-07-14,Allen_Institute,Mouse_cortical_neuron,Very_Low,Complete nerve cell
Muscle_fiber_complete,25000000000,30000000000,Tissue_analysis,2021-11-20,Harvard_Medical,Human_skeletal_muscle,Very_Low,Multinucleated muscle cell
Leaf_mesophyll_cell,12000000000,15000000000,Plant_cell_analysis,2022-04-08,Salk_Institute,Arabidopsis_leaf,Very_Low,Photosynthetic plant cell`;
        
        return this.parseCsvString(csvData, 'cosmic');
    }
    
    parseBiologicalAssemblies() {
        const csvData = `name,type,assembly_index,domain,first_appearance,organism_examples,description,components,estimated_complexity
Ribosome,molecular_machine,5000,biological,3.8_Gyr_ago,All cellular life,Protein synthesis machinery,rRNA+ribosomal_proteins,~80 proteins + 3-4 rRNAs
DNA polymerase,enzyme,4000,biological,3.8_Gyr_ago,All cellular life,DNA replication enzyme,Protein complex,~500-1000 amino acids
RNA polymerase,enzyme,6000,biological,3.8_Gyr_ago,All cellular life,RNA synthesis enzyme,Multi-subunit protein,~1400 amino acids
ATP synthase,molecular_motor,8000,biological,3.5_Gyr_ago,All cellular life,ATP production machine,F0F1 complex,~1650 amino acids total
Photosystem II,protein_complex,10000,biological,3.4_Gyr_ago,Cyanobacteria+plants,Water-splitting photosystem,~20 protein subunits,~350 kDa complex
Photosystem I,protein_complex,9000,biological,3.4_Gyr_ago,Cyanobacteria+plants,NADPH production system,~20 protein subunits,~300 kDa complex
Bacterial flagellum,motility_system,30000,biological,3.0_Gyr_ago,Many bacteria,Rotating molecular motor,~50 different proteins,Type III secretion system
Bacterial cell wall,structural_system,5000,biological,3.5_Gyr_ago,Most bacteria,Protective peptidoglycan layer,Peptidoglycan+associated_proteins,Cross-linked polymer network
Bacterial chromosome,genetic_system,500000,biological,3.8_Gyr_ago,All bacteria,Circular DNA genome,DNA+nucleoid_proteins,1-10 million base pairs
Bacterial plasmid,genetic_element,10000,biological,3.0_Gyr_ago,Many bacteria,Autonomous DNA element,Circular DNA,1000-100000 base pairs
Virus capsid,structural_system,50000,biological,3.5_Gyr_ago,All viruses,Protein shell for genome,Capsid proteins,20-2000 proteins
Bacteriophage,viral_system,100000,biological,3.0_Gyr_ago,Bacterial viruses,Bacterial infection system,DNA/RNA+capsid+tail,Complex assembly machine
Cell membrane,barrier_system,10000,biological,3.8_Gyr_ago,All cells,Lipid bilayer boundary,Phospholipids+membrane_proteins,~1000 different lipids/proteins
Mitochondrion,organelle,50000,biological,2.0_Gyr_ago,Eukaryotes,Powerhouse of the cell,Double membrane+matrix+cristae,~1500 different proteins
Chloroplast,organelle,60000,biological,1.5_Gyr_ago,Plants+algae,Photosynthesis organelle,Triple membrane+thylakoids+stroma,~3000 different proteins
Cell nucleus,organelle,80000,biological,2.0_Gyr_ago,Eukaryotes,Genetic control center,Nuclear envelope+nucleoplasm+chromatin,~20000 different proteins
Eukaryotic chromosome,genetic_system,1000000,biological,2.0_Gyr_ago,Eukaryotes,Linear DNA+histones,DNA+histone_proteins+centromere,Millions to billions of base pairs
Endoplasmic reticulum,organelle_system,40000,biological,2.0_Gyr_ago,Eukaryotes,Protein/lipid synthesis network,Membrane network+ribosomes,Extended membrane system
Golgi apparatus,organelle_system,30000,biological,2.0_Gyr_ago,Eukaryotes,Protein modification center,Stacked membrane cisternae,~100 different enzymes
Cytoskeleton,structural_system,100000,biological,2.0_Gyr_ago,Eukaryotes,Cellular scaffold,Actin+tubulin+intermediate_filaments,Dynamic polymer networks
Centrosome,organizational_center,20000,biological,2.0_Gyr_ago,Animal cells,Microtubule organizing center,Two centrioles+pericentriolar_material,~100 different proteins
Prokaryotic cell,cellular_system,100000,biological,3.8_Gyr_ago,Bacteria+Archaea,Simple cellular life,Cell_wall+membrane+cytoplasm+nucleoid,~1000-5000 genes
Eukaryotic cell,cellular_system,1000000,biological,2.0_Gyr_ago,Eukaryotes,Complex cellular life,Nucleus+organelles+cytoplasm+membrane,~20000-25000 genes
Biofilm,multicellular_system,500000,biological,3.5_Gyr_ago,Many bacteria,Bacterial community matrix,Cells+extracellular_polymers,10^6-10^9 cells
Fruiting body,developmental_system,2000000,biological,1.0_Gyr_ago,Slime molds+fungi,Multicellular reproductive structure,Specialized cell types,10^5-10^7 cells
Simple tissue,tissue_system,5000000,biological,800_Myr_ago,Simple animals,Organized cell layer,Single cell type+ECM,10^3-10^6 cells
Complex tissue,tissue_system,10000000,biological,600_Myr_ago,Complex animals,Multiple cell type tissue,Multiple_cell_types+ECM+vasculature,10^6-10^9 cells
Organ,organ_system,50000000,biological,550_Myr_ago,Complex animals,Specialized functional structure,Multiple_tissues+vasculature+innervation,10^8-10^12 cells
Organ system,body_system,200000000,biological,500_Myr_ago,Complex animals,Coordinated organ group,Multiple_organs+control_systems,10^10-10^14 cells
Simple organism,organism,10000000,biological,800_Myr_ago,Simple animals,Multicellular individual,Tissues+organs+systems,10^4-10^8 cells
Complex organism,organism,1000000000,biological,500_Myr_ago,Vertebrates,Advanced multicellular life,All body systems+behaviors,10^12-10^14 cells
Neural network,nervous_system,100000000,biological,550_Myr_ago,Animals with neurons,Information processing network,Neurons+synapses+glia,10^6-10^11 neurons
Brain,nervous_system,10000000000,biological,500_Myr_ago,Complex animals,Central nervous system,Specialized_neural_regions+circuits,10^8-10^11 neurons
Ecosystem,ecological_system,10000000000,biological,3.5_Gyr_ago,All environments,Interacting species community,Multiple_species+environment+flows,100s-1000s of species
Food web,ecological_network,1000000000,biological,3.0_Gyr_ago,All ecosystems,Species interaction network,Producers+consumers+decomposers+flows,10s-100s of trophic links
Symbiosis,interspecies_system,50000000,biological,3.0_Gyr_ago,Many organisms,Mutualistic species partnership,Host+symbiont+interface,Two+ species integration
Lichen,composite_organism,20000000,biological,400_Myr_ago,Fungi+algae/cyanobacteria,Fungal-phototroph partnership,Mycobiont+photobiont+structure,Dual organism system
Coral holobiont,composite_organism,100000000,biological,500_Myr_ago,Corals+zooxanthellae,Coral-algae partnership,Coral+zooxanthellae+bacteria+structure,Multi-species system
Colony,colonial_system,10000000,biological,1.0_Gyr_ago,Colonial organisms,Integrated individual colony,Multiple_connected_individuals,10^2-10^6 individuals
Superorganism,colonial_system,500000000,biological,100_Myr_ago,Social insects,Highly integrated colony,Specialized_castes+communication+coordination,10^3-10^7 individuals
Social group,behavioral_system,200000000,biological,100_Myr_ago,Social animals,Coordinated animal group,Individuals+communication+roles+behaviors,10-1000 individuals
Swarm intelligence,collective_system,1000000000,biological,200_Myr_ago,Flocking/schooling species,Emergent group intelligence,Individuals+simple_rules+environment,100s-millions of individuals
Language system,communication_system,50000000000,cognitive,100_kyr_ago,Humans,Symbolic communication system,Vocabulary+grammar+semantics+pragmatics,10^4-10^5 words
Culture,information_system,100000000000,cognitive,100_kyr_ago,Humans+some animals,Transmitted knowledge system,Beliefs+practices+artifacts+institutions,Complex knowledge networks
Protein fold,structural_motif,2000,biological,3.8_Gyr_ago,All life,3D protein structure,Secondary_structures+loops+domains,50-1000 amino acids
Enzyme active site,functional_motif,500,biological,3.8_Gyr_ago,All life,Catalytic binding pocket,Amino_acid_residues+cofactors,5-20 key residues
Antibody,immune_protein,15000,biological,500_Myr_ago,Jawed vertebrates,Antigen recognition protein,Heavy+light_chains+variable_regions,~150 kDa protein
Hemoglobin,transport_protein,15000,biological,600_Myr_ago,Most animals,Oxygen transport protein,4_globin_subunits+4_heme_groups,~64 kDa protein
Myosin,motor_protein,20000,biological,1.0_Gyr_ago,Eukaryotes,Actin-based motor,Head+neck+tail_domains,~200 kDa protein
Kinesin,motor_protein,12000,biological,1.5_Gyr_ago,Eukaryotes,Microtubule motor,Motor_domain+stalk+tail,~120 kDa protein
Histone,DNA_packaging,8000,biological,2.0_Gyr_ago,Eukaryotes,DNA packaging protein,Core+tail_domains,~11-15 kDa proteins
Transcription factor,regulatory_protein,5000,biological,3.5_Gyr_ago,All life,Gene expression regulator,DNA_binding+regulatory_domains,~30-100 kDa proteins`;
        
        return this.parseCsvString(csvData, 'biological');
    }
    
    parseMolecularAssemblies() {
        const csvData = `name,chemical_formula,assembly_index,domain,molecular_mass,first_appearance,description,components,assembly_pathway
Hydrogen atom,H,2,cosmic,1.008,13.7_Gyr_ago,Simplest atom in universe,proton+electron,Big Bang nucleosynthesis
Helium atom,He,2,cosmic,4.003,13.7_Gyr_ago,Second lightest noble gas,2_protons+2_neutrons+2_electrons,Big Bang nucleosynthesis
Lithium atom,Li,3,cosmic,6.941,13.7_Gyr_ago,Lightest metal,3_protons+4_neutrons+3_electrons,Big Bang + stellar
Carbon atom,C,6,cosmic,12.011,13.0_Gyr_ago,Foundation of organic chemistry,6_protons+6_neutrons+6_electrons,Triple-alpha process
Nitrogen atom,N,7,cosmic,14.007,12.5_Gyr_ago,Essential for amino acids,7_protons+7_neutrons+7_electrons,CNO cycle
Oxygen atom,O,8,cosmic,15.999,12.5_Gyr_ago,Highly reactive oxidizer,8_protons+8_neutrons+8_electrons,Alpha process
Fluorine atom,F,9,cosmic,18.998,12.0_Gyr_ago,Most electronegative element,9_protons+10_neutrons+9_electrons,Alpha process
Neon atom,Ne,10,cosmic,20.180,12.0_Gyr_ago,Noble gas in stellar cores,10_protons+10_neutrons+10_electrons,Alpha process
Water,H2O,3,cosmic,18.015,13.4_Gyr_ago,Universal solvent,hydrogen+oxygen,Molecular cloud chemistry
Carbon monoxide,CO,12,cosmic,28.010,13.0_Gyr_ago,Common interstellar molecule,carbon+oxygen,Gas phase reactions
Carbon dioxide,CO2,15,cosmic,44.010,12.0_Gyr_ago,Greenhouse gas,carbon+2_oxygen,Combustion/respiration
Methane,CH4,12,cosmic,16.043,12.0_Gyr_ago,Simplest hydrocarbon,carbon+4_hydrogen,Hydrogenation reactions
Ammonia,NH3,10,cosmic,17.031,12.0_Gyr_ago,Nitrogen source for biology,nitrogen+3_hydrogen,Gas phase chemistry
Hydrogen sulfide,H2S,8,cosmic,34.082,12.0_Gyr_ago,Reducing gas in early atmospheres,sulfur+2_hydrogen,Volcanic outgassing
Formaldehyde,CH2O,15,cosmic,30.026,11.0_Gyr_ago,Organic precursor molecule,carbon+2_hydrogen+oxygen,Gas phase organic chemistry
Acetylene,C2H2,18,cosmic,26.038,10.0_Gyr_ago,Hydrocarbon building block,2_carbon+2_hydrogen,High temperature chemistry
Hydrogen cyanide,HCN,20,cosmic,27.025,10.0_Gyr_ago,Prebiotic synthesis precursor,hydrogen+carbon+nitrogen,Miller-Urey conditions
Formic acid,HCOOH,25,cosmic,46.025,8.0_Gyr_ago,Simplest carboxylic acid,carbon+2_oxygen+2_hydrogen,Organic synthesis
Glycine,C2H5NO2,80,biological,75.067,4.2_Gyr_ago,Simplest amino acid,carbon_backbone+amino_group+carboxyl,Prebiotic synthesis
Alanine,C3H7NO2,90,biological,89.094,4.2_Gyr_ago,Simple amino acid,methyl_side_chain+amino_acid_backbone,Strecker synthesis
Serine,C3H7NO3,95,biological,105.093,4.2_Gyr_ago,Hydroxyl amino acid,hydroxyl+amino_acid_backbone,Enzymatic synthesis
Ribose,C5H10O5,120,biological,150.130,4.0_Gyr_ago,RNA sugar component,5_carbon_sugar+hydroxyl_groups,Formose reaction
Glucose,C6H12O6,150,biological,180.156,3.8_Gyr_ago,Universal energy currency,6_carbon_ring+hydroxyl_groups,Photosynthesis
Adenosine,C10H13N5O4,300,biological,267.242,4.0_Gyr_ago,Nucleoside building block,adenine+ribose,Nucleoside synthesis
ATP,C10H16N5O13P3,400,biological,507.181,3.8_Gyr_ago,Universal energy currency,adenosine+3_phosphates,Enzymatic phosphorylation
Palmitic acid,C16H32O2,180,biological,256.424,3.5_Gyr_ago,Common fatty acid,16_carbon_chain+carboxyl,Fatty acid synthesis
Cholesterol,C27H46O,450,biological,386.654,2.0_Gyr_ago,Membrane component,steroid_backbone+hydroxyl,Mevalonate pathway
Hemoglobin subunit,C738H1166N812O203S2Fe,15000,biological,15840,600_Myr_ago,Oxygen transport protein,globin_chain+heme_group,Protein synthesis
Chlorophyll a,C55H72MgN4O5,800,biological,893.509,3.5_Gyr_ago,Photosynthesis pigment,porphyrin_ring+magnesium+phytol,Biosynthetic pathway
Cellulose,C6H10O5,200,biological,162.140,1.0_Gyr_ago,Structural polysaccharide,glucose_polymer+beta_linkages,Enzymatic polymerization
Quartz,SiO2,25,geological,60.083,4.4_Gyr_ago,Common silicate mineral,silicon+2_oxygen,Crystallization
Calcite,CaCO3,35,geological,100.087,3.8_Gyr_ago,Carbonate mineral,calcium+carbonate,Precipitation
Pyrite,FeS2,40,geological,119.975,3.5_Gyr_ago,Iron sulfide mineral,iron+2_sulfur,Hydrothermal precipitation
Magnetite,Fe3O4,60,geological,231.533,3.8_Gyr_ago,Iron oxide mineral,3_iron+4_oxygen,Oxidation-reduction
Diamond,C,25,geological,12.011,3.0_Gyr_ago,Carbon allotrope,carbon_network,High pressure crystallization
Graphite,C,20,geological,12.011,4.0_Gyr_ago,Carbon allotrope,carbon_layers,Metamorphism
Silicon dioxide,SiO2,25,technological,60.083,4.4_Gyr_ago,Glass component,silicon+2_oxygen,High temperature melting
Steel,Fe+C,10000,technological,55.845,3000_years_ago,Iron-carbon alloy,iron+carbon,Metallurgy
Polyethylene,C2H4,5000,technological,28.054,100_years_ago,Plastic polymer,ethylene_monomers,Polymerization
Polystyrene,C8H8,8000,technological,104.150,100_years_ago,Plastic polymer,styrene_monomers,Free radical polymerization
Silicon chip,Si+dopants,1000000,technological,28.086,70_years_ago,Semiconductor device,silicon_crystal+dopants,Photolithography
Carbon nanotube,C,50000,technological,12.011,30_years_ago,Cylindrical carbon structure,graphene_sheet,Chemical vapor deposition
Graphene,C,30000,technological,12.011,20_years_ago,2D carbon sheet,carbon_hexagonal_lattice,Exfoliation/CVD
Fullerene C60,C60,10000,technological,720.660,40_years_ago,Soccer ball carbon cage,60_carbon_atoms,Arc discharge
DNA nucleotide,C15H20N5O10P,500,biological,499.386,3.8_Gyr_ago,DNA building block,base+sugar+phosphate,Biosynthesis
RNA nucleotide,C14H18N5O11P,450,biological,507.308,4.0_Gyr_ago,RNA building block,base+ribose+phosphate,Biosynthesis
Penicillin,C16H18N2O4S,600,biological,334.390,100_years_ago,Antibiotic,beta_lactam_ring+side_chains,Fungal biosynthesis
Aspirin,C9H8O4,300,technological,180.158,150_years_ago,Pharmaceutical,acetyl_group+salicylic_acid,Chemical synthesis
Caffeine,C8H10N4O2,350,biological,194.194,30_Myr_ago,Stimulant alkaloid,purine_base+methyl_groups,Plant biosynthesis
Ethanol,C2H6O,35,biological,46.068,1_Gyr_ago,Alcohol,ethyl_group+hydroxyl,Fermentation
Acetic acid,C2H4O2,40,biological,60.052,3.5_Gyr_ago,Carboxylic acid,methyl+carboxyl_group,Acetyl-CoA pathway
Benzene,C6H6,150,technological,78.114,200_years_ago,Aromatic hydrocarbon,6_carbon_ring,Petroleum refining
Toluene,C7H8,180,technological,92.141,200_years_ago,Aromatic solvent,benzene+methyl_group,Petroleum refining
Phenol,C6H6O,200,technological,94.111,150_years_ago,Aromatic alcohol,benzene+hydroxyl,Coal tar distillation`;
        
        return this.parseCsvString(csvData, 'cosmic');
    }
    
    parseTechnologicalAssemblies() {
        const csvData = `name,type,assembly_index,domain,invention_date,inventor_culture,description,components,complexity_estimate
Stone tool,tool,1000,technological,3.3_Myr_ago,Early hominins,Shaped stone implement,Stone+knapping_technique,Simple tool
Spear,weapon,5000,technological,400_kyr_ago,Homo heidelbergensis,Hunting projectile,Wooden_shaft+stone_point+binding,Composite tool
Bow and arrow,weapon_system,20000,technological,65_kyr_ago,Modern humans,Projectile weapon system,Bow+arrows+string+fletching,Precision weapon system
Wheel,machine_component,30000,technological,5500_years_ago,Mesopotamians,Rotating transport aid,Wood/stone_disc+axle+bearing,Revolutionary transport
Lever,simple_machine,5000,technological,Ancient,Multiple cultures,Force multiplication tool,Rigid_bar+fulcrum+effort+load,Mechanical advantage
Pulley,simple_machine,15000,technological,Ancient,Greeks/Romans,Lifting mechanism,Wheel+rope+mounting,Compound machine
Screw,simple_machine,25000,technological,Ancient,Greeks,Threaded fastener,Helical_thread+shaft+head,Precise mechanism
Water wheel,power_system,100000,technological,2000_years_ago,Romans/Chinese,Water-powered mill,Wheel+paddles+axle+gearing,Power conversion
Windmill,power_system,150000,technological,1000_years_ago,Europeans,Wind-powered mill,Blades+tower+gearing+millstones,Wind power system
Printing press,information_system,500000,technological,1450_CE,Gutenberg,Movable type printing,Press+type+ink+paper_feed,Information revolution
Clock,precision_instrument,1000000,technological,1300_CE,Europeans,Mechanical timekeeper,Escapement+gears+springs+dial,Precision timekeeping
Steam engine,power_system,10000000,technological,1712_CE,Newcomen/Watt,Heat-to-work converter,Boiler+piston+cylinder+condenser,Industrial power
Locomotive,transport_system,50000000,technological,1804_CE,Trevithick,Steam-powered transport,Steam_engine+wheels+rails+cars,Transportation revolution
Telegraph,communication_system,5000000,technological,1844_CE,Morse,Electrical communication,Wire+key+receiver+code,Long-distance communication
Telephone,communication_device,20000000,technological,1876_CE,Bell,Voice communication,Microphone+speaker+switching+wires,Voice transmission
Light bulb,electrical_device,100000,technological,1879_CE,Edison,Electrical illumination,Filament+glass+base+electrical,Electric lighting
Electric motor,power_system,5000000,technological,1886_CE,Tesla,Electrical to mechanical,Stator+rotor+commutator+brushes,Electric power conversion
Automobile,transport_system,100000000,technological,1885_CE,Benz,Personal motor vehicle,Engine+chassis+wheels+controls,Personal transportation
Airplane,transport_system,500000000,technological,1903_CE,Wright Brothers,Powered flight machine,Wings+engine+propeller+controls,Aviation technology
Radio,communication_system,10000000,technological,1901_CE,Marconi,Wireless communication,Transmitter+receiver+antenna+tuning,Wireless broadcasting
Television,information_system,100000000,technological,1926_CE,Baird,Visual broadcasting,Camera+transmitter+receiver+display,Visual communication
Computer,information_system,10000000000,technological,1940s_CE,Multiple inventors,Electronic calculation,Processor+memory+storage+input/output,Information processing
Transistor,electronic_component,1000000,technological,1947_CE,Bell Labs,Electronic switch,Semiconductor+gate+source+drain,Electronic revolution
Integrated circuit,electronic_system,100000000,technological,1958_CE,Kilby/Noyce,Miniaturized electronics,Transistors+resistors+capacitors+chip,Microelectronics
Microprocessor,computational_system,1000000000,technological,1971_CE,Intel,Computer on a chip,CPU_core+cache+buses+packaging,Computer revolution
Personal computer,computational_system,10000000000,technological,1975_CE,Multiple,Individual computing,Microprocessor+memory+storage+interface,Personal computing
Internet,network_system,100000000000000,technological,1969_CE,ARPANET,Global network,Routers+servers+cables+protocols,Global connectivity
Smartphone,communication_system,10000000000000,technological,2007_CE,Apple,Pocket computer/phone,Processor+memory+sensors+display+radio,Mobile computing
World Wide Web,information_system,1000000000000000,technological,1989_CE,Berners-Lee,Global information system,Servers+browsers+HTML+HTTP+URLs,Global information
Laser,optical_device,10000000,technological,1960_CE,Maiman,Coherent light source,Gain_medium+mirrors+pump+beam,Coherent optics
Solar panel,energy_system,50000000,technological,1954_CE,Bell Labs,Photovoltaic converter,Silicon_cells+glass+frame+wiring,Solar energy conversion
Nuclear reactor,energy_system,1000000000000,technological,1942_CE,Fermi,Controlled nuclear fission,Fuel+moderator+control_rods+containment,Nuclear power
Satellite,space_system,1000000000,technological,1957_CE,Soviet Union,Orbital communication,Spacecraft+solar_panels+antennas+electronics,Space technology
Rocket engine,propulsion_system,500000000,technological,1926_CE,Goddard,Reaction propulsion,Combustion_chamber+nozzle+fuel_system,Space propulsion
Space station,space_habitat,10000000000000,technological,1971_CE,Soviet Union,Orbital laboratory,Modules+life_support+solar_arrays+docking,Space habitation
GPS system,navigation_system,100000000000000,technological,1978_CE,US Military,Global positioning,Satellites+receivers+atomic_clocks+computers,Global navigation
MRI machine,medical_device,10000000000,technological,1977_CE,Damadian,Magnetic resonance imaging,Magnet+RF_coils+computer+software,Medical imaging
CT scanner,medical_device,1000000000,technological,1972_CE,Hounsfield,X-ray computed tomography,X-ray_source+detectors+computer+reconstruction,Medical diagnosis
DNA sequencer,scientific_instrument,100000000000,technological,1977_CE,Sanger/Gilbert,Genetic code reader,Enzymes+fluorescence+detectors+computer,Genomics revolution
PCR machine,laboratory_instrument,100000000,technological,1983_CE,Mullis,DNA amplification,Thermal_cycler+enzymes+primers+detection,Molecular biology
Electron microscope,scientific_instrument,1000000000,technological,1931_CE,Ruska,High-resolution imaging,Electron_gun+lenses+detector+vacuum,Nanoscale imaging
Particle accelerator,physics_instrument,100000000000000,technological,1930_CE,Lawrence,High-energy physics,Magnets+RF_cavities+beam_pipes+detectors,Fundamental physics
3D printer,manufacturing_system,1000000000,technological,1983_CE,Hull,Additive manufacturing,Print_head+materials+software+platform,Digital manufacturing
Robot,automation_system,1000000000,technological,1954_CE,Devol,Programmable automation,Actuators+sensors+controller+software,Industrial automation
Artificial heart,medical_device,10000000000,technological,1957_CE,Kolff,Mechanical heart replacement,Pumps+valves+power+controls,Artificial organs
Pacemaker,medical_device,100000000,technological,1958_CE,Senning,Heart rhythm control,Pulse_generator+leads+battery+electronics,Cardiac therapy
Cochlear implant,medical_device,500000000,technological,1961_CE,House,Artificial hearing,Microphone+processor+stimulator+electrodes,Sensory restoration
Brain-computer interface,neural_device,10000000000000,technological,1970s_CE,Multiple,Direct neural control,Electrodes+amplifiers+computer+software,Neural technology
Quantum computer,computational_system,1000000000000000,technological,1998_CE,Multiple,Quantum information processing,Qubits+control+readout+error_correction,Quantum computing
CRISPR system,biotechnology_tool,100000000000,technological,2012_CE,Doudna/Charpentier,Gene editing tool,Guide_RNA+Cas_protein+delivery+targets,Genetic engineering
Fusion reactor,energy_system,10000000000000000,technological,2022_CE,Multiple,Controlled nuclear fusion,Magnetic_confinement+plasma+heating+control,Fusion power
Artificial general intelligence,ai_system,1000000000000000000,technological,Future,Unknown,Human-level AI,Neural_networks+training+inference+integration,AGI system
Space elevator,transport_system,100000000000000000,technological,Concept,Theoretical,Orbital transport,Tether+counterweight+climbers+power,Space access
Dyson sphere,energy_system,10000000000000000000,technological,Concept,Theoretical,Stellar energy capture,Solar_collectors+structure+transmission,Stellar engineering
Molecular assembler,manufacturing_system,1000000000000000000,technological,Concept,Theoretical,Atomic precision manufacturing,Manipulators+feedstock+software+products,Molecular manufacturing
Digital consciousness,information_system,10000000000000000000,technological,Concept,Theoretical,Uploaded human mind,Neural_simulation+storage+processing+interface,Mind uploading`;
        
        return this.parseCsvString(csvData, 'technological');
    }
    
    parseCsvString(csvData, defaultDomain) {
        const lines = csvData.trim().split('\n');
        const headers = lines[0].split(',');
        const rows = lines.slice(1);
        
        return rows.map(row => {
            const values = this.parseCSVRow(row);
            const obj = {};
            
            headers.forEach((header, index) => {
                obj[header] = values[index] || '';
            });
            
            // Normalize to our network format
            return this.normalizeNode(obj, defaultDomain);
        });
    }
    
    parseCSVRow(row) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < row.length; i++) {
            const char = row[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        result.push(current.trim());
        return result;
    }
    
    normalizeNode(rawNode, defaultDomain) {
        // Extract assembly index - handle various column names
        let assemblyIndex = rawNode.assembly_index || rawNode.measured_ai || rawNode.theoretical_ai;
        if (typeof assemblyIndex === 'string') {
            // Handle ranges like "80-150" - take the midpoint
            if (assemblyIndex.includes('-')) {
                const parts = assemblyIndex.split('-');
                assemblyIndex = (parseInt(parts[0]) + parseInt(parts[1])) / 2;
            } else {
                assemblyIndex = parseInt(assemblyIndex);
            }
        }
        
        // Determine domain
        let domain = rawNode.domain || defaultDomain;
        if (!this.domainColors[domain]) {
            domain = defaultDomain;
        }
        
        // Extract name
        const name = rawNode.name || rawNode.object_name || 'Unknown';
        
        // Extract description
        const description = rawNode.description || rawNode.notes || '';
        
        // Extract time origin
        let timeOrigin = rawNode.first_appearance || rawNode.invention_date || '';
        if (!timeOrigin && domain === 'cosmic') {
            timeOrigin = '13.8 Gyr ago';
        }
        
        // Create normalized node
        const tier = this.getAssemblyTier(assemblyIndex);
        
        return {
            id: name.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, ''),
            name: name,
            assembly_index: assemblyIndex,
            domain: domain,
            tier: tier.tier,
            visual_complexity: tier.symbol,
            color: this.domainColors[domain],
            radius: this.getNodeRadius(tier.tier),
            time_origin: timeOrigin,
            description: description,
            copy_number: this.estimateCopyNumber(assemblyIndex, domain),
            github_url: this.generateGitHubUrl({ name, domain }),
            raw_data: rawNode
        };
    }
    
    getAssemblyTier(assemblyIndex) {
        const tiers = [
            { min: 1, max: 10, tier: 1, symbol: '•' },
            { min: 10, max: 100, tier: 2, symbol: '••' },
            { min: 100, max: 1000, tier: 3, symbol: '•••' },
            { min: 1000, max: 10000, tier: 4, symbol: '••••' },
            { min: 10000, max: 100000, tier: 5, symbol: '•••••' },
            { min: 100000, max: 1000000, tier: 6, symbol: '••••••' },
            { min: 1000000, max: 1000000000, tier: 7, symbol: '•••••••' },
            { min: 1000000000, max: Infinity, tier: 8, symbol: '••••••••' }
        ];
        
        return tiers.find(tier => 
            assemblyIndex >= tier.min && assemblyIndex <= tier.max
        ) || tiers[0];
    }
    
    getNodeRadius(tier) {
        return 3 + (tier * 2);
    }
    
    generateGitHubUrl(node) {
        const baseUrl = 'https://github.com/owocki/assembly_theory/tree/master/domains';
        
        // Convert node name to filename format
        const filename = node.name
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '') // Remove special characters
            .replace(/\s+/g, '_') // Replace spaces with underscores
            .replace(/_+/g, '_') // Remove duplicate underscores
            .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
        
        // Basic subdirectory mapping
        const subdir = this.getBasicSubdir(node.domain, filename);
        const path = subdir ? `${node.domain}/${subdir}/${filename}.md` : `${node.domain}/${filename}.md`;
        
        return `${baseUrl}/${path}`;
    }
    
    getBasicSubdir(domain, filename) {
        // Basic mapping for common files
        if (domain === 'cosmic') {
            if (['hydrogen', 'helium', 'carbon', 'oxygen'].includes(filename)) return 'atoms';
            if (['water', 'co2', 'methane'].includes(filename)) return 'molecules';
            if (['proton', 'electron', 'neutron'].includes(filename)) return 'particles';
        }
        if (domain === 'geological') {
            if (['quartz', 'clay'].includes(filename)) return 'minerals';
        }
        if (domain === 'biological') {
            if (['ribosome', 'bacteria'].includes(filename)) return 'prokaryotic';
        }
        return '';
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
    
    // Generate edges based on case study pathways and common relationships
    generateEdges(nodes) {
        const edges = [];
        const nodeMap = new Map(nodes.map(n => [n.id, n]));
        
        // High-priority relationships from case study analysis
        const caseStudyRelationships = [
            // Foundation layer dependencies
            { from: 'water', to: 'dna_nucleotide', type: 'enables', symbol: '→', weight: 95 },
            { from: 'carbon_atom', to: 'glucose', type: 'enables', symbol: '→', weight: 90 },
            { from: 'dna_nucleotide', to: 'ribosome', type: 'codes_for', symbol: '→', weight: 90 },
            
            // Biological hierarchies (from case studies)
            { from: 'ribosome', to: 'prokaryotic_cell', type: 'assembles_into', symbol: '×', weight: 85 },
            { from: 'prokaryotic_cell', to: 'eukaryotic_cell', type: 'forms', symbol: '⇒', weight: 80 },
            { from: 'eukaryotic_cell', to: 'neural_network', type: 'networks_into', symbol: '×', weight: 85 },
            { from: 'neural_network', to: 'brain', type: 'networks_into', symbol: '×', weight: 85 },
            { from: 'brain', to: 'language_system', type: 'generates', symbol: '⇒', weight: 75 },
            
            // Cross-domain bridges from case studies
            { from: 'language_system', to: 'printing_press', type: 'enables', symbol: '→', weight: 70 },
            { from: 'language_system', to: 'computer', type: 'transmits', symbol: '→', weight: 75 },
            { from: 'printing_press', to: 'internet', type: 'evolves_to', symbol: '→', weight: 65 },
            { from: 'computer', to: 'internet', type: 'creates', symbol: '×', weight: 80 },
            { from: 'internet', to: 'smartphone', type: 'supports', symbol: '×', weight: 75 },
            
            // Ecosystem and climate relationships
            { from: 'eukaryotic_cell', to: 'ecosystem', type: 'participates_in', symbol: '×', weight: 70 },
            { from: 'ecosystem', to: 'culture', type: 'regulates', symbol: '≈', weight: 65 },
            
            // Social and collective intelligence
            { from: 'brain', to: 'culture', type: 'enables', symbol: '→', weight: 70 },
            { from: 'language_system', to: 'culture', type: 'coordinates', symbol: '×', weight: 80 },
            { from: 'culture', to: 'internet', type: 'enables', symbol: '→', weight: 60 },
            
            // Modern technology pathways
            { from: 'transistor', to: 'integrated_circuit', type: 'miniaturization', symbol: '×', weight: 85 },
            { from: 'integrated_circuit', to: 'microprocessor', type: 'integration', symbol: '×', weight: 80 },
            { from: 'microprocessor', to: 'personal_computer', type: 'system_assembly', symbol: '×', weight: 85 },
            { from: 'personal_computer', to: 'internet', type: 'network_assembly', symbol: '×', weight: 80 },
            
            // Convergent evolution patterns
            { from: 'brain', to: 'computer', type: 'functional_analogy', symbol: '≈', weight: 65 },
            { from: 'dna_nucleotide', to: 'computer', type: 'information_processing', symbol: '≈', weight: 70 },
            { from: 'ecosystem', to: 'internet', type: 'network_similarity', symbol: '≈', weight: 60 }
        ];
        
        // Legacy relationships for backward compatibility
        const legacyRelationships = [
            // Cosmic to geological
            { from: 'carbon_atom', to: 'diamond', type: 'crystallization', symbol: '→', weight: 60 },
            { from: 'carbon_atom', to: 'graphite', type: 'crystallization', symbol: '→', weight: 60 },
            
            // Cosmic to biological
            { from: 'water', to: 'glycine', type: 'prebiotic_chemistry', symbol: '→', weight: 70 },
            { from: 'hydrogen_atom', to: 'atp', type: 'biochemical_pathway', symbol: '→', weight: 65 },
            
            // Additional technological evolution
            { from: 'stone_tool', to: 'wheel', type: 'technological_evolution', symbol: '→', weight: 60 },
            { from: 'wheel', to: 'steam_engine', type: 'mechanical_evolution', symbol: '→', weight: 55 },
            { from: 'steam_engine', to: 'automobile', type: 'transportation_evolution', symbol: '→', weight: 65 }
        ];
        
        // Combine all relationships
        const allRelationships = [...caseStudyRelationships, ...legacyRelationships];
        
        // Create edges where both nodes exist
        allRelationships.forEach(rel => {
            const sourceNode = nodeMap.get(rel.from);
            const targetNode = nodeMap.get(rel.to);
            
            if (sourceNode && targetNode) {
                edges.push({
                    source: rel.from,
                    target: rel.to,
                    type: rel.type,
                    symbol: rel.symbol,
                    weight: rel.weight || this.calculateEdgeWeight(sourceNode, targetNode)
                });
            }
        });
        
        // Generate additional edges based on domain proximity and AI similarity
        this.generateProximityEdges(nodes, edges);
        
        return edges;
    }
    
    generateProximityEdges(nodes, edges) {
        const existingEdges = new Set(edges.map(e => `${e.source}-${e.target}`));
        
        nodes.forEach((node, i) => {
            nodes.slice(i + 1).forEach(otherNode => {
                const edgeKey = `${node.id}-${otherNode.id}`;
                const reverseKey = `${otherNode.id}-${node.id}`;
                
                // Skip if edge already exists
                if (existingEdges.has(edgeKey) || existingEdges.has(reverseKey)) {
                    return;
                }
                
                // Connect nodes with similar AI values in same domain
                const aiRatio = Math.max(node.assembly_index, otherNode.assembly_index) / 
                              Math.min(node.assembly_index, otherNode.assembly_index);
                
                if (node.domain === otherNode.domain && aiRatio < 5) {
                    edges.push({
                        source: node.id,
                        target: otherNode.id,
                        type: 'domain_proximity',
                        symbol: '↔',
                        weight: 1 / aiRatio
                    });
                    existingEdges.add(edgeKey);
                }
                
                // Connect across domains with similar AI (convergent evolution)
                if (node.domain !== otherNode.domain && aiRatio < 2) {
                    edges.push({
                        source: node.id,
                        target: otherNode.id,
                        type: 'convergent_evolution',
                        symbol: '≈',
                        weight: 1 / aiRatio
                    });
                    existingEdges.add(edgeKey);
                }
            });
        });
    }
    
    calculateEdgeWeight(sourceNode, targetNode) {
        const aiDiff = Math.abs(sourceNode.assembly_index - targetNode.assembly_index);
        return Math.max(0.1, 2 - Math.log10(aiDiff + 1));
    }
    
    // Main method to generate complete dataset
    async generateCompleteDataset() {
        try {
            // Process all CSV data
            const csvData = await this.processCsvData();
            
            // Combine all nodes
            const allNodes = [
                ...csvData.assemblyMeasurements,
                ...csvData.biologicalAssemblies,
                ...csvData.molecularAssemblies,
                ...csvData.technologicalAssemblies
            ];
            
            // Remove duplicates based on name
            const uniqueNodes = [];
            const seenNames = new Set();
            
            allNodes.forEach(node => {
                if (!seenNames.has(node.id)) {
                    uniqueNodes.push(node);
                    seenNames.add(node.id);
                }
            });
            
            // Generate edges
            const edges = this.generateEdges(uniqueNodes);
            
            // Return complete dataset
            return {
                nodes: uniqueNodes,
                edges: edges,
                metadata: {
                    visualization_type: 'network_graph',
                    complexity_scale: 'AI_1_to_1B+',
                    time_range: 'big_bang_to_present',
                    domain_colors: this.domainColors,
                    total_nodes: uniqueNodes.length,
                    total_edges: edges.length,
                    domains: Object.keys(this.domainColors),
                    ai_range: {
                        min: Math.min(...uniqueNodes.map(n => n.assembly_index)),
                        max: Math.max(...uniqueNodes.map(n => n.assembly_index))
                    }
                }
            };
        } catch (error) {
            console.error('Error generating complete dataset:', error);
            return null;
        }
    }
}