import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../components/FirebaseConfig'; 
  
export const getProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'items'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting products:', error);
      return [];
    }
  };
  
  export const getProductById = async (productId) => {
    try {
      const docRef = doc(db, 'items', productId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      } else {
        console.log('No such product!');
        return null;
      }
    } catch (error) {
      console.error('Error getting product:', error);
      return null;
    }
  };

  export const createOrder = async (orderData) => {
    try {
      // Add order to 'orders' collection
      const orderRef = await addDoc(collection(db, 'orders'), {
        ...orderData,
        date: new Date().toISOString(),
        status: 'completed'
      });
      
      // Update inventory for each item
      for (const item of orderData.items) {
        const productRef = doc(db, 'products', item.id);
        // You might want to add a 'stock' field to your products and update it here
        // await updateDoc(productRef, {
        //  stock: increment(-item.quantity)
        
      }
  
      return orderRef.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };