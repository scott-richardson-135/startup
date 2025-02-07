import React from 'react';
import './stats.css';

export function Stats() {
  return (
    <main className='container-fluid bg-white text-center'>
        <h2>Player Statistics</h2>

        <div className="stat">
            <p>Total games played: <span id="total_games">placeholder</span></p>
        </div>

        <div className="stat">
            <p>Games won: <span id="wins" className="text-success">placeholder</span></p>
        </div>

        <div className="stat">
            <p>Games lost: <span id="losses" className="text-danger">placeholder</span></p>
        </div>

        <div className="stat">
            <p>Win percentage: <span id="winpct">placeholder</span></p>
        </div>
    </main>
  );
}