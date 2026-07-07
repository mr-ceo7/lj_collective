import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Scale, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedIds: string[];
  products: Product[];
  onRemoveFromCompare: (productId: string) => void;
  onAddToBag: (product: Product, size: string) => void;
}

export default function CompareModal({
  isOpen,
  onClose,
  comparedIds,
  products,
  onRemoveFromCompare,
  onAddToBag,
}: CompareModalProps) {
  const comparedProducts = products.filter((p) => comparedIds.includes(p.id));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6 select-none">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-luxury-obsidian/45 backdrop-blur-xs"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="relative bg-luxury-pearl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl rounded-xs border border-stone-200/50 z-10"
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200/60 flex items-center justify-between bg-luxury-pearl/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center space-x-2.5">
            <Scale size={18} className="text-luxury-crimson" />
            <h3 className="font-serif text-xl tracking-wider uppercase text-luxury-obsidian font-medium">
              Silhouette Comparison
            </h3>
            <span className="text-[10px] bg-luxury-obsidian/5 px-2.5 py-0.5 rounded-full font-mono text-stone-500">
              {comparedProducts.length} Selected
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-luxury-obsidian/70 hover:text-luxury-crimson transition-colors cursor-pointer p-1.5"
            aria-label="Close comparison view"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal body (Scrollable content) */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-6">
          {comparedProducts.length === 0 ? (
            <div className="py-24 text-center">
              <Scale size={40} className="mx-auto text-stone-300 stroke-[1.2] mb-4" />
              <p className="font-serif text-lg italic text-luxury-obsidian">No silhouettes selected for comparison</p>
              <p className="text-xs text-stone-500 max-w-md mx-auto mt-2 leading-relaxed">
                Add up to 4 items from the showroom to compare textiles, origin, sizing, and pricing side-by-side.
              </p>
            </div>
          ) : (
            <table className="w-full border-collapse text-left min-w-[650px]">
              <thead>
                <tr>
                  <th className="w-[180px] p-4 border-b border-stone-200/60 font-mono text-[9px] uppercase tracking-[0.25em] text-stone-400">
                    Feature Spec
                  </th>
                  {comparedProducts.map((product) => (
                    <th key={product.id} className="p-4 border-b border-stone-200/60 relative min-w-[180px] group">
                      <button
                        onClick={() => onRemoveFromCompare(product.id)}
                        className="absolute top-2 right-2 text-stone-400 hover:text-red-500 transition-colors p-1"
                        title="Remove from comparison"
                      >
                        <Trash2 size={13} />
                      </button>
                      <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-32 bg-stone-100 overflow-hidden border border-stone-200/40 shadow-xs mb-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <h4 className="font-serif text-sm text-luxury-obsidian font-semibold leading-tight line-clamp-2 min-h-[40px]">
                          {product.name}
                        </h4>
                        <span className="text-[8px] uppercase tracking-widest font-mono text-luxury-sand mt-1 block">
                          {product.collection}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {/* Price Row */}
                <tr>
                  <td className="p-4 font-mono text-[9px] uppercase tracking-[0.2em] text-stone-500 font-semibold bg-stone-50/50">
                    Couture Price
                  </td>
                  {comparedProducts.map((product) => (
                    <td key={product.id} className="p-4 text-center font-mono text-sm text-luxury-obsidian font-bold">
                      Ksh {product.price.toLocaleString()}
                    </td>
                  ))}
                </tr>

                {/* Materials Row */}
                <tr>
                  <td className="p-4 font-mono text-[9px] uppercase tracking-[0.2em] text-stone-500 font-semibold bg-stone-50/50">
                    Textile & Materials
                  </td>
                  {comparedProducts.map((product) => (
                    <td key={product.id} className="p-4 text-xs text-stone-700 leading-relaxed max-w-[200px]">
                      {product.materials || 'Luxury custom blend textile'}
                    </td>
                  ))}
                </tr>

                {/* Origin Row */}
                <tr>
                  <td className="p-4 font-mono text-[9px] uppercase tracking-[0.2em] text-stone-500 font-semibold bg-stone-50/50">
                    Couture Origin
                  </td>
                  {comparedProducts.map((product) => (
                    <td key={product.id} className="p-4 text-xs text-stone-700 leading-relaxed font-serif italic">
                      {product.origin || 'Parisian Atelier, France'}
                    </td>
                  ))}
                </tr>

                {/* Sizing Standards Row */}
                <tr>
                  <td className="p-4 font-mono text-[9px] uppercase tracking-[0.2em] text-stone-500 font-semibold bg-stone-50/50">
                    Available Sizes
                  </td>
                  {comparedProducts.map((product) => (
                    <td key={product.id} className="p-4 text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {product.sizes.map((size) => (
                          <span
                            key={size}
                            className="px-1.5 py-0.5 border border-stone-200 text-[9px] font-mono rounded-xs text-stone-600 bg-white"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Description Row */}
                <tr>
                  <td className="p-4 font-mono text-[9px] uppercase tracking-[0.2em] text-stone-500 font-semibold bg-stone-50/50">
                    Silhouettes & Cut
                  </td>
                  {comparedProducts.map((product) => (
                    <td key={product.id} className="p-4 text-xs text-stone-600 leading-relaxed text-justify max-w-[200px]">
                      {product.description}
                    </td>
                  ))}
                </tr>

                {/* Fine Details Bullet Row */}
                <tr>
                  <td className="p-4 font-mono text-[9px] uppercase tracking-[0.2em] text-stone-500 font-semibold bg-stone-50/50">
                    Couture Crafting
                  </td>
                  {comparedProducts.map((product) => (
                    <td key={product.id} className="p-4 text-[11px] text-stone-600 max-w-[200px]">
                      <ul className="list-disc pl-4 space-y-1 text-left">
                        {product.details.slice(0, 3).map((det, idx) => (
                          <li key={idx} className="leading-snug">{det}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* CTA Action Row */}
                <tr>
                  <td className="p-4 font-mono text-[9px] uppercase tracking-[0.2em] text-stone-500 font-semibold bg-stone-50/50">
                    Action
                  </td>
                  {comparedProducts.map((product) => (
                    <td key={product.id} className="p-4 text-center">
                      <button
                        onClick={() => {
                          onAddToBag(product, product.sizes[0]);
                          onClose();
                        }}
                        className="px-4 py-2 bg-luxury-obsidian hover:bg-luxury-crimson text-luxury-pearl text-[9px] uppercase tracking-widest font-mono transition-colors rounded-xs flex items-center justify-center space-x-1.5 mx-auto cursor-pointer"
                      >
                        <ShoppingBag size={11} />
                        <span>Add Bag ({product.sizes[0]})</span>
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-stone-200/60 bg-stone-50 text-center">
          <p className="text-[10px] text-stone-500 font-mono">
            LJ Collective side-by-side design assessment • Est. 2024 Paris
          </p>
        </div>
      </motion.div>
    </div>
  );
}
