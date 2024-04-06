const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Patient = require('../models/patient.model');

// Create an Express app
const app = express();
const port = 3001;

app.use(cors());

// Construct a schema using GraphQL schema language
const schema = buildSchema(`
  type Patient {
    id: ID!
    username: String!
    role: String!
  }

  type Query {
    getPatient(id: ID!): Patient
  }

  type Mutation {
    registerPatient(username: String!, password: String!, role: String!): Patient
    loginPatient(username: String!, password: String!): Patient
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  getPatient: async ({ id }) => {
    try {
      const patient = await Patient.findById(id);
      return patient;
    } catch (error) {
      throw new Error('Patient not found');
    }
  },
  registerPatient: async ({ username, password, role }) => {
    try {
      const existingPatient = await Patient.findOne({ username });
      if (existingPatient) {
        throw new Error('Username is already taken');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newPatient = new Patient({
        username,
        password: hashedPassword,
        role
      });
      const savedPatient = await newPatient.save();
      return savedPatient;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  loginPatient: async ({ username, password }) => {
    try {
      const patient = await Patient.findOne({ username });
      if (!patient) {
        throw new Error('Patient not found');
      }

      const isPasswordValid = await bcrypt.compare(password, patient.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ patientId: patient.id }, 'your_secret_key', {
        expiresIn: '1h'
      });
      return { ...patient.toJSON(), token };
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

// Middleware to parse JSON bodies
app.use(express.json());

// Define GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL for easy testing
}));

// Define route for patient registration
app.post('/registerPatient', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const result = await root.registerPatient({ username, password });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Define route for patient login
app.post('/loginPatient', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await root.loginPatient({ username, password });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Connect to MongoDB and start server
mongoose.connect('mongodb://localhost:27017/patient')
  .then(() => {
    app.listen(port, () => {
      console.log(`GraphQL server running at http://localhost:${port}/graphql`);
    });
  })
  .catch(err => console.error(err));