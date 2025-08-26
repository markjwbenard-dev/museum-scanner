```javascript
module.exports = async function (req, res) {
  console.log('API/xai invoked:', {
    method: req.method,
    url: req.url,
    nodeVersion: process.version,
    envKeys: Object.keys(process.env)
  });

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

  res.status(200).set({ 'Access-Control-Allow-Origin': '*' }).json({ message: 'POST request received, API is working' });
};
```
