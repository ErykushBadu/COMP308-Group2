const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const VitalSign = require("../models/vitalsigns.model");
const EmergencyAlert = require("../models/emergencyAlert.model");
const cors = require("cors");

const app = express();
const port = 3003;

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors());

const schema = buildSchema(`
  type VitalSign {
    id: ID!
    patientId: ID!
    bodyTemperature: Float
    heartRate: Int
    bloodPressure: String
    respiratoryRate: Int
 
  }

  type EmergencyAlert {
    id: ID!
    patientId: ID!
    message: String!
  }

  type Query {
    vitalSigns(patientId:String!): [VitalSign]
    getVitalSigns: [VitalSign]
    emergencyAlerts(patientId: String!): [EmergencyAlert]
    getEmergencyAlerts: [EmergencyAlert]
  }

  input VitalSignInput {
    patientId: ID!
    bodyTemperature: Float
    heartRate: Int
    bloodPressure: String
    respiratoryRate: Int
  }

  input EmergencyAlertInput {
    patientId: ID!
    message: String!
  }

  type Mutation {
    addVitalSign(input: VitalSignInput!): VitalSign
    updateVitalSign(id: ID!, input: VitalSignInput!): VitalSign
    addEmergencyAlert(input: EmergencyAlertInput!): EmergencyAlert
  }
`);

const root = {
  // vitalSigns: async () => {
  //   return await VitalSign.find();
  // },
  vitalSigns: async ({ patientId }) => {
    return await VitalSign.find({ patientId });
  },
  emergencyAlerts: async ({ patientId }) => {
    return await EmergencyAlert.find({ patientId });
  },
  getVitalSigns: async () => {
    try {
      const vitalSign = await VitalSign.find();
      return vitalSign;
    } catch (error) {
      throw new Error("Vital signs not found");
    }
  },
  getEmergencyAlert: async () => {
    try {
      const emergencyAlert = await EmergencyAlert.find();
      return emergencyAlert;
    } catch (error) {
      throw new Error("Emergency alert not found");
    }
  },
  addEmergencyAlert: async ({ input }) => {
    const newEmergencyAlert = new EmergencyAlert(input);
    await newEmergencyAlert.save();
    return newEmergencyAlert;
  },
  addVitalSign: async ({ input }) => {
    const newVitalSign = new VitalSign(input);
    await newVitalSign.save();
    return newVitalSign;
  },
  updateVitalSign: async ({ id, input }) => {
    return await VitalSign.findByIdAndUpdate(id, input, { new: true });
  },
};

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// Route for adding a vital sign
app.post("/addvitals", async (req, res) => {
  try {
    const newVitalSign = new VitalSign(req.body);
    await newVitalSign.save();
    res.status(201).json(newVitalSign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route for updating a vital sign
app.put("/updatevitals/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedVitalSign = await VitalSign.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedVitalSign) {
      return res.status(404).json({ error: "Vital sign not found" });
    }
    res.json(updatedVitalSign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Define route for getting all vital signs
app.get("/vitalSigns", async (req, res) => {
  try {
    const vitalSigns = await VitalSign.find();
    res.json(vitalSigns);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Routes for managing emergency alerts
app.post("/addemergencyalert", async (req, res) => {
  try {
    const newEmergencyAlert = new EmergencyAlert(req.body);
    await newEmergencyAlert.save();
    res.status(201).json(newEmergencyAlert);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/emergencyalerts/:patientId", async (req, res) => {
  const { patientId } = req.params;
  try {
    const updatedemergencyAlerts = await EmergencyAlert.find({ patientId });
    res.json(updatedemergencyAlerts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Define route for getting all emergency alerts
app.get("/emergencyalerts", async (req, res) => {
  try {
    const emergencyAlerts = await EmergencyAlert.find();
    res.json(emergencyAlerts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

mongoose
  .connect("mongodb://localhost:27017/vital-signs")
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Vital signs microservice running at http://localhost:${port}/graphql`
      );
    });
  })
  .catch((err) => console.error(err));
