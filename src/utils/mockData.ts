export interface Applicant {
  studentId: string;
  name: string;
  avatar: string;
  school: string;
  appliedAt: string;
  bio?: string;
  skills?: string[];
  isVerified?: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'frontend' | 'backend' | 'ai-ml' | 'security' | 'other';
  reward: number;
  deadline: string;
  status: 'open' | 'applied' | 'active' | 'review' | 'completed';
  clientName: string;
  skills: string[];
  assigneeId?: string;
  applicants?: Applicant[];
  submission?: {
    repoUrl: string;
    branch: string;
    submittedAt: string;
    testsPassed: number;
    totalTests: number;
    coverage: string;
    feedback?: string;
  };
}

export interface UserProfile {
  name: string;
  school?: string;
  eduEmail?: string;
  skills?: string[];
  isVerified: boolean;
  avatar: string;
  bio: string;
  balance: number; // Student earnings or Employer remaining balance
}

export interface Transaction {
  id: string;
  taskId: string;
  taskTitle: string;
  amount: number;
  type: 'deposit' | 'payout' | 'escrow_lock' | 'escrow_release';
  timestamp: string;
  partyName: string; // client or student
}

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Fix React component re-rendering lag in search bar',
    description: 'We have a React autocomplete search component that drops frames on mobile. The input lags behind typing. You need to identify the redundant renders, apply debounce / memoization, and write 3 Jest tests to verify execution time limits.',
    category: 'frontend',
    reward: 250,
    deadline: '2026-06-20',
    status: 'applied',
    clientName: 'AuraTech AI',
    skills: ['React', 'TypeScript', 'Performance Profiling', 'Jest'],
    applicants: [
      {
        studentId: 'student-mock-1',
        name: 'Jane Doe',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
        school: 'MIT',
        appliedAt: new Date(Date.now() - 3600000).toISOString(),
        bio: 'Computer Science graduate student at MIT. Passionate about web performance, frontend systems, and React internals.',
        skills: ['React', 'TypeScript', 'Web Workers', 'Webpack', 'Jest'],
        isVerified: true
      },
      {
        studentId: 'student-mock-2',
        name: 'Marcus Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        school: 'UC Berkeley',
        appliedAt: new Date(Date.now() - 1800000).toISOString(),
        bio: 'Sophomore CS major at UC Berkeley. Full-stack developer with experience in React and Node.js. Optimized several open source search algorithms.',
        skills: ['React', 'JavaScript', 'HTML/CSS', 'Algorithm Design'],
        isVerified: true
      }
    ]
  },
  {
    id: 'task-2',
    title: 'Design API endpoint for secure image metadata retrieval',
    description: 'Create a Node.js Express endpoint that reads EXIF metadata from uploaded images. It must sanitize input file paths, strip geo-location details from public responses for privacy, and support JSON caching using Redis.',
    category: 'backend',
    reward: 400,
    deadline: '2026-06-25',
    status: 'open',
    clientName: 'PixSafe Systems',
    skills: ['Node.js', 'Express', 'Redis', 'Security Auditing']
  },
  {
    id: 'task-3',
    title: 'Fine-tune local Llama-3 model prompt parameters',
    description: 'Optimize system prompt instructions and parameter configurations (temperature, top_p, frequency penalty) for a local Llama-3 instance. Ensure response formatting output is strictly valid JSON matching our provided schema.',
    category: 'ai-ml',
    reward: 550,
    deadline: '2026-06-18',
    status: 'open',
    clientName: 'PromptFlow LLC',
    skills: ['Llama-3', 'Prompt Engineering', 'JSON Schema', 'Python']
  },
  {
    id: 'task-4',
    title: 'Implement OAuth2 validation middleware',
    description: 'Write an authentication middleware module in Golang using standard JWT tokens. It should validate claims, verify signatures, cache public keys, and return 401/403 errors with clean structured payloads.',
    category: 'security',
    reward: 350,
    deadline: '2026-06-22',
    status: 'open',
    clientName: 'AuthGate Corp',
    skills: ['Go', 'OAuth2', 'JWT', 'Unit Testing']
  }
];

export const INITIAL_STUDENT_PROFILE: UserProfile = {
  name: 'Alex Mercer',
  school: 'Stanford University',
  eduEmail: 'amercer@stanford.edu',
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'Docker'],
  isVerified: true,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  bio: 'Computer Science junior interested in full-stack engineering and distributed systems. Loves optimizing React performance.',
  balance: 650 // Past earnings
};

export const INITIAL_EMPLOYER_PROFILE: UserProfile = {
  name: 'Sarah Jenkins (Founder)',
  skills: [],
  isVerified: true,
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
  bio: 'Founder at AuraTech AI. We build lightweight collaborative design interfaces for engineering teams.',
  balance: 3200 // Budget remaining for outsourcing
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    taskId: 'task-legacy-1',
    taskTitle: 'Refactor Tailwind styles in navigation sidebar',
    amount: 150,
    type: 'payout',
    timestamp: '2026-06-10T14:30:00Z',
    partyName: 'AuraTech AI'
  },
  {
    id: 'tx-2',
    taskId: 'task-legacy-2',
    taskTitle: 'Write unit tests for Stripe payment callback hook',
    amount: 500,
    type: 'payout',
    timestamp: '2026-06-12T09:15:00Z',
    partyName: 'Stripeflow'
  }
];
