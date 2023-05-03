const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const axios = require('axios');

// Load environment variables
dotenv.config();

// Create a new PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize the Express application
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the JSON API!' });
});

app.post('/api/synchronize', async (req, res) => {
  // Replace this URL with the actual URL of your GET route that returns the JSON data
  const jsonUrl = 'http://localhost:3001/streams';

  try {
    // Fetch the JSON data
    const response = await axios.get(jsonUrl);
    console.log('JSON data fetched:', response.data);
    const jsonData = response.data;

    try {
      for (const stream of jsonData) {
        // Generate the synchronization timestamp for each stream
        const syncTimestamp = new Date();
        
        // Add the syncTimestamp to the stream object
        stream.syncTimestamp = syncTimestamp;

        const postResponse = await axios.post('http://localhost:3002/api/streams', stream);
        console.log('Stream data POST response:', postResponse.data);
      }
      res.status(201).json({ message: 'Stream data synchronized successfully' });
    } catch (error) {
      console.error('POST request error:', error);
      res.status(500).json({ message: 'An error occurred while processing stream data' });
    }
  } catch (error) {
    console.error('GET request error:', error);
    res.status(500).json({ message: 'An error occurred while fetching JSON data' });
  }
});



app.post('/api/streams', async (req, res) => {
  const {
    id,
    user_login,
    user_name,
    game_name,
    type,
    title,
    viewer_count,
    started_at,
    language,
    thumbnail_url,
    is_mature,
    syncTimestamp
  } = req.body;

  try {
    // Begin a transaction
    await pool.query('BEGIN');

    // Insert or update the main stream data
    await pool.query(
      `INSERT INTO streams (id, user_login, user_name, game_name, type, title, viewer_count, started_at, language, thumbnail_url, is_mature, last_updated, syncTimestamp)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      ON CONFLICT (id) DO UPDATE SET 
        user_login = EXCLUDED.user_login,
        user_name = EXCLUDED.user_name,
        game_name = EXCLUDED.game_name,
        type = EXCLUDED.type,
        title = EXCLUDED.title,
        viewer_count = EXCLUDED.viewer_count,
        started_at = EXCLUDED.started_at,
        language = EXCLUDED.language,
        thumbnail_url = EXCLUDED.thumbnail_url,
        is_mature = EXCLUDED.is_mature,
        last_updated = EXCLUDED.last_updated,
        syncTimestamp = EXCLUDED syncTimestamp`,
      [
        id,
        user_login,
        user_name,
        game_name,
        type,
        title,
        viewer_count,
        started_at,
        language,
        thumbnail_url,
        is_mature,
        syncTimestamp,
      ]
    );

    // Commit the transaction
    await pool.query('COMMIT');

    // Remove entries that were not updated during this synchronization
    await pool.query('DELETE FROM streams WHERE last_updated < $1', [syncTimestamp]);

    res.status(201).json({ message: 'Stream data synchronized successfully' });
  } catch (error) {
    // Rollback the transaction in case of an error
    await pool.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ message: 'An error occurred while synchronizing stream data' });
  }
});


// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
