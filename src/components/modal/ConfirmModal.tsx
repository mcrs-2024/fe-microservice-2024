import { Button, Modal } from 'react-bootstrap';

type Props = {
  text: string;
  onClose: any;
  onAccept: any;
  isShow: boolean | false;
};

function ConfirmModal(props: Props) {
  return (
    <Modal show={props.isShow} onHide={props.onClose}>
      <Modal.Header onHide={props.onClose} closeButton>
        <h4 className='modal-title'>Xác nhận hành động</h4>
      </Modal.Header>
      <Modal.Body>
        <span>{props.text}</span>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={props.onClose}>
          Huỷ
        </Button>{' '}
        <Button variant='primary' onClick={props.onAccept}>
          Đồng ý
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
