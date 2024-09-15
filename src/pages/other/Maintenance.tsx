import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// dummy data
import maintenanceGif from '../../assets/images/animat-diamond-color.gif';

interface MaintenanceQueryTypes {
  icon: string;
  title: string;
  desc: string;
}
const maintenanceQuery: MaintenanceQueryTypes[] = [
  {
    icon: 'fe-target',
    title: 'Why is the site down?',
    desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.',
  },
  {
    icon: 'fe-clock',
    title: 'What is the downtime?',
    desc: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical but the majority.',
  },
  {
    icon: 'fe-help-circle',
    title: 'Do you need support?',
    desc: "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embar.. no-reply@domain.com",
  },
];
// images

const Maintenance = () => {
  return (
    <>
      <div className='mt-5 mb-5'>
        <Container>
          <Row className='justify-content-center'>
            <div className='col-10'>
              <div className='text-center'>
                <img src={maintenanceGif} alt='' height='160' />
                <h3 className='mt-1'>
                  We are currently performing maintenance
                </h3>
                <p className='text-muted'>
                  We're making the system more awesome. We'll be back shortly.
                </p>

                <Row className='mt-5'>
                  {(maintenanceQuery || []).map((item, index) => {
                    return (
                      <Col key={index} md={4}>
                        <div className='text-center mt-3 px-1'>
                          <div className='avatar-md rounded-circle bg-soft-primary mx-auto'>
                            <i
                              className={classNames(
                                item.icon,
                                'font-22',
                                'avatar-title',
                                ' text-primary',
                              )}
                            ></i>
                          </div>
                          <h5 className='font-16 mt-3'>{item.title}</h5>
                          <p className='text-muted'>{item.desc}</p>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </div>
          </Row>
        </Container>
      </div>

      <footer className='footer footer-alt'>
        {/* {new Date().getFullYear()} &copy; Minton theme by{' '}
        <Link to='#'>Coderthemes</Link> */}
      </footer>
    </>
  );
};

export default Maintenance;
