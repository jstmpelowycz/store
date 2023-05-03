import {FC} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {AnyFunction, AnyObject} from "../../../typings/typedefs";
import './styles.css';

interface Props {
  data: AnyObject | null;
  isOpen: boolean;
  onClose: AnyFunction;
}

export const JsonModal: FC<Props> = (props) => {
  const {onClose, isOpen, data} = props;

  if (!isOpen) {
    return null;
  }

  return (
      <Modal.Dialog className="modal-content">
        <Modal.Header closeButton onClick={onClose}>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{JSON.stringify(data)}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Close
          </Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
  );
};
