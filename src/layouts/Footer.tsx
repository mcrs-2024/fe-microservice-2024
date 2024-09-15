import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <React.Fragment>
      <footer className='footer'>
        <div className='container-fluid'>
          <Row>
            <Col md={6}>
              {/* {currentYear} &copy; Minton theme by{' '}
              <Link to='#'>Coderthemes</Link> */}
            </Col>
          </Row>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
