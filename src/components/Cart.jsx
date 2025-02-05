import React, { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';

const Cart = ({ items, addToCart, removeFromCart, updateQuantity }) => {
  const [isOpen, setIsOpen] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999
  };

  const cartPanelStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    height: '100vh',
    width: '400px',
    backgroundColor: 'white',
    boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
    zIndex: 9999,
    overflowY: 'auto'
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9998
  };

  return (
    <div style={cartStyle}>
      {/* Cart Icon & Counter */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: '#ec4899',
          color: 'white',
          padding: '12px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <ShoppingCart className="w-6 h-6" />
        {items.length > 0 && (
          <span style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            backgroundColor: '#ef4444',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {items.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </button>

      {/* Cart Panel */}
      {isOpen && (
        <>
          <div style={overlayStyle} onClick={() => setIsOpen(false)} />
          <div style={cartPanelStyle}>
            <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Your Cart</h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  style={{ 
                    fontSize: '1.5rem', 
                    border: 'none', 
                    background: 'none',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>
            </div>

            <div style={{ padding: '20px' }}>
              {items.length === 0 ? (
                <div style={{ 
                  backgroundColor: '#f3f4f6', 
                  padding: '16px', 
                  borderRadius: '8px',
                  borderLeft: '4px solid #6b7280'
                }}>
                  <p>Your cart is empty. Add some delicious cakes!</p>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {items.map((item) => (
                      <div 
                        key={item.id} 
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '16px',
                          backgroundColor: '#f9fafb',
                          borderRadius: '8px'
                        }}
                      >
                        <div>
                          <h3 style={{ fontWeight: '500' }}>{item.name}</h3>
                          <p style={{ color: '#6b7280' }}>${item.price}</p>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            style={{ padding: '4px' }}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          
                          <span style={{ width: '32px', textAlign: 'center' }}>{item.quantity}</span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            style={{ padding: '4px' }}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => removeFromCart(item.id)}
                            style={{ padding: '4px', color: '#ef4444' }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ 
                    marginTop: '24px', 
                    borderTop: '1px solid #e5e7eb',
                    paddingTop: '16px'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      marginBottom: '16px'
                    }}>
                      <span style={{ fontSize: '1.125rem', fontWeight: '500' }}>Total:</span>
                      <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => alert('Checkout functionality to be implemented!')}
                      style={{
                        width: '100%',
                        backgroundColor: '#ec4899',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;