/**
 * ==============================================================================
 * 📌 DEMO DATA STORE (Beginner-Friendly Mock Data)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * This file contains rich sample data for all dashboard pages (Stats, Users,
 * Projects, Packages, Payments, Messages, Notifications, FAQs).
 *
 * 🛠️ HOW TO USE:
 * When you connect your real backend API, simply replace these demo constants
 * with the data returned from your RTK Query API hooks!
 * ==============================================================================
 */

export interface MetricCardData {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  period: string;
}

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: "Creator" | "Client" | "Admin";
  status: "Active" | "Pending" | "Suspended";
  joinedDate: string;
  avatar: string;
  earnings?: string;
  projectsCount?: number;
}

export interface DemoProject {
  id: number;
  title: string;
  client: string;
  clientAvatar: string;
  creator: string;
  creatorAvatar: string;
  budget: string;
  status: "In Progress - Editing" | "Completed" | "Client Review" | "Cancelled";
  deadline: string;
  progress: number;
  milestones: {
    id: number;
    title: string;
    description: string;
    date: string;
    status: "COMPLETED" | "IN PROGRESS" | "UPCOMING";
  }[];
}

export interface DemoPackage {
  id: number;
  name: string;
  price: number;
  billingPeriod: "monthly" | "yearly";
  features: string[];
  activeSubscribers: number;
  status: "Active" | "Archived";
  popular?: boolean;
}

export interface DemoTransaction {
  id: string;
  date: string;
  user: string;
  email: string;
  avatar: string;
  plan: string;
  amount: string;
  method: string;
  status: "Completed" | "Pending" | "Failed";
}

export interface DemoPayout {
  id: number;
  name: string;
  email: string;
  avatar: string;
  amount: string;
  bankName: string;
  accountNumber: string;
  requestDate: string;
  status: "Pending" | "Approved" | "Rejected";
}

export interface DemoMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface DemoChatContact {
  id: string;
  name: string;
  avatar: string;
  role: string;
  online: boolean;
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  messages: DemoMessage[];
}

export interface DemoNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  category: "order" | "payout" | "system" | "message";
  read: boolean;
}

// ------------------------------------------------------------------------------
// 1. Dashboard Overview Metrics
// ------------------------------------------------------------------------------
export const DEMO_METRICS: MetricCardData[] = [
  {
    title: "Total Revenue",
    value: "$124,580",
    change: "+14.2%",
    isPositive: true,
    period: "vs last month",
  },
  {
    title: "Active Users",
    value: "8,640",
    change: "+8.5%",
    isPositive: true,
    period: "vs last month",
  },
  {
    title: "Active Projects",
    value: "142",
    change: "+22.4%",
    isPositive: true,
    period: "vs last month",
  },
  {
    title: "Pending Payouts",
    value: "$18,450",
    change: "-4.1%",
    isPositive: false,
    period: "vs last month",
  },
];

// ------------------------------------------------------------------------------
// 2. Users Demo Data
// ------------------------------------------------------------------------------
export const DEMO_USERS: DemoUser[] = [
  {
    id: "usr_1",
    name: "Amina Rahman",
    email: "amina@example.com",
    role: "Creator",
    status: "Active",
    joinedDate: "Jan 12, 2026",
    avatar: "/images/amina_profile.png",
    earnings: "$14,250",
    projectsCount: 24,
  },
  {
    id: "usr_2",
    name: "David Miller",
    email: "david.m@example.com",
    role: "Client",
    status: "Active",
    joinedDate: "Feb 04, 2026",
    avatar: "/images/david_profile.png",
    earnings: "$0",
    projectsCount: 12,
  },
  {
    id: "usr_3",
    name: "Elena Rostova",
    email: "elena@example.com",
    role: "Creator",
    status: "Active",
    joinedDate: "Feb 18, 2026",
    avatar: "/images/elena_profile.png",
    earnings: "$28,900",
    projectsCount: 45,
  },
  {
    id: "usr_4",
    name: "Ethan Wright",
    email: "ethan@example.com",
    role: "Client",
    status: "Pending",
    joinedDate: "Mar 01, 2026",
    avatar: "/images/ethan_profile.png",
    earnings: "$0",
    projectsCount: 3,
  },
  {
    id: "usr_5",
    name: "Sofia Chen",
    email: "sofia.c@example.com",
    role: "Creator",
    status: "Active",
    joinedDate: "Mar 10, 2026",
    avatar: "/images/sofia_profile.png",
    earnings: "$31,400",
    projectsCount: 52,
  },
  {
    id: "usr_6",
    name: "Liam O'Connor",
    email: "liam@example.com",
    role: "Creator",
    status: "Suspended",
    joinedDate: "Jan 20, 2026",
    avatar: "/images/liam_profile.png",
    earnings: "$5,200",
    projectsCount: 8,
  },
];

