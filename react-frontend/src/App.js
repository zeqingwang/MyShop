import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import { apiService } from './services/api';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('Recommend');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
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
      setCurrentPage(1); // Reset to first page when data loads
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = async (searchValue) => {
    setSearchTerm(searchValue);
    setCurrentPage(1); // Reset to first page when searching
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
    setCurrentPage(1); // Reset to first page when sorting
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
    setCurrentPage(1); // Reset to first page when filtering
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
    setCurrentPage(1);
    loadInitialData();
  };

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Router>
      <div className="App">
        <Header 
          searchTerm={searchTerm}
          onSearch={handleSearch}
        />
        <Routes>
          <Route path="/" element={
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
                products={currentProducts}
                loading={loading}
                currentPage={currentPage}
                totalPages={totalPages}
                totalProducts={products.length}
                onPageChange={handlePageChange}
              />
            </div>
          } />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
