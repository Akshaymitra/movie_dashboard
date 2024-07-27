import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../App.css';

const TopGrossMovies = ({ years }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Gross',
      data: [],
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
    }],
  });
  const [year, setYear] = useState(years.length > 0 ? years[0] : '');

  useEffect(() => {
    if (year) {
      axios.get(`http://localhost:80/api/top-gross-movies/?year=${year}`)
        .then(response => {
          const data = response.data;
          const topMovies = data.slice(0, 5);
          const labels = topMovies.map(movie => movie.title);
          const grossData = topMovies.map(movie => movie.gross);

          setChartData({
            labels,
            datasets: [{
              label: 'Gross',
              data: grossData,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
            }],
          });
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [year]);

  return (
    <div>
      <h2>Top Grossing Movies</h2>
      <label htmlFor="year">Select Year: </label>
      <select id="year" value={year} onChange={(e) => setYear(e.target.value)}>
        {years.map(y => <option key={y} value={y}>{y}</option>)}
      </select>
      <div className="chart">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default TopGrossMovies;
