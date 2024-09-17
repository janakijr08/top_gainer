import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './StockDetails.css';


const StockDetails = () => {
  const { number } = useParams();
  const [stockData, setStockData] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/stock/${number}`)
      .then(response => {
        setStockData(response.data);
        fetchChartData(response.data.Graph_link); // Fetch chart data from the graph link
      })
      .catch(error => {
        console.error('Error fetching stock data:', error);
      });
  }, [number]);

  const fetchChartData = (graphLink) => {
    axios.get(graphLink)
      .then(response => {
        const data = response.data; // Assuming data structure suitable for chart.js
        const labels = data.map(entry => entry.date);
        const prices = data.map(entry => entry.price);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Stock Price',
              data: prices,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }
          ]
        });
      })
      .catch(error => {
        console.error('Error fetching chart data:', error);
      });
  };

  return (
    <div>
      {stockData ? (
        <div>
          <h2>{stockData.Name}</h2>
          <p>Sector: {stockData.Sector}</p>
          <p>Change: {stockData.NSE_Change} ({stockData.NSE_Change_Percentage}%)</p>

          {chartData && (
            <div>
              <h3>Stock Price Chart</h3>
              <Line data={chartData} />
            </div>
          )}
        </div>
      ) : (
        <p>Loading stock details...</p>
      )}
    </div>
  );
};

export default StockDetails;
