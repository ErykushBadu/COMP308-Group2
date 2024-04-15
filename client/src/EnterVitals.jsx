import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

function EnterVitals() {
    const [patientId, setPatientId] = useState('');
    const [bodyTemperature, setBodyTemperature] = useState('');
    const [heartRate, setHeartRate] = useState('');
    const [bloodPressure, setBloodPressure] = useState('');
    const [respiratoryRate, setRespiratoryRate] = useState('');
    const [recordedAt, setRecordedAt] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3004/addVitalSign', {
                patientId,
                bodyTemperature: parseFloat(bodyTemperature),
                heartRate: parseInt(heartRate),
                bloodPressure,
                respiratoryRate: parseInt(respiratoryRate),
                recordedAt
            });
            console.log('Results from EnterVitals:', response.data);
            setPatientId('');
            setBodyTemperature('');
            setHeartRate('');
            setBloodPressure('');
            setRespiratoryRate('');
            setRecordedAt('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <h2>Enter Vital Signs</h2>
            <Form onSubmit={handleSubmit}>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Patient ID</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Patient ID"
                            value={patientId}
                            onChange={(e) => setPatientId(e.target.value)}
                        />
                    </Col>
                </Form.Group>

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

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Recorded At</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Recorded At"
                            value={recordedAt}
                            onChange={(e) => setRecordedAt(e.target.value)}
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
