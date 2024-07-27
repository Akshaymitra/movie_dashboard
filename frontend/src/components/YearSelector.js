import React, { useEffect, useState } from "react";
import axios from "axios";

const YearSelector = ({ selectedYear, onYearChange }) => {
  const [years, setYears] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:80/api/years/")
      .then((response) => {
        setYears(response.data);
      })
      .catch((error) => {
        console.error("Error fetching years:", error);
      });
  }, []);

  return (
    <div className="year-selector">
      <label htmlFor="year">Select Year: </label>
      <select id="year" value={selectedYear} onChange={(e) => onYearChange(e.target.value)}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearSelector;
