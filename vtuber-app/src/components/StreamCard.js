import React from "react";

function StreamCard({ stream }) {
  return (
    <div className="stream-card">
      <h2>{stream.user_name}</h2>
      <p>{stream.game_name}</p>
      {/* Display other stream details here */}
    </div>
  );
}

export default StreamCard;