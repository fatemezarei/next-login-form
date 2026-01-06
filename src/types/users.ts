export interface User {
  id: number;
  social_security_number: string;
  firstName: string;
  lastName: string;
  mobile: string;
  role: string;
  rolePersian: string;
  gender: string;
  isActive: boolean;
  isActiveDescription: string;
  createdAtPension: string;
  updatedAtPersian: string;
}

export interface UsersApiResponse {
  status: number;
  message: string;
  result: {
    items: User[];
    totalCount: number;
  };
}

export interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  email: string | null;
  address: string | null;
  birthDate: string | null;
  mobile: string;
  social_security_number: string;
}

export interface UserInfoResponse {
  status: number;
  message: string;
  result: UserInfo;
}
