import React from 'react';
import { Link } from 'react-router-dom';
import cheescake from './images/cheescake.jpeg';
import pistachio from './images/pistachio.jpeg';
import tiramisu from './images/tiramisu.jpeg';
import chiffon from './images/chiffon.jpeg';
import chocolate from './images/chocolate.jpeg';
import rosewater from './images/raspberry-rosewater.jpeg';  

const products = [
  { id: 1, name: 'Chocolate Dream', price: 8.900, image: chocolate },
  { id: 2, name: 'Pistachio', price: 10.500, image: pistachio },
  { id: 3, name: 'Strawberry Chiffon', price: 9.900, image: chiffon },
  { id: 4, name: 'Tiramisu', price: 9.000, image: tiramisu },
  { id: 5, name: 'Cheescake', price: 11.000, image: cheescake },
  { id: 6, name: 'Raspberry Rosewater Cake', price: 14.000,  image: rosewater },
];

const Products = ({ addToCart }) => {
  return (
    <div className="content-container">
      <h1 className="productH1">Our Delicious Cakes</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link 
              to={`/products/${product.id}`}
              className="cake-title"
            >
              {product.name}
            </Link>
            <img className='cake-image' src={product.image} alt={product.name} />
            <p className="text-gray-600">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;