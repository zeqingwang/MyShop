import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import { apiService } from './services/api';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('Recommend');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    country: [],
    packingUnit: []
  });

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      console.log('Loading initial data...');
      
      const [productsData, categoriesData] = await Promise.all([
        apiService.getProducts(),
        apiService.getCategories()
      ]);
      
      console.log('Products loaded:', productsData);
      console.log('Categories loaded:', categoriesData);
      
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = async (searchValue) => {
    setSearchTerm(searchValue);
    if (searchValue.trim()) {
      try {
        console.log('Searching for:', searchValue);
        const searchResults = await apiService.searchProducts(searchValue);
        console.log('Search results:', searchResults);
        setProducts(searchResults);
      } catch (error) {
        console.error('Error searching products:', error);
      }
    } else {
      // If search is empty, load all products
      loadInitialData();
    }
  };

  // Handle sorting
  const handleSort = async (sortType) => {
    setSortBy(sortType);
    try {
      console.log('Sorting by:', sortType);
      const sortedProducts = await apiService.getProductsSorted(sortType);
      console.log('Sorted products:', sortedProducts);
      setProducts(sortedProducts);
    } catch (error) {
      console.error('Error sorting products:', error);
    }
  };

  // Handle category filter
  const handleCategoryFilter = async (categoryId) => {
    setSelectedCategory(categoryId);
    try {
      if (categoryId) {
        console.log('Filtering by category:', categoryId);
        const filteredProducts = await apiService.getProductsByCategory(categoryId);
        console.log('Filtered products:', filteredProducts);
        setProducts(filteredProducts);
      } else {
        // If no category selected, load all products
        loadInitialData();
      }
    } catch (error) {
      console.error('Error filtering by category:', error);
    }
  };

  const clearAllFilters = () => {
    setFilters({
      category: [],
      brand: [],
      country: [],
      packingUnit: []
    });
    setSelectedCategory(null);
    setSearchTerm('');
    setSortBy('Recommend');
    loadInitialData();
  };

  return (
    <div className="App">
      <Header 
        searchTerm={searchTerm}
        onSearch={handleSearch}
      />
      <div className="main-container">
        <Sidebar 
          sortBy={sortBy}
          setSortBy={handleSort}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryFilter={handleCategoryFilter}
          filters={filters}
          setFilters={setFilters}
          clearAllFilters={clearAllFilters}
        />
        <ProductGrid 
          products={products}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
