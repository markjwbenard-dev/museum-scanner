```javascript
  require('dotenv').config();
  const express = require('express');
  const fetch = require('node-fetch');
  const cors = require('cors');
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(cors()); // Allow requests from GitHub Pages
  app.use(express.json());

  app.post('/api/xai', async (req, res) => {
      try {
          const response = await fetch('https://api.x.ai/v1/chat/completions', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(req.body)
          });
          if (!response.ok) {
              throw new Error(`xAI API error: ${response.status} - ${response.statusText}`);
          }
          const data = await response.json();
          res.json(data);
      } catch (err) {
          console.error('Proxy error:', err);
          res.status(500).json({ error: `Grok's having a bad day: ${err.message}` });
      }
  });

  app.listen(port, () => {
      console.log(`Server rocking on port ${port} – ready to channel Grok's wisdom!`);
  });
  ```