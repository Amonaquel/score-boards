import { useState, useEffect } from 'react';
import './App.css';
import GameCard from './components/GameCard';

function App() {
  const [gamesData, setGamesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGamesData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/games');
        if (!response.ok) {
          throw new Error('Failed to fetch games data');
        }
        const data = await response.json();
        setGamesData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGamesData();

    // Set up polling every 3 seconds
    const interval = setInterval(fetchGamesData, 3000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="loading">Loading games data...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app">
      <header className="app-header">
        <h1>NBA Live Scoreboard</h1>
      </header>
      <main className="games-container">
        {gamesData && Object.entries(gamesData).map(([gameId, game]) => (
          <GameCard key={gameId} game={game} />
        ))}
      </main>
    </div>
  );
}

export default App;