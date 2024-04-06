import React from 'react';
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap'; // Import react-bootstrap components


// mutation to add a new student
const ENTER_VITALS = gql`
    mutation EnterVitals(
            $patientId: ID!, $bodyTemperature: Float, $heartRate: Int, $bloodPressure: String, $respiratoryRate: Int, $recordedAt: String) {
            AddVitalSigns (
                patientId: $patientId, bodyTemperature: $bodyTemperature, heartRate: $heartRate, 
                bloodPressure: $bloodPressure, respiratoryRate: $respiratoryRate, recordedAt: $recordedAt) {
                    id
                    patientId
                    bodyTemperature
                    heartRate
                    bloodPressure
                    respiratoryRate
                    recordedAt
                }
        }`;

function EnterVitals() {
    let navigate = useNavigate();
    const [EnterVitals] = useMutation(ENTER_VITALS);
    const [patientId, setPatientId] = React.useState('');
    const [bodyTemperature, setBodyTemperature] = React.useState('');
    const [heartRate, setHeartRate] = React.useState('');
    const [bloodPressure, setBloodPressure] = React.useState('');
    const [respiratoryRate, setRespiratoryRate] = React.useState('');
    const [recordedAt, setRecordedAt] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        EnterVitals({ variables: { patientId, bodyTemperature, heartRate, bloodPressure, respiratoryRate, recordedAt } });
        setPatientId('');
        setBodyTemperature('');
        setHeartRate('');
        setBloodPressure('');
        setRespiratoryRate('');
        setRecordedAt('');
        navigate("/nurse-page");
    }

    return (
        <Container>
            <h2>Enter Vital Signs</h2>
            <Form onSubmit={handleSubmit}>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Body Temperature</Form.Label>
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
                    <Form.Label column sm={2}>Heart Rate</Form.Label>
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
                    <Form.Label column sm={2}>Blood Pressure</Form.Label>
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
                    <Form.Label column sm={2}>Respiratory Rate</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Respiratory Rate"
                            value={respiratoryRate}
                            onChange={(e) => setRespiratoryRate(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Enter Vitals
                </Button>
            </Form>
        </Container>
    )

}

export default EnterVitals;