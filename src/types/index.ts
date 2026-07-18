// ─── Enums ────────────────────────────────────────────────────────────────────

export type UserRole = "ADMIN" | "USER";

export type UserStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED"
  | "BLOCKED"
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
  | "FAILED";

// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  fullName: string | null;
  userName: string | null;
  email: string;
  phoneNumber: string | null;
  profileImage: string | null;
  coverImage: string | null;
  role: UserRole;
  status: UserStatus;
  isSocialLogin: boolean;
  emailVerified: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
  isApproved: boolean;
  isProfileComplete: boolean | null;
  lat: number;
  lon: number;
  suspendedUntil: string | null;
  lastLoginAt: string | null;
  onBoarding: boolean;
  fcmToken: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface LoginResponse {
  userId: string;
  email: string;
  emailVerified: boolean;
  role: UserRole;
  token: string;
}

export interface RegisterResponse {
  message: string;
  result: User;
}

export interface OtpVerifyResponse {
  message: string;
  Token: string;
}

// ─── AppNotification ─────────────────────────────────────────────────────────────

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  body: string;
  data: string | null;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Subscription Offer ───────────────────────────────────────────────────────

export interface SubscriptionOffer {
  id: string;
  createdBy: string;
  planName: string;
  planType: string;
  facilities: string[];
  price: number;
  duration: number;
  details: string | null;
  status: UserStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── User Subscription ────────────────────────────────────────────────────────

export interface UserSubscription {
  id: string;
  userId: string;
  subscriptionOfferId: string;
  startDate: string;
  endDate: string;
  paymentId: string;
  duration: number | null;
  paymentStatus: PaymentStatus;
  status: SubscriptionStatus;
  createdAt: string;
  updatedAt: string;
  subscriptionOffer?: SubscriptionOffer;
}

// ─── Chat / Messaging ─────────────────────────────────────────────────────────

export interface Room {
  id: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Chat {
  id: string;
  senderId: string;
  receiverId: string;
  roomId: string;
  message: string | null;
  imageUrl: string | null;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Friend / Follow ──────────────────────────────────────────────────────────

export interface FriendRequest {
  id: string;
  senderId: string;
  receiverId: string;
  status: ConnectionRequestStatus;
  ignore: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── API Response Wrappers ────────────────────────────────────────────────────

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

// ─── WebSocket Events ─────────────────────────────────────────────────────────

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
