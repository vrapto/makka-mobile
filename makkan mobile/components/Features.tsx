
import React from 'react';
import { MAKKA_PRODUCT, DOSAGE_INFO } from '../constants';

const Features: React.FC = () => {
  return (
    <section className="px-4 py-12 bg-gray-50">
      <div className="max-w-md mx-auto space-y-12">
        {/* Benefits */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#800000] rounded-full"></span>
            Health Benefits
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {MAKKA_PRODUCT.benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-heart-pulse text-[#800000]"></i>
                </div>
                <p className="text-gray-700 font-medium pt-1 text-sm">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dosage Section */}
        <div className="bg-white p-6 rounded-3xl border-2 border-[#800000]/10 shadow-sm">
          <h2 className="text-lg font-bold text-[#800000] mb-4 flex items-center gap-2">
            <i className="fas fa-clock"></i>
            Dosage Instructions
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-[#800000] pl-4">
              <p className="text-xs uppercase font-bold text-gray-400 mb-1">Adults</p>
              <p className="text-gray-700 text-sm font-medium">{DOSAGE_INFO.adults}</p>
            </div>
            <div className="border-l-4 border-gray-200 pl-4">
              <p className="text-xs uppercase font-bold text-gray-400 mb-1">Children</p>
              <p className="text-gray-700 text-sm font-medium">{DOSAGE_INFO.children}</p>
            </div>
            <p className="text-[11px] text-gray-500 italic mt-4 bg-gray-50 p-3 rounded-lg">
              <i className="fas fa-triangle-exclamation mr-1 text-amber-500"></i>
              {DOSAGE_INFO.notes}
            </p>
          </div>
        </div>

        {/* Ingredients */}
        <div className="bg-[#800000] text-white p-8 rounded-[2.5rem] shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <h2 className="text-xl font-bold mb-6">Organic Composition</h2>
          <div className="flex flex-wrap gap-3">
            {MAKKA_PRODUCT.ingredients.map((ing, idx) => (
              <span key={idx} className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20">
                {ing}
              </span>
            ))}
          </div>
          <p className="mt-8 text-sm text-red-100 italic leading-relaxed">
            "H+ Organic World: Marketed and distributed by Makka Naturals. No known contra-indications."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
