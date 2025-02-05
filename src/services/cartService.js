import { 
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    serverTimestamp 
  } from 'firebase/firestore';
  import { db } from '../components/FirebaseConfig'; // Make sure this path matches your Firebase config file
  
  // Collection reference
  const CART_COLLECTION = 'carts';
  const ORDERS_COLLECTION = 'orders';
  
  // Create or update cart in Firebase
  export const saveCartToFirebase = async (userId, items) => {
    try {
      const cartQuery = query(
        collection(db, CART_COLLECTION),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(cartQuery);
      
      if (querySnapshot.empty) {
        // Create new cart
        await addDoc(collection(db, CART_COLLECTION), {
          userId,
          items,
          updatedAt: serverTimestamp(),
        });
      } else {
        // Update existing cart
        const cartDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, CART_COLLECTION, cartDoc.id), {
          items,
          updatedAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error('Error saving cart:', error);
      throw error;
    }
  };
  
  // Get cart from Firebase
  export const getCartFromFirebase = async (userId) => {
    try {
      const cartQuery = query(
        collection(db, CART_COLLECTION),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(cartQuery);
      
      if (querySnapshot.empty) {
        return null;
      }
      
      const cartDoc = querySnapshot.docs[0];
      return {
        id: cartDoc.id,
        ...cartDoc.data()
      };
    } catch (error) {
      console.error('Error getting cart:', error);
      throw error;
    }
  };
  
  // Create order from cart
  export const createOrder = async (userId, cartItems, userDetails) => {
    try {
      // Calculate total
      const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
  
      // Create order
      const orderData = {
        userId,
        items: cartItems,
        total,
        status: 'pending',
        userDetails,
        createdAt: serverTimestamp(),
      };
  
      // Add order to orders collection
      const orderRef = await addDoc(collection(db, ORDERS_COLLECTION), orderData);
  
      // Clear the user's cart
      const cartQuery = query(
        collection(db, CART_COLLECTION),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(cartQuery);
      
      if (!querySnapshot.empty) {
        const cartDoc = querySnapshot.docs[0];
        await deleteDoc(doc(db, CART_COLLECTION, cartDoc.id));
      }
  
      return orderRef.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };