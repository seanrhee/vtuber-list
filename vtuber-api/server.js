const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;
const clientId = '00b4uwte2ha412s5u2w58oyb6u4mtr';
const clientSecret = 'k3upvg7yyw0iolq5djcdatq10lz921';
const maxPages = 100;
const pageSize = 100;

app.get('/streams', async (req, res) => {
  try {
    const tokenResponse = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`);
    const accessToken = tokenResponse.data.access_token;

    const headers = {
      'Client-ID': clientId,
      'Authorization': `Bearer ${accessToken}`,
    };

    let streams = [];
    let vtuberList = [];
    let currentPage = 0;
    let cursor = '';

    while (currentPage < maxPages) {
      const response = await axios.get(`https://api.twitch.tv/helix/streams?first=${pageSize}${cursor ? `&after=${cursor}` : ''}`, { headers });

      streams = streams.concat(response.data.data);

      currentPage++;
      cursor = response.data.pagination.cursor;

      if (!cursor) {
        break;
      }
    }

    for (const stream of streams) {
      if (stream.tags === null) {
        continue;
      }
      if (stream.tags.includes('Vtuber')) {
        vtuberList.push(stream)
      }
    }

    res.json(vtuberList);
  } catch (error) {
    console.error('Error fetching streams:', error);
    res.status(500).send('An error occurred while fetching streams.');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});