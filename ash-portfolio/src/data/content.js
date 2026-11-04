// ─────────────────────────────────────────────────────────────
//  ALL SITE CONTENT LIVES HERE.
//  Edit text, add projects or swap images without touching components.
//  Images go in /public/images/... and are referenced as '/images/...'.
//  Featured designs are listed in ./featured.json (src, title, w, h).
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'ash',
  fullName: 'Ashwin Bijoy',
  tagline: ['Creative', 'engineer.'],
  intro: 'A generalist working across design, product, AI and campaigns.',
  status: 'Open to roles',
  email: 'ashwinbijoywork@gmail.com',
  // Set to '/files/your-resume.pdf' after adding a public version
  // (without phone number or references) to /public/files/.
  resume: null,
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ashwinbijoy' },
    // { label: 'Behance', href: 'https://www.behance.net/...' },
    // { label: 'Instagram', href: 'https://www.instagram.com/...' },
  ],
  facts: [
    { label: 'Based', value: 'Adelaide, AU' },
    { label: 'Studying', value: 'Master of IT (Cybersecurity)' },
    { label: 'Background', value: 'BE Computer Science (Data Science)' },
    { label: 'Founded', value: 'ryū co. (2024–26)' },
  ],
};

export const pillars = [
  { n: '01', title: 'Design & Campaigns', items: ['Brand identity', 'Social & content design', 'Campaign concepts', 'Posters & promo assets', 'Motion & 3D'] },
  { n: '02', title: 'Product & Projects', items: ['Product design', 'Project management', 'Content & launch planning', 'Business analysis', 'Performance analytics'] },
  { n: '03', title: 'AI Consulting & Tools', items: ['AI consulting', 'AI-assisted workflows', 'Prompting & automation', 'AI-powered lead systems'] },
  { n: '04', title: 'Tech Foundations', items: ['Cybersecurity', 'Data science', 'Information systems', 'Programming', 'Generalist by design'] },
];

export const projects = [
  { name: 'ryū co.', category: 'Creative engineering agency', year: '2024–26', href: '#ryuco' },
  { name: "Ben & Jerry's Adelaide", category: 'Content strategy · Social', year: '2026' },
  { name: 'SunriseRun Adelaide', category: 'Campaign · Posters', year: '2026' },
  { name: 'Digital Advantage', category: 'Social design · 6+ brands', year: '2025–26' },
  { name: 'NGS', category: 'Content strategy', year: '2023–26' },
  { name: 'AEOS', category: 'Game animation · 3D', year: '2025' },
];

export const ryuco = {
  subtitle: 'Creative engineering agency',
  paragraphs: [
    'A growth-focused creative agency I founded and ran from 2024 to 2026. We helped brands scale with conversion-led landing pages, high-performance Google and Meta campaigns, and lead generation that put quality over volume.',
    'Run by creative engineers, it sat where strategy, creativity and technology meet. Every decision was backed by data and sped up with AI tools, so clients got long-term performance instead of short-term spikes.',
  ],
  cover: { src: '/images/ryuco/cover.jpg', alt: 'ryū co. creative engineering agency, cover of the brand deck' },
  services: [
    { title: 'Performance Marketing', text: 'Google and Meta campaigns, continuously tested and optimised.' },
    { title: 'Creative Strategy', text: 'Creative direction, messaging and formats for ads and landing pages.' },
    { title: 'Landing Pages & CRO', text: 'Fast, clear pages built to turn traffic into qualified leads.' },
    { title: 'AI-Powered Lead Intelligence', text: 'Lead systems that attract, filter and deliver high-intent leads.' },
    { title: 'Analytics & Insights', text: 'Transparent tracking and reporting to guide growth decisions.' },
  ],
  deck: [
    { src: '/images/ryuco/brand-colours.jpg', label: 'Brand colours', alt: 'ryū co. brand colours' },
    { src: '/images/ryuco/why-ryuco.jpg', label: 'Why ryū co.', alt: 'Why ryū co.' },
    { src: '/images/ryuco/market-insights.jpg', label: 'Market insights', alt: 'ryū co. market insights' },
    { src: '/images/ryuco/working-model.jpg', label: 'Working model', alt: 'ryū co. working model diagram' },
  ],
};

export const experience = [
  { role: 'Content & Growth Analyst', org: "Ben & Jerry's Adelaide", years: 'May 2026 –', text: 'Leads content strategy for the Adelaide social accounts; plans monthly calendars around seasonal campaigns and launches.' },
  { role: 'Creative Strategist', org: 'SunriseRun Adelaide', years: 'Feb 2026 –', text: '40%+ lift in social engagement, 25+ promo posters and a 30% rise in attendance; 30%+ more web traffic via Google Analytics.' },
  { role: 'Social Media Designer', org: 'Digital Advantage', years: 'Oct 2025 – Feb 2026', text: 'Curated Instagram for 6+ client brands; 20+ posts, carousels and promo graphics.' },
  { role: 'Creative Strategist', org: 'NGS', years: 'Jun 2023 – Feb 2026', text: 'End-to-end content strategy, 12–16 posts a month; 35–50% higher engagement over 4–6 months.' },
  { role: 'Game Design Intern', org: 'AEOS', years: 'Jan – Apr 2025', text: 'Rokoko MoCap capture and retargeting; 20+ character and environment animations in Blender.' },
  { role: 'Founder & CEO', org: 'ryū co.', years: '2024 – 2026', text: 'Founded and ran a creative engineering agency offering performance marketing, landing pages and AI-powered lead systems.' },
];

export const tools = ['Photoshop', 'Illustrator', 'Premiere Pro', 'Canva', 'CapCut', 'Blender', 'Rokoko MoCap', 'Meta Business Suite', 'Google Analytics'];

export const quote = { lines: ['Be curious,', 'not judgemental.'], by: 'Ted Lasso' };
