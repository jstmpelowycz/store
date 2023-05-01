// @ts-ignore
import React, {FC, FormEvent, memo, useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
// @ts-ignore
import {InputField} from "../InputField/InputField.tsx";

interface Props {
  onSwitchAuthView: () => void;
}

export const Signup: FC<Props> = ({onSwitchAuthView}) => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <div className="mb-3">
                  <Form>
                    <InputField
                      label="Email"
                      type="email"
                      placeholder="example@gmail.com"
                      controlId="formEmail"
                      onChange={setEmail}
                    />
                    <InputField
                      label="Password"
                      type="password"
                      placeholder="Enter password"
                      controlId="formPassword"
                      onChange={setPassword}
                    />
                    <InputField
                      label="Password confirmation"
                      type="password"
                      placeholder="Re-enter password"
                      controlId="confirmationPassword"
                      onChange={setConfirmPassword}
                    />
                    <div className="d-grid">
                      <Button
                        variant="primary"
                        type="submit"
                        className="w-100"
                        onSubmit={handleSubmit}
                      >
                        Sign Up
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Already have an account?
                      <a
                        href=""
                        className="m-lg-2 text-primary fw-bold"
                        onClick={onSwitchAuthView}
                      >
                        Log In
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
