import { Dropdown } from 'react-bootstrap';

// images
import Avatar2 from '../../assets/images/users/avatar-2.jpg';
import Avatar5 from '../../assets/images/users/avatar-5.jpg';

const TopbarSearch = () => {
  return (
    <>
      <form className='app-search'>
        <Dropdown className='app-search-box'>
          <Dropdown.Toggle as='div' className='input-group'>
            <input
              type='search'
              className='form-control'
              placeholder='Search...'
              id='top-search'
            />
            <button className='btn' type='submit'>
              <i className='fe-search' />
            </button>
          </Dropdown.Toggle>

          <Dropdown.Menu className='dropdown-lg' id='search-dropdown'>
            <Dropdown.Header className='noti-title'>
              <h5 className='text-overflow mb-2'>
                Found <span className='text-danger'>09</span> results
              </h5>
            </Dropdown.Header>
            <Dropdown.Item className='notify-item'>
              <i className='fe-home me-1'></i>
              <span>Analytics Report</span>
            </Dropdown.Item>
            <Dropdown.Item className='notify-item'>
              <i className='fe-aperture me-1'></i>
              <span>How can I help you?</span>
            </Dropdown.Item>
            <Dropdown.Item className='notify-item'>
              <i className='fe-settings me-1'></i>
              <span>User profile settings</span>
            </Dropdown.Item>
            <Dropdown.Header className='noti-title'>
              <h6 className='text-overflow mb-2 text-uppercase'>Users</h6>
            </Dropdown.Header>
            <div className='notification-list'>
              <Dropdown.Item className='notify-item'>
                <div className='d-flex'>
                  <img
                    className='d-flex me-2 rounded-circle'
                    src={Avatar2}
                    alt='Generic placeholder'
                    height={32}
                  />
                  <div>
                    <h5 className='m-0 font-14'>Erwin E. Brown</h5>
                    <span className='font-12 mb-0'>UI Designer</span>
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item className='notify-item'>
                <div className='d-flex'>
                  <img
                    className='d-flex me-2 rounded-circle'
                    src={Avatar5}
                    alt='Generic placeholder'
                    height={32}
                  />
                  <div>
                    <h5 className='m-0 font-14'>Jacob Deo</h5>
                    <span className='font-12 mb-0'>Developer</span>
                  </div>
                </div>
              </Dropdown.Item>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </form>
    </>
  );
};

export default TopbarSearch;
