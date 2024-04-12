const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const Nurse = require("../models/nurse.model");

// Create an Express app
const app = express();
const port = 3002;

app.use(cors());

// Construct a schema using GraphQL schema language
const schema = buildSchema(`
  type Nurse {
    id: ID!
    username: String!

  }

  type Query {
    getNurse(id: ID!): Nurse
  }

  type Mutation {
    registerNurse(username: String!, password: String!): Nurse
    loginNurse(username: String!, password: String!): Nurse
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  getNurse: async ({ id }) => {
    try {
      const nurse = await Nurse.findById(id);
      return nurse;
    } catch (error) {
      throw new Error("Nurse not found");
    }
  },
  registerNurse: async ({ username, password }) => {
    try {
      const existingNurse = await Nurse.findOne({ username });
      if (existingNurse) {
        throw new Error("Username is already taken");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newNurse = new Nurse({
        username,
        password: hashedPassword,
      });
      const savedNurse = await newNurse.save();
      return savedNurse;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  loginNurse: async ({ username, password }) => {
    console.log("Login Nurse from microservice");
    try {
      const nurse = await Nurse.findOne({ username });
      console.log("Nurse found:", nurse);
      if (!nurse) {
        throw new Error("Nurse not found");
      }

      const isPasswordValid = await bcrypt.compare(password, nurse.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign({ nurseId: nurse.id }, "your_secret_key", {
        expiresIn: "1h",
      });
      return nurse;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

// Middleware to parse JSON bodies
app.use(express.json());

// Define GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enable GraphiQL for easy testing
  })
);

// Define route for nurse registration
app.post("/registerNurse", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await root.registerNurse({ username, password });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Define route for nurse login
app.post("/loginNurse", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await root.loginNurse({ username, password });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Connect to MongoDB and start server
mongoose
  .connect("mongodb://localhost:27017/nurse")
  .then(() => {
    app.listen(port, () => {
      console.log(`GraphQL server running at http://localhost:${port}/graphql`);
    });
  })
  .catch((err) => console.error(err));
