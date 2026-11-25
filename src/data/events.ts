import type { CnxEvent } from '../types';

export const UPCOMING_EVENTS: CnxEvent[] = [
  {
    id: 'evt-neuraknockout-2026',
    title: 'NeuraKnockout 2026',
    subtitle: '7-Hour Offline Individual Web Development Challenge',
    status: 'Upcoming',
    date: 'Dec 19, 2026',
    time: '09:00 AM – 04:00 PM IST',
    mode: 'Offline',
    venueOrPlatform: 'Marwadi University · Dept. of AI, ML & DS',
    attendeesOrTarget: 'Individual Sprint · Limited Seats',
    category: 'Flagship Hackathon',
    prizePool: '₹4,700 (₹2,100 Winner · ₹1,500 1st Runner-Up · ₹1,100 2nd Runner-Up)',
    deadline: 'Dec 19, 2026',
    highlights: [
      '7 consecutive hours of focused solo web engineering on campus',
      'Judged on architectural clarity, accessibility, responsiveness, and shipped execution',
      'Hosted in collaboration with the Department of AI, ML & Data Science, Marwadi University',
      'Verified certificates and top-3 cash awards totaling ₹4,700',
    ],
    image: '/images/ai-sparks-stage.jpg',
    internalRoute: '/events',
  },
  {
    id: 'evt-algorush-2026',
    title: 'AlgoRush 2026',
    subtitle: 'National Online DSA Coding Contest (4 Problems)',
    status: 'Upcoming',
    date: 'Aug – Dec 2026 Season',
    time: '90-Minute Timed Window',
    mode: 'Online',
    venueOrPlatform: 'Unstop Arena',
    attendeesOrTarget: 'Pan-India Undergraduate Builders',
    category: 'Competitive Programming',
    deadline: 'Dec 18, 2026',
    highlights: [
      '4 graded algorithmic challenges spanning sliding windows, graphs, and DP',
      'Real-time leaderboard with time-penalty scoring',
      'Post-contest editorial walkthrough published in CodeNeuraX Library',
    ],
    externalUrl: 'https://unstop.com',
  },
];

