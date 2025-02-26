import React from 'react';
import './stats.css';

export function Stats() {
    const stats = JSON.parse(localStorage.getItem("hangleStats")) || { wins: 0, losses: 0, gamesPlayed: 0 };
    const gamesPlayed = stats.gamesPlayed;
    const wins = stats.wins;
    const losses = stats.losses;

  return (
    <main className='container-fluid bg-white text-center'>
        <h2>Player Statistics</h2>

        <div className="stat">
            <p>Total games played: <span id="total_games">{gamesPlayed}</span></p>
        </div>

        <div className="stat">
            <p>Games won: <span id="wins" className="text-success">{wins}</span></p>
        </div>

        <div className="stat">
            <p>Games lost: <span id="losses" className="text-danger">{losses}</span></p>
        </div>

        <div className="stat">
            <p>Win percentage: <span id="winpct">%{(wins / gamesPlayed) * 100}</span></p>
        </div>
    </main>
  );
}