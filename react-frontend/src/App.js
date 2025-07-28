import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import LoginModal from './components/LoginModal';
import CartModal from './components/CartModal';
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

  // User authentication state
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    loadInitialData();
    // Load user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        console.log('Loading user from localStorage:', userData);
        setUser(userData);
        // Load cart items for logged in user
        if (userData.id) {
          loadCartItems(userData.id);
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Load cart items when user changes
  useEffect(() => {
    console.log('User state changed:', user);
    if (user && user.id) {
      loadCartItems(user.id);
    } else {
      setCartItems([]);
    }
  }, [user]);

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

  const loadCartItems = async (userId) => {
    try {
      setCartLoading(true);
      console.log('Loading cart items for user:', userId);
      
      // Try to get cart items from backend first
      const cartData = await apiService.getCartItems(userId);
      console.log('Cart items from backend:', cartData);
      
      if (cartData.length > 0) {
        // Use backend data if available
        setCartItems(cartData);
      } else {
        // Fallback to localStorage if backend has no items
        const cartKey = `cart_${userId}`;
        const localStorageCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
        console.log('Cart items from localStorage:', localStorageCart);
        setCartItems(localStorageCart);
      }
    } catch (error) {
      console.error('Error loading cart items from backend, using localStorage:', error);
      // Fallback to localStorage if backend fails
      const cartKey = `cart_${userId}`;
      const localStorageCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
      console.log('Cart items from localStorage (fallback):', localStorageCart);
      setCartItems(localStorageCart);
    } finally {
      setCartLoading(false);
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
    await loadFilteredAndSortedProducts(sortType, selectedCategory);
  };

  // Handle category filter
  const handleCategoryFilter = async (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page when filtering
    await loadFilteredAndSortedProducts(sortBy, categoryId);
  };

  // Combined function to load products with both filtering and sorting
  const loadFilteredAndSortedProducts = async (sortValue = sortBy, categoryValue = selectedCategory) => {
    try {
      console.log('Loading products with filters:', { 
        category: categoryValue, 
        sort: sortValue 
      });
      
      const products = await apiService.getProductsWithFilters({
        category_id: categoryValue,
        sort: sortValue
      });
      
      console.log('Filtered and sorted products:', products);
      setProducts(products);
    } catch (error) {
      console.error('Error loading filtered and sorted products:', error);
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
    loadFilteredAndSortedProducts('Recommend', null);
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

  // User authentication handlers
  const handleLogin = (userData) => {
    console.log('User logged in:', userData);
    
    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Update user state
    setUser(userData);
    
    // Close login modal
    setShowLoginModal(false);
    
    // Load cart items for the logged in user
    if (userData.id) {
      loadCartItems(userData.id);
    }
  };

  const handleLogout = () => {
    console.log('User logged out');
    setUser(null);
    setCartItems([]);
    localStorage.removeItem('user');
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  // Cart handlers with database integration
  const addToCart = async (product) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    const success = await apiService.addToCart(user.id, product.id, product.quantity || 1);
    if (success) {
      await loadCartItems(user.id); // Refresh cart from DB
    }
  };

  const updateCartQuantity = async (cartId, newQuantity) => {
    if (!user) return;

    try {
      console.log('Updating cart quantity:', { cartId, newQuantity });
      const success = await apiService.updateCartQuantity(cartId, newQuantity);
      
      if (success) {
        // Reload cart items from localStorage after updating
        const cartKey = `cart_${user.id}`;
        const updatedCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
        setCartItems(updatedCart);
        console.log('Cart quantity updated successfully');
      } else {
        console.error('Failed to update cart quantity');
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;

    try {
      console.log('Removing from cart:', productId);
      const success = await apiService.removeFromCart(user.id, productId, 1);
      
      if (success) {
        // Reload cart items from database after removing
        await loadCartItems(user.id);
        console.log('Product removed from cart successfully');
      } else {
        console.error('Failed to remove product from cart');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      setShowLoginModal(true);
      setShowCartModal(false);
      return;
    }
    // TODO: Implement checkout functionality
    console.log('Proceeding to checkout...');
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div className="App">
        <Header 
          searchTerm={searchTerm}
          onSearch={handleSearch}
          user={user}
          onLoginClick={handleLoginClick}
          onLogout={handleLogout}
          cartItemCount={cartItemCount}
          onCartClick={() => setShowCartModal(true)}
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
          <Route path="/product/:id" element={
            <ProductDetail onAddToCart={addToCart} user={user} />
          } />
        </Routes>

        {/* Modals */}
        <LoginModal 
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
        
        <CartModal 
          isOpen={showCartModal}
          onClose={() => setShowCartModal(false)}
          cartItems={cartItems}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
          loading={cartLoading}
        />
      </div>
    </Router>
  );
}

export default App;
