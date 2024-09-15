type TRole = {
  id: string;
  roleName: string;
  roleCode: string;
  description: string | null;
  status: boolean;
};

type TFilterRoles = Omit<TRole, 'id'>;
type TRoleCreatePayload = Omit<TRole, 'id'>;
type TRoleField = keyof TRole;

export { TFilterRoles, TRole, TRoleCreatePayload, TRoleField };
