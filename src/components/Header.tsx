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
          backgroundColor: isScrolled ? 'rgba(242, 241, 237, 0.95)' : 'rgba(242, 241, 237, 0.85)',
          borderBottomColor: 'rgba(22, 22, 22, 0.08)'
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 px-6 py-1 md:px-12 border-b shadow-[0_2px_20px_-5px_rgba(22,22,22,0.03)]"
        style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 md:h-20">
          
          {/* Mobile Menu Icon */}
          <button
            id="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-luxury-obsidian hover:text-luxury-crimson p-1"
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" id="desktop-nav">
            <button
              onClick={() => handleNavClick('category', 'all')}
              className="text-xs uppercase tracking-widest text-luxury-obsidian/80 hover:text-luxury-crimson transition-all duration-500 ease-out hover:tracking-[0.25em] cursor-pointer font-medium"
            >
              All Items
            </button>
            <div className="relative group">
              <button className="text-xs uppercase tracking-widest text-luxury-obsidian/80 hover:text-luxury-crimson transition-all duration-500 ease-out hover:tracking-[0.25em] cursor-pointer font-medium">
                Collections
              </button>
              <div className="absolute left-0 top-full pt-4 hidden group-hover:block">
                <div className="bg-luxury-pearl border border-luxury-obsidian/10 p-4 w-48 shadow-2xl flex flex-col space-y-3">
                  <button
                    onClick={() => handleNavClick('collection', 'Summer Atelier')}
                    className="text-left text-xs uppercase tracking-widest text-luxury-obsidian/70 hover:text-luxury-crimson hover:translate-x-1.5 transition-all duration-300 cursor-pointer"
                  >
                    Summer Atelier
                  </button>
                  <button
                    onClick={() => handleNavClick('collection', 'Winter Silhouette')}
                    className="text-left text-xs uppercase tracking-widest text-luxury-obsidian/70 hover:text-luxury-crimson hover:translate-x-1.5 transition-all duration-300 cursor-pointer"
                  >
                    Winter Silhouette
                  </button>
                  <button
                    onClick={() => handleNavClick('collection', 'Essential Classic')}
                    className="text-left text-xs uppercase tracking-widest text-luxury-obsidian/70 hover:text-luxury-crimson hover:translate-x-1.5 transition-all duration-300 cursor-pointer"
                  >
                    Essential Classic
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleNavClick('category', 'haute-couture')}
              className="text-xs uppercase tracking-widest text-luxury-obsidian/80 hover:text-luxury-crimson transition-all duration-500 ease-out hover:tracking-[0.25em] cursor-pointer font-medium"
            >
              Haute Couture
            </button>
            <button
              onClick={() => handleNavClick('category', 'ready-to-wear')}
              className="text-xs uppercase tracking-widest text-luxury-obsidian/80 hover:text-luxury-crimson transition-all duration-500 ease-out hover:tracking-[0.25em] cursor-pointer font-medium"
            >
              Ready-To-Wear
            </button>
          </nav>

          {/* Logo */}
          <div className="flex flex-col items-center select-none text-center md:absolute md:left-1/2 md:-translate-x-1/2">
            <button
              onClick={() => {
                onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="transition-colors"
            >
              <img src="/assets/logo-transparent.png" alt="LJ Collective" className="h-10 md:h-12 w-auto" />
            </button>
            <span className="hidden md:block text-[8px] uppercase tracking-[0.3em] text-luxury-crimson-light mt-1 font-display font-medium">
              Elegance tailored for you
            </span>
          </div>

          {/* Right Utility Icons */}
          <div className="flex items-center space-x-6" id="header-utilities">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-luxury-obsidian hover:text-luxury-crimson transition-colors cursor-pointer"
              aria-label="Open search panel"
            >
              <Search size={20} />
            </button>
            
            <div className="hidden md:block relative group">
              <button 
                className="text-luxury-obsidian hover:text-luxury-crimson transition-colors cursor-pointer flex items-center space-x-1"
                aria-label="Client account space"
              >
                <User size={20} />
              </button>
              {/* Account Dropdown */}
              <div className="absolute right-0 top-full pt-4 hidden group-hover:block">
                <div className="bg-[#F2F1ED] border border-stone-200/60 p-5 w-64 shadow-xl flex flex-col">
                  <div className="border-b border-stone-200/60 pb-3 mb-3">
                    <span className="mono-label text-luxury-crimson">Maison Elite</span>
                    <p className="font-serif text-sm font-medium text-luxury-obsidian mt-1">Madame de Beauvoir</p>
                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">collector_id: #LJC-99082</p>
                  </div>
                  <div className="flex flex-col space-y-2 text-xs">
                    <button className="text-left text-luxury-obsidian/80 hover:text-luxury-crimson transition-colors">Bespoke Fitting Schedule</button>
                    <button className="text-left text-luxury-obsidian/80 hover:text-luxury-crimson transition-colors">My Wardrobe / Orders</button>
                    <button className="text-left text-luxury-obsidian/80 hover:text-luxury-crimson transition-colors">Atelier Concierge Chat</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Wishlist Button */}
            <button
              id="header-wishlist-btn"
              onClick={onWishlistToggle}
              className="relative text-luxury-obsidian hover:text-luxury-crimson transition-all cursor-pointer flex items-center p-1"
              aria-label="Open wishlist"
            >
              <Heart size={20} className={wishlistCount > 0 ? "fill-red-500 text-red-500 stroke-red-500" : ""} />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-luxury-crimson text-white text-[9px] font-mono w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              id="header-bag-btn"
              onClick={onCartToggle}
              className="relative text-luxury-obsidian hover:text-luxury-crimson transition-all cursor-pointer flex items-center p-1"
              aria-label="Open bag"
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {totalCartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-luxury-obsidian text-white text-[9px] font-mono w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold"
                  >
                    {totalCartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
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
            className="fixed inset-0 bg-[#F2F1ED]/95 z-50 flex flex-col justify-center px-6 md:px-24"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 text-luxury-obsidian hover:text-luxury-crimson transition-colors"
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
                  className="w-full bg-transparent border-b border-luxury-obsidian py-4 text-xl md:text-3xl font-serif text-luxury-obsidian focus:outline-none placeholder-stone-400/70"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-4 text-luxury-obsidian hover:text-luxury-crimson transition-colors"
                  aria-label="Submit search query"
                >
                  <ArrowRight size={24} />
                </button>
              </form>
              
              <div className="mt-8">
                <p className="text-xs uppercase tracking-widest text-stone-500 mb-3">Suggested Keywords:</p>
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
                      className="px-3 py-1.5 border border-stone-200 hover:border-luxury-obsidian text-[11px] uppercase tracking-wider text-luxury-obsidian transition-colors rounded-full"
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
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50"
            />
            
            {/* Navigation Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-[360px] bg-[#F2F1ED] shadow-2xl z-50 p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-stone-200/60 mb-8">
                  <span className="font-serif tracking-[0.2em] font-bold text-luxury-obsidian">LJ Collective</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-luxury-obsidian hover:text-luxury-crimson">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col space-y-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-luxury-crimson block mb-2">Shop Categories</span>
                    <div className="flex flex-col space-y-4">
                      <button
                        onClick={() => handleNavClick('category', 'all')}
                        className="text-left font-serif text-lg text-luxury-obsidian hover:text-luxury-crimson transition-colors"
                      >
                        All Masterpieces
                      </button>
                      <button
                        onClick={() => handleNavClick('category', 'haute-couture')}
                        className="text-left font-serif text-lg text-luxury-obsidian hover:text-luxury-crimson transition-colors"
                      >
                        Haute Couture
                      </button>
                      <button
                        onClick={() => handleNavClick('category', 'ready-to-wear')}
                        className="text-left font-serif text-lg text-luxury-obsidian hover:text-luxury-crimson transition-colors"
                      >
                        Ready-To-Wear
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-luxury-crimson block mb-2">Our Collections</span>
                    <div className="flex flex-col space-y-3">
                      <button
                        onClick={() => handleNavClick('collection', 'Summer Atelier')}
                        className="text-left text-sm text-luxury-obsidian/80 hover:text-luxury-crimson transition-colors"
                      >
                        Summer Atelier
                      </button>
                      <button
                        onClick={() => handleNavClick('collection', 'Winter Silhouette')}
                        className="text-left text-sm text-luxury-obsidian/80 hover:text-luxury-crimson transition-colors"
                      >
                        Winter Silhouette
                      </button>
                      <button
                        onClick={() => handleNavClick('collection', 'Essential Classic')}
                        className="text-left text-sm text-luxury-obsidian/80 hover:text-luxury-crimson transition-colors"
                      >
                        Essential Classic
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Footer Info */}
              <div className="border-t border-stone-200/60 pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">
                    <User size={14} className="text-luxury-obsidian" />
                  </div>
                  <div>
                    <p className="text-xs font-serif font-medium text-luxury-obsidian">Madame de Beauvoir</p>
                    <span className="text-[9px] uppercase tracking-[0.1em] text-luxury-crimson font-mono">Maison Elite</span>
                  </div>
                </div>
                <p className="text-[9px] text-stone-400 uppercase tracking-widest text-center mt-2">© LJ Collective 2026</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