export const COMPLETED_EVENTS: CnxEvent[] = [
  {
    id: 'arch-gsoc-amazon',
    title: 'How to Crack Google Summer of Code & Amazon',
    subtitle: 'Open-Source Contributions, Proposal Craft & SDE Hiring Bar',
    status: 'Completed',
    date: 'Oct 17, 2026',
    time: '06:00 PM – 08:00 PM IST',
    mode: 'Online',
    venueOrPlatform: 'Virtual · Luma Live',
    attendeesOrTarget: '228 Attendees',
    speaker: 'Nidhi Singh',
    speakerTitle: 'GSoC Mentor at AOSSIE · SWE at Amazon',
    category: 'Career & Open Source',
    highlights: [
      'How to audit GSoC organizations 3 months before application windows open',
      'Structuring technical proposals around real issue backlogs',
      'Amazon SDE interview loops: DSA patterns, Leadership Principles, and clean code',
    ],
  },
  {
    id: 'arch-ai-sparks-2026',
    title: 'AI Sparks 2026 (2-Day Flagship Summit)',
    subtitle: 'Hands-On Agentic AI, Automation Workflows & Machine Learning',
    status: 'Completed',
    date: 'Aug 7–8, 2026',
    time: '09:00 AM – 04:30 PM IST',
    mode: 'Offline',
    venueOrPlatform: 'Marwadi University · Dept. of AI, ML & DS',
    attendeesOrTarget: '360+ Attendees',
    speaker: 'Parth Singh, Dev Anand, Varun Poladiya & Akshay Ranpariya',
    speakerTitle: 'Keynote & Technical Track Speakers',
    category: 'Flagship Summit',
    highlights: [
      'Day 1: Agentic AI, LLM internals, tool & function calling in Python on Colab',
      'Day 2: Linear regression, model evaluation, Demystifying AI/ML & live assessment',
      'Supported by Unstop, Devnovate ($30 platform credits), DeepQuantica, IDP & GeeksforGeeks',
    ],
    internalRoute: '/aispark',
    image: '/images/ai-sparks-audience.jpg',
  },
  {
    id: 'arch-algorush-2026',
    title: 'AlgoRush 2026 — August Qualifier',
    subtitle: 'Online DSA Coding Contest (4 Problems)',
    status: 'Completed',
    date: 'Aug 2026',
    mode: 'Online',
    venueOrPlatform: 'Unstop',
    attendeesOrTarget: 'Multi-College Cohort',
    category: 'Competitive Coding',
    highlights: [
      '4 algorithmic problems testing greedy logic, trees, and dynamic programming',
      'Cross-campus leaderboard across 20+ Indian engineering colleges',
    ],
  },
  {
    id: 'arch-google-interview',
    title: 'Crack the Google Interview',
    subtitle: 'Technical Problem Solving, Communication & Readiness',
    status: 'Completed',
    date: 'Apr 17, 2026',
    time: '06:00 PM – 08:00 PM IST',
    mode: 'Online',
    venueOrPlatform: 'Virtual Session',
    attendeesOrTarget: 'Live Q&A Session',
    speaker: 'Divanshi Jain',
    speakerTitle: 'Incoming Software Engineer at Google',
    category: 'Interview Prep',
    highlights: [
      'Thinking aloud cleanly during unfamiliar graph and string questions',
      'Dry-running edge cases and complexity tradeoffs without rushing to code',
    ],
  },
  {
    id: 'arch-microsoft-journey',
    title: 'Journey to Microsoft: From Student to Software Engineer',
    subtitle: 'Internship Conversion, Projects & Engineering Mindset',
    status: 'Completed',
    date: 'Nov 15, 2025',
    time: '06:00 PM – 08:00 PM IST',
    mode: 'Online',
    venueOrPlatform: 'Virtual · Luma Live',
    attendeesOrTarget: '119 Attendees',
    speaker: 'Parth Thakrar',
    speakerTitle: 'Software Engineer & Ex-Intern at Microsoft',
    category: 'Career Roadmap',
    highlights: [
      'Building portfolio systems that withstand technical deep-dive interviews',
      'Converting summer engineering internships into full-time offers',
    ],
  },
  {
    id: 'arch-sih-2025',
    title: 'How to Win Smart India Hackathon 2025',
    subtitle: 'SIH Problem Selection, Architecture Pitch & Live Demo Strategy',
    status: 'Completed',
    date: 'Sep 1, 2025',
    time: '06:00 PM – 08:00 PM IST',
    mode: 'Online',
    venueOrPlatform: 'Virtual · Luma Live',
    attendeesOrTarget: '170 Attendees',
    speaker: 'Arkja Gaur',
    speakerTitle: 'Smart India Hackathon 2024 Winner',
    category: 'Hackathon Strategy',
    highlights: [
      'Selecting high-signal SIH problem statements with clear evaluation rubrics',
      'Designing a concise 6-slide architecture pitch and resilient 36-hour demo',
    ],
  },
  {
    id: 'arch-ds-ai-roadmap',
    title: 'Data Science & AI Career Roadmap',
    subtitle: 'A Journey into Data Analytics, Modeling & Early Roles',
    status: 'Completed',
    date: 'Feb 25, 2026',
    time: '06:00 PM – 08:00 PM IST',
    mode: 'Online',
    venueOrPlatform: 'Virtual Webinar',
    attendeesOrTarget: 'Community Webinar',
    speaker: 'Industry Data & AI Panel',
    speakerTitle: 'Data Analytics & Applied ML Practitioners',
    category: 'Data & AI',
    highlights: [
      'SQL, exploratory analysis, and clean experiment tracking foundations',
      'Separating production ML expectations from tutorial notebooks',
    ],
  },
  {
    id: 'arch-100-ai-tools',
    title: '100 AI Tools & Workflow Bootcamp',
    subtitle: 'Community Showcase on Practical Developer & Automation Stacks',
    status: 'Completed',
    date: '2026 Cohort',
    mode: 'Online',
    venueOrPlatform: 'CodeNeuraX Community Showcase',
    attendeesOrTarget: 'Pan-India Student Builders',
    speaker: 'CodeNeuraX Builders',
    speakerTitle: 'Student Contributors & Core Team',
    category: 'Automation',
    highlights: [
      'Curated workflow demos for coding assistants, docs search, and rapid prototyping',
      'Evaluating real signal vs hype across modern AI developer tooling',
    ],
  },
];

