import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StreamCard from './components/StreamCard';  // Make sure to import StreamCard

function App() {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/streams');
        setStreams(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="stream-cards-container">
      {streams.map(stream => (
        <StreamCard key={stream.id} stream={stream} />
      ))}
    </div>
  );
}

export default App;