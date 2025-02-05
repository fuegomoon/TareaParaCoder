import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Chocolate Dream', price: 8.900 },
  { id: 2, name: 'Pistachio', price: 10.500 },
  { id: 3, name: 'Strawberry Chiffon', price: 9.900 },
  { id: 4, name: 'Tiramisu', price: 9.000 },
  { id: 5, name: 'Cheescake', price: 11.000 },
  { id: 6, name: 'Rasberry Rosewater Cake', price: 14.000 },

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
              className="text-lg font-medium text-gray-800 hover:text-pink-500"
            >
              {product.name}
            </Link>
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







