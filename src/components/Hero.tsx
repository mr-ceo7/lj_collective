import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Calendar, ChevronDown, ShoppingBag } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hook into viewport scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Map scroll progress to subtle premium visual shifting
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const opacityText = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Autoplay functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 9000); // 9 seconds for an extra slow, luxurious feel
    return () => clearInterval(timer);
  }, []);

  const handleScrollDown = () => {
    const el = document.getElementById('floating-lookbook');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookFitting = () => {
    window.dispatchEvent(new CustomEvent('ljc:open-concierge', {
      detail: { message: 'Book Private Atelier Fitting' },
    }));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100vh] min-h-[650px] bg-luxury-pearl overflow-hidden flex items-center justify-center"
      id="hero"
    >
      {/* Background Parallax Layer */}
      <motion.div
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 w-full h-full select-none"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/45 via-[#0F0F0F]/78 to-[#0F0F0F] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_43%,rgba(15,15,15,0.18)_0%,rgba(15,15,15,0.72)_62%,rgba(15,15,15,0.95)_100%)] z-10" />
        <img
          src="/assets/hero-bg.png"
          alt="Luxury fashion background"
          className="w-full h-full object-cover opacity-85 img-editorial"
        />
      </motion.div>

      {/* Foreground Cinematic Carousel Content */}
      <div className="relative z-30 w-full h-full flex items-center justify-center pt-16 md:pt-24 pb-24 md:pb-32">
        <AnimatePresence mode="wait">
          {currentSlide === 0 ? (
            /* Slide 1: Brand Logo Presentation */
            <motion.div
              key="slide-logo"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              style={{ opacity: opacityText }}
              className="flex flex-col items-center max-w-xl md:max-w-3xl px-6 text-center"
            >
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="mono-label text-luxury-crimson mb-6 tracking-[0.4em]"
              >
                Maison d'Artisanat
              </motion.span>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mb-10 max-w-[280px] md:max-w-[440px] lg:max-w-[500px]"
              >
                <img
                  src="/assets/logo-transparent.png"
                  alt="LJ Collective Maison Logo"
                  className="w-full h-auto object-contain brightness-105"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <button
                  onClick={() => {
                    const el = document.getElementById('showroom');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex min-w-[210px] items-center justify-center gap-2 px-8 py-4 bg-luxury-crimson border border-luxury-crimson text-xs uppercase tracking-widest text-white font-semibold btn-luxury cursor-pointer shadow-lg hover:bg-luxury-crimson-light"
                >
                  <ShoppingBag size={13} />
                  Shop The Collection
                </button>
                
                <button
                  onClick={handleBookFitting}
                  className="inline-flex min-w-[210px] items-center justify-center gap-2 px-8 py-4 border border-luxury-obsidian/45 hover:border-luxury-obsidian text-xs uppercase tracking-widest text-luxury-obsidian font-semibold btn-luxury cursor-pointer bg-white/5 backdrop-blur-xs hover:bg-white/10"
                >
                  <Calendar size={13} />
                  Book Private Fitting
                </button>
              </motion.div>
            </motion.div>
          ) : (
            /* Slide 2: Atelier Story Split Presentation (Image Left, Text Right) */
            <motion.div
              key="slide-story"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              style={{ opacity: opacityText }}
              className="max-w-7xl mx-auto w-full h-full px-6 md:px-12 z-30 flex items-center justify-center relative"
            >
              {/* Left Side: Gown Image Background Panel (visible on desktop) */}
              <div className="absolute left-0 top-0 w-[42%] h-full hidden md:block overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-black/45 z-10" />
                <img
                  src="/assets/SaveClip.App_624834568_18017954063804569_8949826810407604632_n.jpg"
                  alt="Atelier Velvet Gown"
                  className="w-full h-full object-cover filter brightness-90 contrast-[1.02]"
                />
                <div className="absolute inset-y-0 right-0 w-[100px] bg-gradient-to-l from-luxury-pearl via-luxury-pearl/80 to-transparent z-15" />
              </div>

              {/* Right Side: Skewed Gold-Bordered Collage Background Panel (visible on desktop) */}
              <div className="absolute right-0 top-0 w-[45%] h-full hidden md:block overflow-hidden pointer-events-none">
                <div className="absolute inset-y-0 left-0 w-[100px] bg-gradient-to-r from-luxury-pearl via-luxury-pearl/80 to-transparent z-15" />
                <div className="relative w-full h-full">
                  {/* Card 1: Top-Left skewed */}
                  <div className="absolute top-[14%] left-[6%] w-[140px] lg:w-[170px] aspect-[3/4] border border-luxury-sand/30 bg-black/35 p-1 shadow-2xl rotate-[-5deg] hover:rotate-0 hover:scale-105 transition-all duration-500 rounded-2xs overflow-hidden pointer-events-auto">
                    <img
                      src="/assets/SaveClip.App_726380751_18412051270196378_903608071847032010_n.jpg"
                      alt="Sartorial Suit Model"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Card 2: Top-Right skewed */}
                  <div className="absolute top-[10%] right-[6%] w-[130px] lg:w-[160px] aspect-[4/5] border border-luxury-sand/30 bg-black/35 p-1 shadow-2xl rotate-[6deg] hover:rotate-0 hover:scale-105 transition-all duration-500 rounded-2xs overflow-hidden pointer-events-auto">
                    <img
                      src="/assets/SaveClip.App_722933692_17939682528252474_6588271153929750448_n.jpg"
                      alt="Gold Embroidery Detail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Card 3: Bottom-Left skewed */}
                  <div className="absolute bottom-[14%] left-[14%] w-[125px] lg:w-[155px] aspect-[1/1] border border-luxury-sand/30 bg-black/35 p-1 shadow-2xl rotate-[-4deg] hover:rotate-0 hover:scale-105 transition-all duration-500 rounded-2xs overflow-hidden pointer-events-auto">
                    <img
                      src="/assets/SaveClip.App_724639925_17939682540252474_5962682449502193868_n.jpg"
                      alt="Sartorial Cuff Detail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Card 4: Bottom-Right skewed */}
                  <div className="absolute bottom-[18%] right-[8%] w-[150px] lg:w-[190px] aspect-[4/3] border border-luxury-sand/30 bg-black/35 p-1 shadow-2xl rotate-[7deg] hover:rotate-0 hover:scale-105 transition-all duration-500 rounded-2xs overflow-hidden pointer-events-auto">
                    <img
                      src="/assets/SaveClip.App_623758730_18076782257608947_7818919390501333055_n.jpg"
                      alt="Tailoring Detail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Foreground: Aligned Centered Glassmorphic Text Card */}
              <div className="relative z-30 mx-auto max-w-xl md:max-w-2xl lg:max-w-3xl flex flex-col items-center text-center bg-luxury-pearl/78 border border-luxury-sand/15 backdrop-blur-md p-8 md:p-12 shadow-2xl rounded-sm">
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="mono-label text-luxury-crimson mb-4"
                >
                  The Inaugural Collection
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-widest text-luxury-obsidian uppercase leading-tight font-light select-none"
                >
                  L'ÉLÉGANCE
                  <span className="block italic text-luxury-crimson font-normal mt-1 text-[0.86em]">
                    Collective
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="mt-6 font-serif text-base md:text-xl leading-relaxed text-luxury-obsidian max-w-xl"
                >
                  Couture gowns, tailored occasionwear, and private fitting experiences.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 0.7, y: 0 }}
                  transition={{ duration: 1, delay: 0.62 }}
                  className="text-[10px] md:text-xs font-sans tracking-[0.18em] uppercase text-luxury-obsidian/80 mt-4 max-w-lg leading-relaxed"
                >
                  Limited atelier quantities, insured delivery, and bespoke alteration support for every collector.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                  className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
                >
                  <button
                    onClick={() => {
                      const el = document.getElementById('showroom');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex min-w-[210px] items-center justify-center gap-2 px-8 py-4 bg-luxury-crimson border border-luxury-crimson text-xs uppercase tracking-widest text-white font-semibold btn-luxury cursor-pointer shadow-lg hover:bg-luxury-crimson-light"
                  >
                    <ShoppingBag size={13} />
                    Shop The Collection
                  </button>

                  <button
                    onClick={handleBookFitting}
                    className="inline-flex min-w-[210px] items-center justify-center gap-2 px-8 py-4 border border-luxury-obsidian/45 hover:border-luxury-obsidian text-xs uppercase tracking-widest text-luxury-obsidian font-semibold btn-luxury cursor-pointer bg-white/5 backdrop-blur-xs hover:bg-white/10"
                  >
                    <Calendar size={13} />
                    Book Private Fitting
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Carousel Navigation Indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center space-x-6 z-35">
        <button
          onClick={() => setCurrentSlide(0)}
          className={`flex items-center space-x-2 text-[9px] uppercase tracking-widest font-mono transition-colors duration-500 cursor-pointer focus:outline-hidden ${
            currentSlide === 0 ? 'text-luxury-crimson' : 'text-white/40'
          }`}
        >
          <span>01</span>
          <span className={`h-[1px] transition-all duration-500 ${
            currentSlide === 0 ? 'bg-luxury-crimson w-8' : 'bg-white/20 w-4'
          }`} />
          <span className="hidden md:inline">Maison Logo</span>
        </button>
        <button
          onClick={() => setCurrentSlide(1)}
          className={`flex items-center space-x-2 text-[9px] uppercase tracking-widest font-mono transition-colors duration-500 cursor-pointer focus:outline-hidden ${
            currentSlide === 1 ? 'text-luxury-crimson' : 'text-white/40'
          }`}
        >
          <span>02</span>
          <span className={`h-[1px] transition-all duration-500 ${
            currentSlide === 1 ? 'bg-luxury-crimson w-8' : 'bg-white/20 w-4'
          }`} />
          <span className="hidden md:inline">Atelier Story</span>
        </button>
      </div>

      {/* Bottom Scroll Indicator Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer z-35"
        onClick={handleScrollDown}
      >
        <span className="text-[8px] uppercase tracking-[0.25em] text-luxury-obsidian/60 mb-2 font-medium">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="text-luxury-crimson"
        >
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>
    </div>
  );
}
