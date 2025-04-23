import React from 'react';
import './GameCard.css';

function GameCard({ game }) {
    const { homeTeam, awayTeam, period, timeRemaining, gameStatus } = game;

    const getStatusDisplay = () => {
        if (gameStatus === 'final') return 'Final';
        if (gameStatus === 'live') {
            if (period <= 4) {
                return `Q${period} - ${timeRemaining}`;
            } else {
                return `OT${period - 4} - ${timeRemaining}`;
            }
        }
        return gameStatus.charAt(0).toUpperCase() + gameStatus.slice(1);
    };

    return (
        <div className="game-card">
            <div className="game-header">
                <span className="game-status">{getStatusDisplay()}</span>
                <span className="game-vs">VS</span>
            </div>

            <div className="teams-container">
                <div className="team away">
                    <div className="team-abbrev">{awayTeam.abbreviation}</div>
                    <div className="team-info">
                        <div className="team-city">{awayTeam.city}</div>
                        <div className="team-name">{awayTeam.name}</div>
                        <div className="team-record">({awayTeam.wins}-{awayTeam.losses})</div>
                    </div>
                    <div className="team-score">{awayTeam.score}</div>
                </div>

                <div className="team home">
                    <div className="team-abbrev">{homeTeam.abbreviation}</div>
                    <div className="team-info">
                        <div className="team-city">{homeTeam.city}</div>
                        <div className="team-name">{homeTeam.name}</div>
                        <div className="team-record">({homeTeam.wins}-{homeTeam.losses})</div>
                    </div>
                    <div className="team-score">{homeTeam.score}</div>
                </div>
            </div>

            {gameStatus === 'live' && (
                <div className="game-stats">
                    <div className="stat-row">
                        <span>FG%</span>
                        <span>{awayTeam.stats.fgPercentage}</span>
                        <span>{homeTeam.stats.fgPercentage}</span>
                    </div>
                    <div className="stat-row">
                        <span>3PT</span>
                        <span>{awayTeam.stats.threePointMade}-{awayTeam.stats.threePointAttempts}</span>
                        <span>{homeTeam.stats.threePointMade}-{homeTeam.stats.threePointAttempts}</span>
                    </div>
                    <div className="stat-row">
                        <span>REB</span>
                        <span>{awayTeam.stats.rebounds}</span>
                        <span>{homeTeam.stats.rebounds}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GameCard;