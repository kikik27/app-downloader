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
    "current_version": '2.0.1',
    "app_url": "https://a3.files.diawi.com/app-file/mwp6mbwmDpPsPybMqqpC.apk",
    "update": [
      {
        "name": "Fixed Many Bugs"
      }, 
      {
      "name": "Geotaging Image"
      },
      {
      "name": "Feature Ticketing"
      },
      {
      "name": "Feature FAQ"
      },
      {
      "name": "Feaature Lisensi"
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
