import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Truck, Calendar, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import SizeGuideModal from './SizeGuideModal';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToBag: (product: Product, size: string) => void;
}

export default function ProductQuickView({
  product,
  onClose,
  onAddToBag,
}: ProductQuickViewProps) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const handleAddClick = () => {
    setIsAdding(true);
    setTimeout(() => {
      onAddToBag(product, selectedSize);
      setIsAdding(false);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal Dialog container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="relative bg-luxury-pearl w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto md:overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-xs border border-stone-200/50"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-luxury-obsidian hover:text-luxury-crimson transition-colors bg-white/80 backdrop-blur-xs p-1.5 rounded-full border border-stone-200/50"
          aria-label="Close details modal"
        >
          <X size={18} />
        </button>

        {/* Left Side: Photo Showroom */}
        <div className="relative w-full aspect-[4/5] md:h-full bg-stone-100 flex flex-col justify-between overflow-hidden">
          {/* Main Photo */}
          <div className="relative w-full h-full">
            <motion.img
              key={activeImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              src={product.images[activeImageIndex]}
              alt={`${product.name} angle ${activeImageIndex + 1}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Swipe/Toggle Arrows */}
          <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none">
            <button
              onClick={() => setActiveImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
              className="pointer-events-auto w-8 h-8 rounded-full bg-luxury-pearl/90 border border-stone-200 flex items-center justify-center text-luxury-obsidian hover:text-luxury-crimson transition-colors shadow-xs"
              aria-label="Previous angle"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setActiveImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
              className="pointer-events-auto w-8 h-8 rounded-full bg-luxury-pearl/90 border border-stone-200 flex items-center justify-center text-luxury-obsidian hover:text-luxury-crimson transition-colors shadow-xs"
              aria-label="Next angle"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Inline Thumbnail Nav */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === activeImageIndex ? 'bg-luxury-crimson scale-125' : 'bg-stone-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Informational Detail / Configuration Block */}
        <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto h-full">
          <div>
            {/* Header / Subtitle */}
            <span className="text-[10px] uppercase tracking-widest text-luxury-crimson font-mono block mb-1">
              {product.collection} / {product.category.replace('-', ' ')}
            </span>
            
            <h3 className="font-serif text-2xl lg:text-3xl font-medium text-luxury-obsidian mb-3">
              {product.name}
            </h3>
            
            <div className="text-lg font-mono text-luxury-obsidian/90 mb-5">
              ${product.price.toLocaleString()}
            </div>

            {/* Description */}
            <p className="text-xs text-luxury-obsidian/80 leading-relaxed font-sans mb-6 text-justify-luxury">
              {product.description}
            </p>

            {/* Tailored Bullet List */}
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-mono block mb-2">Artisan Details:</span>
              <ul className="space-y-1.5">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-start text-[11px] text-luxury-obsidian/80">
                    <span className="text-luxury-crimson mr-2 font-bold">◇</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-widest text-stone-400 font-mono">Select Size:</span>
                <button 
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[9px] text-luxury-crimson hover:underline cursor-pointer bg-transparent border-none p-0"
                >
                  View Fitting Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-xs font-mono rounded-full cursor-pointer transition-all ${
                      selectedSize === size
                        ? 'clay-btn-active font-bold'
                        : 'clay-btn text-luxury-obsidian/80'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Call-to-action Block */}
          <div className="border-t border-stone-200 pt-6">
            <button
              onClick={handleAddClick}
              disabled={isAdding || justAdded}
              className={`w-full py-3.5 flex items-center justify-center space-x-2 text-xs uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-luxury-obsidian text-white hover:bg-luxury-crimson'
              }`}
            >
              <ShoppingBag size={14} />
              <span>
                {isAdding
                  ? 'TAILORING BAG...'
                  : justAdded
                  ? 'ADDED TO BAG'
                  : 'ADD TO SHOPPING BAG'}
              </span>
            </button>

            {/* Micro-assurances (Trust badges) */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-stone-100 text-center">
              <div className="flex flex-col items-center">
                <Truck size={14} className="text-luxury-sand mb-1" />
                <span className="text-[8px] uppercase tracking-wider text-stone-500 font-sans">White-Glove Delivery</span>
              </div>
              <div className="flex flex-col items-center">
                <Calendar size={14} className="text-luxury-sand mb-1" />
                <span className="text-[8px] uppercase tracking-wider text-stone-500 font-sans">Bespoke Fitting</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck size={14} className="text-luxury-sand mb-1" />
                <span className="text-[8px] uppercase tracking-wider text-stone-500 font-sans">Couture Archival Box</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Secondary Size Guide Overlay Modal */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <SizeGuideModal
            isOpen={isSizeGuideOpen}
            onClose={() => setIsSizeGuideOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
