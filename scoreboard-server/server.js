
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


const games = {
  game1: {
    homeTeam: {
      city: "Los Angeles",
      name: "Lakers",
      abbreviation: "LAL",
      wins: 51,
      losses: 31,
      score: 52,
      stats: {
        fgPercentage: "36.2%",
        threePointMade: 4,
        threePointAttempts: 28,
        rebounds: 35
      }
    },
    awayTeam: {
      city: "Boston",
      name: "Celtics",
      abbreviation: "BOS",
      wins: 56,
      losses: 26,
      score: 69,
      stats: {
        fgPercentage: "44.8%",
        threePointMade: 14,
        threePointAttempts: 34,
        rebounds: 32
      }
    },
    period: 3,
    timeRemaining: "6:42",
    gameStatus: "live"
  },
  game2: {
    homeTeam: {
      city: "Golden State",
      name: "Warriors",
      abbreviation: "GSW",
      wins: 48,
      losses: 34,
      score: 45,
      stats: {
        fgPercentage: "42.1%",
        threePointMade: 8,
        threePointAttempts: 25,
        rebounds: 28
      }
    },
    awayTeam: {
      city: "Miami",
      name: "Heat",
      abbreviation: "MIA",
      wins: 53,
      losses: 29,
      score: 42,
      stats: {
        fgPercentage: "39.8%",
        threePointMade: 6,
        threePointAttempts: 22,
        rebounds: 31
      }
    },
    period: 2,
    timeRemaining: "8:15",
    gameStatus: "live"
  },
  game3: {
    homeTeam: {
      city: "Denver",
      name: "Nuggets",
      abbreviation: "DEN",
      wins: 54,
      losses: 28,
      score: 38,
      stats: {
        fgPercentage: "45.2%",
        threePointMade: 5,
        threePointAttempts: 18,
        rebounds: 27
      }
    },
    awayTeam: {
      city: "Phoenix",
      name: "Suns",
      abbreviation: "PHX",
      wins: 52,
      losses: 30,
      score: 40,
      stats: {
        fgPercentage: "43.7%",
        threePointMade: 7,
        threePointAttempts: 20,
        rebounds: 29
      }
    },
    period: 2,
    timeRemaining: "5:30",
    gameStatus: "live"
  }
};


function simulateGameProgress(game) {
  if (game.gameStatus !== 'live') return;
 
  const scoringTeam = Math.random() > 0.5 ? 'homeTeam' : 'awayTeam';
  const pointsScored = Math.floor(Math.random() * 4);
  
  if (pointsScored > 0) {
    game[scoringTeam].score += pointsScored;
   
    if (pointsScored === 3) {
      game[scoringTeam].stats.threePointMade += 1;
      game[scoringTeam].stats.threePointAttempts += 1;
    } else if (pointsScored === 2 || pointsScored === 1) {
     
      const newPercentage = Math.min(Math.max(
        parseFloat(game[scoringTeam].stats.fgPercentage) + (Math.random() * 0.5 - 0.25),
        35.0), 65.0).toFixed(1);
      game[scoringTeam].stats.fgPercentage = newPercentage + "%";
    }
  } else {
    
    if (Math.random() > 0.7) {
      game[scoringTeam].stats.threePointAttempts += 1;
    }
  }
  

  const reboundTeam = Math.random() > 0.5 ? 'homeTeam' : 'awayTeam';
  if (Math.random() > 0.7) {
    game[reboundTeam].stats.rebounds += 1;
  }
  

  const currentMinutes = parseInt(game.timeRemaining.split(':')[0]);
  const currentSeconds = parseInt(game.timeRemaining.split(':')[1]);
  let newSeconds = currentSeconds - Math.floor(Math.random() * 24);
  let newMinutes = currentMinutes;
  
  if (newSeconds < 0) {
    newMinutes -= 1;
    newSeconds += 60;
  }
  
  if (newMinutes < 0) {
    
    game.period += 1;
    if (game.period > 4) {
     
      if (game.homeTeam.score === game.awayTeam.score) {
      
        game.timeRemaining = "5:00";
      } else {
        game.gameStatus = "final";
        game.timeRemaining = "0:00";
      }
    } else {
      
      game.timeRemaining = "12:00";
    }
  } else {
    game.timeRemaining = `${newMinutes}:${newSeconds.toString().padStart(2, '0')}`;
  }
}


setInterval(() => {
  Object.values(games).forEach(game => {
    simulateGameProgress(game);
  });
}, 3000);


app.get('/api/games', (req, res) => {
  res.json(games);
});


app.get('/api/game/:id', (req, res) => {
  const gameId = req.params.id;
  if (games[gameId]) {
    res.json(games[gameId]);
  } else {
    res.status(404).json({ error: "Game not found" });
  }
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "ok" });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});