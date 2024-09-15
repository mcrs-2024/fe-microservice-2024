export type TUserRole = {
  roleId: string | null;
  rolesCode: string | null;
  rolesName: string | null;
  rolesType: string | null;
  description: string | null;
  status: string | null;
  dateCreated: Date | null;
  createdBy: string | null;
  dateModify: Date | null;
  modifyBy: string | null;
};

export type TUserRoleFields = keyof TUserRole;
