import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Button from "react-bootstrap/esm/Button";

const getPatients = async () => {
  const response = await fetch("http://localhost:3004/patients");
  const data = await response.json();
  return data;
};

// React component listing patients
function PatientList() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      setIsLoading(true);
      const data = await getPatients();
      setPatients(data);
      setIsLoading(false);
    };
    fetchPatients();
  }, []);

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  return (
    <div>
      <div className="center"> </div>
      <h2>List of Patients</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td>{patient.username}</td>
              <td>{patient.firstname}</td>
              <td>{patient.lastname}</td>
              <td>
                <Link to={`/enter-vitals/${patient._id}`}>
                  <Button variant="primary">Vital Signs</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PatientList;
