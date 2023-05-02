// @ts-ignore
import React, {FC, FormEvent, memo, useState} from "react";
import {Col, Row, Container, Card, Form, Button} from "react-bootstrap";
// @ts-ignore
import {InputField} from "../InputField/InputField.tsx";
import {Maybe} from "../../typings/typedefs";
// @ts-ignore
import {login} from "../../hooks/login.ts";
// @ts-ignore
import {useAppContext} from "../../context/AppContext.tsx";

interface Props {
  onSwitchAuthView: () => void;
}

export const Login: FC<Props> = ({onSwitchAuthView}) => {
  const [email, setEmail] = useState<Maybe<string>>(null);
  const [password, setPassword] = useState<Maybe<string>>(null);
  const {setCurrentEmployee, setIsManager} = useAppContext();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const {data: employee} = await login({email, password});

    setCurrentEmployee(employee);
    setIsManager(employee.role == "MANAGER");
  };

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <div className="mb-3">
                  <Form onSubmit={handleSubmit}>
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
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100"
                    >
                      Log In
                    </Button>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Don't have an account?{" "}
                      <a
                        href=""
                        className="text-primary fw-bold"
                        onClick={onSwitchAuthView}
                      >
                        Sign Up
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
