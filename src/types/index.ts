export type OpportunityCategory =
  | 'Hackathons'
  | 'Internships'
  | 'Workshops'
  | 'Tech Updates';

export interface OpportunityItem {
  id: string;
  title: string;
  organization: string;
  category: OpportunityCategory;
  deadline: string;
  locationOrMode: string;
  summary: string;
  details: string[];
  tags: string[];
  featured?: boolean;
  externalUrl: string;
  ctaLabel: string;
  stipendOrPrize?: string;
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  organization: string;
  topic: string;
  eventTag: string;
  day?: 'Day 1' | 'Day 2';
  avatar?: string;
  initials: string;
  linkedinUrl: string;
  bio: string;
}

export interface CnxEvent {
  id: string;
  title: string;
  subtitle: string;
  status: 'Upcoming' | 'Completed';
  date: string;
  time?: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  venueOrPlatform: string;
  attendeesOrTarget: string;
  speaker?: string;
  speakerTitle?: string;
  category: string;
  highlights: string[];
  prizePool?: string;
  deadline?: string;
  externalUrl?: string;
  internalRoute?: string;
  image?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  avatar?: string;
  initials: string;
  linkedinUrl: string;
}

export interface PartnerItem {
  id: string;
  name: string;
  role: string;
  logo?: string;
  invertOnDark?: boolean;
  website?: string;
}

export interface Ambassador {
  id: string;
  name: string;
  college: string;
  shortCollege: string;
  city: string;
  cohort: string;
  initials: string;
  focus: string;
  linkedinUrl: string;
}

export interface Squad {
  id: string;
  name: string;
  hackathon: string;
  leader: string;
  college: string;
  mode: 'Offline' | 'Online' | 'Hybrid';
  currentSize: number;
  maxSize: number;
  skills: string[];
  lookingFor: string;
  inviteCode: string;
  description: string;
  createdByMe?: boolean;
}

export interface JoinRequest {
  id: string;
  squadId: string;
  squadName: string;
  hackathon: string;
  applicantName: string;
  applicantCollege: string;
  roleRequested: string;
  skills: string[];
  note: string;
  status: 'Pending' | 'Accepted' | 'Declined';
  timestamp: string;
}

export interface ServiceOffering {
  id: string;
  index: string;
  title: string;
  shortDescription: string;
  deliverables: string[];
  stack: string[];
  timeline: string;
  idealFor: string;
}

export type LibraryCategory =
  | 'Previous Year Questions'
  | 'Notes'
  | 'Problem Statements';

export interface LibraryResource {
  id: string;
  title: string;
  category: LibraryCategory;
  countLabel: string;
  format: string;
  updatedAt: string;
  tags: string[];
  summary: string;
  sampleTopics: string[];
  previewSnippet: string;
}

export interface LeetCodeProblem {
  id: string;
  number: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  companies: string[];
  frequency: string;
  url: string;
}

export interface CareerRole {
  id: string;
  title: string;
  department: 'Community' | 'Engineering' | 'Design' | 'Content';
  type: string;
  location: string;
  tags: string[];
  deadline: string;
  status: 'Open' | 'Rolling';
  summary: string;
  responsibilities: string[];
  perks: string[];
  eligibility: string[];
}

export interface UserProfile {
  name: string;
  handle: string;
  college: string;
  role: string;
  email: string;
  signedIn: boolean;
  skills: string[];
}
