import { TMenu } from 'src/constants/types/admin/menu';
import { TPermissionByModule } from 'src/constants/types/admin/permisson';
import { RoutesProps } from 'src/routes';

import { authentication } from './auth';

const findAllParent = (menuItems: TMenu[], menuItem: TMenu): string[] => {
  let parents: string[] = [];
  const parent = findMenuItem(menuItems, menuItem['parentMenuId'] || undefined);

  if (parent) {
    parents.push(parent['menuId']);
    if (parent['parentMenuId'])
      parents = [...parents, ...findAllParent(menuItems, parent)];
  }

  return parents;
};

const findMenuItem = (
  menuItems: TMenu[] | undefined,
  menuItemKey: TMenu['menuId'] | undefined,
): TMenu | null => {
  if (menuItems && menuItemKey) {
    for (let i = 0; i < menuItems.length; i++) {
      if (menuItems[i].menuId === menuItemKey) {
        return menuItems[i];
      }
      const found = findMenuItem(menuItems[i]?.children || [], menuItemKey);
      if (found) return found;
    }
  }
  return null;
};
const getPermissionsByModuleId = (moduleId: number | null): string[] => {
  const permissions = authentication.getPermissions();
  if (!permissions || moduleId === null || isNaN(moduleId)) return [];
  const permission = permissions.find(
    permission => permission.moduleId === moduleId,
  );
  return permission ? permission.permissions : [];
};

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
  let flatRoutes: RoutesProps[] = [];

  routes = routes || [];
  routes.forEach((item: RoutesProps) => {
    flatRoutes.push(item);

    if (typeof item.children !== 'undefined') {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

const getPermissionsOfMenu = (menus: TMenu[], url: string) => {
  // 3 case
  // 1: url is not exist in menus
  // 2: url are child item in menu
  // 3: url are subPage in child item
  // 4: url is null

  // handle case 4
  if (!url) return [];
  const paths = url.split('/').filter(item => item);
  if (paths.length > 0) {
    try {
      // get parent menu by first path
      const menusParentIndex = menus.findIndex(
        menu => menu.url === '/' + paths[0],
      );
      if (menusParentIndex > -1) {
        // handle case 2
        const parentMenu = menus[menusParentIndex];
        if (parentMenu.children && parentMenu.children.length > 0) {
          const childMenu = parentMenu.children.find(item =>
            item?.url ? url.includes(item.url) : false,
          );

          if (childMenu) {
            // return childMenu.permissions?.split(',');
            return getPermissionsByModuleId(childMenu.moduleId);
          } else {
            // handle case 3
            throw new Error('Menu not found');
          }
        }
        // handle case 3
      } else {
        // handle case 1 (/login, /logout, 404, 500, etc)
        throw new Error('Menu not found');
      }
    } catch (error) {
      return null;
    }
  }
};

const getChildMenu = (menus: TMenu[], pathname: string) => {
  try {
    const paths = pathname.split('/').filter(Boolean);
    const menusParentIndex = menus.findIndex(
      menu => menu.url === '/' + paths[0],
    );
    if (menusParentIndex > -1) {
      const parentMenu = menus[menusParentIndex];
      if (parentMenu.children && parentMenu.children.length > 0) {
        const childMenu = parentMenu.children.find(item =>
          item?.url ? pathname.includes(item.url) : false,
        );
        if (childMenu) {
          return childMenu;
        } else {
          throw new Error('Child menu not found');
        }
      }
    } else {
      throw new Error('Parent menu not found');
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export {
  findAllParent,
  findMenuItem,
  flattenRoutes,
  getChildMenu,
  getPermissionsOfMenu,
};
