import React from 'react';
import { motion } from 'motion/react';
import { X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedCollection: string;
  onSelectCollection: (collection: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  selectedMaterials: string[];
  setSelectedMaterials: (materials: string[]) => void;
  onClearFilters: () => void;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  products,
  selectedCategory,
  onSelectCategory,
  selectedCollection,
  onSelectCollection,
  maxPrice,
  setMaxPrice,
  selectedMaterials,
  setSelectedMaterials,
  onClearFilters,
}: FilterDrawerProps) {
  if (!isOpen) return null;

  const categoriesList = [
    { id: 'all', name: 'All Categories' },
    { id: 'haute-couture', name: 'Haute Couture' },
    { id: 'ready-to-wear', name: 'Ready-To-Wear' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'jewelry', name: 'Fine Jewelry' },
  ];

  const collectionsList = [
    { id: 'all', name: 'All Collections' },
    { id: 'Summer Atelier', name: 'Summer Atelier' },
    { id: 'Winter Silhouette', name: 'Winter Silhouette' },
    { id: 'Essential Classic', name: 'Essential Classic' },
  ];

  const materialsList = [
    { id: 'silk', name: 'Mulberry Silk' },
    { id: 'wool', name: 'Virgin Wool / Cashmere' },
    { id: 'satin', name: 'Japanese Satin' },
    { id: 'gold', name: '18K Yellow Gold' },
  ];

  // Calculate live matches for the filters selected inside the drawer
  const matchedCount = products.filter((product) => {
    // Category match
    const categoryMatch =
      selectedCategory === 'all' || product.category === selectedCategory;

    // Collection match
    const collectionMatch =
      selectedCollection === 'all' || product.collection === selectedCollection;

    // Price match
    const priceMatch = product.price <= maxPrice;

    // Material match
    const materialMatch =
      selectedMaterials.length === 0 ||
      selectedMaterials.some((mat) => {
        const query = mat.toLowerCase();
        return (
          product.materials?.toLowerCase().includes(query) ||
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.details.some((d) => d.toLowerCase().includes(query))
        );
      });

    return categoryMatch && collectionMatch && priceMatch && materialMatch;
  }).length;

  const handleMaterialToggle = (materialId: string) => {
    if (selectedMaterials.includes(materialId)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== materialId));
    } else {
      setSelectedMaterials([...selectedMaterials, materialId]);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] pointer-events-none select-none">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-luxury-obsidian/40 backdrop-blur-xs pointer-events-auto"
      />

      {/* Drawer Container */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 200 }}
        className="absolute top-0 left-0 h-full w-full max-w-md bg-luxury-pearl border-r border-stone-200/50 shadow-2xl flex flex-col justify-between pointer-events-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200/60 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal size={14} className="text-luxury-crimson" />
            <h3 className="font-serif text-lg tracking-wider uppercase text-luxury-obsidian font-medium">
              Refine Showroom
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-luxury-obsidian/70 hover:text-luxury-crimson transition-colors cursor-pointer p-1"
            aria-label="Close filters"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-none space-y-8">
          {/* Category Filter */}
          <div className="space-y-3">
            <h4 className="font-mono text-[9px] uppercase tracking-widest text-stone-400">
              Couture Category
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3 py-2 text-[10px] uppercase tracking-wider text-left transition-all rounded-lg cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'clay-btn-active font-medium'
                      : 'clay-btn text-luxury-obsidian/80'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Collection Filter */}
          <div className="space-y-3">
            <h4 className="font-mono text-[9px] uppercase tracking-widest text-stone-400">
              Seasonal Collection
            </h4>
            <div className="flex flex-col space-y-1.5">
              {collectionsList.map((col) => (
                <button
                  key={col.id}
                  onClick={() => onSelectCollection(col.id)}
                  className={`w-full text-left px-3 py-2 text-[11px] flex items-center justify-between transition-all rounded-xs border cursor-pointer ${
                    selectedCollection === col.id
                      ? 'bg-stone-100 text-luxury-obsidian border-luxury-crimson/50 font-medium'
                      : 'border-transparent hover:bg-stone-50 text-stone-600 hover:text-luxury-obsidian'
                  }`}
                >
                  <span>{col.name}</span>
                  {selectedCollection === col.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-crimson animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-mono text-[9px] uppercase tracking-widest text-stone-400">
                Price Cap (Ksh)
              </h4>
              <span className="font-mono text-xs font-bold text-luxury-crimson">
                Ksh {maxPrice.toLocaleString()}
              </span>
            </div>
            <div className="space-y-2">
              <input
                type="range"
                min="500"
                max="6000"
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-luxury-crimson"
              />
              <div className="flex justify-between font-mono text-[9px] text-stone-400">
                <span>Ksh 500</span>
                <span>Ksh 3,000</span>
                <span>Ksh 6,000</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[2500, 4000, 6000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setMaxPrice(preset)}
                  className={`px-2.5 py-1 text-[9px] font-mono rounded-xs border cursor-pointer transition-all ${
                    maxPrice === preset
                      ? 'bg-luxury-crimson/10 border-luxury-crimson text-luxury-crimson-light font-medium'
                      : 'border-stone-200 text-stone-500 hover:border-stone-300'
                  }`}
                >
                  &lt; Ksh {preset.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Textile / Material Filter */}
          <div className="space-y-3">
            <h4 className="font-mono text-[9px] uppercase tracking-widest text-stone-400">
              Luxury Textiles & Alloys
            </h4>
            <div className="flex flex-col space-y-2">
              {materialsList.map((material) => {
                const isChecked = selectedMaterials.includes(material.id);
                return (
                  <button
                    key={material.id}
                    onClick={() => handleMaterialToggle(material.id)}
                    className={`flex items-center space-x-3 p-2.5 rounded-xs border text-left transition-all cursor-pointer ${
                      isChecked
                        ? 'border-luxury-crimson/50 bg-luxury-crimson/5 text-luxury-obsidian'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 border flex items-center justify-center rounded-xs transition-colors ${
                        isChecked
                          ? 'border-luxury-crimson bg-luxury-crimson text-white'
                          : 'border-stone-300 bg-white'
                      }`}
                    >
                      {isChecked && <Sparkles size={8} />}
                    </div>
                    <span className="text-[11px] font-mono tracking-wider">
                      {material.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer with CTA */}
        <div className="p-6 border-t border-stone-200/60 bg-stone-50/50 flex items-center space-x-4">
          <button
            onClick={() => {
              onClearFilters();
              setMaxPrice(6000);
              setSelectedMaterials([]);
            }}
            className="flex-1 py-3 text-[10px] uppercase tracking-widest font-mono text-stone-500 hover:text-luxury-obsidian transition-colors cursor-pointer border border-transparent hover:border-stone-300 rounded-xs"
          >
            Reset All
          </button>
          <button
            onClick={onClose}
            className="flex-[2] py-3 bg-luxury-obsidian hover:bg-luxury-crimson text-luxury-pearl text-[10px] uppercase tracking-widest font-mono transition-colors font-bold rounded-xs cursor-pointer shadow-md text-center"
          >
            Show {matchedCount} Masterpieces
          </button>
        </div>
      </motion.div>
    </div>
  );
}
