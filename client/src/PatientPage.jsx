import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function PatientPage() {
  let navigate = useNavigate();
  const [alert, setAlert] = useState({
    username: "",
    message: "",
  });

  const location = useLocation();
  const patient_id = location.state ? location.state.patient_id : null;
  const username = location.state ? location.state.username : null;
  const [showLoading, setShowLoading] = useState(false);

  const sendAlert = async (e) => {
    setShowLoading(true);
    e.preventDefault();
  
    try {
      console.log("Sending alert for patient ID:", patient_id);
      console.log("Message:", alert.message);
  
      const response = await axios.post("http://localhost:3004/addemergencyalert", {
        username: username,
        message: alert.message
      });
  
      setShowLoading(false);
      console.log("Emergency Alert:", response.data);
    } catch (error) {
      setShowLoading(false);
      console.error("Error sending alert:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
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
                name="message"
                id="message"
                value={alert.message}
                onChange={(e) => setAlert({ ...alert, message: e.target.value })}
              ></textarea>
            </div>

            <br></br>

            <button type="submit" className="btn btn-success w-100 rounded-0">
              {" "}
              Send Alert!
            </button>
            <br></br>
            <br></br>
            <Link to={`/enter-vitals/${patient_id}`}>
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

      <div class="container">

        <h1>COVID-19 Symptom Checklist</h1>

        <form>
          <label>
              <input type="checkbox" name="symptom" value="fever"/> Fever
          </label>
          <br></br>
          <label>
              <input type="checkbox" name="symptom" value="cough"/> Cough
          </label>
          <br></br>
          <label>
              <input type="checkbox" name="symptom" value="shortness_of_breath"/> Shortness of breath or difficulty breathing
          </label>
          <br></br>
          <label>
              <input type="checkbox" name="symptom" value="fatigue"/> Fatigue
          </label>
          <br></br>
          <label>
              <input type="checkbox" name="symptom" value="muscle_or_body_aches"/> Muscle or body aches
          </label>
          <br></br>
          <label>
              <input type="checkbox" name="symptom" value="headache"/> Headache
          </label>
          <br></br>
          <label>
              <input type="checkbox" name="symptom" value="new_loss_of_taste_or_smell"/> Loss of taste or smell
          </label>
          <br></br>
          <label>
              <input type="checkbox" name="symptom" value="sore_throat"/> Sore throat
          </label>
          <br></br>
          <label>
              <input type="checkbox" name="symptom" value="congestion_or_runny_nose"/> Congestion or runny nose
          </label>
          <br></br>
          <label>
              <input type="checkbox" name="symptom" value="nausea_or_vomiting"/> Nausea or vomiting
          </label>
        </form>
    
      </div>

    </Container>
  );
}

export default PatientPage;
