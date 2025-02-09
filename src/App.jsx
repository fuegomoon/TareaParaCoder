// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import NotFound from './components/NotFound';
import Home from './components/Home';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map(item =>
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };
  const clearCart = () => {
    setCart([]);
  };
  

  return (
   
      <div className="App">
        <Navbar cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/products" 
            element={<Products addToCart={addToCart} />} 
          />
          <Route 
            path="/products/:id" 
            element={<ProductDetail addToCart={addToCart} />} 
          />
          <Route 
            path="/cart" 
            element={
              <Cart 
                cart={cart} 
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                clearCart={clearCart}
              />
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
   
  );
}

export default App;