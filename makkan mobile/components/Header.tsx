
import React from 'react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#800000] rounded-full flex items-center justify-center shadow-inner">
          <i className="fas fa-plus-circle text-white text-xs"></i>
        </div>
        <div className="flex flex-col">
          <span className="font-black text-lg tracking-tight text-[#800000] leading-none">MAKKA</span>
          <span className="text-[8px] font-bold text-gray-400 tracking-[0.2em] uppercase leading-none mt-0.5">Naturals</span>
        </div>
      </div>
      
      <button 
        onClick={onCartClick}
        className="relative p-2 text-gray-600 hover:text-[#800000] transition-colors"
      >
        <i className="fas fa-shopping-basket text-xl"></i>
        {cartCount > 0 && (
          <span className="absolute top-0 right-0 bg-[#f9a825] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-white shadow-sm">
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
};

export default Header;
