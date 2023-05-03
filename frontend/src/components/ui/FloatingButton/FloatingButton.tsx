import {FC} from 'react';
import {AnyFunction} from "../../../typings/typedefs";
import './styles.css';
import {Button} from "react-bootstrap";

interface Props {
  title: string;
  onClick: AnyFunction;
}

export const FloatingButton: FC<Props> = (props) => {
  const {title, onClick} = props;

  return (
    <Button
      variant="secondary"
      className="floating-button p-4"
      onClick={onClick}
    >
      {title}
    </Button>
  );
};
