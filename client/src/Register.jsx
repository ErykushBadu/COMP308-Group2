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
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">  
        <div className="bg-white p-4 roundedw-25">
          <h1>Nurse Registration</h1>

          <form className="form" onSubmit={saveUser}>

          <div className="mb-3">
            <label htmlFor="username">
                <strong>User Name</strong>
            </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter user name"
                value={user.username}
                onChange={onChange}
              />
          </div>

          <div className="mb-3">
            <label htmlFor="password">
                <strong>Password</strong>
            </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                value={user.password}
                onChange={onChange}
              />
          </div>

            <br></br>
            
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Register
            </button>

          </form>

        </div>
      </div>
    </Container>
  );
}

export default Register;
