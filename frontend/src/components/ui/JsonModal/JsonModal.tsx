import {FC} from 'react';
import {Button} from 'react-bootstrap';
import {AnyFunction, AnyObject} from "../../../typings/typedefs";
import './styles.css';
import ReactJson from "react-json-view";

interface Props {
  data: AnyObject;
  isOpen: boolean;
  onClose: AnyFunction;
}

export const JsonModal: FC<Props> = (props) => {
  const {onClose, isOpen, data} = props;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="wrapper">
      <div className="modal-content">
        <div className="overflow-scroll mb-md-5">
          <ReactJson src={data!}/>
        </div>
        <Button onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};
