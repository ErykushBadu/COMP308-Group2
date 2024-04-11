import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const LOGIN_USER = gql`
  mutation loginNurse($username: String!, $password: String!) {
    loginNurse(username: $username, password: $password) {
      id
      username
    }
  }
`;

function Login() {
  let navigate = useNavigate();
  const [Login] = useMutation(LOGIN_USER);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const authenticateUser = async () => {
    try {
      const { data } = await Login({
        variables: { username, password },
      });

      // Process the response
      if (data && data.loginNurse) {
        console.log("Data from login mutation:", data);
        // navigate(data.loginNurse ? "/login" : "/register");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };
  return (
    <Container>
      <Row>
        <Col>
          <h1>Nurse Login</h1>
          <Form className="form">
            <Form.Group size="lg">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                id="username"
                placeholder="Enter user name"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <br />
            <Button
              size="sm"
              variant="success"
              type="Button"
              onClick={authenticateUser}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
