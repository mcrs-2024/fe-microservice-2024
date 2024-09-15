export type TMenu = {
  key?: string;
  menuId: string;
  label: string | null;
  isTitle?: boolean;
  icon: string | null;
  url: string | null;
  isBelong: boolean | null;
  parentMenuId: string | null;
  children: TMenu[] | null;
  moduleId: number | null;
};
