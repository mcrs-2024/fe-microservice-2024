import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { TMenu } from 'src/constants/types/admin/menu';
//helpers
import { useRedux } from 'src/hooks';
import { resetButton } from 'src/redux toolkit/buttonsSlice';
import { changeShowTitlePages, redirectPage } from 'src/redux/actions';
import { AuthState } from 'src/redux/reducers';

import { findAllParent, findMenuItem, getChildMenu } from '../helpers/menu';

// constants

interface SubMenus {
  item: TMenu;
  linkClassName?: string;
  subMenuClassNames?: string;
  activeMenuItems?: Array<string>;
  toggleMenu?: (item: any, status: boolean) => void;
  className?: string;
  setSelectedLabels?: (labels: any[]) => void;
}

const MenuItemWithChildren = ({
  item,
  linkClassName,
  subMenuClassNames,
  activeMenuItems,
  toggleMenu,
}: SubMenus) => {
  const [open, setOpen] = useState<boolean>(
    activeMenuItems!.includes(item.menuId),
  );
  useEffect(() => {
    setOpen(activeMenuItems!.includes(item.menuId));
  }, [activeMenuItems, item]);

  const toggleMenuItem = (e: any) => {
    e.preventDefault();
    const status = !open;
    setOpen(status);
    if (toggleMenu) toggleMenu(item, status);
    return false;
  };
  return (
    <li className={classNames('side-nav-item', { 'menuitem-active': open })}>
      <Link
        to='#'
        onClick={toggleMenuItem}
        data-menu-key={item.menuId}
        aria-expanded={open}
        className={classNames('has-arrow', 'side-sub-nav-link', linkClassName, {
          'menuitem-active': activeMenuItems!.includes(item.menuId)
            ? 'active'
            : '',
        })}
      >
        <i className={`${item.icon || ''} show-icon-menu`} />
        <span> {item.label} </span>
        {!open ? (
          <i className={`ri-arrow-drop-down-line`}></i>
        ) : (
          <i className='ri-arrow-drop-up-line'></i>
        )}
      </Link>
      <Collapse in={open}>
        <div>
          <ul className={classNames(subMenuClassNames)}>
            {(item.children || []).map((child, i) => {
              return (
                <React.Fragment key={i}>
                  {child.children ? (
                    <>
                      {/* parent */}
                      <MenuItemWithChildren
                        item={child}
                        linkClassName={
                          activeMenuItems!.includes(child.menuId)
                            ? 'active'
                            : ''
                        }
                        activeMenuItems={activeMenuItems}
                        subMenuClassNames='side-nav-third-level'
                        toggleMenu={toggleMenu}
                      />
                    </>
                  ) : (
                    <>
                      {/* child */}
                      <MenuItem
                        item={child}
                        className={
                          activeMenuItems!.includes(child.menuId)
                            ? 'menuitem-active'
                            : ''
                        }
                        linkClassName={
                          activeMenuItems!.includes(child.menuId)
                            ? 'active'
                            : ''
                        }
                      />
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </Collapse>
    </li>
  );
};

const MenuItem = ({ item, className, linkClassName }: SubMenus) => {
  return (
    <li className={classNames('side-nav-item', className)}>
      <MenuItemLink item={item} className={linkClassName} />
    </li>
  );
};

const MenuItemLink = ({
  item,
  className,
  onClick,
}: SubMenus & { onClick?: () => void }) => {
  return (
    <Link
      to={item.url!}
      target={'_self'}
      className={classNames(
        'side-nav-link-ref',
        'side-sub-nav-link',
        className,
      )}
      data-menu-key={item.menuId}
      onClick={onClick}
    >
      <i className={item.icon || ''} />
      <span> {item.label} </span>
    </Link>
  );
};

/**
 * Renders the application menu
 */
interface AppMenuProps {
  menuItems: TMenu[];
}

const AppMenu = ({ menuItems }: AppMenuProps) => {
  const location = useLocation();
  const { appSelector, dispatch } = useRedux();
  const { menus, currentPagePermissions, currentPage } = appSelector(AuthState);
  const menuRef: any = useRef(null);
  const [activeMenuItems, setActiveMenuItems] = useState<Array<string>>([]);
  /*
   * toggle the menus
   */
  const toggleMenu = (menuItem: TMenu, show: boolean) => {
    if (show)
      setActiveMenuItems([
        menuItem['menuId'],
        ...findAllParent(menuItems, menuItem),
      ]);
  };

  /**
   * activate the menuitems
   */
  const activeMenu = useCallback(() => {
    const div = document.getElementById('side-menu');
    let matchingMenuItem = null;

    if (div) {
      const items: any = div.getElementsByClassName('side-nav-link-ref');
      for (let i = 0; i < items.length; ++i) {
        const trimmedURL = location?.pathname?.replaceAll(
          process.env.PUBLIC_URL,
          '',
        );
        if (
          trimmedURL ===
          items[i]?.pathname?.replaceAll(process.env.PUBLIC_URL, '')
        ) {
          matchingMenuItem = items[i];
          break;
        }
      }

      if (matchingMenuItem) {
        const mid = matchingMenuItem.getAttribute('data-menu-key');
        const activeMt = findMenuItem(menuItems, mid);
        if (activeMt) {
          setActiveMenuItems([
            activeMt['menuId'],
            ...findAllParent(menuItems, activeMt),
          ]);
        }
      }
    }
  }, [location, menuItems]);

  useEffect(() => {
    activeMenu();
  }, [activeMenu]);

  useEffect(() => {
    const pathName = location.pathname;
    const childMenu = getChildMenu(menuItems, pathName);
    if (pathName && pathName !== currentPage) {
      dispatch(resetButton());
      dispatch(redirectPage(pathName));
    }
    if (childMenu) {
      dispatch(changeShowTitlePages(childMenu));
    }
  }, [location.pathname]);
  return (
    <>
      <ul className='side-menu' ref={menuRef} id='side-menu'>
        {(menuItems || []).map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              {item.isTitle ? (
                <li
                  className={classNames('menu-title', {
                    'mt-2': idx !== 0,
                  })}
                >
                  {item.label}
                </li>
              ) : (
                <>
                  {item.children ? (
                    <MenuItemWithChildren
                      item={item}
                      toggleMenu={toggleMenu}
                      subMenuClassNames='nav-second-level'
                      activeMenuItems={activeMenuItems}
                      linkClassName='side-nav-link'
                    />
                  ) : (
                    <MenuItem
                      item={item}
                      linkClassName='side-nav-link'
                      className={
                        activeMenuItems!.includes(item.menuId)
                          ? 'menuitem-active'
                          : ''
                      }
                    />
                  )}
                </>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </>
  );
};

export default AppMenu;
