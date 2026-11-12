// ─────────────────────────────────────────────────────────────
//  ALL SITE CONTENT LIVES HERE.
//  Edit text, add projects or swap images without touching components.
//  Images go in /public/images/... and are referenced as '/images/...'.
//  Designs are listed in ./featured.json (set "selected": true to feature one).
//
//  Style rule: headings and labels are written lowercase on purpose;
//  keep acronyms (AI, IT, BE, CRO) in capitals. Body text is sentence case.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'ash',
  fullName: 'Ashwin Bijoy',
  tagline: ['creative', 'engineer.'],
  bio: ['jack of all trades?', 'maybe I am just a court jester.'],
  roles: 'Open to business analyst, project manager, technical analyst and product design roles.',
  email: 'ashwinbijoywork@gmail.com',
  // Add a cut-out photo (PNG with transparent background) to /public/images/profile/
  // and set e.g. photo: '/images/profile/ash.png' to show it in the hero.
  photo: null,
  // Add a public résumé (no phone number or references) to /public/files/
  // and set e.g. resume: '/files/ashwin-bijoy-resume.pdf'.
  resume: null,
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ashwinbijoy' },
    // { label: 'Behance', href: 'https://www.behance.net/...' },
    // { label: 'Instagram', href: 'https://www.instagram.com/...' },
    // { label: 'GitHub', href: 'https://github.com/ashbijoy' },
  ],
  facts: [
    { label: 'based', value: 'Adelaide, AU' },
    { label: 'studying', value: 'Master of IT (Enterprise Management)' },
    { label: 'background', value: 'BE Computer Science (Data Science)' },
    { label: 'founded', value: 'ryū co. (2024 – 2026)' },
  ],
};

export const about = {
  // Draft written from your résumé. Rewrite it in your own voice.
  paragraphs: [
    "I'm Ashwin, a designer and IT postgrad in Adelaide. I move between posters, brand systems, content strategy and the tech underneath them, which is why I call myself a creative engineer.",
    "I've run my own agency, led content for Ben & Jerry's Adelaide and designed campaigns that filled events. The common thread is curiosity: I like problems that need a designer's eye and an engineer's head at the same time.",
  ],
  quote: { text: ['be curious,', 'not judgemental.'], by: 'Ted Lasso' },
};

export const stats = [
  { value: '40%+', label: 'social engagement lift for SunriseRun Adelaide' },
  { value: '30%', label: 'rise in event attendance after the poster campaign' },
  { value: '35–50%', label: 'Instagram engagement growth for NGS' },
  { value: '6+', label: 'client brands managed at Digital Advantage' },
];

export const pillars = [
  { n: '01', title: 'design & campaigns', items: ['Brand identity', 'Social & content design', 'Campaign concepts', 'Posters & promo assets', 'Motion & 3D'], proof: '25+ promo posters for SunriseRun, and the 59 pieces above.' },
  { n: '02', title: 'product & projects', items: ['Product design', 'Project management', 'Content & launch planning', 'Business analysis', 'Performance analytics'], proof: "Monthly content calendars and launch plans for Ben & Jerry's Adelaide." },
  { n: '03', title: 'AI & automation', items: ['AI-assisted workflows', 'Prompting & automation', 'AI-powered lead systems', 'AI consulting'], proof: 'Built AI-powered lead intelligence systems at ryū co.' },
  { n: '04', title: 'tech foundations', items: ['Cybersecurity', 'Data science', 'Information systems', 'Programming'], proof: 'BE Computer Science (Data Science), now a Master of IT.' },
];

