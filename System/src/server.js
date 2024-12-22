const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors()); // Enable CORS for all origins

// Utility function to validate URLs
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

app.get('/snapshot', async (req, res) => {
  const { url } = req.query;

  // Validate the URL
  if (!url || !isValidUrl(url)) {
    return res.status(400).send('Invalid or missing URL parameter');
  }

  try {
    console.log(`Fetching snapshot from URL: ${url}`);

    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const contentType = response.headers['content-type'];

    // Log successful fetch
    console.log(`Snapshot fetched successfully, Content-Type: ${contentType}`);

    // Send the fetched snapshot back to the client
    res.setHeader('Content-Type', contentType);
    res.send(response.data);
  } catch (error) {
    console.error(`Failed to fetch snapshot from ${url}:`, error.message);

    if (error.response) {
      // Handle HTTP errors from the target server
      return res
        .status(error.response.status)
        .send(`Error fetching snapshot: ${error.response.statusText}`);
    }

    res.status(500).send('Error fetching snapshot');
  }
});

app.listen(port, () => {
  console.log(`Snapshot server is running at http://localhost:${port}`);
});
