```javascript
module.exports = async function (req, res) {
  console.log('API/xai invoked:', {
    method: req.method,
    url: req.url,
    nodeVersion: process.version,
    envKeys: Object.keys(process.env)
  });

  // Handle CORS preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }).send();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    if (!req.body) {
      throw new Error('No request body provided');
    }
    console.log('Request body:', req.body);
    if (!process.env.XAI_API_KEY) {
      throw new Error('XAI_API_KEY is not set');
    }
    const authHeader = `Bearer ${process.env.XAI_API_KEY}`;
    console.log('Authorization header:', authHeader);

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      throw new Error(`xAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).set({ 'Access-Control-Allow-Origin': '*' }).json(data);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).set({ 'Access-Control-Allow-Origin': '*' }).json({ error: 'Internal server error', details: error.message });
  }
};
```
