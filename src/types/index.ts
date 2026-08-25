/**
 * ==============================================================================
 * 📌 GLOBAL TYPES & INTERFACES (types/index.ts)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * This file contains all global TypeScript definitions used across the starter pack.
 *
 * 🛠️ HOW TO CUSTOMIZE:
 *  - To add a new entity (e.g. `Product` or `Post`), simply add an interface here.
 * ==============================================================================
 */

// ─── Enums & User Roles ────────────────────────────────────────────────────────

export type UserRole = "ADMIN" | "USER" | "MANAGER" | "CREATOR" | "CLIENT";

export type UserStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED"
  | "BLOCKED"
  | "PENDING"
  | "DELETED"
  | "REJECTED";

export type SocialProvider = "GOOGLE" | "FACEBOOK";

export type ConnectionRequestStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export type SubscriptionStatus = "PENDING" | "ACTIVE" | "EXPIRED" | "CANCELLED";

export type PaymentStatus =
  | "PENDING"
  | "AUTHORIZED"
  | "PAID"
  | "CANCELLED"
  | "FAILED"
  | "COMPLETED";

// ─── User Model ───────────────────────────────────────────────────────────────

export interface User {
  id: string;
  fullName: string | null;
  userName: string | null;
  email: string;
  phoneNumber: string | null;
  profileImage: string | null;
  coverImage?: string | null;
  role: UserRole;
  status: UserStatus;
  isSocialLogin?: boolean;
  emailVerified?: boolean;
  isBlocked?: boolean;
  isDeleted?: boolean;
  isApproved?: boolean;
  isProfileComplete?: boolean | null;
  lat?: number;
  lon?: number;
  suspendedUntil?: string | null;
  lastLoginAt?: string | null;
  onBoarding?: boolean;
  fcmToken?: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Authentication Responses ─────────────────────────────────────────────────

export interface LoginResponse {
  userId: string;
  email: string;
  fullName?: string;
  emailVerified?: boolean;
  role: UserRole;
  token: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface RefreshTokenResponse {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface RegisterResponse {
  message: string;
  result: User;
}

export interface OtpVerifyResponse {
  message: string;
  Token: string;
  token?: string;
  refreshToken?: string;
}

// ─── Notifications ────────────────────────────────────────────────────────────

export interface AppNotification {
  id: string;
  userId?: string;
  title: string;
  body: string;
  message?: string;
  data?: string | null;
  read: boolean;
  time?: string;
  category?: "system" | "user" | "order" | "alert" | "payout" | "message";
  createdAt: string;
  updatedAt: string;
}

// ─── Subscription & Pricing Plans ─────────────────────────────────────────────

export interface SubscriptionOffer {
  id: string;
  createdBy?: string;
  planName: string;
  planType: string;
  facilities: string[];
  price: number;
  duration: number;
  details?: string | null;
  status?: UserStatus;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserSubscription {
  id: string;
  userId: string;
  subscriptionOfferId: string;
  startDate: string;
  endDate: string;
  paymentId?: string;
  duration?: number | null;
  paymentStatus?: PaymentStatus;
  status: SubscriptionStatus;
  createdAt?: string;
  updatedAt?: string;
  subscriptionOffer?: SubscriptionOffer;
}

// ─── Projects & Milestones ────────────────────────────────────────────────────

export interface Milestone {
  id: number | string;
  title: string;
  description: string;
  date: string;
  status: "COMPLETED" | "IN PROGRESS" | "UPCOMING";
}

export interface Deliverable {
  id: number | string;
  title: string;
  type: "JPG" | "MP4" | "PDF" | "ZIP";
  sizeOrStatus: string;
  url: string;
}

export interface Project {
  id: number | string;
  title: string;
  client: string;
  creator: string;
  budget: string;
  deadline: string;
  status: "In Progress - Editing" | "Completed" | "Client Review" | "Cancelled";
  progress: number;
  milestones: Milestone[];
  deliverables?: Deliverable[];
}

// ─── Packages / Pricing Plans ─────────────────────────────────────────────────

export interface PackagePlan {
  id: number | string;
  name: string;
  price: number;
  billingPeriod: "monthly" | "yearly";
  features: string[];
  isPopular?: boolean;
  createdAt?: string;
}

// ─── Financial Transactions & Payouts ─────────────────────────────────────────

export interface PaymentTransaction {
  id: string;
  user: string;
  email: string;
  amount: string;
  date: string;
  status: "Completed" | "Pending" | "Failed";
  plan: string;
  method: string;
}

export interface PayoutRequest {
  id: number | string;
  name: string;
  email: string;
  amount: string;
  bankName: string;
  accountNumber: string;
  requestDate: string;
  status: "Pending" | "Approved" | "Rejected";
}

// ─── Chat / Messaging ─────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface ChatContact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  online: boolean;
  lastMessage: string;
  lastMessageTime: string;
  messages: ChatMessage[];
}

export interface Room {
  id: string;
  senderId: string;
  receiverId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Chat {
  id: string;
  senderId: string;
  receiverId: string;
  roomId: string;
  message: string | null;
  imageUrl?: string | null;
  isRead: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ─── Analytics & Dashboard Stats ──────────────────────────────────────────────

export interface DashboardOverviewStats {
  totalUsers?: string;
  totalRevenue?: string;
  activeSessions?: string;
  growthRate?: string;
  activeUsers?: string;
  activeCreators?: string;
  pendingApplications?: string;
  recentVolume?: string;
  escrowBalance?: string;
}

export interface RevenuePoint {
  month: string;
  revenue: number;
}

export interface PlatformActivity {
  id?: string;
  name: string;
  action: string;
  time: string;
  avatarBg?: string;
  avatarColor?: string;
}

// ─── WebSocket Types ──────────────────────────────────────────────────────────

export type WsEventType =
  | "authenticate"
  | "message"
  | "fetchChats"
  | "onlineUsers"
  | "unReadMessages"
  | "userStatus"
  | "typing"
  | "stopTyping";

export interface WsMessage {
  event: WsEventType;
  data?: unknown;
  token?: string;
  receiverId?: string;
  message?: string;
  imageUrl?: string;
}

// ─── Generic API Response Wrappers ────────────────────────────────────────────

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

export interface PaginatedResponse<T> {
  meta: PaginationMeta;
  data: T[];
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}
