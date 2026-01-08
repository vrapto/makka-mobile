
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ProductHero from './components/ProductHero';
import Features from './components/Features';
import ChatAssistant from './components/ChatAssistant';
import CartModal from './components/CartModal';
import { MAKKA_PRODUCT } from './constants';
import { CartItem } from './types';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  const handleAddToCart = useCallback(() => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === MAKKA_PRODUCT.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === MAKKA_PRODUCT.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product: MAKKA_PRODUCT, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const updateCartQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  }, []);

  const handleCheckout = () => {
    setCart([]);
    setIsCartOpen(false);
    setShowCheckoutSuccess(true);
    setTimeout(() => setShowCheckoutSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen pb-20 relative">
      <Header 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main className="max-w-4xl mx-auto">
        <ProductHero onAddToCart={handleAddToCart} />
        <Features />
        
        {/* Social Proof */}
        <section className="px-4 py-12">
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Loved by our Customers</h2>
            <div className="space-y-4">
              {[
                { name: 'Sarah M.', text: 'Noticeable difference in my energy levels and comfort within a week! Highly recommend.', rating: 5 },
                { name: 'John D.', text: 'Best herbal combo I\'ve found in South Africa. The delivery was super fast too.', rating: 5 }
              ].map((rev, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 italic text-gray-600 relative">
                  <div className="flex gap-1 mb-2">
                    {[...Array(rev.rating)].map((_, j) => (
                      <i key={j} className="fas fa-star text-[#f9a825] text-xs"></i>
                    ))}
                  </div>
                  "{rev.text}"
                  <p className="mt-4 not-italic font-bold text-gray-900 text-sm">— {rev.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Cart Modal */}
      {isCartOpen && (
        <CartModal 
          items={cart} 
          onClose={() => setIsCartOpen(false)} 
          onUpdateQty={updateCartQuantity}
          onCheckout={handleCheckout}
        />
      )}

      {/* Success Notification */}
      {showCheckoutSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[110] bg-[#2d5a27] text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 animate-bounce">
          <i className="fas fa-check-circle"></i>
          Order Placed Successfully!
        </div>
      )}

      <ChatAssistant />
      
      <footer className="bg-white py-12 px-4 border-t border-gray-100 text-center text-gray-400 text-xs">
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex justify-center gap-6 text-gray-300">
            <i className="fab fa-facebook text-xl"></i>
            <i className="fab fa-instagram text-xl"></i>
            <i className="fab fa-whatsapp text-xl"></i>
          </div>
          <p>© 2024 Makka Health (PTY) LTD. All Rights Reserved.</p>
          <p className="px-8 leading-relaxed">
            Disclaimer: These statements have not been evaluated by the South African Health Products Regulatory Authority. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
