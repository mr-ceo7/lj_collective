import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: string[];
  products: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  products,
  onRemoveFromWishlist,
  onQuickView,
}: WishlistDrawerProps) {
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs pointer-events-auto"
      />

      {/* Drawer Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 220 }}
        className="absolute top-0 right-0 h-full w-full max-w-md bg-luxury-pearl shadow-2xl flex flex-col justify-between pointer-events-auto"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart size={16} className="text-luxury-crimson fill-luxury-crimson" />
            <h3 className="font-serif text-lg tracking-wider uppercase text-luxury-obsidian font-medium">
              Your Wishlist
            </h3>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-mono text-luxury-obsidian/50">
              {wishlistedProducts.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-luxury-obsidian/70 hover:text-luxury-crimson transition-colors duration-300 cursor-pointer p-1"
            aria-label="Close wishlist"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-none space-y-6">
          <AnimatePresence initial={false}>
            {wishlistedProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-[60vh] flex flex-col items-center justify-center text-center px-4"
              >
                <Heart size={32} className="text-luxury-obsidian/20 stroke-[1.2] mb-4" />
                <p className="font-serif text-base italic text-luxury-obsidian/60">Your archive is currently empty</p>
                <p className="text-xs text-luxury-obsidian/40 max-w-xs mt-2 leading-relaxed">
                  Discover outstanding silhouettes in our collection and tap the heart icon to save them to your private list.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 bg-luxury-obsidian hover:bg-luxury-crimson text-luxury-pearl hover:text-white text-[9px] uppercase tracking-widest transition-all duration-300 font-mono rounded-xs shadow-md cursor-pointer"
                >
                  Explore Collection
                </button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {wishlistedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-4 border-b border-white/5 pb-4"
                  >
                    {/* Product Image */}
                    <button
                      onClick={() => {
                        onQuickView(product);
                        onClose();
                      }}
                      className="w-16 h-20 bg-white/5 overflow-hidden shrink-0 group border border-white/10"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </button>

                    {/* Product Metadata */}
                    <div className="flex-1 min-w-0">
                      <button
                        onClick={() => {
                          onQuickView(product);
                          onClose();
                        }}
                        className="text-left font-serif text-sm text-luxury-obsidian font-medium truncate block hover:text-luxury-crimson transition-colors duration-300 w-full"
                      >
                        {product.name}
                      </button>
                      <span className="text-[8px] uppercase tracking-widest font-mono text-luxury-sand block mt-0.5 font-medium">
                        {product.collection}
                      </span>
                      <span className="text-xs font-mono text-luxury-obsidian/60 block mt-1">
                        ${product.price.toLocaleString()}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col items-end space-y-3">
                      <button
                        onClick={() => {
                          onQuickView(product);
                          onClose();
                        }}
                        className="text-[9px] font-mono uppercase tracking-widest text-luxury-obsidian hover:text-luxury-crimson flex items-center space-x-1 border-b border-transparent hover:border-luxury-crimson pb-0.5 transition-all duration-300 cursor-pointer"
                      >
                        <span>View</span>
                        <ArrowRight size={10} />
                      </button>
                      <button
                        onClick={() => onRemoveFromWishlist(product.id)}
                        className="text-luxury-obsidian/40 hover:text-luxury-crimson transition-colors duration-300 p-1 cursor-pointer"
                        aria-label="Remove favorite"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Drawer Footer */}
        {wishlistedProducts.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-white/5">
            <p className="text-[10px] text-luxury-obsidian/40 text-center font-mono leading-relaxed">
              Saved items are persisted in your local couture archive for your next appointment.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
