export interface IndustryConfig {
  name: string;
  projectSectionTitle: string;
  portfolioSectionTitle: string; // Alias kompatibilitas
  technologiesLabel: string;
  suggestedSkills: string[];
  projectLinkLabel?: string;
  projectSecondaryLinkLabel?: string;
  
  // Modal Form Placeholders
  headlinePlaceholder?: string;
  companyPlaceholder?: string;
  positionPlaceholder?: string;
  experienceDescPlaceholder?: string;
  portfolioTitleLabel?: string;
  portfolioTitlePlaceholder?: string;
  technologiesPlaceholder?: string;
  portfolioLinkPlaceholder?: string;
  portfolioDescPlaceholder?: string;
  institutionPlaceholder?: string;
  majorPlaceholder?: string;
  achievementTitlePlaceholder?: string;
  issuerPlaceholder?: string;
  skillPlaceholder?: string;
}

export const INDUSTRY_CONFIGS: Record<string, IndustryConfig> = {
  tech: {
    name: "Technology & Software",
    projectSectionTitle: "Projects & Portfolio",
    portfolioSectionTitle: "Projects & Portfolio",
    technologiesLabel: "Technologies Used",
    suggestedSkills: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma ORM",
      "Git & GitHub",
      "Docker",
      "REST APIs",
      "GraphQL",
      "CI/CD",
    ],
    projectLinkLabel: "Live Demo",
    projectSecondaryLinkLabel: "Repository",
    headlinePlaceholder: "e.g. Senior Full-Stack Developer | React & Node.js",
    companyPlaceholder: "e.g. Google, Tokopedia, Freelance",
    positionPlaceholder: "e.g. Software Engineer",
    experienceDescPlaceholder: "• Built microservices scaling to 100k daily users...",
    portfolioTitleLabel: "Project Name",
    portfolioTitlePlaceholder: "e.g. E-Commerce Platform",
    technologiesPlaceholder: "e.g. Next.js, Prisma, PostgreSQL",
    portfolioLinkPlaceholder: "https://github.com/...",
    portfolioDescPlaceholder: "Describe tech architecture, challenges, and results...",
    institutionPlaceholder: "e.g. Politeknik Negeri Batam",
    majorPlaceholder: "e.g. Informatics Engineering",
    achievementTitlePlaceholder: "e.g. 1st Winner Hackathon 2025",
    issuerPlaceholder: "e.g. Kementerian Kominfo",
    skillPlaceholder: "e.g. Docker, Kubernetes, Next.js",
  },
  law: {
    name: "Law & Legal Services",
    projectSectionTitle: "Deals & Legal Cases",
    portfolioSectionTitle: "Deals & Legal Cases",
    technologiesLabel: "Practice Areas / Focus",
    suggestedSkills: [
      "Legal Research",
      "Contract Drafting",
      "Corporate Governance",
      "Due Diligence",
      "Litigation Strategy",
      "Regulatory Compliance",
      "Intellectual Property",
      "Arbitration",
      "Legal Advisory",
      "Risk Management",
    ],
    projectLinkLabel: "Case Reference",
    projectSecondaryLinkLabel: "Publication / Brief",
    headlinePlaceholder: "e.g. Corporate Legal Counsel | M&A & Compliance",
    companyPlaceholder: "e.g. Hadiputranto, Hadinoto & Partners",
    positionPlaceholder: "e.g. Legal Associate",
    experienceDescPlaceholder: "• Drafted over 50+ commercial contracts...",
    portfolioTitleLabel: "Case / Transaction Name",
    portfolioTitlePlaceholder: "e.g. Cross-Border Acquisition Advisory",
    technologiesPlaceholder: "e.g. Corporate Law, Due Diligence",
    portfolioLinkPlaceholder: "https://case-reference.com/...",
    portfolioDescPlaceholder: "Summarize legal issues, strategies applied, and outcomes...",
    institutionPlaceholder: "e.g. Universitas Indonesia",
    majorPlaceholder: "e.g. Bachelor of Laws (S.H.)",
    achievementTitlePlaceholder: "e.g. Best Oralist Moot Court Competition",
    issuerPlaceholder: "e.g. International Law Students Association",
    skillPlaceholder: "e.g. Contract Negotiation, Compliance",
  },
  finance: {
    name: "Accounting & Finance",
    projectSectionTitle: "Audits & Financial Cases",
    portfolioSectionTitle: "Audits & Financial Cases",
    technologiesLabel: "Tools & Methodologies",
    suggestedSkills: [
      "Financial Modeling",
      "Cash Flow Analysis",
      "Tax Planning & Reporting",
      "Auditing & Assurance",
      "SAP / ERP",
      "Budgeting & Forecasting",
      "Valuation",
      "Excel Financial Functions",
      "Internal Controls",
      "IFRS / GAAP Compliance",
    ],
    projectLinkLabel: "Report Link",
    projectSecondaryLinkLabel: "Reference No.",
    headlinePlaceholder: "e.g. Senior Financial Analyst | FP&A & Audit",
    companyPlaceholder: "e.g. PwC, BCA, Mandiri",
    positionPlaceholder: "e.g. Financial Auditor",
    experienceDescPlaceholder: "• Audited financial statements for tier-1 enterprises...",
    portfolioTitleLabel: "Audit / Financial Model Name",
    portfolioTitlePlaceholder: "e.g. Annual Audit for Telecommunications Firm",
    technologiesPlaceholder: "e.g. SAP ERP, Excel VBA, IFRS",
    portfolioLinkPlaceholder: "https://annual-report.com/...",
    portfolioDescPlaceholder: "Key audit highlights, risk areas evaluated, and solutions...",
    institutionPlaceholder: "e.g. Universitas Gadjah Mada",
    majorPlaceholder: "e.g. Accounting (S.Ak)",
    achievementTitlePlaceholder: "e.g. CFA Level 1 Passed",
    issuerPlaceholder: "e.g. CFA Institute",
    skillPlaceholder: "e.g. Financial Modeling, Valuation",
  },
  marketing: {
    name: "Marketing & Creative",
    projectSectionTitle: "Campaigns & Creative Work",
    portfolioSectionTitle: "Campaigns & Creative Work",
    technologiesLabel: "Platforms & Tools",
    suggestedSkills: [
      "SEO / SEM",
      "Content Strategy",
      "Google Analytics",
      "Copywriting",
      "Performance Marketing",
      "Meta Ads & Google Ads",
      "Brand Positioning",
      "Figma",
      "Social Media Management",
      "Email Marketing",
    ],
    projectLinkLabel: "Campaign Link",
    projectSecondaryLinkLabel: "Case Study",
    headlinePlaceholder: "e.g. Growth Marketing Lead | Performance & SEO",
    companyPlaceholder: "e.g. Gojek, Shopee, Creative Agency",
    positionPlaceholder: "e.g. Marketing Specialist",
    experienceDescPlaceholder: "• Scaled paid ad ROAS by 140% across Q3...",
    portfolioTitleLabel: "Campaign Name",
    portfolioTitlePlaceholder: "e.g. Brand Relaunch Q4 Campaign",
    technologiesPlaceholder: "e.g. Meta Ads, TikTok Ads, Google Analytics",
    portfolioLinkPlaceholder: "https://behance.net/...",
    portfolioDescPlaceholder: "Campaign objectives, creative execution, and metrics...",
    institutionPlaceholder: "e.g. Universitas Padjadjaran",
    majorPlaceholder: "e.g. Communication & Advertising",
    achievementTitlePlaceholder: "e.g. Citra Pariwara Gold Winner",
    issuerPlaceholder: "e.g. Persatuan Perusahaan Periklanan Indonesia",
    skillPlaceholder: "e.g. Meta Ads, Content Strategy",
  },
  business: {
    name: "Business & Management",
    projectSectionTitle: "Key Initiatives & Case Studies",
    portfolioSectionTitle: "Key Initiatives & Case Studies",
    technologiesLabel: "Core Methodologies",
    suggestedSkills: [
      "Strategic Planning",
      "Agile & Scrum",
      "Stakeholder Management",
      "Operations Management",
      "KPI Development",
      "Business Intelligence",
      "Process Optimization",
      "Product Management",
      "Market Analysis",
      "Cross-Functional Leadership",
    ],
    projectLinkLabel: "Project Link",
    projectSecondaryLinkLabel: "Documentation",
    headlinePlaceholder: "e.g. Operations Manager | Agile & Process Scaling",
    companyPlaceholder: "e.g. McKinsey, Grab, Unilever",
    positionPlaceholder: "e.g. Business Analyst",
    experienceDescPlaceholder: "• Streamlined logistics operations reducing costs by 18%...",
    portfolioTitleLabel: "Initiative Name",
    portfolioTitlePlaceholder: "e.g. Warehouse Process Optimization",
    technologiesPlaceholder: "e.g. Lean Six Sigma, Tableau",
    portfolioLinkPlaceholder: "https://case-study.com/...",
    portfolioDescPlaceholder: "Business problem, turnaround plan, and measurable impact...",
    institutionPlaceholder: "e.g. Institut Teknologi Bandung",
    majorPlaceholder: "e.g. Industrial Engineering / Management",
    achievementTitlePlaceholder: "e.g. Best Business Case Presenter",
    issuerPlaceholder: "e.g. Harvard Business Review Case Challenge",
    skillPlaceholder: "e.g. Process Mapping, Scrum",
  },
  healthcare: {
    name: "Healthcare & Life Sciences",
    projectSectionTitle: "Clinical Cases & Research",
    portfolioSectionTitle: "Clinical Cases & Research",
    technologiesLabel: "Clinical Focus / Tools",
    suggestedSkills: [
      "Clinical Diagnostics",
      "Patient Care Management",
      "Medical Documentation",
      "Clinical Trials",
      "HIPAA / Healthcare Compliance",
      "Epidemiology",
      "Pharmacology",
      "Health Informatics",
      "Biomedical Research",
      "Emergency Care",
    ],
    projectLinkLabel: "Research Paper",
    projectSecondaryLinkLabel: "Protocol Reference",
    headlinePlaceholder: "e.g. Clinical Research Associate | Epidemiology",
    companyPlaceholder: "e.g. Siloam Hospitals, Prodia",
    positionPlaceholder: "e.g. Medical Doctor / Clinical Specialist",
    experienceDescPlaceholder: "• Managed patient trials and monitored compliance protocols...",
    portfolioTitleLabel: "Research / Study Name",
    portfolioTitlePlaceholder: "e.g. Phase II Cardiovascular Drug Trial",
    technologiesPlaceholder: "e.g. SPSS, Clinical Protocol 004",
    portfolioLinkPlaceholder: "https://pubmed.ncbi.nlm.nih.gov/...",
    portfolioDescPlaceholder: "Methodology, sample size, primary endpoints, and outcomes...",
    institutionPlaceholder: "e.g. Universitas Airlangga",
    majorPlaceholder: "e.g. Medicine (dr.)",
    achievementTitlePlaceholder: "e.g. Best Clinical Research Award",
    issuerPlaceholder: "e.g. IDI (Ikatan Dokter Indonesia)",
    skillPlaceholder: "e.g. Clinical Trials, GCP Certification",
  },
};

