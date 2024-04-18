import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";

function EnterVitals() {
  const { patientId } = useParams();
  console.log("Patient ID:", patientId);
  const [show, setShow] = useState(false);
  const [vitalSigns, setVitalSigns] = useState([]);
  const [bodyTemperature, setBodyTemperature] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");
  const [recordedAt, setRecordedAt] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchVitalSigns = () => {
    fetch(`http://localhost:3004/vitalSigns/${patientId}`)
      .then((response) => response.json())
      .then((data) => setVitalSigns(data))
      .catch((error) => console.error("Error:", error));
  };
  useEffect(() => {
    fetchVitalSigns();
  }, [patientId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3004/addVitalSign", {
        patientId,
        bodyTemperature: parseFloat(bodyTemperature),
        heartRate: parseInt(heartRate),
        bloodPressure,
        respiratoryRate: parseInt(respiratoryRate),
      });

      // close modal
      handleClose();

      // fetch updated vital signs
      fetchVitalSigns();

      setBodyTemperature("");
      setHeartRate("");
      setBloodPressure("");
      setRespiratoryRate("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="primary" onClick={handleShow}>
          Enter New Vital Signs
        </Button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        className="centered-modal"
      >
        <Modal.Header>
          <Modal.Title>Enter New Vital Signs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Body Temperature
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Body Temp"
                  value={bodyTemperature}
                  onChange={(e) => setBodyTemperature(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Heart Rate
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Heart Rate"
                  value={heartRate}
                  onChange={(e) => setHeartRate(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Blood Pressure
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Blood Pressure"
                  value={bloodPressure}
                  onChange={(e) => setBloodPressure(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Respiratory Rate
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Respiratory Rate"
                  value={respiratoryRate}
                  onChange={(e) => setRespiratoryRate(e.target.value)}
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <table>
        <thead>
          <tr>
            <th>Body Temperature</th>
            <th>Heart Rate</th>
            <th>Blood Pressure</th>
            <th>Respiratory Rate</th>
          </tr>
        </thead>
        <tbody>
          {vitalSigns.map((vitalSign, index) => (
            <tr key={index}>
              <td className="text-center">{vitalSign.bodyTemperature}</td>
              <td className="text-center">{vitalSign.heartRate}</td>
              <td className="text-center">{vitalSign.bloodPressure}</td>
              <td className="text-center">{vitalSign.respiratoryRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EnterVitals;
