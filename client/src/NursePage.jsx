import React from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Button from "react-bootstrap/esm/Button";

// query to get patients
const GET_PATIENTS = gql`
  query GetPatients {
    patients {
      id
      username
      password
    }
  }
`;


// React component listing patients
function PatientList() {
  
  /*
  const { loading, error, data, refetch } = useQuery(GET_PATIENTS);

  if (loading) return <Spinner animation="border" />;
  if (error) return <p>Error :</p>;
  */

  /* code to display patients in table (not working)
  <Table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {data.patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.username}</td>
              <td>{patient.password}</td>
            </tr>
          ))}
        </tbody>
      </Table>
  */

  return (
    <div>

      <div className="center"> </div>
      <Link to="/enter-vitals">
        <Button variant="primary">Enter Vital Signs</Button>
      </Link>
    </div>
  );
}

export default PatientList;
