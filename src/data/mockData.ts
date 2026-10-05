import { Manuscript, OrderItem, ServiceRecommendation, AssessmentAnswers } from '../types';

export const ASSETS = {
  manuscriptPreview: '/src/assets/images/editage_manuscript_preview_1790768640074.jpg',
  drVermaAvatar: '/src/assets/images/dr_verma_avatar_1790768652766.jpg',
  graphicalAbstract: '/src/assets/images/graphical_abstract_sample_1790768664309.jpg',
};

export const MOCK_MANUSCRIPT_STATE_B: Manuscript = {
  id: 'ms-904',
  fileName: 'nanomedicine_targeted_delivery_v2.docx',
  fileSize: '4.8 MB',
  wordCount: 11840,
  uploadedAt: 'Today, 09:42 AM',
  lastUpdated: 'Today, 10:15 AM',
  subjectArea: 'Nanomedicine & Oncology Drug Delivery',
  targetJournal: 'Nature Nanotechnology / Advanced Healthcare Materials',
  stage: 'preparation',
  statusText: 'Manuscript complete · Ready for editorial review',
};

export const MOCK_MANUSCRIPT_STATE_C: Manuscript = {
  id: 'ms-741',
  fileName: 'CRISPR_microbiome_dynamics_v3.docx',
  fileSize: '6.2 MB',
  wordCount: 12482,
  uploadedAt: '14 Sep 2026',
  lastUpdated: '28 Sep 2026',
  subjectArea: 'Molecular Biology & Microbial Genetics',
  targetJournal: 'Cell Host & Microbe (Target IF: 26.2)',
  stage: 'journal_selection',
  statusText: 'English editing completed · Preparing for journal submission',
};

export const DEFAULT_ASSESSMENT_STATE_B: AssessmentAnswers = {
  stage: 'Manuscript is complete',
  goals: ['Improve English and readability', 'Improve scientific clarity', 'Check formatting and references'],
  budget: '$250–500',
  deadline: 'Within a week',
};

export const DEFAULT_ASSESSMENT_STATE_C: AssessmentAnswers = {
  stage: 'Preparing for journal submission',
  goals: ['Choose the right journal', 'Check formatting and references', 'Create figures / graphical abstract'],
  budget: '$250–500',
  deadline: '2–3 days',
};

export const RECENT_ORDERS_STATE_C: OrderItem[] = [
  {
    id: 'ord-101',
    orderNumber: '#EDT-89421',
    manuscriptTitle: 'Targeted Cas9 Ribonucleoprotein Delivery in Murine Gut Microbiomes',
    fileName: 'CRISPR_microbiome_dynamics_v3.docx',
    serviceName: 'Advanced English Editing',
    status: 'Delivered',
    orderDate: '16 Sep 2026',
    deliveryDate: '21 Sep 2026',
    downloadAvailable: true,
    reEditingEligible: true,
    reEditingExpires: 'Valid until 21 Sep 2027 (356 days remaining)',
  },
  {
    id: 'ord-102',
    orderNumber: '#EDT-92044',
    manuscriptTitle: 'Pathway Schematic: In vivo Electroporation of Synthetically Engineered Vectors',
    fileName: 'Microbiome_Fig4_Schematic.ai',
    serviceName: 'Scientific Graphical Abstract & Publication Artwork',
    status: 'In Progress',
    orderDate: '26 Sep 2026',
    deliveryDate: '02 Oct 2026 (Est.)',
    downloadAvailable: false,
    reEditingEligible: false,
    progressPercent: 65,
  },
];

export const PRIMARY_RECOMMENDATION_NEW_USER: ServiceRecommendation = {
  id: 'premium_editing',
  title: 'Premium Editing',
  subtitle: 'Comprehensive 2-round scientific review by two PhD native-speaker editors in your field',
  badge: 'BEST MATCH',
  badgeType: 'primary',
  reasons: [
    'Your manuscript is complete and ready for journal-grade scrutiny',
    'You are preparing for high-impact journal submission',
    'You prioritized both English readability and scientific logic',
  ],
  turnaround: '3–5 business days',
  startingPrice: 310,
  pricePerWord: 0.026,
  features: [
    'Substantive language, syntax & tone refinement',
    'Scientific logic, clarity & structural critique',
    'Target journal formatting according to Author Guidelines',
    'Unlimited free re-editing for 365 days',
    'Customized Cover Letter addressed to the Journal Editor',
  ],
  stageRelevance: 'Ideal for complete manuscripts aiming for Q1/Q2 peer-reviewed journals',
  isPrimary: true,
};

