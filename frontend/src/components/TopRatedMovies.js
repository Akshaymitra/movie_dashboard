import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../App.css';

const TopRatedMovies = ({ years }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Rating',
      data: [],
      backgroundColor: 'rgba(153,102,255,0.2)',
      borderColor: 'rgba(153,102,255,1)',
      borderWidth: 1,
    }],
  });
  const [year, setYear] = useState(years.length > 0 ? years[0] : '');

  useEffect(() => {
    if (year) {
      axios.get(`http://localhost:80/api/top-rated-movies/?year=${year}`)
        .then(response => {
          const data = response.data;
          const topMovies = data.slice(0, 10);
          const labels = topMovies.map(movie => movie.title);
          const ratingData = topMovies.map(movie => movie.rating);

          setChartData({
            labels,
            datasets: [{
              label: 'Rating',
              data: ratingData,
              backgroundColor: 'rgba(153,102,255,0.2)',
              borderColor: 'rgba(153,102,255,1)',
              borderWidth: 1,
            }],
          });
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [year]);

  return (
    <div>
      <h2>Top Rated Movies</h2>
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

export default TopRatedMovies;
