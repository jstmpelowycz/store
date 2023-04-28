import React, {ChangeEvent, FC} from "react";
import {Form, FormControl} from "react-bootstrap";

interface Props {
  label: string;
  placeholder: string;
  type: string;
  controlId: string;
  onChange: (value: string) => void;
}

export const InputField: FC<Props> = (props) => {
  const {
    label,
    placeholder,
    type,
    controlId,
    onChange,
  } = props;

  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label className="text-center">
        {label}
      </Form.Label>

      <Form.Control
        type={type}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </Form.Group>
  );
};
