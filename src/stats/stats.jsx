import React, { useState, useEffect } from 'react';
import './stats.css';

export function Stats() {
    const [stats, setStats] = useState({gamesPlayed: 0, wins: 0, losses: 0});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const hangleCurrentUser = localStorage.getItem('hangleCurrentUser');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/stats', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch stats');
                }

                const data = await response.json();
                console.log("Fetched stats:", data);
                const userStats = data.find((stat) => stat.email === hangleCurrentUser);
                if (userStats) {
                    setStats(userStats); // Update stats with the data for the current user
                } else {
                    throw new Error('No stats found for the current user');
                }
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <p>Loading statistics...</p>;
    }

    if (error) {
        return <p className="text-danger">Error: {error}</p>;
    }

  return (
    <main className='container-fluid bg-white text-center'>
        <h2>Player Statistics</h2>

        <div className="stat">
            <p>Total games played: <span id="total_games">{stats.gamesPlayed}</span></p>
        </div>

        <div className="stat">
            <p>Games won: <span id="wins" className="text-success">{stats.wins}</span></p>
        </div>

        <div className="stat">
            <p>Games lost: <span id="losses" className="text-danger">{stats.losses}</span></p>
        </div>

        <div className="stat">
            <p>Win percentage: <span id="winpct">{(stats.wins / stats.gamesPlayed) * 100}%</span></p>
        </div>
    </main>
  );
}