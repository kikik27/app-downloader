const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Endpoint to download APK
app.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'apks', filename);

  console.log('Downloading APK:', filePath);

  // Check if file exists
  if (fs.existsSync(filePath)) {
    res.download(filePath, (err) => {
      if (err) {
        res.status(500).send('Error downloading file');
      }
    });
  } else {
    res.status(404).send('File not found');
  }
});

app.get('/api/version-info', (req, res) => {
  const responseData = {
    "current_version": '1.11.1',
    "app_url": "https://i.diawi.com/YzoZtx",
    "update": [
      {
        "id": 1,
        "name": "Fixed Many Bugs"
      }, 
      {
      "id": 2,
      "name": "Geotaging Image"
      }
    ]
  };

  console.log(responseData);

  res.json(responseData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
