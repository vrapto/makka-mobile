
import React from 'react';
import { MAKKA_PRODUCT } from '../constants';

interface ProductHeroProps {
  onAddToCart: () => void;
}

const ProductHero: React.FC<ProductHeroProps> = ({ onAddToCart }) => {
  return (
    <section className="bg-white px-4 pb-8">
      <div className="max-w-md mx-auto">
        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl mb-6 bg-gray-50 border border-gray-100">
          <img 
            src={MAKKA_PRODUCT.image} 
            alt={MAKKA_PRODUCT.name} 
            className="w-full h-full object-contain p-4"
          />
          <div className="absolute top-4 left-4 bg-[#800000] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
            Limited Combo Special
          </div>
        </div>
        
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {MAKKA_PRODUCT.name}
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed px-4">
            {MAKKA_PRODUCT.description}
          </p>
          
          <div className="flex flex-col items-center justify-center py-2">
            <span className="text-4xl font-black text-[#800000]">
              {MAKKA_PRODUCT.currency}{MAKKA_PRODUCT.price.toFixed(2)}
            </span>
            <span className="text-gray-400 font-medium text-sm mt-1">
              Original Price: <span className="line-through">{MAKKA_PRODUCT.currency}{'950.00'}</span>
            </span>
          </div>

          <button 
            onClick={onAddToCart}
            className="w-full bg-[#800000] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-[#600000] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <i className="fas fa-cart-plus"></i>
            Buy the Combo Now
          </button>
          
          <div className="flex justify-center gap-6 text-[10px] text-gray-400 font-bold uppercase tracking-tighter pt-2">
            <div className="flex items-center gap-1">
              <i className="fas fa-truck text-[#800000]"></i>
              Clicks Pharmacy Pickup
            </div>
            <div className="flex items-center gap-1">
              <i className="fas fa-shield-halved text-[#800000]"></i>
              Instant EFT / Card
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
