```javascript
const fetch = require('node-fetch');

module.exports = async function (req, res) {
  console.log('API/xai hit:', req.method, req.url);
  console.log('Node version:', process.version);
  console.log('Environment keys:', Object.keys(process.env));

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    console.log('Incoming request body:', req.body);
    console.log('Authorization header:', `Bearer ${process.env.XAI_API_KEY}`);
    if (!process.env.XAI_API_KEY) {
      throw new Error('XAI_API_KEY is not set');
    }

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.XAI_API_KEY}`
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      throw new Error(`xAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};
```
