import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Spinner } from "react-bootstrap";

function Register() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [showLoading, setShowLoading] = useState(false);

  const saveUser = async (e) => {
    setShowLoading(true);
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3004/registerNurse", {
        username: user.username,
        password: user.password,
      });
      setShowLoading(false);

      console.log("Results from Register:", response.data);

      navigate("/login");
    } catch (error) {
      setShowLoading(false);
      console.error(error);
    }
  };

  // handles onChange event
  const onChange = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <div className="home">
        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <Form className="form" onSubmit={saveUser}>
          <h1>Nurse Registration</h1>
          <Form.Group>
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              id="username"
              placeholder="Enter user name"
              value={user.username}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              value={user.password}
              onChange={onChange}
            />
          </Form.Group>

          <br />
          <Button size="sm" variant="success" type="submit">
            Save
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Register;
