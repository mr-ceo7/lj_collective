import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import FloatingLookbook from './components/FloatingLookbook';
import Showroom from './components/Showroom';
import ProductQuickView from './components/ProductQuickView';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import CompareModal from './components/CompareModal';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import ConciergeChat from './components/ConciergeChat';
import { products, reviews } from './data';
import { Product, CartItem } from './types';
import { Sparkles, ArrowRight, ShoppingBag, ArrowUp, Heart, Scale } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Wishlist and Compare parameters
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Load wishlist from client local storage if exists
  useEffect(() => {
    const savedWishlist = localStorage.getItem('ljc_wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error('Error restoring wishlist:', e);
      }
    }
  }, []);

  const handleToggleWishlist = (productId: string) => {
    const updated = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];
    setWishlist(updated);
    localStorage.setItem('ljc_wishlist', JSON.stringify(updated));
  };

  const handleToggleCompare = (productId: string) => {
    setComparedIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        if (prev.length >= 4) return prev; // Safe silent cap to 4 items max
        return [...prev, productId];
      }
    });
  };

  const handleRemoveFromCompare = (productId: string) => {
    setComparedIds((prev) => prev.filter((id) => id !== productId));
  };

  // Filtering and Searching parameters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Curtain unveiling loading effect
  const [isUnveiled, setIsUnveiled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // Elegant theatrical entry delay
    const timer = setTimeout(() => {
      setIsUnveiled(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show back to top button after scrolling past hero/lookbook area
      if (window.scrollY > window.innerHeight * 0.95) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const duration = 1600; // Elegant, custom-timed, slower luxurious scroll
    const start = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      if (elapsedTime < duration) {
        const progress = elapsedTime / duration;
        // Quintic/Cubic smooth ease-in-out curve
        const ease = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        window.scrollTo(0, start * (1 - ease));
        requestAnimationFrame(animateScroll);
      } else {
        window.scrollTo(0, 0);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  // Top elegant scroll progress indicators
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Load cart from client local storage if exists
  useEffect(() => {
    const savedCart = localStorage.getItem('ljc_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error restoring bag from cache:', e);
      }
    }
  }, []);

  // Sync cart back to local storage
  const saveCartToLocalStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('ljc_cart', JSON.stringify(newCart));
  };

  const handleAddToBag = (product: Product, size: string) => {
    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.selectedSize === size
    );

    if (existingIndex > -1) {
      // Increment existing item quantity
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      saveCartToLocalStorage(updated);
    } else {
      // Add fresh product item
      const fresh: CartItem = {
        product,
        selectedSize: size,
        quantity: 1,
      };
      saveCartToLocalStorage([...cart, fresh]);
    }
    
    // Automatically trigger visual drawer to celebrate adding
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, size: string, change: number) => {
    const updated = cart
      .map((item) => {
        if (item.product.id === productId && item.selectedSize === size) {
          return { ...item, quantity: item.quantity + change };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    
    saveCartToLocalStorage(updated);
  };

  const handleRemoveItem = (productId: string, size: string) => {
    const filtered = cart.filter(
      (item) => !(item.product.id === productId && item.selectedSize === size)
    );
    saveCartToLocalStorage(filtered);
  };

  const handleClearCart = () => {
    saveCartToLocalStorage([]);
  };

  return (
    <>
      {/* 1. Curtain Unveiling Intro Animation */}
      <AnimatePresence>
        {!isUnveiled && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#0F0F0F] z-[100] flex flex-col items-center justify-center text-white"
          >
            <div className="text-center space-y-4">
              <motion.img
                src="/assets/logo-transparent.png"
                alt="LJ Collective"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="w-40 md:w-56 h-auto mx-auto"
              />
              
              <div className="w-[120px] h-[1px] bg-luxury-crimson/40 mx-auto mt-4 overflow-hidden relative">
                <motion.div
                  initial={{ left: '-100%' }}
                  animate={{ left: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  className="absolute top-0 bottom-0 w-[40px] bg-luxury-crimson"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Premium Shell */}
      <div className="relative min-h-screen selection:bg-luxury-crimson selection:text-white">
        
        {/* Top-aligned linear scroll indicators */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2.5px] bg-luxury-crimson z-[60] origin-left pointer-events-none"
          style={{ scaleX }}
        />

        {/* Fixed screen frame borders for rich magazine feel */}
        <div className="fixed inset-0 pointer-events-none border-[6px] md:border-[12px] border-luxury-pearl z-[45]" />

        {/* Dynamic floating micro announcement bar */}
        <div className="bg-luxury-obsidian text-luxury-pearl py-2 px-6 flex items-center justify-center text-center space-x-2 relative z-55">
          <Sparkles size={11} className="text-luxury-sand animate-pulse" />
          <span className="text-[8.5px] md:text-[9.5px] uppercase tracking-[0.2em] font-mono">
            Complimentary hand-courier couture delivery on all collectors items. Fitting scheduling available.
          </span>
        </div>

        {/* Global Nav Header */}
        <Header
          cart={cart}
          onCartToggle={() => setIsCartOpen(true)}
          onSearchQuery={(q) => {
            setSearchQuery(q);
            // reset visual categories so search isn't choked
            setSelectedCategory('all');
            setSelectedCollection('all');
            // scroll down automatically to showroom
            const el = document.getElementById('showroom');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setSearchQuery('');
          }}
          onSelectCollection={(col) => {
            setSelectedCollection(col);
            setSearchQuery('');
          }}
          wishlistCount={wishlist.length}
          onWishlistToggle={() => setIsWishlistOpen(true)}
        />

        {/* 2D Multi-layered Parallax Hero */}
        <Hero />

        {/* Floating Lookbook Mouse-Tracking Space */}
        <FloatingLookbook />

        {/* Grid Catalog Showroom */}
        <Showroom
          products={products}
          selectedCategory={selectedCategory}
          selectedCollection={selectedCollection}
          searchQuery={searchQuery}
          onSelectCategory={setSelectedCategory}
          onSelectCollection={setSelectedCollection}
          onQuickView={setSelectedProduct}
          onAddToBag={handleAddToBag}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          comparedIds={comparedIds}
          onToggleCompare={handleToggleCompare}
        />

        {/* Client Legacy Review Section */}
        <Reviews initialReviews={reviews} />

        {/* Maison Information Footer */}
        <Footer />

        {/* 3. Sliding Shopping Bag Drawer Panel */}
        <AnimatePresence>
          {isCartOpen && (
            <CartDrawer
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              cart={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
            />
          )}
        </AnimatePresence>

        {/* 4. Interactive Quick View Overlay Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <ProductQuickView
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onAddToBag={handleAddToBag}
            />
          )}
        </AnimatePresence>

        {/* 5. Sliding Wishlist Sidebar Drawer */}
        <AnimatePresence>
          {isWishlistOpen && (
            <WishlistDrawer
              isOpen={isWishlistOpen}
              onClose={() => setIsWishlistOpen(false)}
              wishlist={wishlist}
              products={products}
              onRemoveFromWishlist={handleToggleWishlist}
              onQuickView={setSelectedProduct}
            />
          )}
        </AnimatePresence>

        {/* 6. Side-by-side Silhouette Comparison Modal */}
        <AnimatePresence>
          {isCompareOpen && (
            <CompareModal
              isOpen={isCompareOpen}
              onClose={() => setIsCompareOpen(false)}
              comparedIds={comparedIds}
              products={products}
              onRemoveFromCompare={handleRemoveFromCompare}
              onAddToBag={handleAddToBag}
            />
          )}
        </AnimatePresence>

        {/* Floating Assess Comparison Bar */}
        <AnimatePresence>
          {comparedIds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 50, x: '-50%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-luxury-obsidian text-luxury-pearl px-6 py-4 flex items-center justify-between space-x-6 shadow-2xl rounded-xs border border-luxury-crimson/20"
              style={{ width: 'max-content', maxWidth: '90vw' }}
            >
              <div className="flex items-center space-x-3">
                <Scale size={14} className="text-luxury-sand animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest font-mono">
                  Compare ({comparedIds.length} of 4 Selected)
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsCompareOpen(true)}
                  className="px-4 py-2 bg-luxury-crimson hover:bg-luxury-pearl text-white hover:text-luxury-obsidian font-mono text-[9px] uppercase tracking-widest transition-all rounded-xs cursor-pointer font-bold"
                >
                  Assess Side-by-Side
                </button>
                <button
                  onClick={() => setComparedIds([])}
                  className="text-[9px] uppercase tracking-widest font-mono hover:text-red-400 text-stone-400 transition-colors cursor-pointer border-b border-stone-400/20 hover:border-red-400/40 pb-0.5"
                >
                  Clear
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Discreet Editorial Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-26 z-40 flex items-center space-x-2 bg-luxury-pearl/90 hover:bg-luxury-obsidian text-luxury-obsidian hover:text-luxury-pearl px-4 py-3 border border-luxury-obsidian/10 hover:border-luxury-obsidian shadow-xl backdrop-blur-md transition-all duration-500 cursor-pointer group rounded-xs font-mono"
              aria-label="Scroll to top of lookbook"
            >
              <span className="text-[9px] uppercase tracking-[0.25em]">Back to Top</span>
              <ArrowUp size={11} className="text-luxury-crimson group-hover:text-luxury-pearl transition-colors duration-300" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating Concierge Luxury Assistant */}
        <ConciergeChat />
      </div>
    </>
  );
}
