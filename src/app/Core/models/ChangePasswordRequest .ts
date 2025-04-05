export interface ChangePasswordRequest {
  userId: number;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ResetPasswordRequest {
  userId: number;
  newPassword: string;
  confirmNewPassword: string;
}
