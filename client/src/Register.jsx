import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

const REGISTER = gql`
  mutation registerNurse($username: String!, $password: String!) {
    registerNurse(username: $username, password: $password) {
      id
      username
    }
  }
`;

function Register() {
  let navigate = useNavigate();
  const [Register] = useMutation(REGISTER);
  const [user, setUser] = useState({
    id: "",
    username: "",
    password: "",
  });

  const [showLoading, setShowLoading] = useState(false);

  const saveUser = async (e) => {
    setShowLoading(true);
    e.preventDefault();

    try {
      console.log("user...", { ...user });
      const newUser = { ...user };
      const { data } = await Register({
        variables: {
          username: newUser.username,
          password: newUser.password,
        },
      });

      setShowLoading(false);
      console.log("Results from Register:", data);

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
  );
}

export default Register;
