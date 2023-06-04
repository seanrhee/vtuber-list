import React, { useRef, useEffect } from "react";

function StreamCardOverlay ({stream, onClose}) {
  const cardRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose])



  return (
    <div className="overlay-container">
      <div className="overlay-content" ref={cardRef}>
        <div className="overlay-thumbnail-cta">
          <div className="image-container" onClick={() => window.open(`https://www.twitch.tv/${stream.user_login}`, '_blank')}>
            <img className="overlay-thumbnail" src={stream.thumbnail_url.replace('{width}', '304').replace('{height}', '171')} alt={stream.user_name} />
            <p className="viewer-count">🔴 {stream.viewer_count}</p>
          </div>
          <p className="overlay-cta">Click on the thumbnail to check out the stream!</p>
        </div>
        <div className="overlay-info">
          <h2>{stream.user_name}</h2>
          <p className="overlay-stream-title">{stream.title}</p>
          <p className="game-name">{stream.game_name}</p>
        </div>
      </div>
    </div>
  )
}

export default StreamCardOverlay;