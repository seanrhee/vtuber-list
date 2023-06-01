import React, { useState, useEffect } from "react";
import axios from "axios";

import StreamCard from './StreamCard'

export default function StreamCardContainer () {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/streams');
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
  )
}