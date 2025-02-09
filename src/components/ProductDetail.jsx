// src/components/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/cartService';
import './ProductDetail.css';

// Import images
import cheescake from '../images/cheescake.jpeg';
import pistachio from '../images/pistachio.jpeg';
import tiramisu from '../images/tiramisu.jpeg';
import chiffon from '../images/chiffon.jpeg';
import chocolateCake from '../images/chocolate-cake.jpeg';
import raspberryRosewater from '../images/raspberry-rosewater.jpeg';

// Create image mapping object
const images = {
  'cheescake.jpeg': cheescake,
  'pistachio.jpeg': pistachio,
  'tiramisu.jpeg': tiramisu,
  'chiffon.jpeg': chiffon,
  'chocolate-cake.jpeg': chocolateCake,
  'raspberry-rosewater.jpeg': raspberryRosewater
};

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        if (productData) {
          setProduct({
            ...productData,
            imageUrl: images[productData.imageUrl]
          });
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Error fetching product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-detail-container">
      <button 
        onClick={() => navigate('/products')} 
        className="back-button"
      >
        ← Back to Products
      </button>
      
      <div className="product-detail-content">
        <div className="product-detail-image">
          {product.imageUrl && (
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="detail-image"
            />
          )}
        </div>
        
        <div className="product-detail-info">
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-price">${product.price}</p>
          <div className="detail-description">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="detail-add-to-cart"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;