import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Chocolate Cake' },
  { id: 2, name: 'Vanilla Cake' },
  { id: 3, name: 'Strawberry Cake' },
  { id: 4, name: 'Red Velvet Cake' },
  { id: 5, name: 'Carrot Cake' },
  { id: 6, name: 'Black Forest Cake' },
  { id: 7, name: 'Cheesecake' },
  { id: 8, name: 'Pineapple Cake' },
  { id: 9, name: 'Lemon Cake' },
  { id: 10, name: 'Tiramisu' },
];

const Products = () => {
  return (
    <div>
      <h1 className='productH1'>Products</h1>
      <ul >
        {products.map((product) => (
          <li  key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;



