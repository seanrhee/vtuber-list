import React from "react";

function StreamCard({ stream }) {
  return (
    <div className="stream-card">
      <h2>{stream.user_name}</h2>
      <p>{stream.game_name}</p>
      <p>{stream.title}</p>
    </div>
  );
}

export default StreamCard;