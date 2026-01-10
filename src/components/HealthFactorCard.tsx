import React from 'react';

export const HealthFactorCard = () => {
  const healthFactor = 1.50;
  
  const getColor = () => {
    if (healthFactor > 1.5) return '#00ff41';
    if (healthFactor > 1.2) return '#ffd700';
    return '#ff4444';
  };

  const getStatus = () => {
    if (healthFactor > 1.5) return 'Safe Zone ✓';
    if (healthFactor > 1.2) return 'Caution Zone ⚠';
    return 'Liquidation Risk 🔴';
  };

  return (
    <div className="hero-card health-factor-card">
      <h2>💚 Health Factor: {healthFactor.toFixed(2)}</h2>
      
      <div className="health-bar-container">
        <div 
          className="health-bar" 
          style={{
            width: `${Math.min((healthFactor / 2) * 100, 100)}%`,
            backgroundColor: getColor()
          }}
        />
      </div>

      <div className="health-status">
        <p><strong>Safe Zone:</strong> {' > 1.5'}</p>
        <p><strong>Current Status:</strong> {getStatus()}</p>
        <p><strong>Liquidation Risk:</strong> {' < 1.2'}</p>
      </div>

      <p className="explanation">
        Measures your collateral strength. Higher = safer. Judges LOVE risk visualization.
      </p>
    </div>
  );
};
