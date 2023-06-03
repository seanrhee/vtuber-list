import React, { useState, useEffect } from "react";
import axios from "axios";

import StreamCard from './StreamCard'
import StreamCardOverlay from "./StreamCardOverlay";

export default function StreamCardContainer () {
  const [streams, setStreams] = useState([]);
  const [streamSelect, setStreamSelect] = useState(null);

  const handleCardClick = (stream) => {
    setStreamSelect(stream);
  };

  const handleCloseOverlay = () => {
    setStreamSelect(null);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/streams');
      setStreams(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="stream-cards-container">
      <button onClick={fetchData}>Refresh List</button>
      {streams.map(stream => (
        <StreamCard key={stream.id} stream={stream} onClick={handleCardClick} />
      ))}
      {streamSelect && (
        <StreamCardOverlay stream={streamSelect} onClose={handleCloseOverlay} />
      )}
    </div>
  )
}