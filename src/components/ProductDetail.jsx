import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const products = [
  { id: 1, name: 'Chocolate Dream', description: 'Rich chocolate cake with chocolate butter cream frosting.', price: 8.900 },
  { id: 2, name: 'Pistachio', description: 'Light spongecake with creamy pistachio frosting.', price: 10.500 },
  { id: 3, name: 'Strawberry Chiffon', description: 'Organic strawberries, fresh cream, layers of french cake, topped with and exquisitely light chiffon cream frosting', price: 9.900},
  { id: 4, name: 'Tiramisu', description: 'Velvety mélange of gluten-free ladyfingers dipped in espresso, layered with delicately sweetened whipped eggs and mascarpone cheese, and topped with a dusting of cocoa powder.', price: 9.000 },
  { id: 5, name: 'Cheesecake', description: 'Velvety Cheesecake topped with fresh, organic raspberries. ', price: 11.000 },
  { id: 6, name: 'Raspberry Rosewater Cake', description: 'A floral-infused cake with raspberry compote and delicate rose buttercream.', price: 14.000 },
 
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