export function getIndustryConfig(industryKey?: string | null): IndustryConfig {
  if (!industryKey) return INDUSTRY_CONFIGS.tech;

  const normalized = industryKey.toLowerCase().trim();

  if (INDUSTRY_CONFIGS[normalized]) {
    return INDUSTRY_CONFIGS[normalized];
  }

  if (normalized.includes("law") || normalized.includes("legal") || normalized.includes("hukum")) {
    return INDUSTRY_CONFIGS.law;
  }
  if (
    normalized.includes("finance") ||
    normalized.includes("account") ||
    normalized.includes("bank") ||
    normalized.includes("keuangan") ||
    normalized.includes("akuntansi")
  ) {
    return INDUSTRY_CONFIGS.finance;
  }
  if (normalized.includes("market") || normalized.includes("creative") || normalized.includes("design") || normalized.includes("desain")) {
    return INDUSTRY_CONFIGS.marketing;
  }
  if (normalized.includes("health") || normalized.includes("medic") || normalized.includes("kesehatan") || normalized.includes("medis")) {
    return INDUSTRY_CONFIGS.healthcare;
  }
  if (normalized.includes("business") || normalized.includes("management") || normalized.includes("bisnis") || normalized.includes("manajemen")) {
    return INDUSTRY_CONFIGS.business;
  }

  return INDUSTRY_CONFIGS.tech;
}