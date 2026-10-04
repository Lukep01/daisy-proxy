import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/stubs/handler_api.php', async (req, res) => {
  const query = new URLSearchParams(req.query).toString();
  const targetUrl = `https://daisysms.io/stubs/handler_api.php?${query}`;

  try {
    const upstream = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/plain, application/json, */*',
      },
    });

    const body = await upstream.text();
    res.status(upstream.status).send(body);
  } catch (err) {
    res.status(500).send(`Proxy error: ${err.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Daisy proxy running on port ${PORT}`);
});
