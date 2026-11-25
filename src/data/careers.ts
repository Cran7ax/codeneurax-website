import type { CareerRole } from '../types';

export const CAREER_ROLES: CareerRole[] = [
  {
    id: 'role-campus-ambassador-2027',
    title: 'CodeNeuraX Campus Ambassador 2027',
    department: 'Community',
    type: 'Unpaid · Hybrid',
    location: 'Pan-India Campuses',
    tags: ['Leadership', 'Community', 'Networking'],
    deadline: 'Dec 15, 2026',
    status: 'Open',
    summary:
      'Represent CodeNeuraX inside your engineering campus: organize peer coding meetups, coordinate hackathon squads via BuddyKid, and bridge students to national industry sessions.',
    responsibilities: [
      'Launch and moderate a campus study circle covering DSA, AI workflows, and hackathon prep.',
      'Coordinate local participation in flagship CodeNeuraX events like AlgoRush and NeuraKnockout.',
      'Curate campus-level tech updates and connect student builders to CodeNeuraX speaker clinics.',
      'Collaborate monthly with the Core Team in Rajkot and peer ambassadors across partner colleges.',
    ],
    perks: [
      'Official Campus Ambassador appointment & verified completion recommendation letter',
      'Direct mentorship access with Core Team and invited industry speakers',
      'Priority passes & partner platform credits at flagship CNX summits',
      'Hands-on event leadership track with eligibility for Core Team 2027',
    ],
    eligibility: [
      'Currently enrolled undergraduate or postgraduate student in CS, IT, AI/ML, or allied engineering.',
      'Strong communication skills and active participation in campus technical initiatives.',
      'Consistent 3–4 hours/week commitment across the semester cohort.',
    ],
  },
  {
    id: 'role-web-eng-contributor',
    title: 'Core Web Engineering Contributor',
    department: 'Engineering',
    type: 'Volunteer · Remote',
    location: 'India · Async + Weekly Sync',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    deadline: 'Rolling Track',
    status: 'Rolling',
    summary:
      'Maintain and evolve codeneurax.in, BuddyKid squad workflows, and the CodeNeuraX Library platform architecture.',
    responsibilities: [
      'Ship clean, accessible React + TypeScript interfaces with zero layout drift.',
      'Build searchable resource indices, interactive event microsites, and community utilities.',
      'Review pull requests with strict attention to bundle performance and mobile ergonomics.',
    ],
    perks: [
      'Real production commits reviewed by senior student engineers and mentors',
      'Core Team recognition, recommendation letter, and portfolio case studies',
      'Direct collaboration on CodeNeuraX open-source tooling',
    ],
    eligibility: [
      'Demonstrated GitHub projects in React, TypeScript, or Next.js.',
      'Comfort with Git branching, component state modeling, and responsive CSS.',
    ],
  },
  {
    id: 'role-visual-motion-designer',
    title: 'Visual & Motion Designer',
    department: 'Design',
    type: 'Volunteer · Remote',
    location: 'India · Hybrid',
    tags: ['Figma', 'Editorial UI', 'Typography'],
    deadline: 'Rolling Track',
    status: 'Rolling',
    summary:
      'Shape visual systems for flagship summits (AI Sparks, NeuraKnockout), speaker reveals, and product UI specs.',
    responsibilities: [
      'Design crisp editorial event banners, speaker identity cards, and UI component layouts in Figma.',
      'Maintain strict typographic hierarchy and dark-mode visual standards across CNX channels.',
      'Partner with web engineers to translate interactive states cleanly into code.',
    ],
    perks: [
      'Own the visual identity of national student summits reaching 7,000+ builders',
      'Design critique sessions and official Core Team credentials',
      'Portfolio showcase featured across CodeNeuraX digital properties',
    ],
    eligibility: [
      'Link to Figma portfolio or 3+ visual/UI case studies.',
      'Strong eye for spacing, typography, and restraint over visual clutter.',
    ],
  },
  {
    id: 'role-tech-content-lead',
    title: 'Technical Content & Community Lead',
    department: 'Content',
    type: 'Volunteer · Remote',
    location: 'India · Async',
    tags: ['Technical Writing', 'DSA / AI', 'Curation'],
    deadline: 'Rolling Track',
    status: 'Rolling',
    summary:
      'Curate verified daily opportunities, summarize speaker sessions into actionable briefs, and maintain Library notes.',
    responsibilities: [
      'Verify hackathons, internships, and open-source cohorts before publishing to the Opportunity Feed.',
      'Author structured technical recaps from CodeNeuraX webinars and AI Sparks workshops.',
      'Organize company-wise DSA and GATE study sheets inside the CodeNeuraX Library.',
    ],
    perks: [
      'Direct networking with speakers from Google, Microsoft, Amazon, and AI startups',
      'Byline credit across CodeNeuraX Library and engineering briefs',
      'Core Team recommendation letter and leadership path',
    ],
    eligibility: [
      'Ability to distill complex CS or AI concepts into clear, concise notes.',
      'High bar for factual accuracy and zero spam curation.',
    ],
  },
];
