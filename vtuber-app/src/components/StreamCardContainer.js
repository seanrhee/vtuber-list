import React, { useState, useEffect } from "react";
import axios from "axios";

import StreamCard from './StreamCard'
import StreamCardOverlay from "./StreamCardOverlay";

export default function StreamCardContainer () {
  const [streams, setStreams] = useState([]);
  const [streamSelect, setStreamSelect] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleCardClick = (stream) => {
    setStreamSelect(stream);
  };

  const handleCloseOverlay = () => {
    setStreamSelect(null);
  };

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get('http://localhost:3001/streams');
      setStreams(response.data);
    } catch (error) {
      console.error(error);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="stream-cards-container">
      <button className="refresh" onClick={fetchData}><i class={`fa-solid fa-arrows-rotate ${refreshing ? 'fa-spin' : ''} refresh-button`}></i></button>
      {streams.map(stream => (
        <StreamCard key={stream.id} stream={stream} onClick={handleCardClick} />
      ))}
      {streamSelect && (
        <StreamCardOverlay stream={streamSelect} onClose={handleCloseOverlay} />
      )}
    </div>
  )
}