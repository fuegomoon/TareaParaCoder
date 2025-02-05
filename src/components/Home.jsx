import React from 'react';
import '../index.css';
import eatingcake from '../images/eatingcake.jpeg';


const Home = () => {
  return (
    <div className="home-container">
      <h1 className='home' >Welcome to the Cake Shop</h1>
      <p>Explore our delicious collection of cakes.</p>
      <img className='eating-cake' src= {eatingcake} alt="Eating Cake" />
    </div>
  );
};

export default Home;