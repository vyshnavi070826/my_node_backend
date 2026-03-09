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
                { name: "IIT Bombay", location: "Mumbai, MH", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE", specializations: ["Catalysis & Energy Systems", "Process Design"], url: "https://www.iitb.ac.in" },
                { name: "IIT Delhi", location: "New Delhi", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE", specializations: ["Process Design", "Transport Phenomena"], url: "https://home.iitd.ac.in" },
                { name: "IIT Madras", location: "Chennai, TN", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE", specializations: ["Process Systems Engineering", "Reaction Engineering"], url: "https://www.iitm.ac.in" },
                { name: "IIT Kanpur", location: "Kanpur, UP", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE", specializations: ["Transport Phenomena", "Process Engineering"], url: "https://www.iitk.ac.in" },
                { name: "IIT Kharagpur", location: "Kharagpur, WB", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE", specializations: ["Petroleum Engineering", "Separation Processes"], url: "https://www.iitkgp.ac.in" },
                { name: "IIT Guwahati", location: "Guwahati, AS", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE", specializations: ["Process Engineering", "Environmental"], url: "https://www.iitg.ac.in" },
                { name: "NIT Trichy", location: "Trichy, TN", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE", specializations: ["Chemical Process Design", "Energy Engineering"], url: "https://www.nitt.edu" },
                { name: "NIT Warangal", location: "Warangal, TG", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE", specializations: ["Process Control", "Environmental Engineering"], url: "https://www.nitw.ac.in" },
                { name: "NIT Surathkal", location: "Surathkal, KA", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE", specializations: ["Separation Processes", "Heat Transfer"], url: "https://www.nitk.ac.in" },
                { name: "ICT Mumbai", location: "Mumbai, MH", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE/Institute Test", specializations: ["Polymer Technology", "Chemical Technology"], url: "https://www.ictmumbai.edu.in" },
                { name: "Anna University", location: "Chennai, TN", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE/TANCET", specializations: ["Industrial Chemical Technology", "Bioprocessing"], url: "https://www.annauniv.edu" },
                { name: "Jadavpur University", location: "Kolkata, WB", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE", specializations: ["Process Engineering", "Advanced Reaction Engineering"], url: "https://www.jaduniv.edu.in" },
                { name: "Andhra University", location: "Visakhapatnam, AP", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE", specializations: ["Petrochemical Engineering"], url: "https://www.andhrauniversity.edu.in" },
                { name: "Osmania University", location: "Hyderabad, TG", degree: "M.Tech", program: "Chemical Engineering", entrance: "GATE", specializations: ["Process Design"], url: "https://www.osmania.ac.in" },
                { name: "BITS Pilani", location: "Pilani, RJ", degree: "M.E", program: "Chemical Engineering", entrance: "BITS HD", specializations: ["Process Systems", "Process Engineering"], url: "https://www.bits-pilani.ac.in" }
            ],
            phd: [
                { name: "IIT Bombay", location: "Mumbai, MH", degree: "PhD", program: "Chemical Engineering", entrance: "GATE/NET", specializations: ["Catalysis", "Energy Systems"], url: "https://www.iitb.ac.in" },
                { name: "IIT Delhi", location: "New Delhi", degree: "PhD", program: "Chemical Engineering", entrance: "GATE/NET", specializations: ["Reaction Engineering"], url: "https://home.iitd.ac.in" },
                { name: "IIT Madras", location: "Chennai, TN", degree: "PhD", program: "Chemical Engineering", entrance: "GATE/NET", specializations: ["Process Systems Engineering"], url: "https://www.iitm.ac.in" },
                { name: "IIT Kanpur", location: "Kanpur, UP", degree: "PhD", program: "Chemical Engineering", entrance: "GATE/NET", specializations: ["Transport Phenomena"], url: "https://www.iitk.ac.in" },
                { name: "IIT Kharagpur", location: "Kharagpur, WB", degree: "PhD", program: "Chemical Engineering", entrance: "GATE/NET", specializations: ["Reaction Engineering"], url: "https://www.iitkgp.ac.in" },
                { name: "IIT Guwahati", location: "Guwahati, AS", degree: "PhD", program: "Chemical Engineering", entrance: "GATE", specializations: ["Petroleum Engineering"], url: "https://www.iitg.ac.in" },
                { name: "ICT Mumbai", location: "Mumbai, MH", degree: "PhD", program: "Chemical Engineering", entrance: "GATE", specializations: ["Polymer Technology"], url: "https://www.ictmumbai.edu.in" },
                { name: "Anna University", location: "Chennai, TN", degree: "PhD", program: "Chemical Engineering", entrance: "GATE/NET", specializations: ["Industrial Chemical Technology"], url: "https://www.annauniv.edu" },
                { name: "Jadavpur University", location: "Kolkata, WB", degree: "PhD", program: "Chemical Engineering", entrance: "GATE/NET", specializations: ["Process Engineering"], url: "https://www.jaduniv.edu.in" },
                { name: "Andhra University", location: "Visakhapatnam, AP", degree: "PhD", program: "Chemical Engineering", entrance: "GATE", specializations: ["Petrochemical Engineering"], url: "https://www.andhrauniversity.edu.in" },
                { name: "Osmania University", location: "Hyderabad, TG", degree: "PhD", program: "Chemical Engineering", entrance: "NET", specializations: ["Chemical Process Design"], url: "https://www.osmania.ac.in" },
                { name: "NIT Trichy", location: "Trichy, TN", degree: "PhD", program: "Chemical Engineering", entrance: "GATE", specializations: ["Process Engineering"], url: "https://www.nitt.edu" },
                { name: "NIT Warangal", location: "Warangal, TG", degree: "PhD", program: "Chemical Engineering", entrance: "GATE", specializations: ["Chemical Process Systems"], url: "https://www.nitw.ac.in" },
                { name: "NIT Surathkal", location: "Surathkal, KA", degree: "PhD", program: "Chemical Engineering", entrance: "GATE", specializations: ["Separation Processes"], url: "https://www.nitk.ac.in" },
                { name: "BITS Pilani", location: "Pilani, RJ", degree: "PhD", program: "Chemical Engineering", entrance: "BITS Entrance", specializations: ["Process Systems"], url: "https://www.bits-pilani.ac.in" }
            ]
        },
        exams: [
            { name: "GATE", purpose: "M.Tech/PhD/PSU Jobs", eligibility: "BE/BTech/MSc Final Year Allowed", date: "February", url: "https://gate.iitk.ac.in", syllabusUrl: "https://gate.iitk.ac.in/syllabus", syllabus: "Engineering Maths, Thermodynamics, Fluid Mechanics, Heat & Mass Transfer" },
            { name: "ESE (Engineering Services)", purpose: "Govt Engineering Jobs", eligibility: "Engineering graduates", date: "June", url: "https://upsc.gov.in", syllabusUrl: "https://upsc.gov.in/examinations", syllabus: "Engineering subjects + aptitude" },
            { name: "BITS HD", purpose: "ME / MTech programs", eligibility: "BE/BTech/MSc", date: "May", url: "https://bitsadmission.com", syllabusUrl: "https://bitsadmission.com", syllabus: "Core engineering topics" },
            { name: "TANCET", purpose: "MTech / MBA in TN universities", eligibility: "Bachelor degree", date: "March", url: "https://annauniv.edu", syllabusUrl: "https://annauniv.edu", syllabus: "Engineering maths + core topics" },
            { name: "VITMEE", purpose: "MTech at VIT", eligibility: "BE/BTech", date: "April", url: "https://vit.ac.in", syllabusUrl: "https://vit.ac.in", syllabus: "Engineering core subjects" },
            { name: "SRMJEEE PG", purpose: "MTech at SRM", eligibility: "BE/BTech", date: "May", url: "https://srmist.edu.in", syllabusUrl: "https://srmist.edu.in", syllabus: "Engineering core subjects" },
            { name: "AP PGECET", purpose: "MTech Andhra Pradesh", eligibility: "Engineering graduates", date: "May", url: "https://sche.ap.gov.in", syllabusUrl: "https://sche.ap.gov.in", syllabus: "Engineering discipline topics" },
            { name: "TS PGECET", purpose: "MTech Telangana", eligibility: "Engineering graduates", date: "May", url: "https://pgecet.tsche.ac.in", syllabusUrl: "https://pgecet.tsche.ac.in", syllabus: "Engineering discipline topics" }
        ],
        skillInventory: ["Aspen Plus", "HYSYS", "Heat Exchanger Design", "Mass Transfer", "Fluid Dynamics", "MATLAB", "Six Sigma", "Process Simulation", "ChemCAD"],
        jobRoles: [
            { title: "Process Design Engineer", salary: "₹7-16 LPA", companies: ["Reliance", "IOCL", "Honeywell"], jd: "Design industrial plant processes and steady-state simulations." },
            { title: "Chemical Engineer", salary: "₹8-18 LPA", companies: ["Shell", "ExxonMobil", "Chevron"], jd: "Oversee chemical production and process optimization." },
            { title: "Production Engineer", salary: "₹6-14 LPA", companies: ["BASF", "Dow", "Syngenta"], jd: "Manage production operations and efficiency." }
        ],
        startups: { 
            ideas: ["Eco-friendly Pigments", "Bio-degradable Plastics", "Advanced Filtration Systems", "Carbon Capture Technology"], 
            ecosystem: [
                { name: "Sea6 Energy", focus: "Biofuels, agricultural biostimulants", desc: "Marine biotech firm using seaweed biorefineries.", url: "http://www.sea6energy.com" },
                { name: "Log9 Materials", focus: "Graphene batteries, EV battery packs", desc: "Advanced materials company developing future energy systems.", url: "https://www.log9materials.com" },
                { name: "Carbon Clean", focus: "Modular carbon capture units", desc: "Industrial carbon capture company.", url: "https://www.carbonclean.com" },
                { name: "Aether Industries", focus: "Pharma & agro intermediates", desc: "Specialty chemical manufacturer.", url: "https://www.aether.co.in" },
                { name: "Clean Science & Technology", focus: "Performance chemicals", desc: "Green chemistry innovator using eco-friendly processes.", url: "https://cleanscience.co.in" }
            ],
            guide: [
                { title: "Startup India Registration", tag: "Registration | Central", content: "National startup recognition for tax benefits and fast-track patents.", steps: "Incorporate → Apply via DPIIT Portal → Upload docs → Approval.", req: "Innovative startup < 10 years old.", contact: "dipp-startups@gov.in", url: "https://www.startupindia.gov.in" },
                { title: "IIT Madras Incubation", tag: "Incubation | Tamil Nadu", content: "World-class deep-tech incubation support and lab access.", steps: "Apply online → Technical Interview → Incubation Agreement.", req: "Tech-heavy startup; Student/Alumni/General categories.", contact: "support@incubation.iitm.ac.in", url: "https://incubation.iitm.ac.in" }
            ]
        }
    },
    'biotech': {
        higherStudies: {
            mtech: [
                { name: "Jawaharlal Nehru University", location: "New Delhi", degree: "MSc", program: "Biotechnology", entrance: "GAT-B", specializations: ["Molecular Biology", "Genetic Engineering"], url: "https://www.jnu.ac.in" },
                { name: "University of Hyderabad", location: "Hyderabad, TG", degree: "MSc", program: "Biotechnology", entrance: "GAT-B", specializations: ["Genetic Engineering", "Animal Biotech"], url: "https://www.uohyd.ac.in" },
                { name: "Banaras Hindu University", location: "Varanasi, UP", degree: "MSc", program: "Biotechnology", entrance: "CUET-PG", specializations: ["Bioprocess Technology", "Molecular Biology"], url: "https://www.bhu.ac.in" },
                { name: "Delhi University", location: "New Delhi", degree: "MSc", program: "Biotechnology", entrance: "CUET-PG", specializations: ["Molecular Genetics", "Bioinformatics"], url: "https://www.du.ac.in" },
                { name: "Aligarh Muslim University", location: "Aligarh, UP", degree: "MSc", program: "Biotechnology", entrance: "Entrance/CUET", specializations: ["Industrial Biotechnology", "Microbiology"], url: "https://www.amu.ac.in" },
                { name: "Jamia Millia Islamia", location: "New Delhi", degree: "MSc", program: "Biotechnology", entrance: "CUET-PG", specializations: ["Medical Biotechnology", "Molecular Biology"], url: "https://www.jmi.ac.in" },
                { name: "University of Mysore", location: "Mysore, KA", degree: "MSc", program: "Biotechnology", entrance: "GAT-B", specializations: ["Microbial Biotechnology", "Plant Sciences"], url: "https://uni-mysore.ac.in" },
                { name: "Bharathiar University", location: "Coimbatore, TN", degree: "MSc", program: "Biotechnology", entrance: "Entrance", specializations: ["Plant Biotechnology", "Bioprocess Engineering"], url: "https://www.b-u.ac.in" },
                { name: "Madurai Kamaraj University", location: "Madurai, TN", degree: "MSc", program: "Biotechnology", entrance: "Entrance", specializations: ["Genomics", "Molecular Biology"], url: "https://mkuniversity.ac.in" },
                { name: "Pondicherry University", location: "Puducherry", degree: "MSc", program: "Biotechnology", entrance: "CUET-PG", specializations: ["Bioprocess Engineering", "Molecular Genetics"], url: "https://www.pondiuni.edu.in" },
                { name: "Amity University", location: "Noida, UP", degree: "M.Tech", program: "Biotechnology", entrance: "Entrance", specializations: ["Medical Biotechnology", "Genetic Engineering"], url: "https://www.amity.edu" },
                { name: "VIT University", location: "Vellore, TN", degree: "M.Tech", program: "Biotechnology", entrance: "VITMEE", specializations: ["Systems Biology", "Bioinformatics"], url: "https://vit.ac.in" },
                { name: "SRM Institute", location: "Chennai, TN", degree: "M.Tech", program: "Biotechnology", entrance: "SRMJEEE PG", specializations: ["Genetic Engineering", "Bioprocess Technology"], url: "https://www.srmist.edu.in" },
                { name: "Christ University", location: "Bangalore, KA", degree: "MSc", program: "Biotechnology", entrance: "Entrance", specializations: ["Bioinformatics Integration", "Molecular Biology"], url: "https://christuniversity.in" },
                { name: "Loyola College", location: "Chennai, TN", degree: "MSc", program: "Biotechnology", entrance: "Merit/Entrance", specializations: ["Molecular Biology", "Biochemistry"], url: "https://www.loyolacollege.edu" }
            ],
            phd: [
                { name: "Jawaharlal Nehru University", location: "New Delhi", degree: "PhD", program: "Biotechnology", entrance: "CSIR NET/DBT JRF", specializations: ["Molecular Biology"], url: "https://www.jnu.ac.in" },
                { name: "University of Hyderabad", location: "Hyderabad, TG", degree: "PhD", program: "Biotechnology", entrance: "CSIR NET", specializations: ["Genetic Engineering"], url: "https://www.uohyd.ac.in" },
                { name: "Banaras Hindu University", location: "Varanasi, UP", degree: "PhD", program: "Biotechnology", entrance: "CSIR NET", specializations: ["Bioprocess Engineering"], url: "https://www.bhu.ac.in" },
                { name: "Delhi University", location: "New Delhi", degree: "PhD", program: "Biotechnology", entrance: "CSIR NET", specializations: ["Molecular Genetics"], url: "https://www.du.ac.in" },
                { name: "Aligarh Muslim University", location: "Aligarh, UP", degree: "PhD", program: "Biotechnology", entrance: "NET", specializations: ["Industrial Biotechnology"], url: "https://www.amu.ac.in" },
                { name: "Jamia Millia Islamia", location: "New Delhi", degree: "PhD", program: "Biotechnology", entrance: "NET", specializations: ["Medical Biotechnology"], url: "https://www.jmi.ac.in" },
                { name: "Bharathiar University", location: "Coimbatore, TN", degree: "PhD", program: "Biotechnology", entrance: "NET", specializations: ["Plant Biotechnology"], url: "https://www.b-u.ac.in" },
                { name: "Madurai Kamaraj University", location: "Madurai, TN", degree: "PhD", program: "Biotechnology", entrance: "NET", specializations: ["Genomics"], url: "https://mkuniversity.ac.in" },
                { name: "Pondicherry University", location: "Puducherry", degree: "PhD", program: "Biotechnology", entrance: "NET", specializations: ["Bioprocess Engineering"], url: "https://www.pondiuni.edu.in" },
                { name: "University of Mysore", location: "Mysore, KA", degree: "PhD", program: "Biotechnology", entrance: "NET", specializations: ["Microbial Biotechnology"], url: "https://uni-mysore.ac.in" },
                { name: "SRM Institute", location: "Chennai, TN", degree: "PhD", program: "Biotechnology", entrance: "SRM Entrance", specializations: ["Genetic Engineering"], url: "https://www.srmist.edu.in" },
                { name: "VIT University", location: "Vellore, TN", degree: "PhD", program: "Biotechnology", entrance: "VITREE", specializations: ["Systems Biology"], url: "https://vit.ac.in" }
            ]
        },
        exams: [
            { name: "GAT-B", purpose: "MSc Biotechnology", eligibility: "BSc Life Sciences", date: "April", url: "https://dbt.nta.ac.in", syllabusUrl: "https://dbt.nta.ac.in", syllabus: "Biology, Chemistry, Maths, Biotechnology basics" },
            { name: "DBT-JRF BET", purpose: "PhD Biotechnology fellowship", eligibility: "MSc Biotechnology", date: "May", url: "https://dbtindia.gov.in", syllabusUrl: "https://dbtindia.gov.in", syllabus: "Biochemistry, Molecular Biology" },
            { name: "ICMR JRF", purpose: "PhD Biomedical Sciences", eligibility: "MSc Life Sciences", date: "July", url: "https://main.icmr.nic.in", syllabusUrl: "https://main.icmr.nic.in", syllabus: "Biochemistry, Microbiology, Immunology" },
            { name: "JGEEBILS", purpose: "PhD Biology institutes", eligibility: "BSc/MSc Biology", date: "December", url: "https://ncbs.res.in/jgeebils", syllabusUrl: "https://ncbs.res.in/jgeebils", syllabus: "Cell biology, Genetics, Ecology" },
            { name: "ICAR AICE JRF/SRF", purpose: "Agriculture MSc / PhD", eligibility: "Agriculture graduates", date: "June", url: "https://icar.nta.nic.in", syllabusUrl: "https://icar.nta.nic.in", syllabus: "Agricultural sciences topics" },
            { name: "AIIMS PhD Entrance", purpose: "PhD biomedical sciences", eligibility: "Masters degree", date: "January", url: "https://aiimsexams.ac.in", syllabusUrl: "https://aiimsexams.ac.in", syllabus: "Biomedical science concepts" },
            { name: "JIPMER PhD Entrance", purpose: "PhD medical sciences", eligibility: "Masters degree", date: "July", url: "https://jipmer.edu.in", syllabusUrl: "https://jipmer.edu.in", syllabus: "Medical science topics" }
        ],
        skillInventory: ["Molecular Cloning", "PCR", "HPLC", "Fermentation", "Cell Culture", "Bioinformatics", "R Programming", "Flow Cytometry"],
        jobRoles: [
            { title: "Immunology Scientist", salary: "₹10-18 LPA", companies: ["Biocon", "Bharat Biotech", "Pfizer"], jd: "Research antibodies and immune responses for therapeutics." },
            { title: "Genetics Scientist", salary: "₹5-10 LPA", companies: ["Serum Institute", "Novartis", "GSK"], jd: "Study genetic markers for disease research and diagnostics." },
            { title: "Molecular Biologist", salary: "₹8-16 LPA", companies: ["Roche", "Abbott", "Merck"], jd: "Investigate molecular mechanisms and gene expression." },
            { title: "Bioprocess Engineer", salary: "₹8-16 LPA", companies: ["Biocon", "Bharat Biotech", "Lupin"], jd: "Optimize fermentation and bioprocess scale-up." }
        ],
        startups: { 
            ideas: ["Personalized Medicine", "Gene Therapy", "Microbial Farming", "Lab-Grown Meat"], 
            ecosystem: [
                { name: "Biocon", focus: "Biopharmaceuticals", desc: "India's leading biotech company.", url: "https://www.biocon.com" },
                { name: "Serum Institute", focus: "Vaccines, biologics", desc: "World's largest vaccine manufacturer.", url: "https://www.seruminstitute.com" },
                { name: "Bharat Biotech", focus: "Vaccines development", desc: "Indigenous vaccine manufacturer.", url: "https://www.bharatbiotech.com" },
                { name: "Dr. Reddy's", focus: "Pharmaceuticals", desc: "Global pharma company with biotech divisions.", url: "https://www.drreddys.com" },
                { name: "Lupin", focus: "Biotech & pharma", desc: "Diversified pharma company.", url: "https://www.lupin.com" }
            ],
            guide: [
                { title: "Startup India", tag: "Registration", content: "National startup recognition.", steps: "Apply via DPIIT portal", req: "Innovative startup", contact: "dipp-startups@gov.in", url: "https://www.startupindia.gov.in" }
            ]
        }
    },
    'bioinfo': {
        higherStudies: {
            mtech: [
                { name: "Pondicherry University", location: "Puducherry", degree: "MSc", program: "Bioinformatics", entrance: "CUET-PG", specializations: ["Structural Bioinformatics", "Genomics"], url: "https://www.pondiuni.edu.in" },
                { name: "University of Hyderabad", location: "Hyderabad, TG", degree: "MSc", program: "Bioinformatics", entrance: "CUET-PG", specializations: ["Computational Biology", "Data Analysis"], url: "https://www.uohyd.ac.in" },
                { name: "Savitribai Phule Pune University", location: "Pune, MH", degree: "MSc", program: "Bioinformatics", entrance: "CUET-PG", specializations: ["Systems Biology", "Drug Design"], url: "https://www.unipune.ac.in" },
                { name: "Bharathiar University", location: "Coimbatore, TN", degree: "MSc", program: "Bioinformatics", entrance: "CUET-PG", specializations: ["Genomics", "Proteomics"], url: "https://www.b-u.ac.in" },
                { name: "Amrita Vishwa Vidyapeetham", location: "Coimbatore, TN", degree: "MSc", program: "Bioinformatics", entrance: "CUET-PG", specializations: ["Proteomics", "Computational Genomics"], url: "https://www.amrita.edu" },
                { name: "Anna University", location: "Chennai, TN", degree: "MSc", program: "Bioinformatics", entrance: "GATE/NET", specializations: ["Biomedical Data Science", "Structural Biology"], url: "https://www.annauniv.edu" },
                { name: "Jamia Millia Islamia", location: "New Delhi", degree: "MSc", program: "Bioinformatics", entrance: "CUET-PG", specializations: ["Genomics", "Computational Proteomics"], url: "https://www.jmi.ac.in" },
                { name: "University of Kerala", location: "Thiruvananthapuram, KL", degree: "MSc", program: "Bioinformatics", entrance: "CUET-PG", specializations: ["Proteomics", "Sequence Analysis"], url: "https://www.keralauniversity.ac.in" }
            ],
            phd: [
                { name: "Pondicherry University", location: "Puducherry", degree: "PhD", program: "Bioinformatics", entrance: "NET", specializations: ["Structural Bioinformatics"], url: "https://www.pondiuni.edu.in" },
                { name: "University of Hyderabad", location: "Hyderabad, TG", degree: "PhD", program: "Bioinformatics", entrance: "NET", specializations: ["Computational Biology"], url: "https://www.uohyd.ac.in" },
                { name: "Savitribai Phule Pune University", location: "Pune, MH", degree: "PhD", program: "Bioinformatics", entrance: "NET", specializations: ["Systems Biology"], url: "https://www.unipune.ac.in" },
                { name: "Bharathiar University", location: "Coimbatore, TN", degree: "PhD", program: "Bioinformatics", entrance: "NET", specializations: ["Genomics"], url: "https://www.b-u.ac.in" },
                { name: "Amrita Vishwa Vidyapeetham", location: "Coimbatore, TN", degree: "PhD", program: "Bioinformatics", entrance: "NET", specializations: ["Proteomics"], url: "https://www.amrita.edu" },
                { name: "Anna University", location: "Chennai, TN", degree: "PhD", program: "Bioinformatics", entrance: "GATE/NET", specializations: ["Biomedical Data Science"], url: "https://www.annauniv.edu" },
                { name: "Jamia Millia Islamia", location: "New Delhi", degree: "PhD", program: "Bioinformatics", entrance: "NET", specializations: ["Genomics"], url: "https://www.jmi.ac.in" },
                { name: "University of Kerala", location: "Thiruvananthapuram, KL", degree: "PhD", program: "Bioinformatics", entrance: "NET", specializations: ["Proteomics"], url: "https://www.keralauniversity.ac.in" },
                { name: "Alagappa University", location: "Karaikudi, TN", degree: "PhD", program: "Bioinformatics", entrance: "NET", specializations: ["Computational Biology"], url: "https://www.alagappauniversity.ac.in" },
                { name: "University of Madras", location: "Chennai, TN", degree: "PhD", program: "Bioinformatics", entrance: "NET", specializations: ["Structural Biology"], url: "https://www.unom.ac.in" },
                { name: "JNU", location: "New Delhi", degree: "PhD", program: "Bioinformatics", entrance: "NET", specializations: ["Structural Bioinformatics"], url: "https://www.jnu.ac.in" },
                { name: "SRM Institute", location: "Chennai, TN", degree: "PhD", program: "Bioinformatics", entrance: "SRM Entrance", specializations: ["Genomics"], url: "https://www.srmist.edu.in" },
                { name: "VIT University", location: "Vellore, TN", degree: "PhD", program: "Bioinformatics", entrance: "VITREE", specializations: ["Computational Genomics"], url: "https://vit.ac.in" },
                { name: "Manipal University", location: "Manipal, KA", degree: "PhD", program: "Bioinformatics", entrance: "University Entrance", specializations: ["Systems Biology"], url: "https://manipal.edu" }
            ]
        },
        exams: [
            { name: "GATE Life Sciences", purpose: "MTech Bioinformatics", eligibility: "BSc/MSc Life Sciences", date: "February", url: "https://gate.iitk.ac.in", syllabusUrl: "https://gate.iitk.ac.in/syllabus", syllabus: "Biochemistry, Molecular Biology, Maths" },
            { name: "CSIR NET Life Sciences", purpose: "PhD / JRF research", eligibility: "MSc Life sciences", date: "June & December", url: "https://csirnet.nta.nic.in", syllabusUrl: "https://csirhrdg.res.in", syllabus: "Cell biology, Genetics, Evolution" },
            { name: "JGEEBILS", purpose: "PhD Biology / Bioinformatics", eligibility: "BSc/MSc Biology", date: "December", url: "https://ncbs.res.in/jgeebils", syllabusUrl: "https://ncbs.res.in/jgeebils", syllabus: "Biochemistry, Cell Biology" },
            { name: "TIFR GS Biology", purpose: "PhD Biology programs", eligibility: "BSc/MSc Biology", date: "December", url: "https://tifr.res.in", syllabusUrl: "https://tifr.res.in", syllabus: "Biology + aptitude" }
        ],
        skillInventory: ["Python", "R Programming", "BLAST", "Linux/Unix", "Perl", "Machine Learning", "SQL", "Data Visualization"],
        jobRoles: [
            { title: "Bioinformatician", salary: "₹8-15 LPA", companies: ["Wipro", "TCS", "Infosys"], jd: "Analyze genomic data and develop computational models." },
            { title: "Data Scientist", salary: "₹10-20 LPA", companies: ["IBM", "Google", "Amazon"], jd: "Apply ML to biological data analysis." }
        ],
        startups: { 
            ideas: ["Genomic Testing Platform", "Drug Discovery AI", "Disease Prediction Models"], 
            ecosystem: [
                { name: "Strand Life Sciences", focus: "Genomics analytics", desc: "Genetic data platform.", url: "https://www.strandlifesciences.com" }
            ],
            guide: [
                { title: "Startup India", tag: "Registration", content: "National startup recognition.", steps: "Apply online", req: "Innovation", contact: "dipp-startups@gov.in", url: "https://www.startupindia.gov.in" }
            ]
        }
    },
    'bioeng-nano': {
        higherStudies: {
            mtech: [
                { name: "IISc Bangalore", location: "Bengaluru, KA", degree: "M.Sc", program: "Bioengineering / Nanotechnology", entrance: "GATE/NET", specializations: ["Biomedical Devices", "Nanomaterials"], url: "https://www.iisc.ac.in" },
                { name: "IIT Bombay", location: "Mumbai, MH", degree: "M.Tech", program: "Nanotechnology", entrance: "GATE", specializations: ["Nanomaterials", "Nanoelectronics"], url: "https://www.iitb.ac.in" },
                { name: "IIT Hyderabad", location: "Kandi, TG", degree: "M.Tech", program: "Nanotechnology", entrance: "GATE", specializations: ["Nanoelectronics", "Nanomedicine"], url: "https://www.iith.ac.in" },
                { name: "IIT Delhi", location: "New Delhi", degree: "M.Tech", program: "Nanoscience", entrance: "GATE", specializations: ["Nanobiotechnology", "NanoMedicine"], url: "https://home.iitd.ac.in" },
                { name: "IIT Madras", location: "Chennai, TN", degree: "M.Tech", program: "Nanotechnology", entrance: "GATE", specializations: ["Nanomedicine", "Advanced Materials"], url: "https://www.iitm.ac.in" },
                { name: "Anna University", location: "Chennai, TN", degree: "M.Tech", program: "Nanoscience", entrance: "GATE/NET", specializations: ["Nanomaterials", "Biomedical Applications"], url: "https://www.annauniv.edu" },
                { name: "SRM Institute", location: "Chennai, TN", degree: "M.Tech", program: "Nanotechnology", entrance: "SRM Entrance", specializations: ["Nanomedicine", "Materials"], url: "https://www.srmist.edu.in" },
                { name: "VIT University", location: "Vellore, TN", degree: "M.Tech", program: "Nanotechnology", entrance: "VITMEE", specializations: ["Nanoelectronics", "Nanomaterials"], url: "https://vit.ac.in" },
                { name: "Manipal Institute of Technology", location: "Manipal, KA", degree: "M.Tech", program: "Nanotechnology", entrance: "GATE", specializations: ["Nanomaterials", "Device Fabrication"], url: "https://manipal.edu" },
                { name: "Amity University", location: "Noida, UP", degree: "M.Tech", program: "Nanotechnology", entrance: "Entrance", specializations: ["Nanophotonics", "Materials Science"], url: "https://www.amity.edu" }
            ],
            phd: [
                { name: "IISc Bangalore", location: "Bengaluru, KA", degree: "PhD", program: "Bioengineering", entrance: "GATE/NET/JGEEBILS", specializations: ["Biomedical Devices"], url: "https://www.iisc.ac.in" },
                { name: "IIT Bombay", location: "Mumbai, MH", degree: "PhD", program: "Nanotechnology", entrance: "GATE", specializations: ["Nanomaterials"], url: "https://www.iitb.ac.in" },
                { name: "IIT Hyderabad", location: "Kandi, TG", degree: "PhD", program: "Nanotechnology", entrance: "GATE", specializations: ["Nanoelectronics"], url: "https://www.iith.ac.in" },
                { name: "IIT Delhi", location: "New Delhi", degree: "PhD", program: "Nanoscience", entrance: "GATE", specializations: ["Nanobiotechnology"], url: "https://home.iitd.ac.in" },
                { name: "IIT Madras", location: "Chennai, TN", degree: "PhD", program: "Nanotechnology", entrance: "GATE", specializations: ["Nanomedicine"], url: "https://www.iitm.ac.in" },
                { name: "Anna University", location: "Chennai, TN", degree: "PhD", program: "Nanoscience", entrance: "GATE/NET", specializations: ["Nanomaterials"], url: "https://www.annauniv.edu" },
                { name: "SRM Institute", location: "Chennai, TN", degree: "PhD", program: "Nanotechnology", entrance: "SRM Entrance", specializations: ["Nanomedicine"], url: "https://www.srmist.edu.in" },
                { name: "VIT University", location: "Vellore, TN", degree: "PhD", program: "Nanotechnology", entrance: "VITREE", specializations: ["Nanoelectronics"], url: "https://vit.ac.in" },
                { name: "Manipal Institute of Technology", location: "Manipal, KA", degree: "PhD", program: "Nanotechnology", entrance: "University Entrance", specializations: ["Nanomaterials"], url: "https://manipal.edu" },
                { name: "Amity University", location: "Noida, UP", degree: "PhD", program: "Nanotechnology", entrance: "Entrance", specializations: ["Nanophotonics"], url: "https://www.amity.edu" },
                { name: "Jadavpur University", location: "Kolkata, WB", degree: "PhD", program: "Nanoscience", entrance: "NET/GATE", specializations: ["Nanomaterials"], url: "https://www.jaduniv.edu.in" },
                { name: "University of Hyderabad", location: "Hyderabad, TG", degree: "PhD", program: "Nanoscience", entrance: "NET", specializations: ["Nanobiotechnology"], url: "https://www.uohyd.ac.in" }
            ]
        },
        exams: [
            { name: "GATE", purpose: "MTech Nanotechnology / Bioengineering", eligibility: "BE/BTech/MSc", date: "February", url: "https://gate.iitk.ac.in", syllabusUrl: "https://gate.iitk.ac.in/syllabus", syllabus: "Engineering maths, materials science" },
            { name: "CSIR NET", purpose: "PhD nanoscience research", eligibility: "MSc science", date: "June & December", url: "https://csirnet.nta.nic.in", syllabusUrl: "https://csirhrdg.res.in", syllabus: "Materials chemistry, nanoscience basics" },
            { name: "VITREE", purpose: "PhD programs at VIT", eligibility: "Masters degree", date: "June", url: "https://vit.ac.in", syllabusUrl: "https://vit.ac.in", syllabus: "Research aptitude + subject basics" },
            { name: "SRM PhD Entrance", purpose: "PhD programs at SRM", eligibility: "Masters degree", date: "June", url: "https://srmist.edu.in", syllabusUrl: "https://srmist.edu.in", syllabus: "Subject research topics" },
            { name: "JGEEBILS", purpose: "PhD Bioengineering", eligibility: "BSc/MSc", date: "December", url: "https://ncbs.res.in/jgeebils", syllabusUrl: "https://ncbs.res.in/jgeebils", syllabus: "Biology + Material Science" }
        ],
        skillInventory: ["MATLAB", "COMSOL", "CAD Design", "Materials Characterization", "TEM", "SEM", "Biocompatibility Testing", "ASPEN"],
        jobRoles: [
            { title: "Nanotechnology Engineer", salary: "₹8-16 LPA", companies: ["Nanotech Industries", "ITC"], jd: "Design and test nano-scale devices." },
            { title: "Biomedical Device Engineer", salary: "₹7-15 LPA", companies: ["Stryker", "Medtronic"], jd: "Develop implantable and diagnostic medical devices." }
        ],
        startups: { 
            ideas: ["Nano-sensors", "Smart Materials", "Bio-implants", "Nanocoatings"], 
            ecosystem: [
                { name: "Nanotechnology Research Institute", focus: "Nano research", desc: "Advanced nano materials.", url: "https://www.nanotech.edu" }
            ],
            guide: [
                { title: "Startup India", tag: "Registration", content: "Startup recognition", steps: "Apply online", req: "Innovation", contact: "dipp-startups@gov.in", url: "https://www.startupindia.gov.in" }
            ]
        }
    },
    'chem': {
        higherStudies: {
            mtech: [
                { name: "IISc Bangalore", location: "Bengaluru, KA", degree: "MSc", program: "Chemistry", entrance: "JAM/CSIR NET", specializations: ["Materials Chemistry", "Organic Chemistry"], url: "https://www.iisc.ac.in" },
                { name: "IIT Bombay", location: "Mumbai, MH", degree: "MSc", program: "Chemistry", entrance: "JAM/CSIR NET", specializations: ["Organic Chemistry", "Physical Chemistry"], url: "https://www.iitb.ac.in" },
                { name: "IIT Kanpur", location: "Kanpur, UP", degree: "MSc", program: "Chemistry", entrance: "JAM/CSIR NET", specializations: ["Physical Chemistry", "Catalysis"], url: "https://www.iitk.ac.in" },
                { name: "IIT Madras", location: "Chennai, TN", degree: "MSc", program: "Chemistry", entrance: "JAM/CSIR NET", specializations: ["Theoretical Chemistry", "Inorganic Chemistry"], url: "https://www.iitm.ac.in" },
                { name: "IIT Delhi", location: "New Delhi", degree: "MSc", program: "Chemistry", entrance: "JAM/CSIR NET", specializations: ["Inorganic Chemistry", "Materials"], url: "https://home.iitd.ac.in" },
                { name: "Banaras Hindu University", location: "Varanasi, UP", degree: "MSc", program: "Chemistry", entrance: "CUET-PG/CSIR NET", specializations: ["Analytical Chemistry", "Organic"], url: "https://www.bhu.ac.in" },
                { name: "Delhi University", location: "New Delhi", degree: "MSc", program: "Chemistry", entrance: "CUET-PG/CSIR NET", specializations: ["Organic Chemistry", "Physical"], url: "https://www.du.ac.in" },
                { name: "University of Hyderabad", location: "Hyderabad, TG", degree: "MSc", program: "Chemistry", entrance: "CUET-PG/CSIR NET", specializations: ["Materials Chemistry", "Inorganic"], url: "https://www.uohyd.ac.in" },
                { name: "Savitribai Phule Pune University", location: "Pune, MH", degree: "MSc", program: "Chemistry", entrance: "CUET-PG", specializations: ["Polymer Chemistry", "Organic"], url: "https://www.unipune.ac.in" },
                { name: "Jadavpur University", location: "Kolkata, WB", degree: "MSc", program: "Chemistry", entrance: "CUET-PG/NET", specializations: ["Applied Chemistry", "Inorganic"], url: "https://www.jaduniv.edu.in" }
            ],
            phd: [
                { name: "IISc Bangalore", location: "Bengaluru, KA", degree: "PhD", program: "Chemistry", entrance: "CSIR NET", specializations: ["Materials Chemistry"], url: "https://www.iisc.ac.in" },
                { name: "IIT Bombay", location: "Mumbai, MH", degree: "PhD", program: "Chemistry", entrance: "CSIR NET/GATE", specializations: ["Organic Chemistry"], url: "https://www.iitb.ac.in" },
                { name: "IIT Kanpur", location: "Kanpur, UP", degree: "PhD", program: "Chemistry", entrance: "CSIR NET", specializations: ["Physical Chemistry"], url: "https://www.iitk.ac.in" },
                { name: "IIT Madras", location: "Chennai, TN", degree: "PhD", program: "Chemistry", entrance: "CSIR NET", specializations: ["Theoretical Chemistry"], url: "https://www.iitm.ac.in" },
                { name: "IIT Delhi", location: "New Delhi", degree: "PhD", program: "Chemistry", entrance: "CSIR NET", specializations: ["Inorganic Chemistry"], url: "https://home.iitd.ac.in" },
                { name: "Banaras Hindu University", location: "Varanasi, UP", degree: "PhD", program: "Chemistry", entrance: "CSIR NET", specializations: ["Analytical Chemistry"], url: "https://www.bhu.ac.in" },
                { name: "Delhi University", location: "New Delhi", degree: "PhD", program: "Chemistry", entrance: "CSIR NET", specializations: ["Organic Chemistry"], url: "https://www.du.ac.in" },
                { name: "University of Hyderabad", location: "Hyderabad, TG", degree: "PhD", program: "Chemistry", entrance: "CSIR NET", specializations: ["Materials Chemistry"], url: "https://www.uohyd.ac.in" },
                { name: "Savitribai Phule Pune University", location: "Pune, MH", degree: "PhD", program: "Chemistry", entrance: "NET", specializations: ["Polymer Chemistry"], url: "https://www.unipune.ac.in" },
                { name: "Jadavpur University", location: "Kolkata, WB", degree: "PhD", program: "Chemistry", entrance: "NET/GATE", specializations: ["Applied Chemistry"], url: "https://www.jaduniv.edu.in" },
                { name: "Aligarh Muslim University", location: "Aligarh, UP", degree: "PhD", program: "Chemistry", entrance: "NET", specializations: ["Inorganic Chemistry"], url: "https://www.amu.ac.in" },
                { name: "University of Madras", location: "Chennai, TN", degree: "PhD", program: "Chemistry", entrance: "NET", specializations: ["Organic Chemistry"], url: "https://www.unom.ac.in" },
                { name: "Bharathiar University", location: "Coimbatore, TN", degree: "PhD", program: "Chemistry", entrance: "NET", specializations: ["Analytical Chemistry"], url: "https://www.b-u.ac.in" },
                { name: "Kerala University", location: "Thiruvananthapuram, KL", degree: "PhD", program: "Chemistry", entrance: "NET", specializations: ["Physical Chemistry"], url: "https://www.keralauniversity.ac.in" },
                { name: "Osmania University", location: "Hyderabad, TG", degree: "PhD", program: "Chemistry", entrance: "NET", specializations: ["Organic Chemistry"], url: "https://www.osmania.ac.in" }
            ]
        },
        exams: [
            { name: "CSIR-UGC NET", purpose: "PhD / JRF fellowship", eligibility: "MSc Chemistry", date: "June & December", url: "https://csirnet.nta.nic.in", syllabusUrl: "https://csirhrdg.res.in", syllabus: "Organic, Inorganic, Physical Chemistry" },
            { name: "IIT JAM", purpose: "MSc Chemistry / Science", eligibility: "BSc students", date: "February", url: "https://jam.iitb.ac.in", syllabusUrl: "https://jam.iitb.ac.in/Syllabus.html", syllabus: "Organic, Physical, Inorganic Chemistry" },
            { name: "TIFR GS", purpose: "PhD / Integrated PhD", eligibility: "BSc/MSc Science", date: "December", url: "https://tifr.res.in", syllabusUrl: "https://tifr.res.in", syllabus: "Core chemistry concepts + aptitude" },
            { name: "CUET PG", purpose: "PG admissions central universities", eligibility: "Bachelor degree", date: "March", url: "https://pgcuet.samarth.ac.in", syllabusUrl: "https://pgcuet.samarth.ac.in", syllabus: "Subject specific UG syllabus" },
            { name: "GSET", purpose: "Assistant professor eligibility", eligibility: "Postgraduates", date: "December", url: "https://gujaratset.ac.in", syllabusUrl: "https://gujaratset.ac.in", syllabus: "Subject + teaching aptitude" },
            { name: "MH SET", purpose: "Assistant professor eligibility", eligibility: "Postgraduates", date: "March", url: "https://setexam.unipune.ac.in", syllabusUrl: "https://setexam.unipune.ac.in", syllabus: "Subject + teaching aptitude" }
        ],
        skillInventory: ["Organic Synthesis", "NMR Spectroscopy", "HPLC", "Mass Spectrometry", "Crystallography", "Computational Chemistry", "GC-MS", "Lab Management"],
        jobRoles: [
            { title: "Organic Chemist", salary: "₹6-12 LPA", companies: ["BASF", "Syngenta", "Dow"], jd: "Develop new organic compounds and synthesis routes." },
            { title: "Analytical Chemist", salary: "₹6-12 LPA", companies: ["Novartis", "GSK", "Abbvie"], jd: "Conduct quality control and analytical testing." },
            { title: "Research Chemist", salary: "₹7-14 LPA", companies: ["Merck", "Roche", "Pfizer"], jd: "Investigate new chemical reactions and mechanisms." }
        ],
        startups: { 
            ideas: ["Green Chemistry Solutions", "Specialty Chemicals", "Catalysts Development", "Polymer Innovations"], 
            ecosystem: [
                { name: "Chemical Research Institute", focus: "Chemistry R&D", desc: "Advanced chemical research.", url: "https://www.chemresearch.edu" }
            ],
            guide: [
                { title: "Startup India", tag: "Registration", content: "National startup recognition", steps: "Apply online", req: "Innovation", contact: "dipp-startups@gov.in", url: "https://www.startupindia.gov.in" }
            ]
        }
    }
};

// Initialize page with lucide icons
function initializePage() {
    if (window.lucide) {
        window.lucide.createIcons();
    }
}
