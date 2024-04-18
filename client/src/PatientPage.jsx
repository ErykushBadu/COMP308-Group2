import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

/*
To Do:
- Need to be able to send emergency alerts (currently returns a 404 error)
- Need to be able to fetch the patient ID from the URL or some other way so that the patient can enter their own vital signs
- Create a Covid-19 checklist for the patient to fill out
*/

function PatientPage() {
    let navigate = useNavigate();
    const [alert, setAlert] = useState("");

    const [showLoading, setShowLoading] = useState(false);

    const sendAlert = async (e) => {
        setShowLoading(true);
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3004/addemergencyalert", alert);
            setShowLoading(false);
            console.log("Emergency Alert:", response.data);
        } catch (error) {
            setShowLoading(false);
            console.error(error);
        }

    };

    return (
        <Container>
            <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">  
                <div className="bg-white p-4 roundedw-25">

                <br></br>
                <br></br>

                <h1>Emergency Alert</h1>
                <form className="form" id="alertform" onSubmit={sendAlert}>

                    <div className="mb-3">
                        <label htmlFor="alertbox"></label>
                            <textarea 
                            className="form-control"
                                type="textarea"
                                rows="10"
                                cols="50"
                                value={alert}
                                onChange={(e) => setAlert(e.target.value)}
                            ></textarea>
                    </div>

                    <br></br>
                    
                    <button type="submit" className="btn btn-success w-100 rounded-0"> Send Alert!</button>
                    <br></br>
                    <br></br>
                    <Link to={`/enter-vitals/${patient._id}`}>
                        <Button variant="primary">Vital Signs</Button>
                    </Link>
                    <br></br>
                    <br></br>
                    <Link to="/fitness-games">
                        <Button variant="primary">Fitness Games</Button>
                    </Link>

                </form>
                
                </div>
            </div>
        </Container>
    )
}

export default PatientPage;