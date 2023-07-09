const express = require('express');
const cors = require("cors");
const sql = require('msnodesqlv8');

const app = express();
app.use(express.json());
app.use(cors());

  // Attempt to establish the connection
const connectionstring = 'server=SALMAN; Database=Salman; Trusted_Connection=Yes; Driver={ODBC Driver 17 for SQL Server}';
sql.open(connectionstring, (err, conn) => {
    if (err) {
        console.log("Failed to connect to the database:", err);
      } 
      else {  console.log("Connection established to SQL Server!"); }
})

// Collect data from http request
app.post("/submit-feedback", (req, res) => {
  const { name, contact, email, feedback } = req.body;

  // Attempt to establish the connection
  sql.open(connectionstring, (err, conn) => {
    if (err) {
      console.log("Failed to connect to the database:", err);
      res.sendStatus(500); // Send an error response
    } else {
      // Execute the query
      const query = `INSERT INTO Feedback VALUES('${name}', ${contact}, '${email}', '${feedback}')`;
      conn.query(query, (err, rows) => {
        if (err) {
          console.log("Error executing query:", err);
          res.sendStatus(500); // Send an error response
        } else {
          console.log("Data inserted successfully!");
          res.sendStatus(200); // Send a success response
        }
          // Close the connection
          conn.close((err) => {
            if (err) {
              console.log("Error closing the connection:", err);
            } else {
              console.log("Connection closed successfully!");
            }
          });
        });
      }
    });
});

// Start the server
app.listen(5000, () => {
  console.log(`Server running at port: 5000`);
});
