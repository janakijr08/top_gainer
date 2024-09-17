import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './StockList.css';

const StockList = () => {
  const [gainers, setGainers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then(response => {
        setGainers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Top Gainers in Share Market</h1>
      <ul>
        {gainers.map(gainer => (
          <li key={gainer.number}>
            <Link to={`/stock/${gainer.number}`}>
              {gainer.name}: {gainer.value}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockList;
