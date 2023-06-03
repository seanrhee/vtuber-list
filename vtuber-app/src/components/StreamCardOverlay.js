import React from "react";

function StreamCardOverlay ({stream, onClose}) {
  return (
    <div className="overlay-container">
      <div className="overlay-content">
      <button onClick={onClose}>Close</button>
        <h2>{stream.user_name}</h2>
        <p className="stream-title">{stream.title}</p>
        <img src={stream.thumbnail_url.replace('{width}', '304').replace('{height}', '171')} alt={stream.user_name} />
        <p>Viewers: {stream.viewer_count}</p>
        <p>Game: {stream.game_name}</p>
      </div>
    </div>
  )
}

export default StreamCardOverlay;