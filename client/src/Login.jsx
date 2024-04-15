import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const authenticateUser = async () => {
    try {
      const response = await axios.post("http://localhost:3004/loginNurse", {
        username,
        password,
      });
      const data = response.data;
      if (data) {
        alert("Login successful");
        navigate("/nurse-page");
      }
    } catch (error) {
      alert(`Login failed ${error.message}`);
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
              type="button"
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
