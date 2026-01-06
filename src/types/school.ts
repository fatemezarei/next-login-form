export interface SchoolInfo {
  id: number;
  name: string;
  description: string;
  code: string;
  adminName: string;
  adminPhoneNumber: string;
  schoolContactNumber: string;
  address: string | null;
  establishedYear: number;
  createdAtPersian: string;
  updatedAtPersian: string;
}

export interface SchoolInfoResponse {
  status: number;
  message: string;
  result: SchoolInfo;
}
