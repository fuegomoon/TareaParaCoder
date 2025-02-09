// src/components/Products.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/cartService';
import './Products.css';
import cheescake from '../images/cheescake.jpeg';
import pistachio from '../images/pistachio.jpeg';
import tiramisu from '../images/tiramisu.jpeg';
import chiffon from '../images/chiffon.jpeg';
import chocolateCake from '../images/chocolate-cake.jpeg';
import raspberryRosewater from '../images/raspberry-rosewater.jpeg';

// Create an object to map image names to their imports
 export const images = {
  'cheescake.jpeg': cheescake,
  'pistachio.jpeg': pistachio,
  'tiramisu.jpeg': tiramisu,
  'chiffon.jpeg': chiffon,
  'chocolate-cake.jpeg': chocolateCake,
  'raspberry-rosewater.jpeg': raspberryRosewater
};

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        // Map the products and get the correct image from our imports
        const productsWithImages = productsData.map(product => ({
          ...product,
          image: images[product.imageUrl] // Use the imageUrl from Firestore to get the imported image
        }));
        setProducts(productsWithImages);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // For debugging - remove this in production
  console.log('Products:', products);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="content-container">
      <h1 className="productH1">Our Delicious Cakes</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img 
                src={product.image} // Use the mapped image from our imports
                alt={product.title} 
                className="product-image"
              />
              <div className="product-overlay">
                <Link 
                  to={`/products/${product.id}`}
                  className="view-details"
                >
                  View Details
                </Link>
              </div>
            </div>
            <div className="product-info">
              <h2 className="product-name">{product.title}</h2>
             
              <p className="product-price">${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="add-to-cart-btn"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;