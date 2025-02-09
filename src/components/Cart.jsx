// src/components/Cart.jsx
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
import CheckoutForm from './CheckoutForm';

const Cart = ({ cart, removeFromCart, updateQuantity, clearCart }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <Link to="/products" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    );
  }


  return (
    <div className="cart-container">
      {!showCheckout ? (
        <>
          <h2>Your Cart</h2>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="cart-item-image" 
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">${item.price}</p>
                </div>
                <div className="cart-item-controls">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
                <div className="cart-item-total">
                  ${(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-total">
              <h3>Total: ${calculateTotal()}</h3>
            </div>
            <button 
              className="checkout-btn"
              onClick={() => setShowCheckout(true)}
            >
              Proceed to Checkout
            </button>
            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </>
      ) : (
        <CheckoutForm 
          cart={cart} 
          total={calculateTotal()} 
          clearCart={clearCart}
        />
      )}
    </div>
  );
};

export default Cart;