import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { apiService } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const productData = await apiService.getProducts({ id: id });
      
      if (productData && productData.length > 0) {
        setProduct(productData[0]);
      } else {
        setError('Product not found');
      }
    } catch (error) {
      console.error('Error loading product:', error);
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

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

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', product?.id);
  };

  const handleWishlist = () => {
    // TODO: Implement wishlist functionality
    console.log('Adding to wishlist:', product?.id);
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Sharing product:', product?.id);
  };

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-container">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={handleBackClick} className="back-btn">
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="error-container">
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <button onClick={handleBackClick} className="back-btn">
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <button onClick={handleBackClick} className="back-btn">
          <ArrowLeft size={16} />
          Back to Products
        </button>
      </div>

      {/* Product Detail Content */}
      <div className="product-detail-content">
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image">
            <img 
              src={product.image_url || `https://via.placeholder.com/400x400/FFFFFF/000000?text=${encodeURIComponent(product.name)}`} 
              alt={product.name} 
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info-detail">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-id">#{product.id}</div>
          </div>

          <div className="product-meta">
            <div className="product-brand">
              <span className="label">Brand:</span>
              <span className="value">{product.brand || 'Unknown Brand'}</span>
              {product.has_promotion && (
                <span className="promotion-badge">P</span>
              )}
            </div>
            
            <div className="product-country">
              <span className="label">Country:</span>
              <span className="country-flag">{getCountryFlag(product.country || 'Unknown')}</span>
              <span className="value">{product.country || 'Unknown'}</span>
            </div>

            <div className="product-weight">
              <span className="label">Weight/Package:</span>
              <span className="value">
                {product.weight || 'N/A'} / {product.packing_unit || 'Unit'}
              </span>
            </div>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description || 'No description available for this product.'}</p>
          </div>

          <div className="product-actions">
            <button className="action-btn primary" onClick={handleAddToCart}>
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button className="action-btn secondary" onClick={handleWishlist}>
              <Heart size={20} />
              Wishlist
            </button>
            <button className="action-btn secondary" onClick={handleShare}>
              <Share2 size={20} />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 