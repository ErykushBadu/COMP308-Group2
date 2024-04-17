const express = require("express");
const app = express();
const port = 3004;
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
app.use(bodyParser.json());
//
const serviceEndpoints = {
  "Patient Microservice": "http://localhost:3001",
  "Nurse Microservice": "http://localhost:3002",
  "Vital Signs Microservice": "http://localhost:3003",
};

// Route for registering a patient
app.post("/registerPatient", async (req, res) => {
  try {
    const response = await fetch(
      `${serviceEndpoints["Patient Microservice"]}/registerPatient`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for logging in a patient
app.post("/loginPatient", async (req, res) => {
  try {
    const response = await fetch(
      `${serviceEndpoints["Patient Microservice"]}/loginPatient`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for registering a nurse
app.post("/registerNurse", async (req, res) => {
  try {
    const response = await fetch(
      `${serviceEndpoints["Nurse Microservice"]}/registerNurse`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for logging in a nurse
app.post("/loginNurse", async (req, res) => {
  try {
    const response = await fetch(
      `${serviceEndpoints["Nurse Microservice"]}/loginNurse`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for getting list of patients
app.get("/patients", async (req, res) => {
  try {
    const response = await fetch(
      `${serviceEndpoints["Patient Microservice"]}/patients`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for adding vital signs
app.post("/addVitalSign", async (req, res) => {
  try {
    const response = await fetch(
      `${serviceEndpoints["Vital Signs Microservice"]}/addvitals`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for getting vital signs of a patient
app.get("/vitalSigns/:patientId", async (req, res) => {
  const { patientId } = req.params;
  try {
    const response = await fetch(
      `${serviceEndpoints["Vital Signs Microservice"]}/graphql`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query {
              vitalSigns(patientId: "${patientId}") {
                id
                patientId
                bodyTemperature
                heartRate
                bloodPressure
                respiratoryRate
              }
            }
          `,
        }),
      }
    );
    const { data } = await response.json();
    res.json(data.vitalSigns);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for updating vital signs
app.put("/updateVitalSign/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(
      `${serviceEndpoints["Vital Signs Microservice"]}/updatevitals/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the API gateway server
app.listen(port, () => {
  console.log(`API gateway running at http://localhost:${port}`);
});
