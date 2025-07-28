import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductGrid = ({ 
  products = [], 
  loading = false, 
  currentPage = 1, 
  totalPages = 1, 
  totalProducts = 0,
  onPageChange 
}) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <main className="product-grid">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </main>
    );
  }

  if (products.length === 0) {
    return (
      <main className="product-grid">
        <div className="no-products">
          <p>No products found.</p>
        </div>
      </main>
    );
  }

  const getCountryFlag = (country) => {
    const flags = {
      'Taiwan': '🇹🇼',
      'USA': '🇺🇸',
      'Japan': '🇯🇵',
      'Thailand': '🇹🇭',
      'China': '🇨🇳'
    };
    return flags[country] || '🏳️';
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show limited pages with ellipsis
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <main className="product-grid">
      {/* Product count and pagination info */}
      <div className="product-grid-header">
        <div className="product-count">
          Showing {products.length} of {totalProducts} products
        </div>
        {totalPages > 1 && (
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="products-container">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="product-card"
            onClick={() => handleProductClick(product.id)}
          >
            <div className="product-image">
              <img 
                src={product.image_url || `https://via.placeholder.com/200x200/FFFFFF/000000?text=${encodeURIComponent(product.name)}`} 
                alt={product.name} 
              />
            </div>
            <div className="product-info">
              <div className="product-id">#{product.id}</div>
              <div className="product-name">{product.name}</div>
              <div className="product-weight">
                {product.weight || 'N/A'} / {product.packing_unit || 'Unit'}
              </div>
              <div className="product-brand">
                {product.brand || 'Unknown Brand'}
                {product.has_promotion && (
                  <span className="promotion-badge">P</span>
                )}
              </div>
              <div className="product-country">
                <span className="country-flag">
                  {getCountryFlag(product.country || 'Unknown')}
                </span>
                <span className="country-name">{product.country || 'Unknown'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="pagination-btn"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          
          <div className="page-numbers">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                className={`page-number ${page === currentPage ? 'active' : ''} ${page === '...' ? 'ellipsis' : ''}`}
                onClick={() => page !== '...' && onPageChange(page)}
                disabled={page === '...'}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button 
            className="pagination-btn"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </main>
  );
};

export default ProductGrid; 