// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ cartItemCount }) => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Products</Link>
      </div>
      <Link to="/cart" className="cart-link">
        <ShoppingCart className="cart-icon" />
        {cartItemCount > 0 && (
          <span className="cart-count">{cartItemCount}</span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;