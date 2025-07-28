import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2, Plus, Minus } from 'lucide-react';
import { apiService } from '../services/api';

const ProductDetail = ({ onAddToCart, user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

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

  const handleAddToCart = async () => {
    if (!user) {
      // Show login prompt or redirect to login
      console.log('User not logged in, redirecting to login...');
      return;
    }

    if (product) {
      setAddingToCart(true);
      try {
        await onAddToCart({ ...product, quantity });
        console.log(`Added ${quantity} ${product.name} to cart`);
        // Show success message
        alert(`Added ${quantity} ${product.name} to cart!`);
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Failed to add item to cart. Please try again.');
      } finally {
        setAddingToCart(false);
      }
    }
  };

  const handleWishlist = () => {
    if (!user) {
      alert('Please login to add items to wishlist');
      return;
    }
    // TODO: Implement wishlist functionality
    console.log('Adding to wishlist:', product?.id);
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Sharing product:', product?.id);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
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

            <div className="product-price">
              <span className="label">Price:</span>
              <span className="value price">${product.price || 0}</span>
            </div>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description || 'No description available for this product.'}</p>
          </div>

          <div className="product-quantity">
            <span className="label">Quantity:</span>
            <div className="quantity-controls">
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                className="quantity-btn"
              >
                <Minus size={16} />
              </button>
              <span className="quantity-display">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(quantity + 1)}
                className="quantity-btn"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="product-actions">
            <button 
              className="action-btn primary" 
              onClick={handleAddToCart}
              disabled={addingToCart}
            >
              <ShoppingCart size={20} />
              {addingToCart ? 'Adding...' : 'Add to Cart'}
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

          {!user && (
            <div className="login-prompt">
              <p>Please <button onClick={() => window.location.reload()} className="login-link">login</button> to add items to your cart</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 