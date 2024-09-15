// import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// images
import { Card, Col, Row } from 'antd';

import LogoDark from '../../assets/images/logo-dark.png';
import LogoLight from '../../assets/images/logo-light.png';

interface AccountLayoutProps {
  helpText?: string;
  bottomLinks?: any;
  isCombineForm?: boolean;
  children?: any;
}

const AuthLayout = ({
  helpText,
  bottomLinks,
  children,
  isCombineForm,
}: AccountLayoutProps) => {
  return (
    <>
      <Row justify={'center'}>
        <Col md={12} lg={12} xl={isCombineForm ? 12 : 6}>
          <Card style={{ margin: 16 }}>
            <div className='text-center w-75 m-auto'>
              <div className='auth-logo'>
                <Link to='/' className='logo logo-dark text-center'>
                  <span className='logo-lg'>
                    <img src={LogoDark} alt='' height='100' />
                  </span>
                </Link>

                <Link to='/' className='logo logo-light text-center'>
                  <span className='logo-lg'>
                    <img src={LogoLight} alt='' height='22' />
                  </span>
                </Link>
              </div>
              {helpText && <p className='text-muted mb-4 mt-3'>{helpText}</p>}
            </div>
            {children}
          </Card>

          {/* bottom links */}
          {bottomLinks}
        </Col>
      </Row>

      <footer className='footer footer-alt'>
        {/* {new Date().getFullYear()} &copy; Minton theme by{' '}
        <Link to='#' className='text-dark'>
          Coderthemes
        </Link> */}
      </footer>
    </>
  );
};

export default AuthLayout;
