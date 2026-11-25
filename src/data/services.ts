import type { ServiceOffering } from '../types';

export const SERVICE_PRINCIPLES = [
  {
    title: 'Discovery & Architecture',
    description:
      'Every engagement starts with written system specs, data modeling, and a realistic delivery timeline before a single component is coded.',
  },
  {
    title: 'Weekly Shipped Sprints',
    description:
      'Builders ship reviewable staging builds every Friday so you inspect real software in the browser instead of slide decks.',
  },
  {
    title: 'Clean Handoff & Monitoring',
    description:
      'Typed repositories, environment documentation, deployment pipelines, and post-launch observability handed over cleanly to your team.',
  },
];

export const SERVICE_KPIS = [
  { value: '10+', label: 'Production projects delivered' },
  { value: '50+', label: 'Global clients & partners supported' },
  { value: '95.9%', label: 'Measured uptime across deployments' },
  { value: '24/7', label: 'Active engineering support' },
];

export const SERVICE_OFFERINGS: ServiceOffering[] = [
  {
    id: 'srv-ai-automation',
    index: '01',
    title: 'AI & Automation',
    shortDescription:
      'Predictive models, intelligent agents, chatbots, and deterministic workflow automation.',
    deliverables: [
      'Custom tool-calling AI agents & RAG search systems over internal documents',
      'n8n, webhook, and API workflow orchestration eliminating repetitive manual ops',
      'Structured output evaluation suites & cost/latency monitoring dashboards',
    ],
    stack: ['Python', 'FastAPI', 'LangGraph', 'n8n', 'PostgreSQL pgvector'],
    timeline: '2 – 5 Weeks',
    idealFor: 'Startups, EdTech platforms, and operations teams automating high-volume workflows.',
  },
  {
    id: 'srv-custom-apps',
    index: '02',
    title: 'Custom Apps & Websites',
    shortDescription:
      'High-performance web apps, mobile apps, and internal operational tools engineered for speed.',
    deliverables: [
      'Flagship marketing & community portals built with React, Next.js, and TypeScript',
      'Multi-role internal dashboards, booking systems, and SaaS MVP architecture',
      'Accessible component libraries with strict Lighthouse performance budgets',
    ],
    stack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Supabase / Node.js'],
    timeline: '3 – 6 Weeks',
    idealFor: 'Founders launching v1 products, organizations modernizing portals, and SaaS teams.',
  },
  {
    id: 'srv-cloud-devops',
    index: '03',
    title: 'Cloud & DevOps',
    shortDescription:
      'Cloud architecture, migrations, reliable hosting, and automated CI/CD pipelines.',
    deliverables: [
      'Containerized Docker deployments, reverse proxies, and SSL automation',
      'Zero-downtime GitHub Actions pipelines with preview environments',
      'Automated database backups, uptime alerting, and cloud cost optimization',
    ],
    stack: ['AWS', 'Docker', 'GitHub Actions', 'Nginx', 'Linux / Terraform'],
    timeline: '1 – 3 Weeks',
    idealFor: 'Growing engineering teams migrating off brittle manual deployments.',
  },
  {
    id: 'srv-cv-emerging',
    index: '04',
    title: 'Computer Vision & Emerging Tech',
    shortDescription:
      'Image/video intelligence, AR/VR prototypes, IoT telemetry, and Web3 verification systems.',
    deliverables: [
      'Real-time camera/video inspection & OCR extraction pipelines',
      'Embedded sensor telemetry dashboards and hardware-to-cloud MQTT bridges',
      'Smart-contract verification & spatial WebGL/AR interactive proofs',
    ],
    stack: ['OpenCV', 'PyTorch', 'MQTT / ESP32', 'Solidity', 'WebGL'],
    timeline: '3 – 8 Weeks',
    idealFor: 'R&D labs, campus innovation centers, and hardware-software pilots.',
  },
  {
    id: 'srv-growth',
    index: '05',
    title: 'Digital Marketing & Growth',
    shortDescription:
      'Performance campaigns, social distribution, and measurable lead generation across tech audiences.',
    deliverables: [
      'Developer & student-community distribution playbooks across LinkedIn & Unstop',
      'Conversion-focused landing architecture with event & funnel analytics',
      'Technical content calendars and launch-week distribution sprints',
    ],
    stack: ['Analytics', 'SEO Technical Audit', 'LinkedIn Distribution', 'CRM Funnels'],
    timeline: 'Ongoing / Monthly Retainer',
    idealFor: 'Developer tools, hackathons, hiring programs, and technical cohorts.',
  },
  {
    id: 'srv-design-branding',
    index: '06',
    title: 'Design & Branding',
    shortDescription:
      'Visual identity systems, UI/UX architecture, and cohesive product interfaces with zero clutter.',
    deliverables: [
      'Complete brand identity: geometric logomarks, typography scales, and token sheets',
      'Interactive Figma prototypes, user flows, and responsive component specs',
      'Pitch decks, flagship event visual systems, and design-system audits',
    ],
    stack: ['Figma', 'Design Tokens', 'Editorial Typography', 'Prototyping'],
    timeline: '2 – 4 Weeks',
    idealFor: 'Early-stage teams replacing generic templates with distinct product craft.',
  },
];
