import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';

const CartModal = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout, loading }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleQuantityChange = (cartId, newQuantity) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(cartId, newQuantity);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content cart-modal">
        <div className="modal-header">
          <h2>Shopping Cart</h2>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="cart-content">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading cart...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="empty-cart">
              <ShoppingCart size={48} />
              <h3>Your cart is empty</h3>
              <p>Add some products to your cart to get started.</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img 
                        src={item.image_url || `https://via.placeholder.com/60x60/FFFFFF/000000?text=${encodeURIComponent(item.name)}`} 
                        alt={item.name} 
                      />
                    </div>
                    
                    <div className="cart-item-details">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <p className="cart-item-id">#{item.product_id}</p>
                      <p className="cart-item-price">${item.price || 0}</p>
                    </div>

                    <div className="cart-item-quantity">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="cart-item-total">
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>

                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="remove-btn"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="cart-total">
                  <span>Total:</span>
                  <span className="total-amount">${calculateTotal().toFixed(2)}</span>
                </div>
                
                <div className="cart-actions">
                  <button onClick={onClose} className="continue-shopping-btn">
                    Continue Shopping
                  </button>
                  <button onClick={onCheckout} className="checkout-btn">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal; 