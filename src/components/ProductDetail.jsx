import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const products = [
  { id: 1, name: 'Chocolate Cake', description: 'Rich and moist chocolate cake.' },
  { id: 2, name: 'Vanilla Cake', description: 'Classic vanilla flavor with frosting.' },
  { id: 3, name: 'Strawberry Cake', description: 'Fresh strawberry cake with cream.' },
  { id: 4, name: 'Red Velvet Cake', description: 'Soft and velvety with cream cheese.' },
  { id: 5, name: 'Carrot Cake', description: 'Spiced carrot cake with nuts.' },
  { id: 6, name: 'Black Forest Cake', description: 'Chocolate and cherry layered delight.' },
  { id: 7, name: 'Cheesecake', description: 'Creamy cheesecake with biscuit crust.' },
  { id: 8, name: 'Pineapple Cake', description: 'Sweet and tangy pineapple flavor.' },
  { id: 9, name: 'Lemon Cake', description: 'Zesty lemon with a sweet glaze.' },
  { id: 10, name: 'Tiramisu', description: 'Italian dessert with coffee and cream.' },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div className='products'>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default ProductDetail;