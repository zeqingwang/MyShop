import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';

function App() {
  const [sortBy, setSortBy] = useState('Recommend');
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    country: [],
    packingUnit: []
  });

  const clearAllFilters = () => {
    setFilters({
      category: [],
      brand: [],
      country: [],
      packingUnit: []
    });
  };

  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <Sidebar 
          sortBy={sortBy}
          setSortBy={setSortBy}
          filters={filters}
          setFilters={setFilters}
          clearAllFilters={clearAllFilters}
        />
        <ProductGrid />
      </div>
    </div>
  );
}

export default App;
