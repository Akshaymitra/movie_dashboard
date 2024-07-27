import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopGrossMovies from './components/TopGrossMovies';
import TopRatedMovies from './components/TopRatedMovies';
import TopVotedMovies from './components/TopVotedMovies';
import './App.css';

function App() {
  const [years, setYears] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:80/api/available-years/')
      .then(response => {
        setYears(response.data);
      })
      .catch(error => console.error('Error fetching years:', error));
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <h1>Movie Statistics Dashboard</h1>
        <div className="dark-mode-toggle-container">
          <label className="switch">
            <input 
              type="checkbox" 
              id="darkModeToggle" 
              checked={darkMode} 
              onChange={toggleDarkMode} 
            />
            <span className="slider round"></span>
          </label>
        </div>
      </header>
      <main className="main-content">
        <div className="chart-container">
          <TopGrossMovies years={years} />
        </div>
        <div className="chart-container">
          <TopRatedMovies years={years} />
        </div>
        <div className="chart-container full-width">
          <TopVotedMovies />
        </div>
      </main>
      <footer className="footer">
      <p>&copy; Made with love by Akshay <span className="heart-symbol">&#9829;</span></p>
      </footer>
    </div>
  );
}

export default App;
