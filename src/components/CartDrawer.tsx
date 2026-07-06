import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShieldCheck, ArrowRight, ArrowLeft, CreditCard, Sparkles, MapPin } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, size: string, change: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [step, setStep] = useState<'bag' | 'checkout' | 'success'>('bag');
  
  // Checkout form details state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'concierge'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const luxuryTax = subtotal * 0.08; // 8% couture VAT
  const grandTotal = subtotal + luxuryTax;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
      onClearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs"
      />

      {/* Drawer content sliding from the right */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 220 }}
        className="absolute top-0 right-0 h-full w-full max-w-md bg-luxury-pearl shadow-2xl flex flex-col justify-between"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-stone-200/60 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-serif text-lg md:text-xl tracking-wider text-luxury-obsidian font-semibold">
              {step === 'bag' ? 'Your Shopping Bag' : step === 'checkout' ? 'Atelier Checkout' : 'Order Confirmed'}
            </span>
            <span className="text-xs text-stone-400 font-mono">({cart.length} unique)</span>
          </div>
          <button
            onClick={onClose}
            className="text-luxury-obsidian hover:text-luxury-crimson p-1"
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-none">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: SHOPPING BAG ITEMS LIST */}
            {step === 'bag' && (
              <motion.div
                key="bag-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: -20 }}
                className="flex flex-col h-full justify-between"
              >
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <p className="font-serif italic text-stone-400 text-lg mb-6">Your shopping bag is empty.</p>
                    <button
                      onClick={onClose}
                      className="px-6 py-2 bg-luxury-obsidian hover:bg-luxury-crimson text-white text-[10px] uppercase tracking-widest transition-colors font-semibold"
                    >
                      Return to Showroom
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div
                        key={`${item.product.id}-${item.selectedSize}`}
                        className="flex items-start pb-6 border-b border-stone-200/40"
                      >
                        {/* Image Thumbnail */}
                        <div className="w-20 aspect-[3/4] bg-stone-100 overflow-hidden flex-shrink-0 border border-stone-200/50">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Item Info details */}
                        <div className="ml-4 flex-1 flex flex-col justify-between h-full">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="font-serif text-sm font-medium text-luxury-obsidian line-clamp-1">
                                {item.product.name}
                              </h4>
                              <button
                                onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                                className="text-stone-400 hover:text-rose-600 pl-2 transition-colors"
                                aria-label="Remove item"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-mono mt-0.5 block">
                              Size: <span className="text-luxury-obsidian font-bold font-mono">{item.selectedSize}</span>
                            </span>
                            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-mono block">
                              Collection: <span className="text-luxury-obsidian/80 font-mono">{item.product.collection}</span>
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity Selector Counter */}
                            <div className="flex items-center border border-stone-200 bg-white">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                                className="px-2 py-1 text-xs hover:bg-stone-100 text-luxury-obsidian"
                              >
                                -
                              </button>
                              <span className="px-3 text-xs font-mono font-medium">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                                className="px-2 py-1 text-xs hover:bg-stone-100 text-luxury-obsidian"
                              >
                                +
                              </button>
                            </div>
                            {/* Price total for item */}
                            <span className="text-xs font-mono text-luxury-obsidian font-medium">
                              ${(item.product.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 2: SECURE COUTURE CHECKOUT FORM */}
            {step === 'checkout' && (
              <motion.div
                key="checkout-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: -20 }}
              >
                <button
                  onClick={() => setStep('bag')}
                  className="inline-flex items-center space-x-1.5 text-xs text-stone-500 hover:text-luxury-obsidian mb-6"
                >
                  <ArrowLeft size={12} />
                  <span>Back to shopping bag</span>
                </button>

                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div>
                    <label className="mono-label text-[9px] text-stone-400 block mb-1">
                      Full Client Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Amandine de Beauvoir"
                      className="w-full clay-input px-3 py-2 text-xs focus:outline-none placeholder-stone-500"
                    />
                  </div>

                  <div>
                    <label className="mono-label text-[9px] text-stone-400 block mb-1">
                      Maison Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. amandine@couture.fr"
                      className="w-full clay-input px-3 py-2 text-xs focus:outline-none placeholder-stone-500"
                    />
                  </div>

                  <div>
                    <label className="mono-label text-[9px] text-stone-400 block mb-1">
                      Delivery Sanctuary Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 14 Rue du Faubourg Saint-Honoré, Paris"
                      className="w-full clay-input px-3 py-2 text-xs focus:outline-none placeholder-stone-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="mono-label text-[9px] text-stone-400 block mb-1">
                      Complimentary Handwritten Gift Inscription (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Write an elegant gift inscription to be hand-penned on linen card..."
                      className="w-full clay-input px-3 py-2 text-xs focus:outline-none placeholder-stone-500 resize-none italic"
                    />
                  </div>

                  {/* Payment Choices */}
                  <div>
                    <label className="mono-label text-[9px] text-stone-400 block mb-3">
                      Bespoke Settling Method *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 border text-center flex flex-col items-center justify-center cursor-pointer transition-all ${
                          paymentMethod === 'card'
                            ? 'border-luxury-obsidian bg-stone-50'
                            : 'border-stone-200 hover:border-luxury-crimson'
                        }`}
                      >
                        <CreditCard size={16} className="text-luxury-obsidian mb-1" />
                        <span className="text-[10px] font-serif font-medium text-luxury-obsidian">Secure Card</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('concierge')}
                        className={`p-3 border text-center flex flex-col items-center justify-center cursor-pointer transition-all ${
                          paymentMethod === 'concierge'
                            ? 'border-luxury-obsidian bg-stone-50'
                            : 'border-stone-200 hover:border-luxury-crimson'
                        }`}
                      >
                        <Sparkles size={16} className="text-luxury-crimson mb-1" />
                        <span className="text-[10px] font-serif font-medium text-luxury-obsidian">Atelier Concierge</span>
                      </button>
                    </div>
                  </div>

                  {/* Payment assurances */}
                  <p className="text-[9px] text-stone-400 leading-relaxed font-sans mt-2 italic text-center">
                    All payment processes are secured through 256-bit military cryptographic SSL overlays.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-luxury-obsidian hover:bg-luxury-crimson text-white text-[10px] uppercase tracking-widest font-semibold mt-4 transition-colors duration-300 cursor-pointer flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING ORDER DETAILS...</span>
                    ) : (
                      <>
                        <span>AUTHORIZE & LOCK ORDER</span>
                        <ShieldCheck size={14} />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 3: ORDER SUCCESS CONGRATULATIONS */}
            {step === 'success' && (
              <motion.div
                key="success-step"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 px-4 flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-luxury-crimson mb-6 border border-stone-200/50">
                  <Sparkles size={28} />
                </div>
                
                <span className="mono-label text-luxury-crimson block mb-2">Order Confirmed</span>
                <h3 className="font-serif text-2xl font-medium text-luxury-obsidian mb-4">
                  Welcome to the Collective
                </h3>
                
                <p className="text-xs text-luxury-obsidian/80 leading-relaxed font-sans mb-8 max-w-sm text-center">
                  Your request has been delivered directly to our lead master artisan. A personal Atelier fitting specialist will contact you in the next 15 minutes to review measurements, customize drapes, and schedule white-glove hand delivery.
                </p>

                <div className="border border-stone-200 p-4 w-full text-left space-y-2 mb-8 bg-stone-50">
                  <span className="text-[9px] uppercase tracking-widest text-stone-400 font-mono block">Order Details:</span>
                  <div className="flex justify-between text-xs text-luxury-obsidian font-medium">
                    <span>Atelier Tracking:</span>
                    <span className="font-mono text-[11px] font-bold text-luxury-crimson-light">#LJC-2026-099827</span>
                  </div>
                  <div className="flex justify-between text-xs text-luxury-obsidian/80">
                    <span>Client:</span>
                    <span>{fullName || 'Madame de Beauvoir'}</span>
                  </div>
                  <div className="flex justify-between text-xs text-luxury-obsidian/80">
                    <span>Sanctuary Delivery:</span>
                    <span className="truncate max-w-[180px]">{address || 'Faubourg Saint-Honoré, Paris'}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setStep('bag');
                    onClose();
                  }}
                  className="px-8 py-3 bg-luxury-obsidian hover:bg-luxury-crimson text-luxury-pearl text-[10px] uppercase tracking-widest transition-colors font-medium cursor-pointer"
                >
                  Continue Browsing
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Drawer Footer calculations block (Only visible on Step 1 / bag review) */}
        {step === 'bag' && cart.length > 0 && (
          <div className="p-6 border-t border-stone-200 bg-stone-50/50 flex flex-col">
            <div className="space-y-1.5 mb-6">
              <div className="flex justify-between text-xs text-stone-500">
                <span>Atelier Subtotal</span>
                <span className="font-mono">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-stone-500">
                <span>Couture VAT / luxury levy (8%)</span>
                <span className="font-mono">${luxuryTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-stone-500">
                <span>Luxury White-Glove Courier</span>
                <span className="text-luxury-crimson text-[10px] uppercase tracking-widest font-bold">COMPLIMENTARY</span>
              </div>
              <div className="border-t border-stone-200 my-2 pt-2 flex justify-between text-sm text-luxury-obsidian font-bold">
                <span className="font-serif">Total Est. Balance</span>
                <span className="font-mono">${grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setStep('checkout')}
              className="w-full py-3.5 bg-luxury-obsidian hover:bg-luxury-crimson text-white text-[10px] uppercase tracking-widest font-semibold transition-colors duration-300 cursor-pointer flex items-center justify-center space-x-1"
            >
              <span>PROCEED TO SARTORIAL CHECKOUT</span>
              <ArrowRight size={13} />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