// ------------------------------------------------------------------------------
// 3. Projects Demo Data
// ------------------------------------------------------------------------------
export const DEMO_PROJECTS: DemoProject[] = [
  {
    id: 1,
    title: "Brand Identity & Modern Web UI Design",
    client: "Acme Global Tech",
    clientAvatar: "/images/david_profile.png",
    creator: "Elena Rostova",
    creatorAvatar: "/images/elena_profile.png",
    budget: "$4,500",
    status: "In Progress - Editing",
    deadline: "Mar 30, 2026",
    progress: 65,
    milestones: [
      {
        id: 101,
        title: "Moodboard & Concept Explorations",
        description: "Initial color palettes, typography, and moodboard alignment.",
        date: "Feb 15, 2026",
        status: "COMPLETED",
      },
      {
        id: 102,
        title: "UI Design Systems & Core Wireframes",
        description: "Design system tokens, component sets, and wireframe pages.",
        date: "Mar 05, 2026",
        status: "COMPLETED",
      },
      {
        id: 103,
        title: "High-Fidelity Prototype & Review",
        description: "Interactive prototype in Figma with client review feedback.",
        date: "Mar 20, 2026",
        status: "IN PROGRESS",
      },
      {
        id: 104,
        title: "Asset Export & Final Handover",
        description: "Exported design assets, code guidelines, and design spec.",
        date: "Mar 30, 2026",
        status: "UPCOMING",
      },
    ],
  },
  {
    id: 2,
    title: "Mobile E-Commerce App Redesign (iOS & Android)",
    client: "Urban Retail Co.",
    clientAvatar: "/images/ethan_profile.png",
    creator: "Sofia Chen",
    creatorAvatar: "/images/sofia_profile.png",
    budget: "$8,200",
    status: "Client Review",
    deadline: "Apr 15, 2026",
    progress: 85,
    milestones: [
      {
        id: 201,
        title: "User Flow Mapping & Information Architecture",
        description: "Mapped 15 key user flows across shopping and checkout.",
        date: "Jan 28, 2026",
        status: "COMPLETED",
      },
      {
        id: 202,
        title: "Checkout Redesign & Payment Integrations",
        description: "Stripe and Apple Pay UI flows with 1-click checkout.",
        date: "Feb 22, 2026",
        status: "COMPLETED",
      },
      {
        id: 203,
        title: "Final QA & Accessibility Audit",
        description: "Contrast ratio verification and haptic feedback design.",
        date: "Mar 12, 2026",
        status: "IN PROGRESS",
      },
    ],
  },
  {
    id: 3,
    title: "3D Product Animation & Hero Video Campaign",
    client: "Solaria Luminescence",
    clientAvatar: "/images/david_profile.png",
    creator: "Amina Rahman",
    creatorAvatar: "/images/amina_profile.png",
    budget: "$3,800",
    status: "Completed",
    deadline: "Mar 01, 2026",
    progress: 100,
    milestones: [
      {
        id: 301,
        title: "3D Modeling & Shader Setup",
        description: "Textured photorealistic 3D product render.",
        date: "Feb 02, 2026",
        status: "COMPLETED",
      },
      {
        id: 302,
        title: "Lighting, Camera Motion & Render Output",
        description: "Rendered 4K 60fps hero loop animation.",
        date: "Feb 28, 2026",
        status: "COMPLETED",
      },
    ],
  },
];

