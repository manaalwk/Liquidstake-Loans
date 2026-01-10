import React, { useState } from 'react';

export const ProtocolMath = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="protocol-math">
      <button 
        className="expand-btn"
        onClick={() => setExpanded(!expanded)}
      >
        📐 Loan Breakdown {expanded ? '▼' : '▶'}
      </button>

      {expanded && (
        <div className="breakdown-details">
          <div className="math-row">
            <span>Collateral:</span>
            <span>1000 sCSPR</span>
          </div>
          <div className="math-row">
            <span>Borrowed:</span>
            <span>600 CSPR</span>
          </div>
          <div className="math-row">
            <span>Collateral Ratio:</span>
            <span>166%</span>
          </div>
          <div className="math-row">
            <span>Protocol Fee:</span>
            <span>0.5% (3 CSPR)</span>
          </div>
          <div className="math-row highlight">
            <span>Paid By:</span>
            <span>Staking Rewards</span>
          </div>
        </div>
      )}
    </div>
  );
};
