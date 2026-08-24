export interface IndustryMetadata {
  name: string;
  badge: string;
  headlinePlaceholder: string;
  companyPlaceholder: string;
  positionPlaceholder: string;
  experienceDescPlaceholder: string;
  institutionPlaceholder: string;
  majorPlaceholder: string;
  portfolioSectionTitle: string;
  portfolioTitleLabel: string;
  portfolioTitlePlaceholder: string;
  portfolioLinkPlaceholder: string;
  portfolioDescPlaceholder: string;
  technologiesLabel: string;
  technologiesPlaceholder: string;
  achievementTitlePlaceholder: string;
  issuerPlaceholder: string;
  skillPlaceholder: string;
  suggestedSkills: string[];
}

export const INDUSTRY_CONFIGS: Record<string, IndustryMetadata> = {
  "Information Technology & Software": {
    name: "Information Technology & Software",
    badge: "Tech & Software Engineering",
    headlinePlaceholder: "e.g. Full-Stack Web Developer | Next.js, Laravel & Cloud Enthusiast",
    companyPlaceholder: "e.g. PT Infineon Technologies / Tokopedia",
    positionPlaceholder: "e.g. Software Engineer / Full-Stack Developer",
    experienceDescPlaceholder: "- Architected high-performance REST APIs handling 50k+ daily calls\n- Reduced database query latency by 40% with Prisma index tuning",
    institutionPlaceholder: "e.g. Politeknik Negeri Batam",
    majorPlaceholder: "e.g. D3 Teknik Informatika / S1 Ilmu Komputer",
    portfolioSectionTitle: "Technical Projects & Open Source",
    portfolioTitleLabel: "Project Name *",
    portfolioTitlePlaceholder: "e.g. Career Passport — AI Career Assistant",
    portfolioLinkPlaceholder: "https://careerpassport.dev",
    portfolioDescPlaceholder: "- Built full-stack SaaS using Next.js 16 and PostgreSQL\n- Integrated Gemini 3.6 Flash for automated resume tailoring",
    technologiesLabel: "Tech Stack / Tools",
    technologiesPlaceholder: "e.g. Next.js, TypeScript, PostgreSQL, Tailwind CSS, Docker",
    achievementTitlePlaceholder: "e.g. 1st Place — National Hackathon 2025",
    issuerPlaceholder: "e.g. Kementerian Kominfo / Google",
    skillPlaceholder: "e.g. TypeScript, React, Docker, CI/CD",
    suggestedSkills: ["TypeScript", "Next.js", "React", "Node.js", "PostgreSQL", "Laravel", "Tailwind CSS", "Docker", "Git", "REST APIs"],
  },
  "Law & Legal Services": {
    name: "Law & Legal Services",
    badge: "Legal & Corporate Compliance",
    headlinePlaceholder: "e.g. Corporate Legal Specialist | Contract Drafting & Due Diligence",
    companyPlaceholder: "e.g. Assegaf Hamzah & Partners / Corporate In-House",
    positionPlaceholder: "e.g. Legal Counsel / Associate Lawyer",
    experienceDescPlaceholder: "- Drafted and reviewed 120+ cross-border vendor agreements\n- Led legal audit and compliance for merger acquisition transactions",
    institutionPlaceholder: "e.g. Universitas Indonesia",
    majorPlaceholder: "e.g. S1 Ilmu Hukum / Hukum Bisnis",
    portfolioSectionTitle: "Legal Case Studies & Advisory Matters",
    portfolioTitleLabel: "Case / Transaction Title *",
    portfolioTitlePlaceholder: "e.g. Cross-Border Joint Venture Regulatory Compliance",
    portfolioLinkPlaceholder: "https://drive.google.com/... (Sanitized Case Summary)",
    portfolioDescPlaceholder: "- Structured multi-jurisdictional joint venture agreement valued at $2.5M\n- Ensured zero compliance infractions under Indonesian antitrust laws",
    technologiesLabel: "Legal Domains / Key Focus",
    technologiesPlaceholder: "e.g. Corporate Law, Contract Drafting, Due Diligence, M&A",
    achievementTitlePlaceholder: "e.g. Best Oralist — National Moot Court Competition",
    issuerPlaceholder: "e.g. Mahkamah Agung RI / PERADI",
    skillPlaceholder: "e.g. Contract Drafting, Legal Due Diligence, Compliance",
    suggestedSkills: ["Contract Drafting", "Legal Due Diligence", "Corporate Compliance", "Litigasi", "Legal Research", "Risk Management", "Hukum Ketenagakerjaan", "Arbitrase"],
  },
  "Accounting & Finance": {
    name: "Accounting & Finance",
    badge: "Finance, Audit & Accounting",
    headlinePlaceholder: "e.g. Senior Financial Analyst | Valuation, Tax Planning & SAP",
    companyPlaceholder: "e.g. PwC Indonesia / Bank Mandiri",
    positionPlaceholder: "e.g. Financial Analyst / Auditor",
    experienceDescPlaceholder: "- Prepared consolidated financial statements compliant with PSAK/IFRS\n- Designed 3-statement financial models optimizing working capital by 18%",
    institutionPlaceholder: "e.g. Universitas Gadjah Mada",
    majorPlaceholder: "e.g. S1 Akuntansi / Manajemen Keuangan",
    portfolioSectionTitle: "Financial Models, Audits & Valuations",
    portfolioTitleLabel: "Model / Report Name *",
    portfolioTitlePlaceholder: "e.g. DCF Valuation & 5-Year Financial Forecast Model",
    portfolioLinkPlaceholder: "https://drive.google.com/... (Sanitized Model Sheet)",
    portfolioDescPlaceholder: "- Built dynamic discounted cash flow (DCF) model for series-A fundraising\n- Conducted sensitivity analysis across inflation and margin scenarios",
    technologiesLabel: "Financial Tools & Standards",
    technologiesPlaceholder: "e.g. Financial Modeling, SAP ERP, Power BI, PSAK/IFRS, Excel VBA",
    achievementTitlePlaceholder: "e.g. Top 3 Finalist — CFA Institute Research Challenge",
    issuerPlaceholder: "e.g. CFA Society Indonesia / IAI",
    skillPlaceholder: "e.g. Financial Modeling, SAP, IFRS, Tax Planning",
    suggestedSkills: ["Financial Modeling", "PSAK / IFRS", "Tax Planning (Brevet A/B)", "SAP ERP", "Audit & Assurance", "Power BI", "Excel Advanced / VBA", "Cash Flow Forecasting"],
  },
  "Business, Marketing & Sales": {
    name: "Business, Marketing & Sales",
    badge: "Growth Marketing & Business Strategy",
    headlinePlaceholder: "e.g. Growth Marketing Lead | Performance Marketing & Revenue Ops",
    companyPlaceholder: "e.g. Shopee / Grab Indonesia",
    positionPlaceholder: "e.g. Product Marketing Manager / Growth Specialist",
    experienceDescPlaceholder: "- Scaled paid customer acquisition by 140% while reducing CAC by 22%\n- Managed quarterly marketing budget of IDR 850M across Meta & Google Ads",
    institutionPlaceholder: "e.g. Universitas Padjadjaran",
    majorPlaceholder: "e.g. S1 Manajemen Bisnis / Ilmu Komunikasi",
    portfolioSectionTitle: "Marketing Campaigns & Growth Initiatives",
    portfolioTitleLabel: "Campaign / Initiative Name *",
    portfolioTitlePlaceholder: "e.g. Q4 Omni-channel Product Launch & Rebranding",
    portfolioLinkPlaceholder: "https://behance.net/... / Campaign Deck URL",
    portfolioDescPlaceholder: "- Executed 360-degree marketing launch generating 45,000 organic signups\n- Coordinated influencer activations reaching 2.4M target audience impressions",
    technologiesLabel: "Growth Stack & Platforms",
    technologiesPlaceholder: "e.g. Google Ads, Meta Ads Manager, HubSpot, GA4, Mixpanel",
    achievementTitlePlaceholder: "e.g. Marketer of the Year — Internal Corporate Award",
    issuerPlaceholder: "e.g. Indonesia Marketing Association",
    skillPlaceholder: "e.g. Google Ads, SEO, HubSpot, Data Analytics",
    suggestedSkills: ["Performance Marketing", "SEO / SEM", "Google Analytics (GA4)", "Meta Ads Manager", "HubSpot CRM", "Market Research", "Brand Strategy", "Content Marketing"],
  },
  "Creative, UI/UX & Design": {
    name: "Creative, UI/UX & Design",
    badge: "Product Design & Creative Direction",
    headlinePlaceholder: "e.g. Senior UI/UX Designer | Design Systems & User Research",
    companyPlaceholder: "e.g. Traveloka / Gojek Design Studio",
    positionPlaceholder: "e.g. Product Designer / UI/UX Designer",
    experienceDescPlaceholder: "- Designed enterprise design system used by 40+ cross-functional engineers\n- Conducted usability tests with 60+ participants to improve checkout completion by 28%",
    institutionPlaceholder: "e.g. Institut Teknologi Bandung",
    majorPlaceholder: "e.g. S1 Desain Komunikasi Visual (DKV)",
    portfolioSectionTitle: "Design Case Studies & Prototypes",
    portfolioTitleLabel: "Case Study Title *",
    portfolioTitlePlaceholder: "e.g. End-to-End Fintech Mobile Banking Redesign",
    portfolioLinkPlaceholder: "https://figma.com/@username / Behance Link",
    portfolioDescPlaceholder: "- Revamped user onboarding flow cutting abandonment rate from 45% to 18%\n- Created high-fidelity clickable prototype in Figma with micro-interactions",
    technologiesLabel: "Design Stack & Methods",
    technologiesPlaceholder: "e.g. Figma, FigJam, Protopie, Design System, Usability Testing",
    achievementTitlePlaceholder: "e.g. Best UI/UX Design — Indigo Telkom Design Sprint",
    issuerPlaceholder: "e.g. Telkom Indonesia / UX Indonesia",
    skillPlaceholder: "e.g. Figma, Design Systems, User Research, Wireframing",
    suggestedSkills: ["Figma", "Design Systems", "User Research", "Wireframing & Prototyping", "Usability Testing", "Information Architecture", "UI Interaction Design", "Adobe Creative Suite"],
  },
};

export function getIndustryConfig(industryName?: string | null): IndustryMetadata {
  if (!industryName || !INDUSTRY_CONFIGS[industryName]) {
    return INDUSTRY_CONFIGS["Information Technology & Software"];
  }
  return INDUSTRY_CONFIGS[industryName];
}