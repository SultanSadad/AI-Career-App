export interface MajorConfig {
  id: string;
  name: string;
  projectSectionTitle: string;
  portfolioSectionTitle: string;
  technologiesLabel: string;
  technologiesPlaceholder: string;
  projectItemTitlePlaceholder: string;
  projectDescPlaceholder: string;
  projectLinkLabel?: string;
  projectSecondaryLinkLabel?: string;
  headlinePlaceholder: string;
  positionPlaceholder: string;
  experienceDescPlaceholder: string;
  targetRolePlaceholder: string; // Placeholder untuk AI Insights Target Role
  jobDescPlaceholder: string;     // Placeholder untuk AI Insights Job Description
  skillsSectionTitle: string;
  defaultRecommendedSkills: string[];
  systemRolePrompt: string;
}

export const MAJOR_CONFIGS: Record<string, MajorConfig> = {
  it: {
    id: "it",
    name: "Information Technology & Software",
    projectSectionTitle: "Key Projects & Technical Deliverables",
    portfolioSectionTitle: "Projects & Technical Deliverables",
    technologiesLabel: "Technologies Used",
    technologiesPlaceholder: "Next.js, TypeScript, PostgreSQL, Docker",
    projectItemTitlePlaceholder: "e.g. E-Commerce Microservices, Inventory API",
    projectDescPlaceholder: "Arsitektur sistem, optimalisasi database, throughput/latensi...",
    projectLinkLabel: "Live Demo",
    projectSecondaryLinkLabel: "Repository",
    headlinePlaceholder: "e.g. Full-Stack Web Developer | Next.js & TypeScript",
    positionPlaceholder: "e.g. Software Engineer / Full-Stack Developer",
    experienceDescPlaceholder: "• Built scalable microservices serving 100k+ daily users...",
    targetRolePlaceholder: "e.g. Senior Full-Stack Engineer / Cloud Architect / DevOps Lead",
    jobDescPlaceholder: "Paste the target software engineer, full-stack, or tech role description & requirements here...",
    skillsSectionTitle: "Technical & Engineering Skills",
    defaultRecommendedSkills: ["TypeScript", "Next.js", "React", "PostgreSQL", "Prisma ORM", "Docker", "REST APIs", "CI/CD", "Git"],
    systemRolePrompt: "You are an elite Senior Technical Recruiter & Engineering Director evaluating software development competencies.",
  },
  finance: {
    id: "finance",
    name: "Finance & Banking",
    projectSectionTitle: "Financial Analyses & Case Studies",
    portfolioSectionTitle: "Financial Analyses & Case Studies",
    technologiesLabel: "Tools & Methodologies",
    technologiesPlaceholder: "DCF Modeling, Bloomberg Terminal, Excel VBA, Power BI",
    projectItemTitlePlaceholder: "e.g. Valuation Model for Series-A Funding, DCF Valuation",
    projectDescPlaceholder: "Metode valuasi, analisis risiko pasar, proyeksi ROI, struktur modal...",
    projectLinkLabel: "Report Link",
    projectSecondaryLinkLabel: "Reference No.",
    headlinePlaceholder: "e.g. Senior Financial Analyst | FP&A & Corporate Valuation",
    positionPlaceholder: "e.g. Financial Analyst / Investment Associate",
    experienceDescPlaceholder: "• Structured multi-currency cash flow models and valuation decks...",
    targetRolePlaceholder: "e.g. Investment Banking Analyst / FP&A Manager / Portfolio Associate",
    jobDescPlaceholder: "Paste the target investment banking, financial planning, or risk analysis job description here...",
    skillsSectionTitle: "Quantitative & Financial Competencies",
    defaultRecommendedSkills: ["Financial Modeling", "DCF Valuation", "Financial Statement Analysis", "Portfolio Management", "Bloomberg Terminal", "Risk Management"],
    systemRolePrompt: "You are an Investment Banking Vice President & CFA Charterholder evaluating financial acumen and quantitative modeling capabilities.",
  },
  accounting: {
    id: "accounting",
    name: "Accounting & Taxation",
    projectSectionTitle: "Audit Engagements & Tax Cases",
    portfolioSectionTitle: "Audit Engagements & Tax Cases",
    technologiesLabel: "Systems & Standards",
    technologiesPlaceholder: "SAP ERP, Accurate, PSAK/IFRS, e-Faktur, QuickBooks",
    projectItemTitlePlaceholder: "e.g. FY2025 Statutory Audit, Corporate Tax Restructuring",
    projectDescPlaceholder: "Ruang lingkup audit, kepatuhan PSAK/IFRS, rekonsiliasi fiskal, temuan kontrol...",
    projectLinkLabel: "Audit Reference",
    projectSecondaryLinkLabel: "Working Paper Ref",
    headlinePlaceholder: "e.g. Senior Auditor | Statutory Audit & Corporate Taxation",
    positionPlaceholder: "e.g. Financial Auditor / Tax Consultant",
    experienceDescPlaceholder: "• Conducted statutory audit procedures adhering to IFRS/PSAK...",
    targetRolePlaceholder: "e.g. Senior Tax Auditor / Financial Controller / Public Accountant",
    jobDescPlaceholder: "Paste the target external audit, corporate tax, or senior accounting job requirements here...",
    skillsSectionTitle: "Accounting, Audit & Tax Competencies",
    defaultRecommendedSkills: ["PSAK / IFRS Compliance", "Statutory Audit", "Corporate Taxation", "SAP ERP", "Financial Reporting", "Internal Controls"],
    systemRolePrompt: "You are a Big 4 Audit Partner & CPA evaluating accounting accuracy, tax regulation compliance, and audit rigor.",
  },
  law: {
    id: "law",
    name: "Law & Legal Studies",
    projectSectionTitle: "Deals & Legal Cases",
    portfolioSectionTitle: "Deals & Legal Cases",
    technologiesLabel: "Practice Areas / Focus",
    technologiesPlaceholder: "Corporate Law, Due Diligence, Arbitration, Contract Drafting",
    projectItemTitlePlaceholder: "e.g. Cross-Border Acquisition Due Diligence",
    projectDescPlaceholder: "Analisis regulasi, mitigasi risiko hukum, penyusunan klausul kontrak...",
    projectLinkLabel: "Case Reference",
    projectSecondaryLinkLabel: "Publication / Brief",
    headlinePlaceholder: "e.g. Corporate Legal Counsel | M&A & Regulatory Compliance",
    positionPlaceholder: "e.g. Legal Associate / Corporate Counsel",
    experienceDescPlaceholder: "• Drafted and negotiated 40+ high-value commercial agreements...",
    targetRolePlaceholder: "e.g. Corporate Legal Counsel / Senior Legal Associate / Compliance Officer",
    jobDescPlaceholder: "Paste the target in-house counsel, litigation, or regulatory compliance job description here...",
    skillsSectionTitle: "Legal Practice & Analytical Competencies",
    defaultRecommendedSkills: ["Legal Drafting", "Due Diligence", "Corporate Governance", "Contract Negotiation", "Litigation Strategy", "Regulatory Compliance"],
    systemRolePrompt: "You are a Senior Legal Counsel & Managing Partner evaluating legal reasoning, statutory interpretation, and contract drafting precision.",
  },
  marketing: {
    id: "marketing",
    name: "Marketing & Growth",
    projectSectionTitle: "Campaigns & Growth Deliverables",
    portfolioSectionTitle: "Campaigns & Creative Work",
    technologiesLabel: "Platforms & Tools",
    technologiesPlaceholder: "Meta Ads, Google Analytics 4, TikTok Ads, HubSpot",
    projectItemTitlePlaceholder: "e.g. Q3 Brand Relaunch & CAC Optimization",
    projectDescPlaceholder: "Target audiens, metrik ROAS/CAC/LTV, konversi funnel, materi kreatif...",
    projectLinkLabel: "Campaign Link",
    projectSecondaryLinkLabel: "Case Study Deck",
    headlinePlaceholder: "e.g. Growth Marketing Lead | Performance & SEO",
    positionPlaceholder: "e.g. Growth Marketer / Brand Strategist",
    experienceDescPlaceholder: "• Scaled paid ad channels, boosting blended ROAS by 140% across Q3...",
    targetRolePlaceholder: "e.g. Growth Marketing Lead / Performance Specialist / Brand Manager",
    jobDescPlaceholder: "Paste the target digital growth, performance marketing, or brand strategy job description here...",
    skillsSectionTitle: "Marketing & Growth Competencies",
    defaultRecommendedSkills: ["SEO / SEM", "Performance Marketing", "Google Analytics 4", "Meta Ads Manager", "Conversion Rate Optimization", "Content Strategy"],
    systemRolePrompt: "You are a Chief Marketing Officer (CMO) evaluating digital growth strategies, performance metrics, and brand campaign deliverables.",
  },
  engineering: {
    id: "engineering",
    name: "Engineering & Operations",
    projectSectionTitle: "Engineering Designs & Operational Projects",
    portfolioSectionTitle: "Engineering Designs & Operational Projects",
    technologiesLabel: "Engineering Software & Standards",
    technologiesPlaceholder: "AutoCAD, MATLAB, SolidWorks, Lean Six Sigma, PLC",
    projectItemTitlePlaceholder: "e.g. High-Yield Manufacturing Automation Line",
    projectDescPlaceholder: "Spesifikasi teknik, optimalisasi throughput mesin, standardisasi operasi...",
    projectLinkLabel: "Schematic / Spec",
    projectSecondaryLinkLabel: "Documentation",
    headlinePlaceholder: "e.g. Operations & Process Engineer | Lean Six Sigma",
    positionPlaceholder: "e.g. Manufacturing Engineer / Process Analyst",
    experienceDescPlaceholder: "• Redesigned assembly floor logistics, reducing cycle time by 22%...",
    targetRolePlaceholder: "e.g. Process & Automation Engineer / Manufacturing Operations Lead",
    jobDescPlaceholder: "Paste the target engineering, operations, or manufacturing job description here...",
    skillsSectionTitle: "Technical & Operational Competencies",
    defaultRecommendedSkills: ["AutoCAD", "MATLAB", "SolidWorks", "Lean Manufacturing", "Six Sigma", "Root Cause Analysis"],
    systemRolePrompt: "You are a Principal Engineering Director evaluating mechanical, electrical, and manufacturing operations excellence.",
  },
};

