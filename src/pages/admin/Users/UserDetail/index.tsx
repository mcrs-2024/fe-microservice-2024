import { Card, Modal, Stack, Table } from 'react-bootstrap';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, theme } from 'antd';
import { TUser } from 'src/constants/types';

type Props = {
  show: boolean;
  onHide: () => void;
  user: TUser | null;
};

const UserDetail = ({ user, show, onHide }: Props) => {
  const { token } = theme.useToken();

  if (!user) return null;
  return (
    <Modal
      show={show}
      onHide={onHide}
      className='modal-full-width'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      size='lg'
      scrollable={true}
    >
      <Card className='text-center'>
        <Card.Body>
          <Stack direction='horizontal'>
            <Avatar
              shape='square'
              size={64}
              src={user.avatar}
              style={{ backgroundColor: token.colorPrimary }}
              icon={<UserOutlined />}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'start',
                marginLeft: '16px',
              }}
            >
              <h4 className='mt-3 mb-0'>{user.fullName}</h4>
              <p className='text-muted'>{user.email}</p>
            </div>
          </Stack>
          <div className='text-start mt-3'>
            <h4 className='font-13 text-uppercase'>About Me :</h4>
            <p className='text-muted font-13 mb-3'>
              Hi I'm Johnathn Deo,has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type.
            </p>

            <Table borderless size='sm' responsive>
              <tbody>
                <tr>
                  <th scope='row'>Full Name :</th>
                  <td className='text-muted'>{user.fullName}</td>
                </tr>
                <tr>
                  <th scope='row'>Mobile :</th>
                  <td className='text-muted'>{user.phoneNumber}</td>
                </tr>
                <tr>
                  <th scope='row'>Email :</th>
                  <td className='text-muted'>{user.email}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Modal>
  );
};

export default UserDetail;
