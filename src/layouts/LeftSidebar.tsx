import { useEffect, useRef, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// helpers
import SimpleBar from 'simplebar-react';
import { LayoutTypes, SideBarTypes } from 'src/constants/common';
import { SESSION_STORAGE } from 'src/constants/common/stogare';
import { useRedux } from 'src/hooks';
import { changeSidebarType } from 'src/redux/actions';
import { LayoutState } from 'src/redux/reducers';

import logoDark from '../assets/images/logo-dark.png';
import logoLight from '../assets/images/logo-light.png';
import logoSm from '../assets/images/logo-sm.png';
import logoSmDark from '../assets/images/logo-sm-dark.png';
// components
// images
import profileImg from '../assets/images/users/avatar-1.jpg';

import AppMenu from './Menu';
/* user box */
export const UserBox = () => {
  // get the profilemenu
  const ProfileMenus = [
    {
      label: 'My Account',
      icon: 'fe-user',
      redirectTo: '#',
    },
    {
      label: 'Settings',
      icon: 'fe-settings',
      redirectTo: '#',
    },
    {
      label: 'Lock Screen',
      icon: 'fe-lock',
      redirectTo: '/auth/lock-screen',
    },
    {
      label: 'Logout',
      icon: 'fe-log-out',
      redirectTo: '/auth/logout',
    },
  ];

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  /*
   * toggle dropdown
   */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className='user-box text-center'>
      <img
        src={profileImg}
        alt=''
        title='Mat Helme'
        className='rounded-circle avatar-md'
      />
      <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
        <Dropdown.Toggle
          id='dropdown-notification'
          as='a'
          onClick={toggleDropdown}
          className='cursor-pointer text-reset h5 mt-2 mb-1 d-block'
        >
          Nik Patel
        </Dropdown.Toggle>
        <Dropdown.Menu className='user-pro-dropdown'>
          <div onClick={toggleDropdown}>
            {(ProfileMenus || []).map((item, index) => {
              return (
                <Link
                  to={item.redirectTo}
                  className='dropdown-item notify-item'
                  key={index + '-profile-menu'}
                >
                  <i className={`${item.icon} me-1`}></i>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </Dropdown.Menu>
      </Dropdown>
      <p className='text-reset'>Admin Head</p>
    </div>
  );
};

/* sidebar content */
const SideBarContent = () => {
  const menuJson = sessionStorage.getItem(SESSION_STORAGE.MENU);
  const menu = menuJson
    ? typeof menuJson == 'object'
      ? menuJson
      : JSON.parse(menuJson)
    : null;

  return (
    <>
      <UserBox />

      <div id='sidebar-menu'>
        <AppMenu menuItems={menu} />
      </div>

      <div className='clearfix' />
    </>
  );
};

interface LeftSidebarProps {
  isCondensed: boolean;
}

const LeftSidebar = ({ isCondensed = false }: LeftSidebarProps) => {
  const { dispatch, appSelector } = useRedux();
  const { layoutTheme, layoutType, leftSideBarType } = appSelector(LayoutState);

  const menuNodeRef: any = useRef(null);

  /**
   * Handle the click anywhere in doc
   */
  const handleOtherClick = (e: any) => {
    if (
      menuNodeRef &&
      menuNodeRef.current &&
      menuNodeRef.current.contains(e.target)
    )
      return;
    // else hide the menubar
    if (document.body) {
      document.body.classList.remove('sidebar-enable');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOtherClick, false);

    return () => {
      document.removeEventListener('mousedown', handleOtherClick, false);
    };
  }, []);

  /**
   * Toggles the left sidebar width
   */
  const toggleLeftSidebarWidth = () => {
    if (leftSideBarType === 'default' || leftSideBarType === 'compact')
      dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED));
    if (leftSideBarType === 'condensed')
      dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT));
  };
  return (
    <div className='left-side-menu' ref={menuNodeRef}>
      {/* logo */}
      <div className='logo-box'>
        <Link to='/' className='logo logo-dark text-center'>
          <span className='logo-sm'>
            <img src={logoSmDark} alt='' height='50' />
          </span>
          <span className='logo-lg'>
            <img src={logoDark} alt='' height='50' />
          </span>
        </Link>

        <Link to='/' className='logo logo-light text-center'>
          <span className='logo-sm'>
            <img src={logoLight} alt='' height='40' />
          </span>
          <span className='logo-lg'>
            <div className='box-logo-his'>
              <img src={logoLight} alt='' height='40' />
              <p>HIS Thống Nhất</p>
            </div>
          </span>
        </Link>
      </div>

      {!isCondensed && (
        <SimpleBar style={{ maxHeight: '100%' }} scrollbarMaxSize={320}>
          <SideBarContent />
        </SimpleBar>
      )}
      {isCondensed && <SideBarContent />}

      <div
        className={`bottom-left ${leftSideBarType === 'default' ? 'desktop-icon' : 'mobile-icon'}`}
        onClick={toggleLeftSidebarWidth}
      >
        <i className='fe-chevron-right'></i>
      </div>
    </div>
  );
};

// LeftSidebar.defaultProps = {
//   isCondensed: false,
// };

export default LeftSidebar;
