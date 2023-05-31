import React from "react";

function StreamCard({ stream }) {
  return (
    <div className="stream-card">
      <div className="thumbnail-name">
        <div className="image-container">
          <img src={stream.thumbnail_url.replace('{width}', '304').replace('{height}', '171')} alt={stream.user_name} />
          <p className="viewer-count">🔴 {stream.viewer_count}</p>
        </div>
        <h2>{stream.user_name}</h2>
      </div>
      <div className="streamcard-info">
        <h4 className="stream-title">{stream.title.length > 35 ? `${stream.title.substring(0, 35)}...` : stream.title}</h4>
        <p className="game-name">{stream.game_name}</p>
      </div>
    </div>
  );
}

export default StreamCard;