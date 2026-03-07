// --- Global Constants ---
const DEPARTMENTS = [
    { id: 'chem-eng', name: 'Chemical Engineering', icon: 'flask-conical', color: 'blue' },
    { id: 'biotech', name: 'Biotechnology', icon: 'dna', color: 'indigo' },
    { id: 'bioinfo', name: 'Bioinformatics', icon: 'cpu', color: 'sky' },
    { id: 'bioeng-nano', name: 'Bioengineering', icon: 'microscope', color: 'violet' },
    { id: 'chem', name: 'Chemistry', icon: 'flask-conical', color: 'emerald' }
];

const DATA = {
    'chem-eng': {
        higherStudies: {
            mtech: [
                { name: "IIT Madras", location: "Chennai, TN", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE", specializations: ["Process Systems Engineering", "Polymer Science", "AI + Process Optimization"], url: "https://www.iitm.ac.in" },
                { name: "IIT Bombay", location: "Mumbai, MH", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE", specializations: ["Energy Systems", "Materials Engineering", "Sustainable Process Design"], url: "https://www.che.iitb.ac.in" },
                { name: "IIT Delhi", location: "New Delhi", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE", specializations: ["Reaction Engineering", "Process Modelling"], url: "https://home.iitd.ac.in" },
                { name: "IIT Kanpur", location: "Kanpur, UP", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE", specializations: ["Advanced Flow Simulation", "Particulate Systems"], url: "https://www.iitk.ac.in" },
                { name: "IIT Kharagpur", location: "Kharagpur, WB", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE", specializations: ["Petroleum Refining", "Gas Technology"], url: "https://www.iitkgp.ac.in" },
                { name: "IIT Guwahati", location: "Guwahati, AS", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE", specializations: ["Computer-Aided Design", "Water Purification"], url: "https://www.iitg.ac.in" },
                { name: "IIT Hyderabad", location: "Kandi, TG", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE", specializations: ["Catalysis", "Fine Chemicals"], url: "https://www.iith.ac.in" },
                { name: "NIT Trichy", location: "Trichy, TN", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE/CCMT", specializations: ["Chemical Process Design", "Energy Engineering"], url: "https://www.nitt.edu" },
                { name: "NIT Warangal", location: "Warangal, TG", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE/CCMT", specializations: ["Process Control", "Environmental Engineering"], url: "https://www.nitw.ac.in" },
                { name: "NIT Surathkal", location: "Surathkal, KA", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE/CCMT", specializations: ["Industrial Safety", "Heat Transfer"], url: "https://www.nitk.ac.in" },
                { name: "NIT Calicut", location: "Kozhikode, KL", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE", specializations: ["Fluidization", "Mass Transfer"], url: "https://www.nitc.ac.in" },
                { name: "BITS Pilani", location: "Pilani, RJ", degree: "M.E", program: "Chemical Engineering", entrance: "GATE/BITS HD", specializations: ["Process Engineering", "Industrial Chemical Technology"], url: "https://www.bits-pilani.ac.in" },
                { name: "Anna University", location: "Chennai, TN", degree: "M.E", program: "Chemical Engineering", entrance: "TANCET/GATE", specializations: ["Petroleum Refining", "Bio-Processing"], url: "https://www.annauniv.edu" },
                { name: "ICT Mumbai", location: "Mumbai, MH", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE", specializations: ["Polymer Engineering", "Chemical Technology"], url: "https://www.ictmumbai.edu.in" },
                { name: "Jadavpur University", location: "Kolkata, WB", degree: "M.E", program: "Chemical Engineering", entrance: "WBJEE/University", specializations: ["Advanced Reaction Eng", "Pollution Control"], url: "https://www.jaduniv.edu.in" }
            ],
            phd: [
                { name: "IIT Madras", location: "Chennai, TN", degree: "PhD", program: "Chemical Engineering", entrance: "GATE/NET", specializations: ["Process Systems", "Energy"], url: "https://www.iitm.ac.in" },
                { name: "IIT Bombay", location: "Mumbai, MH", degree: "PhD", program: "Chemical Engineering", entrance: "GATE/CSIR-NET", specializations: ["Catalysis", "Materials"], url: "https://www.che.iitb.ac.in" },
                { name: "IIT Delhi", location: "New Delhi", degree: "PhD", program: "Chemical Engineering", entrance: "GATE/NET", specializations: ["Reaction Engineering"], url: "https://home.iitd.ac.in" },
                { name: "IIT Kanpur", location: "Kanpur, UP", degree: "PhD", program: "Chemical Engineering", entrance: "GATE", specializations: ["Advanced Separation"], url: "https://www.iitk.ac.in" },
                { name: "IIT Kharagpur", location: "Kharagpur, WB", degree: "PhD", program: "Chemical Engineering", entrance: "GATE", specializations: ["Petroleum Refining"], url: "https://www.iitkgp.ac.in" },
                { name: "IIT Guwahati", location: "Guwahati, AS", degree: "PhD", program: "Chemical Engineering", entrance: "GATE", specializations: ["Nanotechnology"], url: "https://www.iitg.ac.in" },
                { name: "IISc Bangalore", location: "Bengaluru, KA", degree: "PhD", program: "Chemical Sciences", entrance: "GATE/NET", specializations: ["Chemical Sciences"], url: "https://www.iisc.ac.in" },
                { name: "ICT Mumbai", location: "Mumbai, MH", degree: "PhD", program: "Chemical Engineering", entrance: "GATE", specializations: ["Chemical Engineering Technology"], url: "https://www.ictmumbai.edu.in" }
            ]
        },
        exams: [
            { name: "GATE", purpose: "M.Tech/PhD/PSU Jobs", eligibility: "BE/BTech/MSc Final Year Allowed", date: "February", url: "https://gate2026.iitg.ac.in/", syllabusUrl: "https://gate2026.iitg.ac.in/", syllabus: "Engg Maths, Thermodynamics, Fluid Mechanics, Heat & Mass Transfer" },
            { name: "CSIR-UGC NET", purpose: "PhD/JRF (Chemical Sciences)", eligibility: "MSc with 55%", date: "June & December", url: "https://csirnet.nta.ac.in/", syllabusUrl: "https://csirnet.nta.ac.in/", syllabus: "Physical, Organic, Inorganic Chemistry" },
            { name: "ESE (UPSC)", purpose: "Govt Engineering Jobs", eligibility: "Engineering Graduates", date: "June", url: "https://www.upsc.gov.in/", syllabusUrl: "https://www.upsc.gov.in/", syllabus: "Engineering Mechanics, Design, Manufacturing" },
            { name: "TANCET", purpose: "PG Admissions in Tamil Nadu Colleges", eligibility: "Engineering Graduates", date: "March", url: "https://tancet.annauniv.edu/", syllabusUrl: "https://tancet.annauniv.edu/", syllabus: "Thermodynamics, Process Engineering" },
            { name: "BITS HD", purpose: "PG Admissions in BITS Pilani", eligibility: "Engineering Graduates", date: "May", url: "https://www.bits-pilani.ac.in/", syllabusUrl: "https://www.bits-pilani.ac.in/", syllabus: "Chemical Engineering Fundamentals" }
        ],
        skillInventory: ["Aspen Plus", "HYSYS", "Heat Exchanger Design", "Mass Transfer", "Fluid Dynamics", "MATLAB", "Six Sigma"],
        jobRoles: [{ title: "Process Design Engineer", salary: "₹7-16 LPA", companies: ["Reliance", "IOCL", "Honeywell"], jd: "Focus on industrial plant design and steady-state simulations." }],
        startups: { 
            ideas: ["Eco-friendly Pigments", "Bio-degradable Plastics", "Advanced Filtration Systems"], 
            ecosystem: [
                { name: "Sea6 Energy", focus: "Biofuels, agricultural biostimulants", desc: "Marine biotech firm using seaweed biorefineries.", url: "http://www.sea6energy.com" },
                { name: "Log9 Materials", focus: "Graphene batteries, EV battery packs", desc: "Advanced materials company developing future energy systems.", url: "https://www.log9materials.com" },
                { name: "Carbon Clean", focus: "Modular carbon capture units", desc: "Industrial carbon capture company.", url: "https://www.carbonclean.com" },
                { name: "Aether Industries", focus: "Pharma & agro intermediates", desc: "Specialty chemical manufacturer.", url: "https://www.aether.co.in" },
                { name: "Clean Science & Technology", focus: "Performance chemicals", desc: "Green chemistry innovator using eco-friendly processes.", url: "https://cleanscience.co.in" },
                { name: "Prasol Chemicals", focus: "Specialty solvents & reagents", desc: "Industrial solvent manufacturer.", url: "https://prasolchem.com" },
                { name: "Greenjoules", focus: "Industrial biofuels", desc: "Biofuel producer for decarbonization.", url: "https://greenjoules.com" },
                { name: "Altigreen", focus: "Electric propulsion systems", desc: "Electric mobility engineering company.", url: "https://altigreen.com" },
                { name: "Fermbox Bio", focus: "Bio-based chemical ingredients", desc: "Precision fermentation startup.", url: "https://www.fermboxbio.com" },
                { name: "String Bio", focus: "Bio-proteins & bio-chemicals", desc: "Methane fermentation biotech.", url: "https://www.stringbio.com" },
                { name: "Aarti Industries", focus: "Specialty chemicals", desc: "Chemical manufacturer and pharma intermediate provider.", url: "https://www.aarti-industries.com" },
                { name: "Atul Ltd", focus: "Performance & specialty chemicals", desc: "Integrated chemical producer.", url: "https://www.atul.co.in" },
                { name: "SRF Ltd", focus: "Fluorochemicals", desc: "Fluorochemical company and advanced materials producer.", url: "https://www.srf.com" },
                { name: "Navin Fluorine", focus: "High-performance fluorinated chemicals", desc: "Fluorochemicals manufacturer.", url: "https://www.nfil.in" },
                { name: "PI Industries", focus: "Crop protection chemicals", desc: "Agrochemical R&D company and custom synthesis.", url: "https://www.piindustries.com" }
            ],
            guide: [
                { title: "Startup India Registration", tag: "Registration | Central", content: "National startup recognition for tax benefits and fast-track patents.", steps: "Incorporate → Apply via DPIIT Portal → Upload docs → Approval.", req: "Innovative startup < 10 years old.", contact: "dipp-startups@gov.in", url: "https://www.startupindia.gov.in" },
                { title: "StartupTN Seed Grant", tag: "Funding | Tamil Nadu", content: "Seed funding for early-stage startups in Tamil Nadu.", steps: "Register on StartupTN → Submit Pitch Deck → Selection → Grant Disbursal.", req: "Registered in TN; Innovative product.", contact: "support@startuptn.in", url: "https://startuptn.in" },
                { title: "IIT Madras Incubation", tag: "Incubation | Tamil Nadu", content: "World-class deep-tech incubation support and lab access.", steps: "Apply online → Technical Interview → Incubation Agreement.", req: "Tech-heavy startup; Student/Alumni/General categories.", contact: "support@incubation.iitm.ac.in", url: "https://incubation.iitm.ac.in" },
                { title: "SIDBI Fund of Funds", tag: "Funding | Central", content: "VC-backed investment support for scalable startups.", steps: "Raise funding from VC → SIDBI-backed fund invests alongside.", req: "Scalable business model; Growth-oriented.", contact: "info@sidbi.in", url: "https://www.sidbi.in" },
                { title: "MSME Udyam Registration", tag: "Registration | Central", content: "Access MSME benefits, subsidies, and credit guarantee schemes.", steps: "Apply online via Udyam Portal → Digital Certificate generation.", req: "Valid PAN & Aadhaar required.", contact: "1800-180-6763", url: "https://udyamregistration.gov.in" },
                { title: "Technology Development Board", tag: "Funding | Central", content: "Funding for commercialization of indigenous technology.", steps: "Submit project proposal → Technical Review → Board Approval.", req: "Functional prototype ready for market.", contact: "info@tdb.gov.in", url: "https://tdb.gov.in" }
            ]
        }
    },
    'biotech': {
        higherStudies: {
            mtech: [
                { name: "IIT Delhi", location: "New Delhi", degree: "M.Tech", program: "Biochemical Engineering", entrance: "GATE", specializations: ["Biochemical Engineering", "Bioprocess Technology"], url: "https://home.iitd.ac.in" },
                { name: "IIT Madras", location: "Chennai, TN", degree: "M.Tech", program: "Biotechnology", entrance: "GATE", specializations: ["Industrial Biotechnology", "Genetic Engineering"], url: "https://www.iitm.ac.in" },
                { name: "IIT Kharagpur", location: "Kharagpur, WB", degree: "M.Tech", program: "Biotechnology", entrance: "GATE", specializations: ["Downstream Processing", "Bio-Energy"], url: "https://www.iitkgp.ac.in" },
                { name: "IIT Guwahati", location: "Guwahati, AS", degree: "M.Tech", program: "Biotechnology", entrance: "GATE", specializations: ["Tissue Engineering", "Nanobiotech"], url: "https://www.iitg.ac.in" },
                { name: "IISc Bangalore", location: "Bengaluru, KA", degree: "M.Tech", program: "Biological Sciences", entrance: "GATE", specializations: ["Biological Sciences", "Synthetic Biology"], url: "https://www.iisc.ac.in" },
                { name: "JNU", location: "New Delhi", degree: "M.Sc", program: "Biotechnology", entrance: "GAT-B", specializations: ["Molecular Biology", "Genomics"], url: "https://www.jnu.ac.in" },
                { name: "University of Hyderabad", location: "Hyderabad, TG", degree: "M.Sc", program: "Biotechnology", entrance: "CUET-PG", specializations: ["Animal Biotech", "Plant Sciences"], url: "https://uohyd.ac.in" },
                { name: "Anna University", location: "Chennai, TN", degree: "M.Tech", program: "Biotechnology", entrance: "TANCET", specializations: ["Bio-pharmaceuticals", "Environmental Biotech"], url: "https://www.annauniv.edu" },
                { name: "VIT Vellore", location: "Vellore, TN", degree: "M.Tech", program: "Biotechnology", entrance: "VITMEE", specializations: ["Industrial Biotechnology", "Bioinformatics Integration"], url: "https://vit.ac.in" },
                { name: "SRM Institute", location: "Chennai, TN", degree: "M.Tech", program: "Biotechnology", entrance: "SRMJEEE PG", specializations: ["Medical Biotechnology", "Drug Discovery"], url: "https://www.srmist.edu.in" }
            ],
            phd: [
                { name: "IIT Delhi", degree: "PhD", program: "Biochemical Engineering", entrance: "GATE/NET", specializations: ["Biochemical Engineering"], url: "https://home.iitd.ac.in" },
                { name: "IIT Madras", degree: "PhD", program: "Biotechnology", entrance: "GATE/NET", specializations: ["Biotechnology"], url: "https://www.iitm.ac.in" },
                { name: "IISc Bangalore", degree: "PhD", program: "Biological Sciences", entrance: "GATE/NET", specializations: ["Biological Sciences"], url: "https://www.iisc.ac.in" },
                { name: "JNU", degree: "PhD", program: "Biotechnology", entrance: "NET/GAT-B", specializations: ["Biotechnology"], url: "https://www.jnu.ac.in" },
                { name: "RCB", location: "Faridabad", degree: "PhD", program: "Biotechnology", entrance: "DBT-JRF/NET", url: "https://rcb.res.in" },
                { name: "University of Hyderabad", degree: "PhD", program: "Biotechnology", entrance: "NET/CUET", specializations: ["Biotechnology"], url: "https://uohyd.ac.in" }
            ]
        },
        exams: [
            { name: "GAT-B", purpose: "MSc/MTech Biotechnology Admissions", eligibility: "BSc/BTech Life Sciences", date: "April", url: "https://www.nta.ac.in/", syllabusUrl: "https://www.nta.ac.in/", syllabus: "Genetics, Molecular Biology" },
            { name: "DBT-JRF", purpose: "PhD Fellowship", eligibility: "MSc Biotechnology/Life Science", date: "May", url: "https://dbtindia.gov.in/", syllabusUrl: "https://dbtindia.gov.in/", syllabus: "Immunology, Biotechnology" },
            { name: "CSIR NET Life Sciences", purpose: "PhD/JRF (Life Sciences)", eligibility: "MSc with 55%", date: "June & December", url: "https://csirnet.nta.ac.in/", syllabusUrl: "https://csirnet.nta.ac.in/", syllabus: "Life Sciences Core" },
            { name: "GATE BT", purpose: "M.Tech Biotechnology Admissions", eligibility: "Engineering/Science Graduates", date: "February", url: "https://gate2026.iitg.ac.in/", syllabusUrl: "https://gate2026.iitg.ac.in/", syllabus: "rDNA Technology, Bioprocess" },
            { name: "CPGET", purpose: "PG Admissions in Life Sciences (Telangana)", eligibility: "Life Science Basics Graduates", date: "July", url: "https://www.osmania.ac.in/", syllabusUrl: "https://www.osmania.ac.in/", syllabus: "Life Science Basics" },
            { name: "TANCET", purpose: "MSc/MTech Admissions in Tamil Nadu Colleges", eligibility: "Science Graduates", date: "March", url: "https://tancet.annauniv.edu/", syllabusUrl: "https://tancet.annauniv.edu/", syllabus: "Basic Science" }
        ],
        skillInventory: ["HPLC", "PCR", "ELISA", "Molecular Cloning", "Mammalian Cell Culture", "Fermentation"],
        jobRoles: [{ title: "QC Scientist", salary: "₹5-10 LPA", companies: ["Biocon", "Dr Reddy's"], jd: "Execute routine analytical testing and maintenance of global standards." }],
        startups: { 
            ideas: ["Personalized Nutrition Kits", "Synthetic Meat Production"], 
            ecosystem: [
                { name: "Bharat Biotech", focus: "Vaccines & biologic therapeutics", desc: "Vaccine innovation company.", url: "https://www.bharatbiotech.com" },
                { name: "Serum Institute of India", focus: "Immunization vaccines", desc: "Global vaccine manufacturer.", url: "https://www.seruminstitute.com" },
                { name: "Biocon", focus: "Biosimilars, insulin & biologics", desc: "Biopharma company.", url: "https://www.biocon.com" },
                { name: "Concord Biotech", focus: "Active pharmaceutical ingredients (APIs)", desc: "Fermentation biotech firm.", url: "http://www.concordbiotech.com" },
                { name: "Bugworks Research", focus: "Antimicrobial drug candidates", desc: "Antibiotic discovery startup.", url: "https://www.bugworksresearch.com" },
                { name: "Immuneel Therapeutics", focus: "CAR-T cancer therapy", desc: "Cell therapy company.", url: "https://immuneel.com" },
                { name: "Pandorum Technologies", focus: "Bio-engineered tissue therapies", desc: "Regenerative medicine startup.", url: "https://pandorum.com" },
                { name: "Syngene International", focus: "Drug discovery & development", desc: "Contract biotech research firm.", url: "https://www.syngeneintl.com" },
                { name: "Zumutor Biologics", focus: "Antibody-based therapeutics", desc: "Immunotherapy startup.", url: "https://www.zumutor.com" },
                { name: "Vyome Therapeutics", focus: "Dermatology drugs", desc: "Clinical biotech firm.", url: "https://vyometx.com" },
                { name: "Gennova Biopharmaceuticals", focus: "RNA-based vaccines & biologics", desc: "mRNA vaccine company.", url: "https://www.gennova.bio" },
                { name: "Panacea Biotec", focus: "Vaccines & pharmaceutical drugs", desc: "Biopharma manufacturer.", url: "https://www.panaceabiotec.com" },
                { name: "Intas Biopharma", focus: "Biosimilar biologics", desc: "Biologic medicines developer.", url: "https://www.intaspharma.com" },
                { name: "Biological E", focus: "Immunization vaccines", desc: "Vaccine company.", url: "https://www.biologicale.com" },
                { name: "Stelis Biopharma", focus: "Large molecule biologics", desc: "Biopharmaceutical firm.", url: "https://www.stelis.com" }
            ],
            guide: [
                { title: "BIRAC BIG Grant", tag: "Funding | Central", content: "Grant up to 50 Lakhs for high-impact biotech startups.", steps: "Submit proposal → Peer Review → Interview → Approval.", req: "Biotech PoC; Individual or Startup < 5 years.", contact: "birac.dbt@nic.in", url: "https://www.birac.nic.in" },
                { title: "C-CAMP Incubation", tag: "Incubation | Life Sciences", content: "Access to high-end labs, mentoring, and funding in Bengaluru.", steps: "Apply online → Technical evaluation → Agreement.", req: "Life sciences/biotech startup.", contact: "info@ccamp.res.in", url: "https://www.ccamp.res.in" },
                { title: "CDSCO Registration", tag: "Procedure | Central", content: "Regulatory approval for drugs and biological products.", steps: "Apply on SUGAM Portal → Inspection → Certificate.", req: "Full compliance with clinical data.", contact: "portal-support@nic.in", url: "https://cdsco.gov.in" },
                { title: "Global Bio-India", tag: "Event | Central", content: "Premiere biotech networking and pitching platform.", steps: "Register for exhibition → Submit pitch deck → Pitch to VCs.", req: "Registered biotech entity.", contact: "info@globalbioindia.com", url: "https://globalbioindia.com" },
                { title: "DBT Funding Programs", tag: "Funding | Central", content: "R&D funding for research-driven biotech innovation.", steps: "Submit research proposal → Expert committee review.", req: "High research innovation potential.", contact: "info@dbtindia.gov.in", url: "https://dbtindia.gov.in" },
                { title: "IKP Knowledge Park", tag: "Incubation | Biotech", content: "Premier incubation hub for biotech R&D and scaling.", steps: "Submit business plan → Management approval.", req: "Biotech/Pharma/Nano focus.", contact: "info@ikpknowledgepark.com", url: "https://ikpknowledgepark.com" }
            ]
        }
    },
    'bioinfo': {
        higherStudies: {
            mtech: [
                { name: "IIIT Delhi", location: "New Delhi", degree: "M.Tech", program: "Comp Biology", entrance: "GATE", specializations: ["Computational Biology", "AI Bioinformatics", "Precision Medicine"], url: "https://iiitd.ac.in" },
                { name: "University of Hyderabad", location: "Hyderabad", degree: "M.Sc", program: "Bioinfo", entrance: "CUET-PG", specializations: ["Genomics", "Structural Bioinformatics"], url: "https://uohyd.ac.in" },
                { name: "Anna University", location: "Chennai", degree: "M.Sc", program: "Bioinfo", entrance: "TANCET/CUET", specializations: ["Bioinformatics Analytics", "Systems Biology"], url: "https://www.annauniv.edu" },
                { name: "Manipal Academy", location: "Manipal", degree: "M.Sc", program: "Bioinfo", entrance: "MET", specializations: ["Applied Bioinformatics", "Data-driven Biology"], url: "https://manipal.edu" },
                { name: "Pondicherry University", location: "Puducherry", degree: "M.Sc", program: "Bioinfo", entrance: "CUET-PG", specializations: ["Proteomics", "Genomics"], url: "https://www.pondiuni.edu.in" },
                { name: "Alagappa University", location: "Karaikudi, TN", degree: "M.Sc", program: "Bioinfo", entrance: "University Entrance", specializations: ["Structural Bio", "Drug Design"], url: "https://alagappauniversity.ac.in" }
            ],
            phd: [
                { name: "Pondicherry University", degree: "PhD", program: "Bioinformatics", entrance: "NET/University Entrance", url: "https://www.pondiuni.edu.in" },
                { name: "University of Hyderabad", degree: "PhD", program: "Bioinformatics", entrance: "NET", specializations: ["Bioinformatics"], url: "https://uohyd.ac.in" },
                { name: "IIIT Delhi", degree: "PhD", program: "Computational Biology", entrance: "GATE", specializations: ["Computational Biology"], url: "https://iiitd.ac.in" },
                { name: "Anna University", degree: "PhD", program: "Bioinformatics", entrance: "NET/TANCET", specializations: ["Bioinformatics"], url: "https://www.annauniv.edu" }
            ]
        },
        exams: [
            { name: "GATE (CSE/BT/XL)", purpose: "M.Tech Bioinformatics Admissions", eligibility: "BE/BTech/MSc (CS or Bio)", date: "February", url: "https://gate2026.iitg.ac.in/", syllabusUrl: "https://gate2026.iitg.ac.in/", syllabus: "Programming, Statistics" },
            { name: "CUET-PG", purpose: "MSc Bioinformatics Admissions", eligibility: "Relevant Bachelor Degree", date: "March", url: "https://pgcuet.samarth.ac.in/", syllabusUrl: "https://pgcuet.samarth.ac.in/", syllabus: "Genetics, Molecular Biology" },
            { name: "CSIR NET Life Sciences", purpose: "PhD Bioinformatics/JRF", eligibility: "MSc Life Science", date: "June & December", url: "https://csirnet.nta.ac.in/", syllabusUrl: "https://csirnet.nta.ac.in/", syllabus: "Bioinformatics Topics" },
            { name: "TANCET", purpose: "PG Admissions in Tamil Nadu Colleges", eligibility: "Aptitude & Science Degrees", date: "March", url: "https://tancet.annauniv.edu/", syllabusUrl: "https://tancet.annauniv.edu/", syllabus: "Aptitude & Science" },
            { name: "CPGET", purpose: "PG Admissions in Telangana Colleges", eligibility: "Bioinformatics Basics Graduates", date: "July", url: "https://www.osmania.ac.in/", syllabusUrl: "https://www.osmania.ac.in/", syllabus: "Bioinformatics Basics" }
        ],
        skillInventory: ["Python/R", "Linux/Bash", "SQL", "NGS Data Analysis", "Molecular Docking"],
        jobRoles: [],
        startups: { 
            ideas: ["AI Drug Discovery SaaS"], 
            ecosystem: [
                { name: "Elucidata", focus: "Drug discovery analytics", desc: "Biomedical AI platform for data integration.", url: "https://www.elucidata.io" },
                { name: "Strand Life Sciences", focus: "NGS bioinformatics", desc: "Genomics software firm specializing in sequencing.", url: "https://www.strandls.com" },
                { name: "MedGenome", focus: "Precision medicine", desc: "Genomic diagnostics company.", url: "https://www.medgenome.com" },
                { name: "Genotypic Technology", focus: "Bioinformatics analytics", desc: "Sequencing company providing analysis services.", url: "https://genotypic.co.in" },
                { name: "4baseCare", focus: "Cancer genomics", desc: "Oncology genomics startup.", url: "https://www.4basecare.com" },
                { name: "OncoStem Diagnostics", focus: "Cancer prognostics", desc: "Tumor profiling company.", url: "https://oncostem.com" },
                { name: "Indegene", focus: "Digital life sciences", desc: "AI pharma solutions firm.", url: "https://www.indegene.com" },
                { name: "Mapmygenome", focus: "Genetic testing", desc: "Personal genomics company.", url: "https://www.mapmygenome.in" },
                { name: "Neuberg Diagnostics", focus: "Molecular diagnostics", desc: "Clinical genomics provider.", url: "https://www.neubergdiagnostics.com" },
                { name: "Molbio Diagnostics", focus: "Rapid PCR diagnostics", desc: "Molecular testing company.", url: "https://www.molbiodiagnostics.com" },
                { name: "Sigtuple", focus: "Medical data analytics", desc: "AI diagnostics startup.", url: "https://www.sigtuple.com" },
                { name: "NextGen Life Sciences", focus: "Sequencing services", desc: "Genomics research firm.", url: "https://www.nextgenlife.com" },
                { name: "GenePath Diagnostics", focus: "Clinical genomics", desc: "Molecular diagnostics lab.", url: "https://www.genepathdiagnostics.com" },
                { name: "Premas Biotech", focus: "Recombinant proteins", desc: "Biotech R&D firm.", url: "https://www.premasbiotech.com" },
                { name: "Xcelris Genomics", focus: "Bioinformatics & sequencing", desc: "Genomics service company.", url: "https://www.xcelrisgenomics.com" }
            ],
            guide: [
                { title: "Meity Startup Hub", tag: "Funding | Central", content: "Grants and support for AI and health-tech bioinformatics startups.", steps: "Register on Meity Portal → Apply for specific grants → Screening.", req: "Tech-driven bioinformatics innovation.", contact: "support@meitystartuphub.in", url: "https://meitystartuphub.in" },
                { title: "NASSCOM 10000 Startups", tag: "Incubation | IT", content: "Mentorship, networking, and investor access for IT-biotech firms.", steps: "Apply via portal → Selection process → Cohort onboarding.", req: "Scalable IT/Data-driven startup.", contact: "info@nasscom.in", url: "https://10000startups.nasscom.in" },
                { title: "AIM - Atal Incubation", tag: "Funding | Central", content: "Incubation grants for startups working on high-impact technology.", steps: "Apply to nearest AIC center → Pitch session → Onboarding.", req: "Innovation-led business model.", contact: "info@aim.gov.in", url: "https://aim.gov.in" },
                { title: "StartupTN Emerging Tech", tag: "Funding | Tamil Nadu", content: "Grants for startups using AI, ML, and big data in TN.", steps: "Submit application → Evaluation committee pitch → Grant.", req: "TN-based emerging tech startup.", contact: "support@startuptn.in", url: "https://startuptn.in" },
                { title: "IIGP Acceleration", tag: "Acceleration | Central", content: "Acceleration support for market entry and scaling.", steps: "Submit innovation proposal → Selection → Acceleration bootcamps.", req: "Unique tech solution for global markets.", contact: "info@iigp.org.in", url: "https://iigp.org.in" },
                { title: "GeM Portal Registration", tag: "Market Access | Central", content: "Sell bioinformatics services/software directly to government entities.", steps: "Register as seller → List products/services → Direct bidding.", req: "Registered company with active GST.", contact: "helpdesk-gem@gov.in", url: "https://gem.gov.in" }
            ]
        }
    },
    'bioeng-nano': {
        higherStudies: {
            mtech: [
                { name: "IIT Madras", location: "Chennai, TN", degree: "M.Tech", program: "Biomedical Eng", entrance: "GATE", specializations: ["Biomedical Engineering", "Neuroengineering"], url: "https://www.iitm.ac.in" },
                { name: "IIT Hyderabad", location: "Kandi, TG", degree: "M.Tech", program: "Bioeng", entrance: "GATE", specializations: ["Bioengineering Systems", "Wearable Bioelectronics"], url: "https://www.iith.ac.in" },
                { name: "IISc Bangalore", location: "Bengaluru, KA", degree: "M.Tech", program: "Nano Science", entrance: "GATE", specializations: ["Nano Science", "Nanomedicine"], url: "https://www.iisc.ac.in" },
                { name: "Amrita Vishwa Vidyapeetham", location: "Coimbatore, TN", degree: "M.Tech", program: "Nanotech", entrance: "Amrita Entrance", specializations: ["Nanotechnology", "Nano Drug Delivery"], url: "https://www.amrita.edu" },
                { name: "VIT Vellore", location: "Vellore, TN", degree: "M.Tech", program: "Nanotech", entrance: "VITMEE", specializations: ["Advanced Nanomaterials"], url: "https://vit.ac.in" },
                { name: "SRM Institute", location: "Chennai, TN", degree: "M.Tech", program: "Biomedical", entrance: "SRMJEEE PG", url: "https://www.srmist.edu.in" },
                { name: "Anna University", location: "Chennai, TN", degree: "M.Tech", program: "Medical Nano", entrance: "TANCET", specializations: ["Nano-Diagnostics"], url: "https://www.annauniv.edu" },
                { name: "Delhi Technological University", location: "New Delhi", degree: "M.Tech", program: "Biomedical Eng", entrance: "GATE", specializations: ["Biomedical Instrumentation", "Medical Imaging"], url: "https://dtu.ac.in" }
            ],
            phd: [
                { name: "IIT Madras", degree: "PhD", program: "Biomedical Eng", entrance: "GATE/NET", specializations: ["Biomedical Engineering"], url: "https://www.iitm.ac.in" },
                { name: "IIT Hyderabad", degree: "PhD", program: "Bioengineering", entrance: "GATE", specializations: ["Bioengineering"], url: "https://www.iith.ac.in" },
                { name: "IISc Bangalore", degree: "PhD", program: "Nano Science", entrance: "GATE/NET", specializations: ["Nano Science"], url: "https://www.iisc.ac.in" },
                { name: "Amrita Nanosciences", degree: "PhD", program: "Nanotechnology", entrance: "University Entrance", specializations: ["Nanotechnology"], url: "https://www.amrita.edu" }
            ]
        },
        exams: [
            { name: "GATE", purpose: "M.Tech Biomedical/Nanotechnology Admissions", eligibility: "Engineering (BT/CH/XE/ME) or MSc", date: "February", url: "https://gate2026.iitg.ac.in/", syllabusUrl: "https://gate2026.iitg.ac.in/", syllabus: "Nanomaterials, Engineering Maths" },
            { name: "IIT JAM", purpose: "MSc Nanoscience Admissions", eligibility: "BSc Science Degree", date: "February", url: "https://jam.iisc.ac.in/", syllabusUrl: "https://jam.iisc.ac.in/", syllabus: "Physics, Chemistry" },
            { name: "CSIR NET", purpose: "PhD Nano/Bioengineering / JRF", eligibility: "MSc with 55%", date: "June & December", url: "https://csirnet.nta.ac.in/", syllabusUrl: "https://csirnet.nta.ac.in/", syllabus: "Nanoscience" },
            { name: "VITMEE", purpose: "M.Tech Nanotechnology in VIT", eligibility: "Engineering Graduates", date: "April", url: "https://vit.ac.in/", syllabusUrl: "https://vit.ac.in/", syllabus: "Core Engineering" },
            { name: "TANCET", purpose: "PG Admissions in Tamil Nadu Colleges", eligibility: "Engineering Aptitude Graduates", date: "March", url: "https://tancet.annauniv.edu/", syllabusUrl: "https://tancet.annauniv.edu/", syllabus: "Engineering Aptitude" }
        ],
        skillInventory: ["SEM/TEM Imaging", "XRD Analysis", "CAD Design", "Cleanroom Protocols"],
        jobRoles: [],
        startups: { 
            ideas: ["Smart Wound Dressings"], 
            ecosystem: [
                { name: "Theranautilus", focus: "Dental nanorobot therapy", desc: "Medical nanorobotics company developing therapy robots.", url: "http://www.theranautilus.com" },
                { name: "Nanosentrix", focus: "Printed sensors", desc: "Nano-coatings company creating smart materials.", url: "https://nanosentrix.in" },
                { name: "Morphle Labs", focus: "Optical diagnostics", desc: "Portable microscopy firm for lab research.", url: "https://www.morphlelabs.com" },
                { name: "HealthCubed", focus: "Point-of-care diagnostics", desc: "Medical device company.", url: "https://healthcubed.com" },
                { name: "NanoPix", focus: "Nano-electronics", desc: "Imaging sensor firm specializing in nano-optics.", url: "https://nanopix.in" },
                { name: "AgVa Healthcare", focus: "Critical care devices", desc: "Ventilator manufacturer for hospitals.", url: "https://agvahealthcare.com" },
                { name: "Adnano Technologies", focus: "Carbon nanotubes", desc: "Nanomaterials startup.", url: "https://adnano.co" },
                { name: "Big Bang Boom Solutions", focus: "Autonomous systems", desc: "Robotics and AI engineering company.", url: "https://bbbs.tech" },
                { name: "Bellatrix Aerospace", focus: "Green propulsion", desc: "Space propulsion startup for satellites.", url: "https://bellatrix.aero" },
                { name: "IdeaForge", focus: "UAV engineering", desc: "Leading drone manufacturer.", url: "https://www.ideaforge.co.in" },
                { name: "Tonbo Imaging", focus: "Electro-optics", desc: "Imaging tech for defense and medical use.", url: "https://tonboimaging.com" },
                { name: "Skanray Technologies", focus: "Imaging systems", desc: "Medical device firm.", url: "https://www.skanray.com" },
                { name: "Forus Health", focus: "Eye screening devices", desc: "Ophthalmic device startup.", url: "https://www.forushealth.com" },
                { name: "BPL Medical Technologies", focus: "Biomedical devices", desc: "Legacy medical equipment company.", url: "https://www.bplmedicaltechnologies.com" },
                { name: "Sigtuple MedTech", focus: "Automated lab analysis", desc: "AI diagnostic engineering hub.", url: "https://www.sigtuple.com" }
            ],
            guide: [
                { title: "DST NIDHI PRAYAS", tag: "Funding | Central", content: "Prototype grant for converting innovative nanotech ideas into products.", steps: "Apply via authorized incubator → Technical presentation → Prototype funding.", req: "Functional prototype ready to be built.", contact: "info@dst.gov.in", url: "https://dst.gov.in" },
                { title: "SINE IIT Bombay", tag: "Incubation | Deep-Tech", content: "Premier deep-tech incubation and hardware prototyping center.", steps: "Submit innovation proposal → Expert review → Lab access.", req: "Hardware/Deep-tech startup.", contact: "sine@sineiitb.org", url: "https://www.sineiitb.org" },
                { title: "IP India Patent Filing", tag: "Procedure | Central", content: "Fast-track patenting support for nano-engineering startups.", steps: "File provisional/complete patent → Examination → Grant.", req: "Unique and non-obvious IP.", contact: "ipindia-helpdesk@nic.in", url: "https://ipindia.gov.in" },
                { title: "Atal New India Challenge", tag: "Funding | Central", content: "Grants for startups scaling prototypes to commercial products.", steps: "Submit application → Evaluation → Scale-up grant.", req: "Innovative hardware/nano solution.", contact: "info@aim.gov.in", url: "https://aim.gov.in" },
                { title: "Invest Tamil Nadu", tag: "Policy | Tamil Nadu", content: "Industrial incentives for manufacturing and nano-tech setups in TN.", steps: "Apply for project approval → Incentive disbursal.", req: "Manufacturing unit in TN.", contact: "info@investtn.in", url: "https://investingintamilnadu.com" },
                { title: "CDSCO Medical Device", tag: "Procedure | Central", content: "Approval and licensing for biomedical and nano-medical devices.", steps: "Register as device manufacturer → Compliance audit → Approval.", req: "Compliance with ISO standards.", contact: "cdsco-support@nic.in", url: "https://cdsco.gov.in" }
            ]
        }
    },
    'chem': {
        higherStudies: {
            mtech: [
                { name: "IIT Bombay", location: "Mumbai", degree: "M.Sc", program: "Chemistry", entrance: "IIT JAM", specializations: ["Materials Chemistry", "Green Chemistry"], url: "https://www.che.iitb.ac.in" },
                { name: "IIT Madras", location: "Chennai", degree: "M.Sc", program: "Chemistry", entrance: "IIT JAM", specializations: ["Organic Chemistry", "Computational Chemistry"], url: "https://www.iitm.ac.in" },
                { name: "IIT Delhi", location: "New Delhi", degree: "M.Sc", program: "Chemistry", entrance: "IIT JAM", specializations: ["Physical Chemistry", "Medicinal Chemistry"], url: "https://home.iitd.ac.in" },
                { name: "IISER Pune", location: "Pune", degree: "M.Sc", program: "Chemistry", entrance: "IISER Aptitude/JAM", specializations: ["Advanced Materials", "Chemical Biology"], url: "https://www.iiserpune.ac.in" },
                { name: "IISER Bhopal", location: "Bhopal, MP", degree: "M.Sc", program: "Chemistry", entrance: "IISER Aptitude", specializations: ["Theoretical Chem", "Inorganic Chem"], url: "https://www.iiserb.ac.in" },
                { name: "University of Delhi", location: "New Delhi", degree: "M.Sc", program: "Chemistry", entrance: "CUET-PG", specializations: ["Inorganic Chemistry", "Analytical Chemistry"], url: "https://www.du.ac.in" },
                { name: "BHU", location: "Varanasi, UP", degree: "M.Sc", program: "Chemistry", entrance: "CUET-PG", specializations: ["Advanced Spectroscopy", "Solid State"], url: "https://www.bhu.ac.in" },
                { name: "Jadavpur University", location: "Kolkata, WB", degree: "M.Sc", program: "Chemistry", entrance: "University Entrance", specializations: ["Polymer Synthesis"], url: "https://www.jaduniv.edu.in" },
                { name: "Madras University", location: "Chennai, TN", degree: "M.Sc", program: "Chemistry", entrance: "Entrance Test", specializations: ["Industrial Chemistry"], url: "https://www.unom.ac.in" },
                { name: "Osmania University", location: "Hyderabad, TG", degree: "M.Sc", program: "Chemistry", entrance: "CPGET", specializations: ["Pharma Chemistry"], url: "https://www.osmania.ac.in" },
                { name: "Anna University", location: "Chennai, TN", degree: "M.Sc", program: "Chemistry", entrance: "TANCET", specializations: ["Applied Chemistry"], url: "https://www.annauniv.edu" }
            ],
            phd: [
                { name: "IIT Bombay", degree: "PhD", program: "Chemistry", entrance: "GATE/CSIR-NET", specializations: ["Chemistry"], url: "https://www.che.iitb.ac.in" },
                { name: "IIT Madras", degree: "PhD", program: "Chemistry", entrance: "GATE/NET", specializations: ["Chemistry"], url: "https://www.iitm.ac.in" },
                { name: "IISer Pune", degree: "PhD", program: "Chemistry", entrance: "NET/GATE/JEST", specializations: ["Chemistry"], url: "https://www.iiserpune.ac.in" },
                { name: "IISER Bhopal", degree: "PhD", program: "Chemistry", entrance: "NET", specializations: ["Chemistry"], url: "https://www.iiserb.ac.in" },
                { name: "University of Delhi", degree: "PhD", program: "Chemistry", entrance: "NET", specializations: ["Chemistry"], url: "https://www.du.ac.in" },
                { name: "BHU", degree: "PhD", program: "Chemistry", entrance: "NET", specializations: ["Chemistry"], url: "https://www.bhu.ac.in" },
                { name: "Anna University", degree: "PhD", program: "Chemistry", entrance: "NET/TANCET", specializations: ["Chemistry"], url: "https://www.annauniv.edu" },
                { name: "Jadavpur University", degree: "PhD", program: "Chemistry", entrance: "Entrance Test", specializations: ["Chemistry"], url: "https://www.jaduniv.edu.in" }
            ]
        },
        exams: [
            { name: "IIT JAM", purpose: "MSc Chemistry Admissions", eligibility: "BSc Chemistry", date: "February", url: "https://jam.iisc.ac.in/", syllabusUrl: "https://jam.iisc.ac.in/", syllabus: "Organic, Inorganic, Physical" },
            { name: "CSIR NET", purpose: "PhD/JRF Admissions (Chemical Sciences)", eligibility: "MSc Chemistry 55%", date: "June & December", url: "https://csirnet.nta.ac.in/", syllabusUrl: "https://csirnet.nta.ac.in/", syllabus: "Advanced Chemistry" },
            { name: "CUET-PG", purpose: "MSc Chemistry Central Universities Admissions", eligibility: "Relevant Degree", date: "March", url: "https://pgcuet.samarth.ac.in/", syllabusUrl: "https://pgcuet.samarth.ac.in/", syllabus: "Core Chemistry" },
            { name: "TANCET", purpose: "MSc/MTech Tamil Nadu Colleges Admissions", eligibility: "Science & Aptitude Graduates", date: "March", url: "https://tancet.annauniv.edu/", syllabusUrl: "https://tancet.annauniv.edu/", syllabus: "Science & Aptitude" },
            { name: "WBSET/State NET", purpose: "PhD Eligibility / JRF in WB", eligibility: "Chemical Sciences Graduates", date: "December", url: "https://www.wbcsconline.in/", syllabusUrl: "https://www.wbcsconline.in/", syllabus: "Chemical Sciences" }
        ],
        skillInventory: ["NMR/IR", "Synthesis", "Lab Safety", "Chemdraw", "TGA/DSC"],
        jobRoles: [],
        startups: { 
            ideas: ["Cosmetic Formulations"], 
            ecosystem: [
                { name: "Keto India", focus: "Sustainable chemical processing", desc: "Specialty chemical firm focused on green processes.", url: "https://ketoindia.com" },
                { name: "Rossari Biotech", focus: "Enzymes & specialty ingredients", desc: "Performance chemical firm.", url: "https://www.rossari.com" },
                { name: "Laxmi Organic", focus: "Acetyl intermediates", desc: "Specialty chemical manufacturer.", url: "https://www.laxmiorganic.co.in" },
                { name: "Tatva Chintan Pharma Chem", focus: "Phase transfer catalysts", desc: "Industrial catalyst manufacturer.", url: "https://tatvachintan.com" },
                { name: "Avra Laboratories", focus: "Pharmaceutical chemicals", desc: "API producer.", url: "https://avralab.com" },
                { name: "Anupam Rasayan", focus: "Custom synthesis", desc: "Specialty chemical company.", url: "https://www.anupamrasayan.com" },
                { name: "Deepak Nitrite", focus: "Phenolics & intermediates", desc: "Chemical manufacturer.", url: "https://www.godeepak.com" },
                { name: "Fine Organic Industries", focus: "Additives & specialty ingredients", desc: "Oleochemical firm.", url: "https://www.fineorganics.com" },
                { name: "Vinati Organics", focus: "ATBS & IB", desc: "Specialty monomer producer.", url: "https://www.vinatiorganics.com" },
                { name: "Galaxy Surfactants", focus: "Personal care chemicals", desc: "Surfactant manufacturer.", url: "https://www.galaxysurfactants.com" },
                { name: "Balaji Amines", focus: "Specialty amines", desc: "Amines manufacturer.", url: "https://www.balajiamines.com" },
                { name: "Alkyl Amines Chemicals", focus: "Aliphatic amines", desc: "Chemical manufacturer.", url: "https://www.alkylamines.com" },
                { name: "SRF Chemicals Division", focus: "Fluorochemicals", desc: "Chemical division of SRF.", url: "https://www.srf.com" },
                { name: "Navin Fluorine Advanced Sciences", focus: "High-performance fluorochemicals", desc: "Fluorochemical company.", url: "https://www.nfil.in" },
                { name: "PI Industries", focus: "Crop protection & R&D", desc: "Agrochemical firm.", url: "https://www.piindustries.com" }
            ],
            guide: [
                { title: "MSME Udyam", tag: "Registration | Central", content: "Access government subsidies, credit guarantee, and patent support for chemistry labs.", steps: "Apply online via Udyam portal → Certificate generation.", req: "Registered company within MSME limits.", contact: "1800-180-6763", url: "https://udyamregistration.gov.in" },
                { title: "SIDBI Fund of Funds", tag: "Funding | Central", content: "Capital support for chemistry-based manufacturing startups through VC funds.", steps: "Secure VC interest → Fund disbursal via SIDBI partners.", req: "Scalable chemical manufacturing model.", contact: "info@sidbi.in", url: "https://www.sidbi.in" },
                { title: "TNPCB Clearance", tag: "Procedure | Tamil Nadu", content: "Essential environmental clearance for chemical processing units in TN.", steps: "Submit environmental docs → Site inspection → Approval.", req: "Manufacturing unit with pollution control norms.", contact: "support@tnpcb.gov.in", url: "https://tnpcb.gov.in" },
                { title: "SIPCOT Industrial Support", tag: "Policy | Tamil Nadu", content: "Infrastructure and land allotment support for industrial chemistry startups.", steps: "Apply for land via SIPCOT portal → Project review.", req: "Industrial-scale chemical startup.", contact: "info@sipcot.tn.gov.in", url: "https://sipcot.tn.gov.in" },
                { title: "PLI Scheme", tag: "Funding | Central", content: "Production-linked incentives for large-scale chemical manufacturing.", steps: "Apply under specific chemical sector → Target achievement → Incentive.", req: "High manufacturing volume; eligible chemicals.", contact: "pli-support@dpiit.gov.in", url: "https://dpiit.gov.in" },
                { title: "Export Promotion Council", tag: "Market Access | Central", content: "Support for exporting specialty chemicals to international markets.", steps: "Register as exporter → Export assistance and subsidies.", req: "Valid export-import business license.", contact: "info@epch.in", url: "https://epch.in" }
            ]
        }
    }
};

// Utility to initialize page features
function initializePage() {
    // 1. Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 2. Navbar Scroll Effect
    const nav = document.getElementById('navbar');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('glass-nav', 'py-3', 'shadow-sm');
                nav.classList.remove('bg-transparent', 'py-6');
            } else {
                nav.classList.remove('glass-nav', 'py-3', 'shadow-sm');
                nav.classList.add('bg-transparent', 'py-6');
            }
        });
    }
}