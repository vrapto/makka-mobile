
import React, { useState, useRef } from 'react';
import { CartItem, CustomerDetails } from '../types';

interface CartModalProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (id: string, delta: number) => void;
  onCheckout: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ items, onClose, onUpdateQty, onCheckout }) => {
  const [step, setStep] = useState<'cart' | 'details'>('cart');
  const [details, setDetails] = useState<CustomerDetails>({
    name: '',
    surname: '',
    email: '',
    cell: '',
    pharmacy: ''
  });

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
  };

  const proceedToDetails = () => setStep('details');

  const handlePayFastCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    // Validate details
    if (!details.name || !details.email || !details.cell || !details.pharmacy) {
      alert("Please fill in all required fields for delivery.");
      return;
    }

    // Submit the hidden PayFast form
    if (formRef.current) {
      formRef.current.submit();
      onCheckout(); 
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {step === 'cart' ? 'Your Shopping Bag' : 'Delivery Details'}
            </h2>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
              Step {step === 'cart' ? '1' : '2'} of 2
            </p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'cart' ? (
            <div className="space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300 text-3xl">
                    <i className="fas fa-shopping-basket"></i>
                  </div>
                  <p className="text-gray-500 font-medium">Your bag is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-white">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain p-2" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-bold text-sm text-gray-900">{item.product.name}</h3>
                      <p className="text-[#800000] font-black text-md">R{item.product.price.toFixed(2)}</p>
                      <div className="flex items-center bg-white rounded-lg border border-gray-200 w-fit mt-2">
                        <button onClick={() => onUpdateQty(item.product.id, -1)} className="px-2 py-1"><i className="fas fa-minus text-[10px]"></i></button>
                        <span className="px-3 font-bold text-xs">{item.quantity}</span>
                        <button onClick={() => onUpdateQty(item.product.id, 1)} className="px-2 py-1"><i className="fas fa-plus text-[10px]"></i></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3 items-start">
                <i className="fas fa-info-circle text-amber-600 mt-1"></i>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  We deliver to your <strong>closest Clicks Pharmacy</strong> for secure and convenient collection across South Africa.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Name</label>
                  <input name="name" value={details.name} onChange={handleInputChange} placeholder="First Name" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#800000] outline-none text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Surname</label>
                  <input name="surname" value={details.surname} onChange={handleInputChange} placeholder="Last Name" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#800000] outline-none text-sm" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Email Address</label>
                <input name="email" type="email" value={details.email} onChange={handleInputChange} placeholder="email@example.com" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#800000] outline-none text-sm" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Cell Number</label>
                <input name="cell" type="tel" value={details.cell} onChange={handleInputChange} placeholder="082 123 4567" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#800000] outline-none text-sm" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Closest Clicks Pharmacy</label>
                <input name="pharmacy" value={details.pharmacy} onChange={handleInputChange} placeholder="e.g. Clicks Mall of Africa" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#800000] outline-none text-sm" />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-2xl font-black text-gray-900">R{total.toFixed(2)}</span>
            </div>

            {step === 'cart' ? (
              <button 
                onClick={proceedToDetails}
                className="w-full bg-[#800000] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-[#600000] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                Continue to Delivery
                <i className="fas fa-arrow-right text-sm"></i>
              </button>
            ) : (
              <>
                <form ref={formRef} action="https://www.payfast.co.za/eng/process" method="post" className="hidden">
                  <input type="hidden" name="merchant_id" value="25230681" />
                  <input type="hidden" name="merchant_key" value="sk6htih4ysrwd" />
                  <input type="hidden" name="amount" value={total.toFixed(2)} />
                  <input type="hidden" name="item_name" value={`Makka Combo Special Order: ${details.name} ${details.surname}`} />
                  <input type="hidden" name="name_first" value={details.name} />
                  <input type="hidden" name="name_last" value={details.surname} />
                  <input type="hidden" name="email_address" value={details.email} />
                  <input type="hidden" name="cell_number" value={details.cell} />
                  <input type="hidden" name="custom_str1" value={details.pharmacy} />
                  <input type="hidden" name="custom_str2" value="Order to be emailed to mhq@makka.co.za" />
                  <input type="hidden" name="return_url" value={window.location.origin} />
                  <input type="hidden" name="cancel_url" value={window.location.origin} />
                </form>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setStep('cart')}
                    className="px-6 bg-white text-gray-400 border border-gray-200 rounded-2xl font-bold transition-all"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button 
                    onClick={handlePayFastCheckout}
                    className="flex-1 bg-[#800000] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-[#600000] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  >
                    Secure PayFast Checkout
                    <i className="fas fa-lock text-sm"></i>
                  </button>
                </div>
              </>
            )}
            
            <div className="flex justify-center items-center gap-4 opacity-40 grayscale">
              <i className="fab fa-cc-visa text-xl"></i>
              <i className="fab fa-cc-mastercard text-xl"></i>
              <i className="fas fa-university text-xl"></i>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
