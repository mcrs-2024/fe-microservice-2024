import React, { useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
// constants
import SimpleBar from 'simplebar-react';
import { TMenu } from 'src/constants/types/admin/menu';
import { LayoutState } from 'src/redux/reducers';

import { useRedux } from '../../hooks';
// components
import { UserBox } from '../LeftSidebar';

interface SubMenus {
  item: TMenu;
  linkClassName?: string;
  subMenuClassNames?: string;
  activeMenuItems?: Array<string>;
  toggleMenu?: (item: any, status: boolean) => void;
  className?: string;
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
    <>
      <li className={classNames('nav-item', { 'menuitem-active': open })}>
        <Link
          to='#'
          onClick={toggleMenuItem}
          data-menu-key={item.menuId}
          aria-expanded={open}
          className={classNames('nav-link', linkClassName, {
            'menuitem-active': activeMenuItems!.includes(item.menuId)
              ? 'active'
              : '',
          })}
        >
          <span> {item.label} </span>
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
                          subMenuClassNames='nav-second-level'
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
    </>
  );
};

const MenuItem = ({ item, className, linkClassName }: SubMenus) => {
  return (
    <>
      <li className={classNames('nav-item', className)}>
        <MenuItemLink item={item} className={linkClassName} />
      </li>
    </>
  );
};

const MenuItemLink = ({ item, className }: SubMenus) => {
  return (
    <Link
      to={item.url!}
      target={'_self'}
      className={classNames('nav-link-ref', 'nav-link', className)}
      data-menu-key={item.menuId}
    >
      <span> {item.label} </span>
    </Link>
  );
};

interface MainMenuProps {
  menuItems: TMenu[];
  toggleMenu: (item: TMenu, show: boolean) => void;
  activeMenuItems: string[];
}

const MainMenu = ({
  menuItems,
  toggleMenu,
  activeMenuItems,
}: MainMenuProps) => {
  const { appSelector } = useRedux();

  const { showSidebarUserInfo } = appSelector(LayoutState);

  return (
    <>
      {activeMenuItems && (
        <div className='sidebar-main-menu'>
          <div id='two-col-menu' className='h-100'>
            <SimpleBar style={{ maxHeight: '100%' }} scrollbarMaxSize={320}>
              {showSidebarUserInfo && <UserBox />}

              {(menuItems || []).map((menuItem, key) => {
                const activeParent =
                  activeMenuItems &&
                  activeMenuItems.length &&
                  activeMenuItems[activeMenuItems.length - 1] ===
                    menuItem['menuId'];
                return (
                  <div
                    key={key}
                    className={classNames('twocolumn-menu-item', {
                      'd-block': activeParent,
                    })}
                  >
                    <div className='title-box'>
                      {menuItem.isTitle && (
                        <h5 className='menu-title'>{menuItem.label}</h5>
                      )}
                      <ul className='nav flex-column'>
                        {(menuItem.children || []).map((item, idx) => {
                          return (
                            <React.Fragment key={idx}>
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
                            </React.Fragment>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </SimpleBar>
          </div>
        </div>
      )}
    </>
  );
};

export default MainMenu;
