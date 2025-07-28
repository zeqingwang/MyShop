import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, User, ChevronDown, Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';

const Header = ({ searchTerm, onSearch }) => {
  const navigate = useNavigate();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearchTerm);
    setShowDropdown(false);
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    
    if (value.trim().length >= 2) {
      setLoading(true);
      try {
        const results = await apiService.searchProducts(value);
        setSearchResults(results.slice(0, 5)); // Limit to 5 results
        setShowDropdown(true);
      } catch (error) {
        console.error('Error searching products:', error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }

    // Debounce search for better performance
    if (value.trim() === '') {
      onSearch('');
    }
  };

  const handleSearchButtonClick = () => {
    onSearch(localSearchTerm);
    setShowDropdown(false);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setShowDropdown(false);
    setLocalSearchTerm('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  return (
    <header className="header">
      {/* Top Navigation Bar */}
      <div className="top-nav">
        <div className="top-nav-left">
          <div className="language-dropdown">
            <span>Language 語言</span>
            <ChevronDown size={16} />
          </div>
          <a href="#" className="nav-link">Catalog</a>
        </div>
        <div className="top-nav-right">
          <div className="cart-icon">
            <ShoppingCart size={20} />
            <span className="cart-count">0</span>
          </div>
          <a href="#" className="nav-link">
            <User size={16} />
            Login
          </a>
        </div>
      </div>

      {/* Main Header with Logo */}
      <div className="main-header">
        <div className="logo-section">
          <div className="logo">
            <div className="logo-icon">D</div>
            <div className="logo-text">
              <div className="chinese-text">大聯食品公司</div>
              <div className="english-text">GIANT UNION CO., INC.</div>
            </div>
          </div>
        </div>

        {/* Search and Navigation Bar */}
        <div className="search-nav-section">
          <div className="search-container" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="search-bar">
              <input 
                type="text" 
                placeholder="Product & Brand & Item#" 
                className="search-input"
                value={localSearchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                autoComplete="off"
              />
              <button 
                type="button" 
                className="search-button"
                onClick={handleSearchButtonClick}
              >
                <Search size={20} />
              </button>
            </form>
            
            {/* Search Dropdown */}
            {showDropdown && (
              <div className="search-dropdown">
                {loading ? (
                  <div className="dropdown-loading">
                    <div className="loading-spinner-small"></div>
                    <span>Searching...</span>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="dropdown-results">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        className="dropdown-item"
                        onClick={() => handleProductClick(product.id)}
                      >
                        <div className="dropdown-item-content">
                          <div className="dropdown-item-name">{product.name}</div>
                          <div className="dropdown-item-id">#{product.id}</div>
                        </div>
                        <div className="dropdown-item-brand">
                          {product.brand || 'Unknown Brand'}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : localSearchTerm.trim().length >= 2 ? (
                  <div className="dropdown-no-results">
                    <span>No products found</span>
                  </div>
                ) : null}
              </div>
            )}
            
            <div className="search-underline">
              <div className="red-line"></div>
              <div className="green-line"></div>
            </div>
          </div>
          <nav className="main-nav">
            <a href="#" className="nav-item active">Products</a>
            <a href="#" className="nav-item">Brands</a>
            <a href="#" className="nav-item">News</a>
            <a href="#" className="nav-item">Promotion</a>
            <a href="#" className="nav-item">About us</a>
            <a href="#" className="nav-item">Contact us</a>
            <a href="#" className="nav-item">Career</a>
          </nav>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <div className="breadcrumb-left">
          <Home size={16} />
          <span>/ <a href="#" className="breadcrumb-link">Products</a></span>
        </div>
        <div className="breadcrumb-right">
          <ArrowLeft size={16} />
          <span>Go back</span>
        </div>
      </div>
    </header>
  );
};

export default Header; 