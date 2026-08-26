export interface ProfileFormData {
  fullName: string;
  phoneNumber: string;
}

export interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type ProfileTab = "profile" | "password";
