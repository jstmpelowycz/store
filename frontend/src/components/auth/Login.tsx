import {FC, FormEvent, useState} from "react";
import {Col, Row, Container, Card, Form, Button} from "react-bootstrap";
import {InputField} from "../ui/InputField/InputField";
import {useAppContext} from "../../context/AppContext";
import {employeeControllers} from "../../controllers/employee.controllers";

export const Login: FC = () => {
  const {setCurrentEmployee} = useAppContext();

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const employee = await employeeControllers.login({
      email,
      password,
    });

    setCurrentEmployee(employee);
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
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
