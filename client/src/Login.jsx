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

        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">  
            <div className="bg-white p-4 roundedw-25">
              <h1>Nurse Login</h1>

              <form>
                
                <div className="mb-3">
                  <label htmlFor="username">
                        <strong>User Name</strong>
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Enter user name"
                      className="form-control rounded-0"
                      onChange={(e) => setUsername(e.target.value)}
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
                      onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                  <br />
                  <button type="button" className="btn btn-success w-100 rounded-0" onClick={authenticateUser}>
                    Login
                  </button>

                </form>

            </div>
          </div>


        </Col>
      </Row>
    </Container>
  );
}

export default Login;
