const express = require("express");
const path = require("path");

const app = express();
const port = 3000; // You can use any port you prefer

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));

});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
const bodyParser = require('body-parser');
const fs = require('fs/promises');


app.use(bodyParser.json());


app.post('/saveData', async (req, res) => {
  try {
      const data = req.body;
      
      // Add 5 empty lines
      const emptyLines = '\n\n\n\n\n';
      
      // Convert key-value pairs to a string with each pair on a new line
      const formattedData = Object.entries(data)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n');

      // Append the formatted data to the existing file along with 5 empty lines
      await fs.appendFile('data.txt', `${emptyLines}${formattedData}`);

      res.json({ message: 'Data saved successfully!' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});
