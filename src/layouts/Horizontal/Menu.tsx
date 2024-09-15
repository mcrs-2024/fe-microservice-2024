import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { TMenu } from 'src/constants/types/admin/menu';

// helpers
import { findAllParent, findMenuItem } from '../../helpers/menu';
// custom hook
import { useViewport } from '../../hooks/';
// constants
// utils
import { splitArray } from '../../utils/';

interface MenuItems {
  item: TMenu;
  tag?: string;
  linkClassName?: string;
  className?: string;
  subMenuClassNames?: string;
  activeMenuItems?: string[];
  toggleMenu?: (item: any, status: boolean) => void;
}

const MenuItemWithChildren = ({
  item,
  tag,
  linkClassName,
  className,
  subMenuClassNames,
  activeMenuItems,
  toggleMenu,
}: MenuItems) => {
  const Tag: any = tag;
  const { width } = useViewport();

  const [open, setOpen] = useState<boolean>(
    activeMenuItems!.includes(item.menuId),
  );

  const showMenu = width <= 768 && open;

  const hasChild =
    item.children &&
    (item.children || []).filter(
      child => child.children?.length && child.children,
    );

  const hasGrandChild =
    !(hasChild!.length > 0 && hasChild) && item.children!.length >= 15;

  const chunks: any[] = hasGrandChild ? splitArray(item.children!, 7) : [];

  useEffect(() => {
    setOpen(activeMenuItems!.includes(item.menuId));
  }, [activeMenuItems, item]);

  /**
   * toggles the menu
   */
  const toggleMenuItem = (e: any) => {
    e.preventDefault();
    const status = !open;
    setOpen(status);
    if (toggleMenu) toggleMenu(item, status);
    return false;
  };

  return (
    <Tag
      className={classNames(
        'dropdown',
        className,
        activeMenuItems!.includes(item.menuId) ? 'active' : '',
      )}
    >
      <Link
        to='/#'
        onClick={toggleMenuItem}
        data-menu-key={item.menuId}
        className={classNames('dropdown-toggle', linkClassName, {
          active: activeMenuItems!.includes(item.menuId),
        })}
        id={item.menuId}
        role='button'
        data-bs-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded={open}
      >
        {item.icon && <i className={classNames(item.icon, 'me-1')} />}
        <span> {item.label} </span>
        <div className='arrow-down'></div>
      </Link>

      {item.children &&
        (hasGrandChild ? (
          <div
            className={classNames(
              subMenuClassNames,
              'mega-dropdown-menu dropdown-mega-menu-xl',
              {
                show: showMenu,
              },
            )}
            aria-labelledby={item.menuId}
          >
            <Row>
              {(chunks || []).map((child, i) => {
                return (
                  <Col key={i} lg={4}>
                    <MegaMenu item={child} activeMenuItems={activeMenuItems!} />
                  </Col>
                );
              })}
            </Row>
          </div>
        ) : (
          <div
            className={classNames(subMenuClassNames, { show: showMenu })}
            aria-labelledby={item.menuId}
          >
            {(item.children || []).map((child, i) => {
              return (
                <React.Fragment key={i}>
                  {child.children ? (
                    <>
                      {/* parent */}
                      <MenuItemWithChildren
                        item={child}
                        tag='div'
                        linkClassName={classNames(
                          'dropdown-item',
                          activeMenuItems!.includes(child.menuId)
                            ? 'active'
                            : '',
                        )}
                        activeMenuItems={activeMenuItems}
                        className=''
                        subMenuClassNames='dropdown-menu'
                        toggleMenu={toggleMenu}
                      />
                    </>
                  ) : (
                    <>
                      {/* child */}
                      <MenuItemLink
                        item={child}
                        className={classNames('dropdown-item', {
                          active: activeMenuItems!.includes(child.menuId),
                        })}
                      />
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        ))}
    </Tag>
  );
};

const MenuItem = ({ item, className, linkClassName }: MenuItems) => {
  return (
    <li className={classNames('nav-item', className)}>
      <MenuItemLink item={item} className={linkClassName} />
    </li>
  );
};

const MenuItemLink = ({ item, className }: MenuItems) => {
  return (
    <Link
      to={item.url!}
      target={'_self'}
      className={classNames(className)}
      data-menu-key={item.menuId}
    >
      {item.icon && <i className={classNames(item.icon, 'me-1')} />}
      <span> {item.label} </span>
    </Link>
  );
};

interface MegaMenuProps {
  item: TMenu[];
  activeMenuItems: string[];
}

const MegaMenu = ({ item, activeMenuItems }: MegaMenuProps) => {
  return (
    <>
      {item.map((child, i) => {
        return (
          <MenuItemLink
            key={i}
            item={child}
            className={classNames('dropdown-item', {
              active: activeMenuItems!.includes(child.menuId),
            })}
          />
        );
      })}
    </>
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
  const menuRef = useRef(null);

  const [topnavMenuItems] = useState<TMenu[]>(menuItems);
  const [activeMenuItems, setActiveMenuItems] = useState<string[]>([]);

  /*
   * toggle the menus
   */
  const toggleMenu = (menuItem: TMenu, show: boolean) => {
    if (show)
      setActiveMenuItems([
        menuItem['menuId'],
        ...findAllParent(topnavMenuItems, menuItem),
      ]);
  };

  /**
   * activate the menuitems
   */
  const activeMenu = useCallback(() => {
    const div = document.getElementById('main-side-menu');
    let matchingMenuItem = null;

    if (div) {
      const items: any = div.getElementsByTagName('a');
      for (let i: number = 0; i < items.length; ++i) {
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
        const activeMt = findMenuItem(topnavMenuItems, mid);
        if (activeMt) {
          setActiveMenuItems([
            activeMt['menuId'],
            ...findAllParent(topnavMenuItems, activeMt),
          ]);
        }
      }
    }
  }, [location.pathname, topnavMenuItems]);

  useEffect(() => {
    if (topnavMenuItems && topnavMenuItems.length > 0) activeMenu();
  }, [activeMenu, topnavMenuItems]);

  return (
    <>
      <ul className='navbar-nav' ref={menuRef} id='main-side-menu'>
        {(topnavMenuItems || []).map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              {item.children ? (
                <MenuItemWithChildren
                  item={item}
                  tag='li'
                  className='nav-item'
                  subMenuClassNames='dropdown-menu'
                  activeMenuItems={activeMenuItems}
                  linkClassName='nav-link'
                  toggleMenu={toggleMenu}
                />
              ) : (
                <MenuItem
                  item={item}
                  linkClassName={classNames('nav-link', 'dropdown-toggle', {
                    active: activeMenuItems.includes(item.menuId),
                  })}
                />
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </>
  );
};

export default AppMenu;
