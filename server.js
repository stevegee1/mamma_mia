const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Dynamic runtime configuration endpoint for Cloudflare R2 public base URL
app.get('/config.js', (req, res) => {
  res.type('application/javascript');
  const r2PublicUrl = (process.env.R2_PUBLIC_URL || 'https://pub-efd8f9001bec49a8b48d693b9f8d59a7.r2.dev').replace(/\/+$/, '');
  res.send(`window.ENV = ${JSON.stringify({ R2_PUBLIC_URL: r2PublicUrl })};`);
});

// Serve static files from root directory
app.use(express.static(__dirname));

// Direct routing fallback for clean HTML access
app.get('*', (req, res) => {
  if (req.accepts('html')) {
    const requestedPath = path.join(__dirname, req.path);
    // If exact file exists (e.g. catalog.html), express.static handles it.
    // Otherwise fallback to index.html
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    res.status(404).send('Not Found');
  }
});

app.listen(PORT, () => {
  console.log(`Portfolio server running on port ${PORT}`);
});
