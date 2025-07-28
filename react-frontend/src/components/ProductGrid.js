import React from 'react';

const ProductGrid = ({ products = [], loading = false }) => {
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

  return (
    <main className="product-grid">
      <div className="products-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
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
    </main>
  );
};

export default ProductGrid; 