// Case studies: newest first. Each row in the index opens its case study.
// `cover` is the hover-preview image (optional). `href` jumps to a section instead.
export const projects = [
  {
    id: 'ben-and-jerrys', name: "ben & jerry's adelaide", org: "Ben & Jerry's Adelaide", role: 'Content & Growth Analyst',
    category: 'content strategy · social', years: 'May 2026 – now', cover: null,
    summary: "Leading content strategy for Ben & Jerry's Adelaide's social accounts.",
    did: [
      'Led the content strategy for the Adelaide social accounts, keeping brand identity and messaging consistent.',
      'Planned and managed monthly content calendars around seasonal campaigns and product launches.',
      'Created, scheduled and analysed content with Photoshop, Illustrator, Premiere Pro, Canva, CapCut and Meta Business Suite.',
    ],
    results: [],
  },
  {
    id: 'sunriserun', name: 'sunriserun adelaide', org: 'SunriseRun Adelaide', role: 'Creative Strategist',
    category: 'campaign · posters', years: 'Feb 2026 – now', cover: null,
    summary: 'Content strategy and poster campaigns that grew a running community and its events.',
    did: [
      'Developed and executed content strategies to improve audience reach.',
      'Designed 25+ promotional posters and visual assets for events.',
      'Analysed performance in Google Analytics and optimised campaigns.',
    ],
    results: [
      { value: '40%+', label: 'social engagement' },
      { value: '30%', label: 'event attendance' },
      { value: '30%+', label: 'website traffic' },
    ],
  },
  {
    id: 'ryuco', name: 'ryū co.', org: 'ryū co.', role: 'Founder & CEO',
    category: 'creative engineering agency', years: '2024 – 2026', cover: '/images/ryuco/cover.jpg',
    summary: 'My own creative engineering agency, combining performance marketing, landing pages and AI lead systems.',
    did: [
      'Founded the agency and ran it end to end, from positioning and brand to delivery.',
      'Offered performance marketing, creative strategy, landing pages & CRO, AI-powered lead intelligence and analytics.',
      'Designed the full brand identity and sales deck.',
    ],
    results: [],
    href: '#ryuco',
  },
  {
    id: 'digital-advantage', name: 'digital advantage', org: 'Digital Advantage', role: 'Social Media Designer',
    category: 'social design · 6+ brands', years: 'Oct 2025 – Feb 2026', cover: null,
    summary: 'Instagram design and curation for a portfolio of client brands.',
    did: [
      'Managed and curated Instagram for 6+ client brands, including Red Threads, GoRally, Yutori, Lamda Components and BBFS.',
      'Created 20+ posts, carousels and promotional graphics with a consistent visual story for each brand.',
    ],
    results: [
      { value: '6+', label: 'client brands' },
      { value: '20+', label: 'posts & carousels' },
    ],
  },
  {
    id: 'ngs', name: 'ngs', org: 'NGS', role: 'Creative Strategist',
    category: 'content strategy', years: 'Jun 2023 – Feb 2026', cover: null,
    summary: 'End-to-end digital content strategy for a school, built around admissions and events.',
    did: [
      'Led end-to-end digital content strategy, planning 12–16 posts a month around admissions cycles, school events and parent engagement.',
      'Introduced structured content calendars, clearer visual consistency and targeted messaging.',
    ],
    results: [
      { value: '35–50%', label: 'Instagram engagement' },
      { value: '12–16', label: 'posts a month' },
    ],
  },
  {
    id: 'avigdor', name: 'avigdor cybertech', org: 'Avigdor Cybertech', role: 'Generalist',
    category: 'generalist · design, marketing & tech', years: '2024 – 2025', cover: null,
    summary: 'A generalist role across design, marketing and tech.',
    did: ['Worked across design, marketing and tech wherever the team needed it.'],
    results: [],
  },
  {
    id: 'aeos', name: 'aeos', org: 'AEOS', role: 'Game Design Intern',
    category: 'game animation · 3D', years: 'Jan – Apr 2025', cover: null,
    summary: 'Motion capture and animation for a game in development.',
    did: [
      'Captured, cleaned and retargeted character movement with Rokoko motion capture.',
      'Designed and implemented 20+ character and environment animations in Blender.',
    ],
    results: [{ value: '20+', label: 'animations' }],
  },
];

export const ryuco = {
  subtitle: 'creative engineering agency',
  years: '2024 – 2026',
  paragraphs: [
    'A growth-focused creative agency I founded and ran from 2024 to 2026. We helped brands scale with conversion-led landing pages, high-performance Google and Meta campaigns, and lead generation that put quality over volume.',
    'Run by creative engineers, it sat where strategy, creativity and technology meet. Every decision was backed by data and sped up with AI tools, so clients got long-term performance instead of short-term spikes.',
  ],
  myRole: [
    'Founded the agency and set its positioning',
    'Designed the brand identity and sales deck',
    'Led creative strategy and campaign delivery',
    'Built AI-powered lead systems for clients',
  ],
  services: ['Performance marketing', 'Creative strategy', 'Landing pages & CRO', 'AI-powered lead intelligence', 'Analytics & insights'],
  cover: { src: '/images/ryuco/cover.jpg', alt: 'ryū co. creative engineering agency, cover of the brand deck' },
  deck: [
    { src: '/images/ryuco/brand-colours.jpg', label: 'brand colours', alt: 'ryū co. brand colours' },
    { src: '/images/ryuco/why-ryuco.jpg', label: 'why ryū co.', alt: 'Why ryū co.' },
    { src: '/images/ryuco/market-insights.jpg', label: 'market insights', alt: 'ryū co. market insights' },
    { src: '/images/ryuco/working-model.jpg', label: 'working model', alt: 'ryū co. working model diagram' },
  ],
};

export const tools = ['Photoshop', 'Illustrator', 'Premiere Pro', 'Canva', 'CapCut', 'Blender', 'Rokoko MoCap', 'Meta Business Suite', 'Google Analytics'];
