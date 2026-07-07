import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, Menu, X, User, ArrowRight, Heart } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onCartToggle: () => void;
  onSearchQuery: (query: string) => void;
  onSelectCategory: (category: string) => void;
  onSelectCollection: (collection: string) => void;
  wishlistCount: number;
  onWishlistToggle: () => void;
}

export default function Header({
  cart,
  onCartToggle,
  onSearchQuery,
  onSelectCategory,
  onSelectCollection,
  wishlistCount,
  onWishlistToggle,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll detection for hiding/showing header and setting background
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Transparent to dark/frosted background after 50px
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchQuery(searchValue);
    setIsSearchOpen(false);
  };

  const handleNavClick = (type: 'category' | 'collection', value: string) => {
    if (type === 'category') {
      onSelectCategory(value);
    } else {
      onSelectCollection(value);
    }
    setIsMobileMenuOpen(false);
    
    // Scroll smoothly to showroom
    const showroomElement = document.getElementById('showroom');
    if (showroomElement) {
      showroomElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <motion.header
        id="main-header"
        initial={{ y: 0, opacity: 0 }}
        animate={{ 
          y: isHeaderVisible ? 0 : -100, 
          opacity: 1,
          backgroundColor: isScrolled ? 'rgba(15, 15, 15, 0.85)' : 'rgba(15, 15, 15, 0)',
          borderBottomColor: isScrolled ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0)'
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 px-6 py-1 md:px-12 border-b shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
        style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 md:h-20 relative">
          
          {/* Left Side: Desktop Nav (left half) & Mobile Menu Icon */}
          <div className="flex-1 flex justify-start items-center">
            {/* Mobile Menu Icon */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-luxury-obsidian hover:text-luxury-crimson p-1 transition-colors duration-300"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>

            {/* Left Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8" id="desktop-nav-left">
              <button
                onClick={() => handleNavClick('category', 'all')}
                className="relative text-xs uppercase tracking-widest text-luxury-obsidian/80 hover:text-luxury-crimson transition-all duration-500 ease-out hover:tracking-[0.2em] cursor-pointer font-medium group py-2"
              >
                All Items
                <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-luxury-crimson transition-all duration-350 ease-out -translate-x-1/2 group-hover:w-full"></span>
              </button>
              
              <div className="relative group">
                <button className="relative text-xs uppercase tracking-widest text-luxury-obsidian/80 hover:text-luxury-crimson transition-all duration-500 ease-out hover:tracking-[0.2em] cursor-pointer font-medium group py-2">
                  Collections
                  <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-luxury-crimson transition-all duration-350 ease-out -translate-x-1/2 group-hover:w-full"></span>
                </button>
                
                {/* Collections Dropdown */}
                <div className="absolute left-0 top-full pt-4 opacity-0 -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50">
                  <div className="clay-card p-5 w-52 shadow-2xl flex flex-col space-y-3.5 rounded-sm">
                    <button
                      onClick={() => handleNavClick('collection', 'Summer Atelier')}
                      className="text-left text-xs uppercase tracking-widest text-luxury-obsidian/70 hover:text-luxury-crimson hover:translate-x-1.5 transition-all duration-300 cursor-pointer flex items-center justify-between group/item"
                    >
                      <span>Summer Atelier</span>
                      <ArrowRight size={10} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 text-luxury-crimson" />
                    </button>
                    <button
                      onClick={() => handleNavClick('collection', 'Winter Silhouette')}
                      className="text-left text-xs uppercase tracking-widest text-luxury-obsidian/70 hover:text-luxury-crimson hover:translate-x-1.5 transition-all duration-300 cursor-pointer flex items-center justify-between group/item"
                    >
                      <span>Winter Silhouette</span>
                      <ArrowRight size={10} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 text-luxury-crimson" />
                    </button>
                    <button
                      onClick={() => handleNavClick('collection', 'Essential Classic')}
                      className="text-left text-xs uppercase tracking-widest text-luxury-obsidian/70 hover:text-luxury-crimson hover:translate-x-1.5 transition-all duration-300 cursor-pointer flex items-center justify-between group/item"
                    >
                      <span>Essential Classic</span>
                      <ArrowRight size={10} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 text-luxury-crimson" />
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleNavClick('category', 'jewelry')}
                className="relative text-xs uppercase tracking-widest text-luxury-obsidian/80 hover:text-luxury-crimson transition-all duration-500 ease-out hover:tracking-[0.2em] cursor-pointer font-medium group py-2"
              >
                Jewelry
                <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-luxury-crimson transition-all duration-350 ease-out -translate-x-1/2 group-hover:w-full"></span>
              </button>

              <button
                onClick={() => handleNavClick('category', 'accessories')}
                className="relative text-xs uppercase tracking-widest text-luxury-obsidian/80 hover:text-luxury-crimson transition-all duration-500 ease-out hover:tracking-[0.2em] cursor-pointer font-medium group py-2"
              >
                Accessories
                <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-luxury-crimson transition-all duration-350 ease-out -translate-x-1/2 group-hover:w-full"></span>
              </button>
            </nav>
          </div>

          {/* Centered Logo */}
          <div className="flex flex-col items-center select-none text-center absolute left-1/2 -translate-x-1/2 z-10">
            <button
              onClick={() => {
                onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="transition-colors"
            >
              <img src="/assets/logo-transparent.png" alt="LJ Collective" className="h-14 md:h-22 w-auto object-contain transition-transform duration-500 hover:scale-105" />
            </button>
          </div>

          {/* Right Side: Desktop Nav (right half) & Utilities */}
          <div className="flex-1 flex justify-end items-center space-x-8 md:space-x-10">
            {/* Right Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8" id="desktop-nav-right">
              <button
                onClick={() => handleNavClick('category', 'haute-couture')}
                className="relative text-xs uppercase tracking-widest text-luxury-obsidian/80 hover:text-luxury-crimson transition-all duration-500 ease-out hover:tracking-[0.25em] cursor-pointer font-medium group py-2"
              >
                Haute Couture
                <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-luxury-crimson transition-all duration-355 ease-out -translate-x-1/2 group-hover:w-full"></span>
              </button>
              
              <button
                onClick={() => handleNavClick('category', 'ready-to-wear')}
                className="relative text-xs uppercase tracking-widest text-luxury-obsidian/80 hover:text-luxury-crimson transition-all duration-500 ease-out hover:tracking-[0.25em] cursor-pointer font-medium group py-2"
              >
                Ready-To-Wear
                <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-luxury-crimson transition-all duration-355 ease-out -translate-x-1/2 group-hover:w-full"></span>
              </button>
            </nav>

            {/* Right Utility Icons */}
            <div className="flex items-center space-x-5 md:space-x-6" id="header-utilities">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-luxury-obsidian hover:text-luxury-crimson transition-colors duration-300 cursor-pointer"
                aria-label="Open search panel"
              >
                <Search size={20} />
              </button>
              
              <div className="hidden md:block relative group">
                <button 
                  className="text-luxury-obsidian hover:text-luxury-crimson transition-colors duration-300 cursor-pointer flex items-center space-x-1"
                  aria-label="Client account space"
                >
                  <User size={20} />
                </button>
                
                {/* Account Dropdown */}
                <div className="absolute right-0 top-full pt-4 opacity-0 -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50">
                  <div className="clay-card p-5 w-64 shadow-2xl flex flex-col rounded-sm">
                    <div className="border-b border-white/10 pb-3 mb-3">
                      <span className="mono-label text-luxury-crimson">Maison Elite</span>
                      <p className="font-serif text-sm font-medium text-luxury-obsidian mt-1 font-semibold">Madame de Beauvoir</p>
                      <p className="text-[10px] text-luxury-obsidian/45 font-mono mt-0.5">collector_id: #LJC-99082</p>
                    </div>
                    <div className="flex flex-col space-y-2 text-xs">
                      <button className="text-left text-luxury-obsidian/85 hover:text-luxury-crimson hover:translate-x-1.5 transition-all duration-300 ease-out">Bespoke Fitting Schedule</button>
                      <button className="text-left text-luxury-obsidian/85 hover:text-luxury-crimson hover:translate-x-1.5 transition-all duration-300 ease-out">My Wardrobe / Orders</button>
                      <a href="https://wa.me/254725220195" target="_blank" rel="noopener noreferrer" className="text-left text-luxury-obsidian/85 hover:text-luxury-sand hover:translate-x-1.5 transition-all duration-300 ease-out">Atelier Concierge Chat</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wishlist Button */}
              <button
                id="header-wishlist-btn"
                onClick={onWishlistToggle}
                className="relative text-luxury-obsidian hover:text-luxury-crimson transition-all duration-300 cursor-pointer flex items-center p-1"
                aria-label="Open wishlist"
              >
                <Heart size={20} className={wishlistCount > 0 ? "fill-luxury-crimson text-luxury-crimson stroke-luxury-crimson" : ""} />
                <AnimatePresence>
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-luxury-crimson text-white text-[9px] font-mono w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold shadow-md"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button
                id="header-bag-btn"
                onClick={onCartToggle}
                className="relative text-luxury-obsidian hover:text-luxury-crimson transition-all duration-300 cursor-pointer flex items-center p-1"
                aria-label="Open bag"
              >
                <ShoppingBag size={20} />
                <AnimatePresence>
                  {totalCartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-luxury-obsidian text-luxury-pearl text-[9px] font-mono w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold shadow-md"
                    >
                      {totalCartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Floating Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-luxury-pearl/98 backdrop-blur-2xl z-50 flex flex-col justify-center px-6 md:px-24"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 text-luxury-obsidian hover:text-luxury-crimson transition-colors duration-300 cursor-pointer"
              aria-label="Close search"
            >
              <X size={28} />
            </button>

            <div className="max-w-4xl mx-auto w-full">
              <span className="mono-label text-luxury-crimson block mb-4">Discover the Atelier</span>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="SEARCH THE COLLECTIONS..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full bg-transparent border-b border-luxury-obsidian/20 focus:border-luxury-crimson py-4 text-xl md:text-3xl font-serif text-luxury-obsidian focus:outline-none placeholder-luxury-obsidian/30 transition-all duration-500 focus:shadow-[0_4px_20px_-10px_rgba(113,0,20,0.4)]"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-4 text-luxury-obsidian hover:text-luxury-crimson transition-colors duration-300 cursor-pointer"
                  aria-label="Submit search query"
                >
                  <ArrowRight size={24} />
                </button>
              </form>
              
              <div className="mt-8">
                <p className="text-xs uppercase tracking-widest text-luxury-obsidian/50 mb-3">Suggested Keywords:</p>
                <div className="flex flex-wrap gap-2">
                  {['Gown', 'Trench', 'Pleated', '18K Gold', 'Silk', 'Accessories'].map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => {
                        setSearchValue(kw);
                        onSearchQuery(kw);
                        setIsSearchOpen(false);
                      }}
                      className="px-4 py-2 border border-white/10 hover:border-luxury-crimson hover:bg-white/5 text-[11px] uppercase tracking-wider text-luxury-obsidian/80 hover:text-luxury-obsidian transition-all duration-355 rounded-full cursor-pointer"
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
            />
            
            {/* Navigation Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-[360px] bg-luxury-pearl/98 backdrop-blur-xl border-r border-white/5 shadow-2xl z-50 p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
                  <span className="font-serif tracking-[0.2em] font-bold text-luxury-obsidian">LJ Collective</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-luxury-obsidian hover:text-luxury-crimson transition-colors duration-300">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col space-y-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-luxury-crimson block mb-2 font-semibold">Shop Categories</span>
                    <div className="flex flex-col space-y-4">
                      <button
                        onClick={() => handleNavClick('category', 'all')}
                        className="text-left font-serif text-lg text-luxury-obsidian hover:text-luxury-crimson transition-colors duration-300"
                      >
                        All Masterpieces
                      </button>
                      <button
                        onClick={() => handleNavClick('category', 'haute-couture')}
                        className="text-left font-serif text-lg text-luxury-obsidian hover:text-luxury-crimson transition-colors duration-300"
                      >
                        Haute Couture
                      </button>
                      <button
                        onClick={() => handleNavClick('category', 'ready-to-wear')}
                        className="text-left font-serif text-lg text-luxury-obsidian hover:text-luxury-crimson transition-colors duration-300"
                      >
                        Ready-To-Wear
                      </button>
                      <button
                        onClick={() => handleNavClick('category', 'jewelry')}
                        className="text-left font-serif text-lg text-luxury-obsidian hover:text-luxury-crimson transition-colors duration-300"
                      >
                        Jewelry
                      </button>
                      <button
                        onClick={() => handleNavClick('category', 'accessories')}
                        className="text-left font-serif text-lg text-luxury-obsidian hover:text-luxury-crimson transition-colors duration-300"
                      >
                        Accessories
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-luxury-crimson block mb-2 font-semibold">Our Collections</span>
                    <div className="flex flex-col space-y-3">
                      <button
                        onClick={() => handleNavClick('collection', 'Summer Atelier')}
                        className="text-left text-sm text-luxury-obsidian/80 hover:text-luxury-crimson transition-colors duration-300"
                      >
                        Summer Atelier
                      </button>
                      <button
                        onClick={() => handleNavClick('collection', 'Winter Silhouette')}
                        className="text-left text-sm text-luxury-obsidian/80 hover:text-luxury-crimson transition-colors duration-300"
                      >
                        Winter Silhouette
                      </button>
                      <button
                        onClick={() => handleNavClick('collection', 'Essential Classic')}
                        className="text-left text-sm text-luxury-obsidian/80 hover:text-luxury-crimson transition-colors duration-300"
                      >
                        Essential Classic
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Footer Info */}
              <div className="border-t border-white/10 pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <User size={14} className="text-luxury-obsidian" />
                  </div>
                  <div>
                    <p className="text-xs font-serif font-medium text-luxury-obsidian">Madame de Beauvoir</p>
                    <span className="text-[9px] uppercase tracking-[0.1em] text-luxury-crimson font-mono font-semibold">Maison Elite</span>
                  </div>
                </div>
                <p className="text-[9px] text-luxury-obsidian/40 uppercase tracking-widest text-center mt-2">© LJ Collective 2026</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
