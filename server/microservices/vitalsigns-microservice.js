const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const VitalSign = require("../models/vitalsigns.model");
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

  type Query {
    vitalSigns(patientId:String!): [VitalSign]
  }

  input VitalSignInput {
    patientId: ID!
    bodyTemperature: Float
    heartRate: Int
    bloodPressure: String
    respiratoryRate: Int
  }

  type Mutation {
    addVitalSign(input: VitalSignInput!): VitalSign
    updateVitalSign(id: ID!, input: VitalSignInput!): VitalSign
  }
`);

const root = {
  // vitalSigns: async () => {
  //   return await VitalSign.find();
  // },
  vitalSigns: async ({ patientId }) => {
    return await VitalSign.find({ patientId });
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
