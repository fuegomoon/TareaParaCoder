
import React, {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Cart from './components/Cart';
import {doc, getDoc, getFirestore} from "firebase/firestore";
import {db} from "./components/FirebaseConfig";


const App = () => {

  const [products, setProducts] = useState({});

  useEffect(() => {
    // const db = getFirestore(firebaseApp);

    const productsRef = doc(db, "items", "nRigQphfJqK6wx9AaeNE");
    getDoc(productsRef).then((snapshot) => {
      if (snapshot.exists()) {
        setProducts({id: snapshot.id, ...snapshot.data()});
        console.log({id: snapshot.id, ...snapshot.data()});
      } else {
        console.log("No such document!");
      }
    })
  }, []);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 
            ? { ...item, quantity: newQuantity }
            : item;
        }
        return item;
      })
    );
  };

  return (
    <div className="main-container">
      <Navbar />
      <Cart 
        items={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
      <main className="content-section">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route 
            path="/products/:id" 
            element={<ProductDetail addToCart={addToCart} />} 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