export const SECONDARY_RECOMMENDATIONS_NEW_USER: ServiceRecommendation[] = [
  {
    id: 'journal_selection',
    title: 'Journal Selection',
    subtitle: 'Identify the 3–5 journals with the highest probability of acceptance and optimal scope match',
    badge: 'RECOMMENDED AT YOUR STAGE',
    badgeType: 'secondary',
    reasons: [
      'Avoid desk rejection by aligning with current editorial scope',
      'Detailed report with Acceptance Probability score & turnaround benchmarks',
    ],
    turnaround: '2 business days',
    startingPrice: 160,
    features: [
      'Comprehensive report by subject-area peer specialists',
      'Impact factor, indexing (SCI/Scopus), and OA fee transparency',
      'Pros and cons analysis for each shortlisted target journal',
    ],
    stageRelevance: 'Critical prior to formatting and cover letter drafting',
  },
  {
    id: 'manuscript_formatting',
    title: 'Manuscript Formatting',
    subtitle: 'Meticulous conformity with your chosen journal’s Author Guidelines and citation styles',
    badge: 'RECOMMENDED AT YOUR STAGE',
    badgeType: 'secondary',
    reasons: [
      'Ensures zero technical return-without-review delays',
      'Covers text layout, reference numbering, tables, and typography',
    ],
    turnaround: '1–2 business days',
    startingPrice: 85,
    features: [
      'References & in-text citation styling (APA, Vancouver, IEEE, Harvard)',
      'Heading hierarchy, figure numbering, and caption layouts',
      'Word count and page budget adjustments where required',
    ],
    stageRelevance: 'Saves 8–12 hours of manual manual styling',
  },
  {
    id: 'graphical_abstract',
    title: 'Scientific Graphical Abstract',
    subtitle: 'High-impact visual summary designed by professional scientific medical illustrators',
    badge: 'OPTIONAL ENHANCEMENT',
    badgeType: 'neutral',
    reasons: [
      'Journals report up to 3× higher article views and social citations',
      'Mandatory or strongly favored by Cell, Elsevier, and Wiley titles',
    ],
    turnaround: '4 business days',
    startingPrice: 220,
    features: [
      'Tailored to exact journal visual specifications (RGB, 300+ DPI)',
      'Direct iterative collaboration with PhD scientific illustrators',
      'Delivered in vector (AI, EPS) and high-res print formats',
    ],
    stageRelevance: 'Maximizes post-publication readership and editorial interest',
  },
];

