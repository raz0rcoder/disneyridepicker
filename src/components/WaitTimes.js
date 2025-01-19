import React, { useState, useEffect } from 'react';

const WaitTimes = () => {
  const [waitTimes, setWaitTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWaitTimes = async () => {
      try {
        const response = await fetch('/api/wait-times');
        if (!response.ok) {
          throw new Error('Failed to fetch wait times');
        }
        const data = await response.json();
        setWaitTimes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWaitTimes();
    // Refresh every 5 minutes
    const interval = setInterval(fetchWaitTimes, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading wait times...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Current Wait Times</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {waitTimes.map((ride, index) => (
          <div key={index} style={{ 
            padding: '1rem', 
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}>
            <h3>{ride.name}</h3>
            <p>Wait Time: {ride.waitTime} minutes</p>
            <p>Status: {ride.status}</p>
            <p>Last Updated: {new Date(ride.lastUpdate).toLocaleTimeString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaitTimes;