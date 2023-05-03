import React from 'react';
import axios from 'axios';

const SynchronizeButton = () => {
  const synchronizeData = async () => {
    try {
      // Replace this URL with the actual URL of your Express app's /api/synchronize route
      const apiUrl = 'http://localhost:3000/api/synchronize';

      // Make a POST request to the /api/synchronize route
      const response = await axios.post(apiUrl);

      // Log the response or update the UI accordingly
      console.log(response.data);
    } catch (error) {
      console.error('An error occurred while synchronizing stream data:', error);
    }
  };

  return (
    <div>
      <button onClick={synchronizeData}>Synchronize Stream Data</button>
    </div>
  );
};

export default SynchronizeButton;
