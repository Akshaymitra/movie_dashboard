import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../App.css';  // Ensure this import

const TopVotedMovies = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Votes',
      data: [],
      borderColor: 'rgba(255,159,64,1)',
      backgroundColor: 'rgba(255,159,64,0.2)',
    }],
  });

  useEffect(() => {
    axios.get('http://localhost:80/api/top-voted-movies/')
      .then(response => {
        const data = response.data;
        const topMovies = data.slice(0, 5);
        const labels = topMovies.map(movie => movie.title);
        const votesData = topMovies.map(movie => movie.votes);

        setChartData({
          labels,
          datasets: [{
            label: 'Votes',
            data: votesData,
            borderColor: 'rgba(255,159,64,1)',
            backgroundColor: 'rgba(255,159,64,0.2)',
          }],
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Top Voted Movies of all time</h2>
      <div className="chart">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default TopVotedMovies;
