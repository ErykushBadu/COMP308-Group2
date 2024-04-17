import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

import Login from "./Login.jsx";
import Register from "./Register.jsx";
import EnterVitals from "./EnterVitals.jsx";
import NursePage from "./NursePage.jsx";
import PatientPage from "./PatientPage.jsx";

function App() {
  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="register">Nurse/Patient Application</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
              <Nav.Link as={Link} to="/enter-vitals">
                Enter Vitals
              </Nav.Link>
              <Nav.Link as={Link} to="/nurse-page">
                Nurse Page
              </Nav.Link>
              <Nav.Link as={Link} to="/patient-page">
                Patient Page
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Routes>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="nurse-page" element={<NursePage />} />
          <Route path="patient-page" element={<PatientPage />} />
          <Route path="enter-vitals/:patientId" element={<EnterVitals />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
