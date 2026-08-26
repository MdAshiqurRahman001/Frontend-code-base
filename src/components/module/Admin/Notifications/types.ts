export interface IndividualNotifData {
  userId: string;
  title: string;
  body: string;
  data?: string;
}

export interface GroupNotifData {
  title: string;
  body: string;
  role?: string;
  data?: string;
}

export type AdminNotifTab = "send" | "history";
export type SendType = "individual" | "group";