// ------------------------------------------------------------------------------
// 4. Packages Demo Data
// ------------------------------------------------------------------------------
export const DEMO_PACKAGES: DemoPackage[] = [
  {
    id: 1,
    name: "Starter Creator",
    price: 29,
    billingPeriod: "monthly",
    features: [
      "Up to 5 Active Projects",
      "Standard Payout Schedule (7 days)",
      "Standard Analytics",
      "Email Support",
    ],
    activeSubscribers: 342,
    status: "Active",
    popular: false,
  },
  {
    id: 2,
    name: "Pro Agency",
    price: 79,
    billingPeriod: "monthly",
    features: [
      "Unlimited Active Projects",
      "Instant 24-Hour Payouts",
      "Advanced Revenue Analytics",
      "Priority 24/7 Chat Support",
      "Custom Brand Invoicing",
    ],
    activeSubscribers: 890,
    status: "Active",
    popular: true,
  },
  {
    id: 3,
    name: "Enterprise Studio",
    price: 199,
    billingPeriod: "monthly",
    features: [
      "Custom Contract Agreements",
      "Dedicated Account Manager",
      "Zero Transaction Fees",
      "Custom API Access",
      "Multi-Seat Team Accounts",
    ],
    activeSubscribers: 115,
    status: "Active",
    popular: false,
  },
];

// ------------------------------------------------------------------------------
// 5. Payments & Transactions Demo Data
// ------------------------------------------------------------------------------
export const DEMO_TRANSACTIONS: DemoTransaction[] = [
  {
    id: "TXN-9021",
    date: "Mar 14, 2026",
    user: "David Miller",
    email: "david.m@example.com",
    avatar: "/images/david_profile.png",
    plan: "Pro Agency Plan",
    amount: "$79.00",
    method: "Visa •••• 4242",
    status: "Completed",
  },
  {
    id: "TXN-9022",
    date: "Mar 13, 2026",
    user: "Elena Rostova",
    email: "elena@example.com",
    avatar: "/images/elena_profile.png",
    plan: "Starter Creator",
    amount: "$29.00",
    method: "Mastercard •••• 8831",
    status: "Completed",
  },
  {
    id: "TXN-9023",
    date: "Mar 12, 2026",
    user: "Acme Global Tech",
    email: "billing@acme.com",
    avatar: "/images/ethan_profile.png",
    plan: "Project Escrow Deposit",
    amount: "$4,500.00",
    method: "Wire Transfer",
    status: "Completed",
  },
  {
    id: "TXN-9024",
    date: "Mar 11, 2026",
    user: "Ethan Wright",
    email: "ethan@example.com",
    avatar: "/images/ethan_profile.png",
    plan: "Pro Agency Plan",
    amount: "$79.00",
    method: "PayPal",
    status: "Pending",
  },
];

// ------------------------------------------------------------------------------
// 6. Payouts Demo Data
// ------------------------------------------------------------------------------
export const DEMO_PAYOUTS: DemoPayout[] = [
  {
    id: 1,
    name: "Elena Rostova",
    email: "elena@example.com",
    avatar: "/images/elena_profile.png",
    amount: "$3,600.00",
    bankName: "JPMorgan Chase Bank",
    accountNumber: "•••••••• 9182",
    requestDate: "Mar 14, 2026",
    status: "Pending",
  },
  {
    id: 2,
    name: "Sofia Chen",
    email: "sofia.c@example.com",
    avatar: "/images/sofia_profile.png",
    amount: "$6,970.00",
    bankName: "Bank of America",
    accountNumber: "•••••••• 4410",
    requestDate: "Mar 13, 2026",
    status: "Pending",
  },
  {
    id: 3,
    name: "Amina Rahman",
    email: "amina@example.com",
    avatar: "/images/amina_profile.png",
    amount: "$3,230.00",
    bankName: "Wells Fargo Bank",
    accountNumber: "•••••••• 5521",
    requestDate: "Mar 10, 2026",
    status: "Approved",
  },
];