export const RETURNING_USER_RECOMMENDATIONS: ServiceRecommendation[] = [
  {
    id: 'journal_selection',
    title: 'Journal Selection Support',
    subtitle: 'Curated recommendation of 4 Q1/Q2 journals matched to your edited manuscript',
    badge: 'LOGICAL NEXT STEP',
    badgeType: 'primary',
    reasons: [
      'Your English Editing was successfully delivered 2 weeks ago',
      'Matches your paper’s current preparation stage prior to final submission',
      'Helps prevent submission to mismatched editorial board scopes',
    ],
    turnaround: '2 business days',
    startingPrice: 160,
    features: [
      'In-depth review of your edited manuscript abstract and findings',
      'Target journal shortlist ranked by acceptance probability',
      'Detailed checklist of editorial criteria and APC policies',
    ],
    stageRelevance: 'Next step after editing',
    isPrimary: true,
  },
  {
    id: 'submission_readiness',
    title: 'Submission Readiness Check',
    subtitle: 'Pre-flight diagnostic audit by an expert peer reviewer to catch red flags before the editor does',
    badge: 'HIGHLY RECOMMENDED',
    badgeType: 'secondary',
    reasons: [
      'Validates all reviewer checklists: ethical disclosures, data availability, and declarations',
      'Reduces risk of immediate desk rejection by 42%',
    ],
    turnaround: '2 business days',
    startingPrice: 140,
    features: [
      'Comprehensive 24-point journal compliance checklist',
      'Data availability & ethical compliance statement verification',
      'Similarity & plagiarism check with detailed iThenticate report',
    ],
    stageRelevance: 'Final safeguard before pressing submit',
  },
  {
    id: 'manuscript_formatting',
    title: 'Journal-Specific Formatting',
    subtitle: 'Adapt your edited paper to your finalized target journal’s instructions for authors',
    badge: 'RECOMMENDED',
    badgeType: 'secondary',
    reasons: [
      'Customized precisely to Cell Host & Microbe formatting guidelines',
      'Full EndNote / Mendeley reference normalization',
    ],
    turnaround: '24–48 hours',
    startingPrice: 85,
    features: [
      'Full reference reformatting to target journal specifications',
      'Table alignment and figure citation cross-verification',
    ],
    stageRelevance: 'Saves time before final portal upload',
  },
  {
    id: 'graphical_abstract',
    title: 'Graphical Abstract & Artwork',
    subtitle: 'Complete visual storyline for your microbial genome delivery study',
    badge: 'POPULAR AT THIS STAGE',
    badgeType: 'neutral',
    reasons: [
      'You already have Fig 4 schematic in production; complement with summary abstract',
      'Required by Cell Press journals for final accepted manuscripts',
    ],
    turnaround: '3–4 business days',
    startingPrice: 220,
    features: [
      'Visual summary crafted for Cell Host & Microbe TOC graphic specifications',
      '2 rounds of direct revisions with scientific medical artist',
    ],
    stageRelevance: 'Boosts article visibility and social impact',
  },
];

export const ALL_SERVICES_CATALOG = [
  {
    category: 'Editing & Language',
    services: [
      { name: 'Standard English Editing', desc: 'Grammar, spelling, and phrasing check for ESL researchers' },
      { name: 'Advanced Editing', desc: 'Thorough language polish with subject-area editor and formatting' },
      { name: 'Premium Scientific Editing', desc: 'Comprehensive two-editor scientific review and 365-day free re-editing' },
      { name: 'Plagiarism & Similarity Check', desc: 'Turnitin / iThenticate report with detailed overlap analysis' },
    ],
  },
  {
    category: 'Publication Support',
    services: [
      { name: 'Journal Selection', desc: 'Shortlist of top 3–5 matched journals with acceptance probabilities' },
      { name: 'Pre-Submission Peer Review', desc: 'Rigorous critique simulating top-tier journal reviewer panels' },
      { name: 'Journal Submission Assistance', desc: 'End-to-end management of complex online submission portals' },
      { name: 'Response to Reviewers Support', desc: 'Expert rebuttal letter drafting and revised manuscript re-editing' },
    ],
  },
  {
    category: 'Graphics & Visuals',
    services: [
      { name: 'Scientific Graphical Abstract', desc: 'Eye-catching visual summaries for TOC and journal covers' },
      { name: 'Medical & Scientific Illustration', desc: 'Custom 2D/3D schematics of biological and physical mechanisms' },
      { name: 'Poster Presentation Design', desc: 'Conference-ready academic posters aligned with session guidelines' },
      { name: 'Video Summaries & Research Bites', desc: 'Short animated or narrated videos explaining published findings' },
    ],
  },
  {
    category: 'Translation Services',
    services: [
      { name: 'Academic Translation (Japanese to English)', desc: 'Field-specialist academic translation with full editing' },
      { name: 'Academic Translation (Chinese to English)', desc: 'Publication-ready translation by bilingual PhD subject experts' },
      { name: 'Academic Translation (Korean to English)', desc: 'High-accuracy scholarly translation with terminology validation' },
      { name: 'Academic Translation (Portuguese/Spanish)', desc: 'Accredited academic translation with native English polishing' },
    ],
  },
];
