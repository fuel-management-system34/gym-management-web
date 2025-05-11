export interface UpdateUserRequest {
  userId: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilePicture?: string;
  preferredLanguage: string;
  isActive: boolean;
  roleIds: number[];
}
