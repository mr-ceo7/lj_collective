import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Plus, ShoppingBag, Heart, Scale, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';
import FilterDrawer from './FilterDrawer';

interface ShowroomProps {
  products: Product[];
  selectedCategory: string;
  selectedCollection: string;
  searchQuery: string;
  onSelectCategory: (category: string) => void;
  onSelectCollection: (collection: string) => void;
  onQuickView: (product: Product) => void;
  onAddToBag: (product: Product, size: string) => boolean;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  comparedIds: string[];
  onToggleCompare: (productId: string) => void;
}

export default function Showroom({
  products,
  selectedCategory,
  selectedCollection,
  searchQuery,
  onSelectCategory,
  onSelectCollection,
  onQuickView,
  onAddToBag,
  wishlist,
  onToggleWishlist,
  comparedIds,
  onToggleCompare,
}: ShowroomProps) {
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  // Advanced filter states
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Filters logic
  const filteredProducts = products.filter((product) => {
    // Category match
    const categoryMatch =
      selectedCategory === 'all' || product.category === selectedCategory;

    // Collection match
    const collectionMatch =
      selectedCollection === 'all' || product.collection === selectedCollection;

    // Search query match
    const searchMatch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.collection.toLowerCase().includes(searchQuery.toLowerCase());

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

    return categoryMatch && collectionMatch && searchMatch && priceMatch && materialMatch;
  });

  const categoriesList = [
    { id: 'all', name: 'All Masterpieces' },
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

  const handleClearFilters = () => {
    onSelectCategory('all');
    onSelectCollection('all');
    setMaxPrice(6000);
    setSelectedMaterials([]);
  };

  return (
    <section id="showroom" className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-luxury-pearl border-t border-stone-200/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 gap-6"
        >
          <div>
            <span className="mono-label text-luxury-crimson block mb-2">The Collection Showroom</span>
            <h2 className="font-serif text-3xl md:text-5xl text-luxury-obsidian tracking-wide font-light">
              Interactive Catalog
            </h2>
          </div>
          
          {/* Active Filter Indicators */}
          {(selectedCategory !== 'all' || selectedCollection !== 'all' || searchQuery) && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-luxury-crimson hover:text-luxury-obsidian transition-colors border-b border-luxury-crimson/50 pb-0.5"
            >
              Clear Active Filters
            </button>
          )}
        </motion.div>

        {/* Filters Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-white/10 pb-4 lg:pb-6 mb-8 lg:mb-12 gap-4 lg:gap-6 w-full min-w-0"
        >
          {/* Category Tabs */}
          <div className="flex flex-nowrap overflow-x-auto pb-3 lg:pb-0 w-full min-w-0 lg:w-auto scrollbar-none gap-2.5 flex-shrink-0">
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-5 py-3 text-xs uppercase tracking-widest transition-all whitespace-nowrap rounded-full cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'clay-btn-active font-semibold shadow-md'
                    : 'clay-btn text-luxury-obsidian/85 hover:text-luxury-obsidian'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Collection Filter & Advanced Refinement */}
          <div className="flex flex-row items-center justify-between lg:justify-end gap-6 w-full lg:w-auto pt-2 lg:pt-0 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] uppercase tracking-widest text-luxury-obsidian/60 font-mono">Collection:</span>
              <select
                value={selectedCollection}
                onChange={(e) => onSelectCollection(e.target.value)}
                className="bg-transparent border-b border-stone-300 py-1.5 px-3 text-xs uppercase tracking-widest text-luxury-obsidian focus:outline-none focus:border-luxury-obsidian cursor-pointer font-medium"
              >
                {collectionsList.map((col) => (
                  <option key={col.id} value={col.id} className="text-luxury-obsidian font-sans bg-luxury-pearl normal-case">
                    {col.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              id="showroom-refine-btn"
              onClick={() => setIsFilterDrawerOpen(true)}
              className="flex items-center space-x-2 px-5 py-2.5 border border-white/10 hover:border-luxury-crimson/50 text-luxury-obsidian hover:text-luxury-crimson text-xs font-mono uppercase tracking-widest transition-all rounded-full cursor-pointer bg-white/5 backdrop-blur-xs shadow-xs"
            >
              <SlidersHorizontal size={12} className="text-luxury-crimson" />
              <span>Refine</span>
              {(maxPrice < 6000 || selectedMaterials.length > 0) && (
                <span className="w-1.5 h-1.5 rounded-full bg-luxury-crimson animate-ping" />
              )}
            </button>
          </div>
        </motion.div>

        {/* Search status summary */}
        {searchQuery && (
          <div className="mb-8 text-xs tracking-wider text-stone-500">
            Showing results for: <span className="font-serif italic text-luxury-obsidian font-bold">"{searchQuery}"</span> ({filteredProducts.length} items found)
          </div>
        )}

        {/* Products Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center flex flex-col items-center justify-center border border-dashed border-stone-200 rounded-sm"
            >
              <p className="font-serif text-lg text-stone-400 italic mb-3">No silhouettes found matching your request.</p>
              <button
                onClick={handleClearFilters}
                className="px-6 py-2 bg-luxury-obsidian hover:bg-luxury-crimson hover:text-white text-[10px] text-luxury-pearl uppercase tracking-widest transition-colors font-medium"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-8 gap-y-10 sm:gap-y-16 lg:gap-y-24"
            >
              {filteredProducts.map((product, index) => {
                const isHovered = hoveredProductId === product.id;
                const isWishlisted = wishlist.includes(product.id);
                const isCompared = comparedIds.includes(product.id);

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ 
                      duration: 0.8, 
                      ease: [0.16, 1, 0.3, 1],
                      delay: Math.min((index % 4) * 0.08, 0.4) // Subtle stagger based on grid column
                    }}
                    onMouseEnter={() => setHoveredProductId(product.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                    className={`group flex flex-col justify-between ${index % 2 === 1 ? 'lg:translate-y-12' : ''}`}
                  >
                    {/* Visual Container */}
                    <div className="relative w-full aspect-[3/4] bg-stone-100 overflow-hidden border border-stone-200/20 shadow-xs mb-4">
                      {/* Interactive Zoom/Switch Overlay */}
                      <div className="w-full h-full relative cursor-pointer" onClick={() => onQuickView(product)}>
                        {/* Primary Image */}
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className={`w-full h-full object-cover img-editorial ${
                            isHovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
                          }`}
                        />
                        {/* Secondary Image (Fades in on hover) */}
                        <img
                          src={product.images[1]}
                          alt={`${product.name} alternate angle`}
                          referrerPolicy="no-referrer"
                          className={`absolute inset-0 w-full h-full object-cover img-editorial ${
                            isHovered ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                          }`}
                        />
                      </div>

                      {/* Floating Elegant Wishlist Toggle Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(product.id);
                        }}
                        className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full clay-btn flex items-center justify-center text-luxury-obsidian cursor-pointer group/heart"
                        aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
                      >
                        <Heart
                          size={13}
                          className={`transition-all duration-300 ${
                            isWishlisted
                              ? 'text-red-500 fill-red-500 scale-110'
                              : 'text-stone-500 group-hover/heart:text-red-500 scale-100'
                          }`}
                        />
                      </button>

                      {/* Collection / Category Badge */}
                      <div className="absolute top-4 left-4 flex flex-col space-y-1.5 pointer-events-none">
                        <span className="px-2 py-1 bg-luxury-pearl/90 border border-white/10 text-[8px] uppercase tracking-widest text-luxury-obsidian font-mono shadow-xs">
                          {product.collection}
                        </span>
                        {product.featured && (
                          <span className="px-2 py-1 bg-luxury-sand border border-luxury-sand-dark/25 text-stone-950 text-[8px] uppercase tracking-widest font-mono font-bold text-center shadow-xs">
                            Atelier Focus
                          </span>
                        )}
                      </div>

                      {/* Hover Interaction Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-2 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-row items-center justify-between opacity-100 sm:opacity-0 sm:group-hover:opacity-100 translate-y-0 sm:translate-y-2 sm:group-hover:translate-y-0 transition-all duration-300 gap-1 sm:gap-2 z-10">
                        <button
                          onClick={() => onQuickView(product)}
                          className="flex items-center justify-center space-x-1 px-2 py-1.5 sm:px-3.5 sm:py-2 bg-[#0F0F0F]/65 hover:bg-[#0F0F0F]/90 border border-white/15 text-[8px] sm:text-[10px] uppercase tracking-widest text-white font-semibold transition-all rounded-full cursor-pointer backdrop-blur-xs shrink-0"
                        >
                          <Eye size={10} className="sm:w-3 sm:h-3" />
                          <span>Quick View</span>
                        </button>
                        
                        <button
                          onClick={() => onAddToBag(product, product.sizes[0])}
                          disabled={product.stock <= 0}
                          className="flex items-center justify-center space-x-1 px-2 py-1.5 sm:px-3.5 sm:py-2 bg-luxury-obsidian text-luxury-pearl hover:bg-luxury-sand hover:text-white disabled:bg-stone-600 disabled:text-stone-400 text-[8px] sm:text-[10px] uppercase tracking-widest font-bold transition-all rounded-full cursor-pointer shadow-sm shrink-0"
                        >
                          <Plus size={10} className="sm:w-3 sm:h-3" />
                          <span>{product.stock > 0 ? 'Add Bag' : 'Reserved'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Metadata Detail Block */}
                    <div className="flex flex-col">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-0">
                        <h3 className="font-serif text-xs sm:text-base text-luxury-obsidian group-hover:text-luxury-sand-light transition-colors duration-300 font-medium">
                          <button onClick={() => onQuickView(product)} className="text-left focus:outline-none">
                            {product.name}
                          </button>
                        </h3>
                        <span className="text-sm sm:text-base font-semibold text-luxury-obsidian font-mono">
                          Ksh {product.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 border-t border-white/10 pt-2 items-start gap-1 sm:gap-0">
                        <span className="text-[9px] sm:text-[11px] uppercase tracking-widest text-luxury-sand-light/90 font-mono font-medium">
                          {product.category.replace('-', ' ')}
                        </span>
                        
                        {/* Compare Toggle Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleCompare(product.id);
                          }}
                          className={`text-[9px] sm:text-[10px] uppercase tracking-widest font-mono flex items-center space-x-1 px-2.5 py-1 border rounded-full transition-all duration-300 cursor-pointer ${
                            isCompared
                              ? 'bg-luxury-sand/20 border-luxury-sand text-luxury-sand font-medium'
                              : 'bg-white/5 border-white/15 text-luxury-obsidian/75 hover:bg-white/10 hover:border-luxury-sand/40 hover:text-luxury-sand'
                          }`}
                        >
                          <Scale size={10} className={isCompared ? 'text-luxury-sand animate-pulse' : 'text-luxury-obsidian/50'} />
                          <span>{isCompared ? 'Compared' : 'Compare'}</span>
                        </button>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-1.5 text-[9px] sm:text-[11px] text-luxury-obsidian/60 font-mono gap-0.5 sm:gap-0">
                        <span>Sizes:</span>
                        <span>{product.sizes.join(', ')}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 text-[8px] sm:text-[10px] uppercase tracking-wider font-mono gap-1 sm:gap-0">
                        <span className={product.stock <= 3 ? 'text-red-500 font-bold' : 'text-luxury-obsidian/60'}>
                          {product.stock > 0 ? `${product.stock} available` : 'Fully reserved'}
                        </span>
                        <span className="text-luxury-obsidian/45">Insured delivery</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Advanced Filter Slide-out Drawer */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <FilterDrawer
            isOpen={isFilterDrawerOpen}
            onClose={() => setIsFilterDrawerOpen(false)}
            products={products}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            selectedCollection={selectedCollection}
            onSelectCollection={onSelectCollection}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            selectedMaterials={selectedMaterials}
            setSelectedMaterials={setSelectedMaterials}
            onClearFilters={handleClearFilters}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
