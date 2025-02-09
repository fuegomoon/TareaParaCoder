// src/components/CheckoutForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/cartService';
import './CheckoutForm.css';

const CheckoutForm = ({ cart, total, clearCart }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare order data
      const orderData = {
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: total
      };

      // Create order in Firebase
      await createOrder(orderData);
      
      // Clear local cart
      clearCart();
      
      // Show success message
      alert('Thank you for your order! We will contact you shortly.');
      
      // Redirect to products page
      navigate('/products');
    } catch (error) {
      console.error('Error processing order:', error);
      setError('There was an error processing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-form-container">
      <h2>Checkout</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          {cart.map((item) => (
            <div key={item.id} className="order-item">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="order-total">
            <strong>Total:</strong>
            <strong>${total}</strong>
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-order-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;