// ------------------------------------------------------------------------------
// 7. Chat / Messages Demo Data
// ------------------------------------------------------------------------------
export const DEMO_CHAT_CONTACTS: DemoChatContact[] = [
  {
    id: "c1",
    name: "Elena Rostova",
    avatar: "/images/elena_profile.png",
    role: "Senior UI/UX Designer",
    online: true,
    unreadCount: 2,
    lastMessage: "I just uploaded the updated Figma prototype for your review!",
    lastMessageTime: "10:42 AM",
    messages: [
      {
        id: "m1",
        senderId: "c1",
        senderName: "Elena Rostova",
        senderAvatar: "/images/elena_profile.png",
        text: "Hi there! I've been working on the brand identity deliverables.",
        timestamp: "10:30 AM",
        isMe: false,
      },
      {
        id: "m2",
        senderId: "me",
        senderName: "Admin User",
        senderAvatar: "/images/david_profile.png",
        text: "Awesome! How are the mobile wireframes coming along?",
        timestamp: "10:35 AM",
        isMe: true,
      },
      {
        id: "m3",
        senderId: "c1",
        senderName: "Elena Rostova",
        senderAvatar: "/images/elena_profile.png",
        text: "I just uploaded the updated Figma prototype for your review!",
        timestamp: "10:42 AM",
        isMe: false,
      },
    ],
  },
  {
    id: "c2",
    name: "David Miller",
    avatar: "/images/david_profile.png",
    role: "Product Manager (Client)",
    online: false,
    unreadCount: 0,
    lastMessage: "Thanks for the quick turnaround on milestone 2.",
    lastMessageTime: "Yesterday",
    messages: [
      {
        id: "m4",
        senderId: "c2",
        senderName: "David Miller",
        senderAvatar: "/images/david_profile.png",
        text: "Thanks for the quick turnaround on milestone 2.",
        timestamp: "Yesterday",
        isMe: false,
      },
      {
        id: "m5",
        senderId: "me",
        senderName: "Admin User",
        senderAvatar: "/images/david_profile.png",
        text: "Glad to hear! We are on track for milestone 3.",
        timestamp: "Yesterday",
        isMe: true,
      },
    ],
  },
  {
    id: "c3",
    name: "Sofia Chen",
    avatar: "/images/sofia_profile.png",
    role: "Full Stack Engineer",
    online: true,
    unreadCount: 0,
    lastMessage: "The payment webhook has been configured properly.",
    lastMessageTime: "2 days ago",
    messages: [
      {
        id: "m6",
        senderId: "c3",
        senderName: "Sofia Chen",
        senderAvatar: "/images/sofia_profile.png",
        text: "The payment webhook has been configured properly.",
        timestamp: "2 days ago",
        isMe: false,
      },
    ],
  },
];

// ------------------------------------------------------------------------------
// 8. Notifications Demo Data
// ------------------------------------------------------------------------------
export const DEMO_NOTIFICATIONS: DemoNotification[] = [
  {
    id: "n1",
    title: "New Payout Request",
    message: "Elena Rostova submitted a payout request for $3,600.00.",
    time: "10 minutes ago",
    category: "payout",
    read: false,
  },
  {
    id: "n2",
    title: "Milestone Completed",
    message: "Project 'Brand Identity & Web UI' reached milestone 2.",
    time: "1 hour ago",
    category: "order",
    read: false,
  },
  {
    id: "n3",
    title: "New Message Received",
    message: "Elena Rostova sent you a new message regarding project deliverables.",
    time: "2 hours ago",
    category: "message",
    read: true,
  },
  {
    id: "n4",
    title: "System Update Complete",
    message: "Database indexing and security patch v2.4 successfully applied.",
    time: "1 day ago",
    category: "system",
    read: true,
  },
];

// ------------------------------------------------------------------------------
// 9. FAQ / Support Demo Data
// ------------------------------------------------------------------------------
export const DEMO_FAQS = [
  {
    question: "How do I connect my real backend API to this dashboard?",
    answer:
      "All API queries are configured in src/redux/api/ (e.g. authApi.ts, baseApi.ts). Set your API baseUrl in baseApi.ts or in your .env.local file (NEXT_PUBLIC_API_URL). When data is fetched, it will automatically populate these components!",
  },
  {
    question: "How does the form system work?",
    answer:
      "The form system uses React Hook Form with Zod validation. Use <NRForm> with your schema, and inside place <NRInput>, <NRSelect>, or <NRDatePicker>. Submissions are type-safe and validated automatically!",
  },
  {
    question: "How do I customize the navigation sidebar?",
    answer:
      "Open src/components/shared/app-sidebar.tsx. You can easily add, rename, or reorder menu items under the defaultNavData object.",
  },
  {
    question: "Where are data tables configured?",
    answer:
      "Tables use @tanstack/react-table in src/components/ui/core/NRTable. Simply provide column definitions and your data array to <NRTable columns={cols} data={data} />.",
  },
];
