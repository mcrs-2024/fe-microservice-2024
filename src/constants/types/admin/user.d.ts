type TUser = {
  addressDistrict: string | null;
  addressProvince: string | null;
  addressStreet: string | null;
  addressWard: string | null;
  address: string | null;
  avatar: string | null;
  dateOfBirth: string | null;
  email: string;
  fullName: string | null;
  id: string;
  phoneNumber: string | null;
  roles: string[];
  userNumber: string | null;
  username: string;
  status: USER_STATUS | null;
  positionId: number | null;
};
export type TUserFields = keyof TUser;

export type UserModalType = 'add' | 'edit' | 'view';

export type TFilterSimpleUsers = {
  fullname: string;
  email: string;
};

export type TFilterUsers = {
  username: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  userNumber: string;
  addressStreet: string;
  addressWard: string;
  addressDistrict: string;
  addressProvince: string;
};
