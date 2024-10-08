import React from 'react';
import { Collapse } from 'react-bootstrap';
import classNames from 'classnames';

interface NavbarProps {
  isMenuOpened?: boolean;
}

const Navbar = ({ isMenuOpened }: NavbarProps) => {
  // change the inputTheme value to light for creative theme
  const inputTheme = 'light';

  return (
    <React.Fragment>
      <div className='topnav'>
        <div className='container-fluid'>
          <nav
            className={classNames(
              'navbar',
              'navbar-expand-lg',
              'topnav-menu',
              'navbar-' + inputTheme,
            )}
          >
            <Collapse in={isMenuOpened} className='navbar-collapse'>
              <div id='topnav-menu-content'>
                {/* <AppMenu menuItems={getHorizontalMenuItems()} /> */}
              </div>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
