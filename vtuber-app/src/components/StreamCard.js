import React from "react";

function StreamCard({ stream }) {
  return (
    <div className="stream-card">
      <div className="thumbnail-name">
        <img src={stream.thumbnail_url.replace('{width}', '256').replace('{height}', '144')} alt={stream.user_name} />
        <h2>{stream.user_name}</h2>
      </div>
      <div className="streamcard-info">
        <p>{stream.game_name}</p>
        <p>{stream.title}</p>
      </div>
    </div>
  );
}

export default StreamCard;