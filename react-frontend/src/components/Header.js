import React from 'react';
import { Search, ShoppingCart, User, ChevronDown, Home, ArrowLeft } from 'lucide-react';

const Header = () => {
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
          <div className="search-container">
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Product & Brand & Item#" 
                className="search-input"
                defaultValue="roduct & Brand & Item#"
              />
              <button className="search-button">
                <Search size={20} />
              </button>
            </div>
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