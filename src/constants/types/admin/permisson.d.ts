type TPermission = {
  permissionCode: string;
  description: string;
};
type TRolePermissions = {
  roleCode: string;
  permissionCodes: string[];
};
type TPermissionByModule = {
  permissions: string[];
  moduleId: number;
};
export { TPermission, TPermissionByModule, TRolePermissions };
