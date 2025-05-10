export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilePicture?: string;
  preferredLanguage: string;
  roleIds: number[];
}
