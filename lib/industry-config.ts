export interface IndustryConfig {
  id: string;
  name: string;
  badge: string;
  headlinePlaceholder: string;
  // Experience Placeholders
  companyPlaceholder: string;
  positionPlaceholder: string;
  experienceDescPlaceholder: string;
  // Portfolio / Case Study Placeholders
  portfolioSectionTitle: string;
  portfolioTitleLabel: string;
  portfolioTitlePlaceholder: string;
  portfolioLinkPlaceholder: string;
  portfolioDescPlaceholder: string;
  // Education Placeholders
  institutionPlaceholder: string;
  majorPlaceholder: string;
  // Achievement Placeholders
  achievementTitlePlaceholder: string;
  issuerPlaceholder: string;
  // Skill Placeholders
  skillPlaceholder: string;
  skillSuggestions: string[];
}

export const INDUSTRY_CONFIGS: Record<string, IndustryConfig> = {
  "Information Technology & Software": {
    id: "it",
    name: "Information Technology & Software",
    badge: "Tech & Software",
    headlinePlaceholder: "Full Stack Developer | Next.js, TypeScript & PostgreSQL",
    companyPlaceholder: "e.g. PT Telekomunikasi / Tech Startup",
    positionPlaceholder: "e.g. Full Stack Web Developer Intern",
    experienceDescPlaceholder: "- Developed responsive web modules using Next.js & TypeScript\n- Optimized database query response times by 35%",
    portfolioSectionTitle: "Key Projects & Repositories",
    portfolioTitleLabel: "Project Title *",
    portfolioTitlePlaceholder: "e.g. AI-Powered Career Platform",
    portfolioLinkPlaceholder: "https://github.com/...",
    portfolioDescPlaceholder: "- Built full-stack system using Next.js 16 and Prisma ORM\n- Integrated Gemini AI structured schema API",
    institutionPlaceholder: "e.g. Politeknik Negeri Batam / ITB",
    majorPlaceholder: "e.g. Teknik Informatika / Sistem Informasi",
    achievementTitlePlaceholder: "e.g. Juara 1 Hackathon Web Dev Nasional",
    issuerPlaceholder: "e.g. Kominfo / Asosiasi Startup",
    skillPlaceholder: "e.g. TypeScript, Next.js, PostgreSQL, Docker",
    skillSuggestions: ["TypeScript", "Next.js", "React", "PostgreSQL", "Prisma ORM", "Docker", "Git/GitHub", "REST APIs", "Tailwind CSS"],
  },
  "Hukum & Legal Compliance": {
    id: "legal",
    name: "Hukum & Legal Compliance",
    badge: "Law & Corporate Governance",
    headlinePlaceholder: "Corporate Legal Associate | Contract Drafting & Compliance Audit",
    companyPlaceholder: "e.g. Kantor Advokat ABC / Legal Dept PT XYZ",
    positionPlaceholder: "e.g. Junior Legal Associate / Corporate Counsel",
    experienceDescPlaceholder: "- Managed corporate statutory filings and governmental permits\n- Reviewed 40+ vendor commercial contracts ensuring 100% regulatory compliance",
    portfolioSectionTitle: "Legal Cases, Audits & Regulatory Drafting",
    portfolioTitleLabel: "Case Study / Drafting Title *",
    portfolioTitlePlaceholder: "e.g. Legal Due Diligence & Vendor Contract Restructuring",
    portfolioLinkPlaceholder: "https://drive.google.com/... (Dokumen Publik / Redacted)",
    portfolioDescPlaceholder: "- Drafted standard operational contracts and compliance checklists\n- Formulated comprehensive risk mitigation review for cross-border transactions",
    institutionPlaceholder: "e.g. Universitas Indonesia / UGM",
    majorPlaceholder: "e.g. Ilmu Hukum / Hukum Bisnis",
    achievementTitlePlaceholder: "e.g. Juara 1 National Moot Court Competition",
    issuerPlaceholder: "e.g. PERADI / Kementerian Hukum dan HAM",
    skillPlaceholder: "e.g. Contract Drafting, Due Diligence, Corporate Governance",
    skillSuggestions: ["Contract Drafting", "Legal Research", "Corporate Governance", "Due Diligence", "Regulatory Compliance", "Dispute Resolution"],
  },
  "Akuntansi, Keuangan & Perbankan": {
    id: "accounting",
    name: "Akuntansi, Keuangan & Perbankan",
    badge: "Finance & Accounting",
    headlinePlaceholder: "Financial Analyst | Auditing, Tax Planning & Financial Modeling",
    companyPlaceholder: "e.g. KAP Deloitte / Bank Mandiri / PT Finance",
    positionPlaceholder: "e.g. Junior Auditor / Financial Analyst",
    experienceDescPlaceholder: "- Prepared monthly consolidated financial statements and cash flow projections\n- Handled tax compliance (PPh 21/23/25, PPN) and statutory audit reporting",
    portfolioSectionTitle: "Financial Models, Audits & Feasibility Studies",
    portfolioTitleLabel: "Financial Model / Case Title *",
    portfolioTitlePlaceholder: "e.g. 5-Year Capital Budgeting & Cashflow Forecasting Model",
    portfolioLinkPlaceholder: "https://... (Portofolio Spreadsheet / Laporan)",
    portfolioDescPlaceholder: "- Formulated comprehensive financial forecasting models reducing variance by 12%\n- Evaluated ROI and NPV projections for business expansion proposals",
    institutionPlaceholder: "e.g. Universitas Diponegoro / Polibatam",
    majorPlaceholder: "e.g. Akuntansi / Manajemen Keuangan",
    achievementTitlePlaceholder: "e.g. Top 3 National Financial Modeling Competition",
    issuerPlaceholder: "e.g. Ikatan Akuntan Indonesia (IAI) / CFA Society",
    skillPlaceholder: "e.g. Financial Modeling, Tax Planning, SAP ERP",
    skillSuggestions: ["Financial Modeling", "Corporate Tax Planning", "Financial Reporting", "Budgeting & Forecasting", "Auditing", "Advanced Excel"],
  },
  "Manajemen Bisnis & Pemasaran Digital": {
    id: "business",
    name: "Manajemen Bisnis & Pemasaran Digital",
    badge: "Business & Marketing",
    headlinePlaceholder: "Digital Marketing & Growth Strategist | Market Expansion & ROI Lead",
    companyPlaceholder: "e.g. Agency XYZ / PT Consumer Goods",
    positionPlaceholder: "e.g. Marketing Specialist / Business Development Associate",
    experienceDescPlaceholder: "- Spearheaded digital campaign initiatives resulting in 40% lead growth\n- Monitored weekly CAC, LTV, and conversion performance metrics",
    portfolioSectionTitle: "Business Cases, GTM Strategies & Campaigns",
    portfolioTitleLabel: "Campaign / Business Case Title *",
    portfolioTitlePlaceholder: "e.g. Q4 Omni-channel Product Launch & GTM Strategy",
    portfolioLinkPlaceholder: "https://... (Pitch Deck / Canva / Laporan)",
    portfolioDescPlaceholder: "- Led end-to-end digital acquisition campaign with ROAS of 4.5x\n- Executed market research to optimize product pricing structure",
    institutionPlaceholder: "e.g. Universitas Brawijaya / Prasetiya Mulya",
    majorPlaceholder: "e.g. Manajemen Bisnis / Ilmu Komunikasi",
    achievementTitlePlaceholder: "e.g. Best Business Plan Award 2026",
    issuerPlaceholder: "e.g. Himpunan Pengusaha Muda / Kampus",
    skillPlaceholder: "e.g. GTM Strategy, SEO/SEM, Google Analytics",
    skillSuggestions: ["Go-To-Market Strategy", "Performance Marketing", "SEO / SEM", "Market Research", "CRM Analytics", "Brand Strategy"],
  },
  "Multimedia, Desain Kreatif & UI/UX": {
    id: "creative",
    name: "Multimedia, Desain Kreatif & UI/UX",
    badge: "Design & Creative Media",
    headlinePlaceholder: "Product & UI/UX Designer | Visual Storyteller & Design Systems",
    companyPlaceholder: "e.g. Creative Studio / Software House",
    positionPlaceholder: "e.g. UI/UX Designer / Multimedia Specialist",
    experienceDescPlaceholder: "- Conducted usability testing and user interview sessions with 25+ participants\n- Built design system and maintained 100+ responsive Figma components",
    portfolioSectionTitle: "Creative Portfolios & Design Case Studies",
    portfolioTitleLabel: "Portfolio / Case Study Title *",
    portfolioTitlePlaceholder: "e.g. Mobile Banking App Redesign & Design System",
    portfolioLinkPlaceholder: "https://behance.net/... atau https://figma.com/...",
    portfolioDescPlaceholder: "- Redesigned customer checkout journey improving completion rate by 24%\n- Produced interactive prototypes and validated design decisions with stakeholders",
    institutionPlaceholder: "e.g. Institut Seni Indonesia / Polibatam",
    majorPlaceholder: "e.g. Desain Komunikasi Visual (DKV) / Multimedia",
    achievementTitlePlaceholder: "e.g. Winner of UX Design Challenge",
    issuerPlaceholder: "e.g. Dribbble Community / Asosiasi Desainer Grafis",
    skillPlaceholder: "e.g. Figma, Adobe Illustrator, Design Systems",
    skillSuggestions: ["Figma", "Design Systems", "User Research", "Adobe Illustrator", "Motion Design", "Visual Prototyping"],
  },
};

export function getIndustryConfig(industryName?: string | null): IndustryConfig {
  if (industryName && INDUSTRY_CONFIGS[industryName]) {
    return INDUSTRY_CONFIGS[industryName];
  }
  return INDUSTRY_CONFIGS["Information Technology & Software"];
}