// Aliases untuk menjaga backwards compatibility
export type IndustryConfig = MajorConfig;
export const INDUSTRY_CONFIGS = MAJOR_CONFIGS;

export function getIndustryConfig(key?: string | null): MajorConfig {
  if (!key) return MAJOR_CONFIGS.it;
  const k = key.toLowerCase().trim();

  if (MAJOR_CONFIGS[k]) return MAJOR_CONFIGS[k];

  if (k.includes("tech") || k.includes("software") || k.includes("it") || k.includes("informatik")) {
    return MAJOR_CONFIGS.it;
  }
  if (k.includes("account") || k.includes("akuntansi") || k.includes("pajak") || k.includes("tax")) {
    return MAJOR_CONFIGS.accounting;
  }
  if (k.includes("finance") || k.includes("bank") || k.includes("keuangan")) {
    return MAJOR_CONFIGS.finance;
  }
  if (k.includes("law") || k.includes("legal") || k.includes("hukum")) {
    return MAJOR_CONFIGS.law;
  }
  if (k.includes("market") || k.includes("creative") || k.includes("pemasaran")) {
    return MAJOR_CONFIGS.marketing;
  }
  if (k.includes("engineer") || k.includes("teknik") || k.includes("mesin") || k.includes("industri")) {
    return MAJOR_CONFIGS.engineering;
  }

  return MAJOR_CONFIGS.it;
}