export const AI_SPARKS_SCHEDULE = {
  day1: {
    label: 'Day 1 — Aug 7, 2026',
    theme: 'Agentic AI & Intelligent Automation',
    hours: '09:00 AM – 04:30 PM IST',
    sessions: [
      {
        time: '09:00 – 10:15',
        title: 'Opening Keynote & Introduction to Agentic AI',
        speaker: 'Parth Singh',
        description:
          'Why autonomous, tool-equipped software workflows represent a structural shift from static prompt-response interfaces.',
        tags: ['Foundations', 'Architecture'],
      },
      {
        time: '10:30 – 12:15',
        title: 'LLMs Under the Hood & Agents vs Traditional Chatbots',
        speaker: 'Parth Singh',
        description:
          'Token mechanics, context management, reasoning loops, planning, and state memory compared against single-turn chatbots.',
        tags: ['LLMs', 'Reasoning'],
      },
      {
        time: '01:15 – 02:45',
        title: 'Tool & Function Calling in Python (Google Colab Lab)',
        speaker: 'Varun Poladiya',
        description:
          'Hands-on Python implementation of multi-step tasks, JSON schema contracts, external API invocation, and error recovery.',
        tags: ['Python', 'Colab Lab'],
      },
      {
        time: '03:00 – 04:30',
        title: 'Production AI Workflows & Automation Ecosystems',
        speaker: 'Varun Poladiya',
        description:
          'Designing reliable triggers, n8n/webhook pipelines, and deployment practices ready for student builders and startups.',
        tags: ['Workflows', 'Automation'],
      },
    ],
  },
  day2: {
    label: 'Day 2 — Aug 8, 2026',
    theme: 'Hands-on Build, Deployment & Assessment',
    hours: '09:00 AM – 04:30 PM IST',
    sessions: [
      {
        time: '09:00 – 11:00',
        title: 'ML Foundations, Linear Regression & Model Evaluation',
        speaker: 'Prof. Akshay Ranpariya',
        description:
          'Training vs testing splits, generalization error, feature hygiene, and building evaluable machine learning baselines.',
        tags: ['Machine Learning', 'Evaluation'],
      },
      {
        time: '11:15 – 01:15',
        title: 'Demystifying AI/ML: From Architecture to Real Applications',
        speaker: 'Dev Anand',
        description:
          '2-hour flagship workshop dissecting how real-world AI applications move from concept and model selection to live deployment.',
        tags: ['Live Workshop', 'Deployment'],
      },
      {
        time: '02:00 – 03:30',
        title: 'Shipping & Competitive Technical Assessment',
        speaker: 'CodeNeuraX Technical Panel',
        description:
          'Structured timed assessment measuring applied grasp of Agentic AI, workflows, and ML concepts; top performers qualify for GATE DA scholarships.',
        tags: ['Assessment', 'Merit Track'],
      },
      {
        time: '03:45 – 04:30',
        title: 'Closing Keynote, Meet-and-Greet & Co-Branded Certification',
        speaker: 'Dev Anand & Marwadi University AI/ML Dept.',
        description:
          'Devnovate platform credit distribution ($30 USD / ₹2,800 value), merit awards, and official 2-day completion certificates.',
        tags: ['Closing', 'Perks & Certs'],
      },
    ],
  },
};

export const TOPICS_WE_COVER = [
  {
    index: '01',
    title: 'Agentic AI & LLMs',
    description:
      'Tool calling, structured outputs, memory architectures, and practical evaluation loops.',
  },
  {
    index: '02',
    title: 'Automation Workflows',
    description:
      'Event-driven orchestration with n8n, webhooks, API pipelines, and operational bots.',
  },
  {
    index: '03',
    title: 'DSA & Competitive Programming',
    description:
      'Timed problem solving, complexity hygiene, and company-specific pattern drills.',
  },
  {
    index: '04',
    title: 'Open Source & GSoC',
    description:
      'Navigating large repositories, writing clean RFCs, and shipping upstream pull requests.',
  },
  {
    index: '05',
    title: 'Full-Stack & Web Engineering',
    description:
      'React, TypeScript, scalable APIs, relational schemas, and production cloud deployment.',
  },
  {
    index: '06',
    title: 'Career & Interview Prep',
    description:
      'Unfiltered engineering roadmaps from interns and SDEs at Google, Microsoft, and Amazon.',
  },
];
