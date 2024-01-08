

const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
// const fs = require('fs').promises;  // Import the fs module
const path = require("path");
const AWS = require("aws-sdk");
const s3 = new AWS.S3()

const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
const bodyParser = require("body-parser");
// const fs = require("fs/promises");

app.use(bodyParser.json());

app.post("/saveData", async (req, res) => {
  try {
    const data = req.body;

    // Add 5 empty lines
    const emptyLines = "\n\n\n\n\n";

    // Convert key-value pairs to a string with each pair on a new line
    const formattedData = Object.entries(data)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    // Append the formatted data to the existing file along with 5 empty lines

    let file_body = `${emptyLines}${formattedData}`
    
    // await fs.appendFile("data.txt", `${emptyLines}${formattedData}`);
    await s3.putObject({
      Body: JSON.stringify(file_body),
      Bucket: "cyclic-joyous-leotard-slug-eu-west-1",
      Key: "output/my_file.json",
  }).promise()

    res.json({ message: "Data saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error " });
  }
});








// const express = require('express');
// const app = express();
// const AWS = require("aws-sdk");
// const s3 = new AWS.S3();
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());

// // GET endpoint to retrieve file content
// app.get('*', async (req, res) => {
//   let filename = req.path.slice(1);

//   try {
//     let s3File = await s3.getObject({
//       Bucket: process.env.BUCKET,
//       Key: filename,
//     }).promise();

//     res.set('Content-type', s3File.ContentType);
//     res.send(s3File.Body.toString()).end();
//   } catch (error) {
//     if (error.code === 'NoSuchKey') {
//       console.log(`No such key ${filename}`);
//       res.sendStatus(404).end();
//     } else {
//       console.log(error);
//       res.sendStatus(500).end();
//     }
//   }
// });

// // PUT endpoint to update file content
// app.put('*', async (req, res) => {
//   let filename = req.path.slice(1);

//   console.log(typeof req.body);

//   try {
//     await s3.putObject({
//       Body: JSON.stringify(req.body),
//       Bucket: process.env.BUCKET,
//       Key: filename,
//     }).promise();

//     res.set('Content-type', 'text/plain');
//     res.send('ok').end();
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500).end();
//   }
// });

// // DELETE endpoint to delete a file
// app.delete('*', async (req, res) => {
//   let filename = req.path.slice(1);

//   try {
//     await s3.deleteObject({
//       Bucket: process.env.BUCKET,
//       Key: filename,
//     }).promise();

//     res.set('Content-type', 'text/plain');
//     res.send('ok').end();
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500).end();
//   }
// });

// // Catch all handler for other requests
// app.use('*', (req, res) => {
//   res.sendStatus(404).end();
// });

// // Start the server
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`index.js listening at http://localhost:${port}`);
// });
