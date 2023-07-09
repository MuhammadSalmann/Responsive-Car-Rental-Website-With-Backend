const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

// Set up the MongoDB connection
mongoose.connect("mongodb://0.0.0.0:27017/Salman", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to MongoDB successful");
  })
  .catch((error) => {
    console.log("Connection to MongoDB failed", error);
  });

// Create a schema for the data
const dataSchema = new mongoose.Schema({
  Car_Name: String,
  Client_Name: String,
  Address: String,
  Pick_Up_Date: Date,
  Return_Date: Date,
});

// Create a model based on the schema
const Data = mongoose.model("Data", dataSchema);

// Define a route to handle the data submission
app.post("/submit", (req, res) => {
  const { Car_Name, Client_Name, Address, Pick_Up_Date, Return_Date } = req.body;

  // Create a new document using the Data model
  const newData = new Data({
    Car_Name,
    Client_Name,
    Address,
    Pick_Up_Date,
    Return_Date,
  });

  // Save the document to the database
  newData.save()
    .then(() => {
      console.log("Data saved successfully");
      res.status(200).json({ message: "Data saved successfully" });
    })
    .catch((error) => {
      console.log("Error saving data", error);
      res.status(500).json({ error: "Error saving data" });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});