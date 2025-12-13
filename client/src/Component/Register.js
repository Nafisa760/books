// src/Component/Register.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../Validations/UserValidations";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetState } from "../Features/UserSlice";
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, errorMessage, isSuccess } = useSelector(state => state.user);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Registered successfully! You can now login.");
      dispatch(resetState());
      navigate("/login");
    }
  }, [isSuccess, dispatch, navigate]);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="w-100 justify-content-center">
        <Col md="5">
          <Card className="shadow-lg p-3">
            <CardBody>
              <h3 className="text-center mb-4">Create Account</h3>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                  <Label>Full Name</Label>
                  <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => <Input {...field} type="text" />}
                  />
                  {errors.fullName && <small className="text-danger">{errors.fullName.message}</small>}
                </FormGroup>

                <FormGroup>
                  <Label>Username</Label>
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => <Input {...field} type="text" />}
                  />
                  {errors.username && <small className="text-danger">{errors.username.message}</small>}
                </FormGroup>

                <FormGroup>
                  <Label>Password</Label>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => <Input {...field} type="password" />}
                  />
                  {errors.password && <small className="text-danger">{errors.password.message}</small>}
                </FormGroup>

                <FormGroup>
                  <Label>Confirm Password</Label>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => <Input {...field} type="password" />}
                  />
                  {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword.message}</small>}
                </FormGroup>

                {isError && <p className="text-danger">{errorMessage}</p>}

                <Button color="success" className="w-100 mt-3" type="submit" disabled={isLoading}>
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <span>Already have an account? </span>
                <a href="/login">Login</a>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
