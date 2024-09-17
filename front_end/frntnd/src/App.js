import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StockList from './components/StockList';
import StockDetails from './components/StockDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StockList />} />
        <Route path="/stock/:number" element={<StockDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
