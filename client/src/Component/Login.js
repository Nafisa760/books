// src/Component/Login.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

const Login = ({ setUserRole }) => {
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post("http://localhost:3001/login", { username, password });

      if (res.data.success) {
        localStorage.setItem("username", username);
        localStorage.setItem("userRole", "student");
        if (setUserRole) setUserRole("student");

        setMessage({ text: "Student login successful!", type: "success" });
        navigate("/dashboard");
      } else {
        setMessage({ text: res.data.message, type: "danger" });
      }
    } catch (err) {
      setMessage({ text: "Server error", type: "danger" });
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const username = e.target.adminUsername.value;
    const password = e.target.adminPassword.value;

    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "admin123";

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem("userRole", "admin");
      if (setUserRole) setUserRole("admin");

      setMessage({ text: "Admin login successful!", type: "success" });
      navigate("/admin");
    } else {
      setMessage({ text: "Error! Admin username or password is incorrect.", type: "danger" });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-start py-5">
      <Row className="w-100 justify-content-center">

        {message.text && (
          <Col md="8" className="mb-3">
            <Alert color={message.type} className="text-center">
              {message.text}
            </Alert>
          </Col>
        )}

        <Col md="8">
          <Row>

            <Col md="6">
              <Card className="shadow-lg p-4 mb-0">
                <CardBody>
                  <h4 className="text-center mb-3">Student Login</h4>
                  <Form onSubmit={handleStudentLogin}>
                    <FormGroup>
                      <Label for="username">Username</Label>
                      <Input type="text" id="username" name="username" required />
                    </FormGroup>

                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input type="password" id="password" name="password" required />
                    </FormGroup>

                    <Button color="primary" className="w-100 mt-3" type="submit">
                      Login
                    </Button>
                  </Form>

                  <div className="text-center mt-3">
                    <span>Don't have an account? </span>
                    <Link to="/register">Register</Link>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col md="6">
              <Card className="shadow-lg p-4 mb-0">
                <CardBody>
                  <h4 className="text-center mb-3">Admin Login</h4>
                  <Form onSubmit={handleAdminLogin}>
                    <FormGroup>
                      <Label for="adminUsername">Username</Label>
                      <Input type="text" id="adminUsername" name="adminUsername" required />
                    </FormGroup>

                    <FormGroup>
                      <Label for="adminPassword">Password</Label>
                      <Input type="password" id="adminPassword" name="adminPassword" required />
                    </FormGroup>

                    <Button color="danger" className="w-100 mt-3" type="submit">
                      Login
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>

          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
