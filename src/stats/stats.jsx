import React from 'react';
import './stats.css';

export function Stats() {
    const users = JSON.parse(localStorage.getItem("hangleUsers")) || {};
    const currentUser = localStorage.getItem("hangleCurrentUser");
    const gamesPlayed = users[currentUser].stats.gamesPlayed;
    const wins = users[currentUser].stats.wins;
    const losses = users[currentUser].stats.losses;

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
            <p>Win percentage: <span id="winpct">{(wins / gamesPlayed) * 100}%</span></p>
        </div>
    </main>
  );
}