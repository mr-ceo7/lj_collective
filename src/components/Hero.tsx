import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook into viewport scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Map scroll progress to subtle premium visual shifting
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '45%']);
  const opacityText = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  
  // Left-side image speed parallax
  const yLeftImg = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  // Right-side image speed parallax
  const yRightImg = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  const handleScrollDown = () => {
    const el = document.getElementById('floating-lookbook');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100vh] min-h-[600px] bg-luxury-pearl overflow-hidden flex items-center justify-center"
      id="hero"
    >
      {/* Background Parallax Layer */}
      <motion.div
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 w-full h-full select-none"
      >
        {/* Dark elegant radial gradient to overlay on photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/50 via-[#0F0F0F]/80 to-[#0F0F0F] z-10" />
        <img
          src="/assets/hero-bg.png"
          alt="Luxury fashion background"
          className="w-full h-full object-cover opacity-85 img-editorial"
        />
      </motion.div>

      {/* Decorative Parallax 2D Images (Layered Layout) */}
      <div className="absolute inset-0 max-w-7xl mx-auto w-full h-full pointer-events-none hidden md:block z-20">
        
        {/* Left Floating Image Card (Parallax) */}
        <motion.div
          style={{ y: yLeftImg }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[5%] top-[25%] w-[160px] lg:w-[200px] h-[240px] lg:h-[300px] clay-card p-2.5 shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80"
            alt="Maison silhouette left"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover img-editorial"
          />
        </motion.div>

        {/* Right Floating Image Card (Parallax) */}
        <motion.div
          style={{ y: yRightImg }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-[5%] top-[15%] w-[180px] lg:w-[220px] h-[180px] lg:h-[220px] clay-card p-2.5 shadow-2xl"
        >
          <img
            src="/assets/burgundy-blazer.png"
            alt="Bespoke Velvet Blazer"
            className="w-full h-full object-cover rounded-lg img-editorial"
          />
        </motion.div>
      </div>

      {/* Foreground Cinematic Typography Layer */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-30 text-center flex flex-col items-center max-w-xl md:max-w-2xl lg:max-w-4xl px-6"
      >
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mono-label text-luxury-crimson mb-4"
        >
          The Inaugural Collection
        </motion.span>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-widest text-luxury-obsidian uppercase leading-tight font-light select-none">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="block"
          >
            L'ÉLÉGANCE
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="block italic text-luxury-crimson font-normal mt-2 md:-mt-1"
          >
            Collective
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xs md:text-sm font-sans tracking-widest uppercase text-luxury-obsidian mt-6 max-w-sm md:max-w-md leading-relaxed"
        >
          ELEGANCE TAILORED FOR YOU. A MAISON GUIDED BY IMMERSIVE DESIGN, SOPHISTICATED TEXTILES, AND UNCOMPROMISING SARTORIAL SENSITIVITY.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-8 flex flex-col md:flex-row items-center gap-4"
        >
          <button
            onClick={() => {
              const el = document.getElementById('showroom');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-2.5 bg-luxury-obsidian border border-luxury-obsidian text-[10px] uppercase tracking-widest text-luxury-pearl font-medium btn-luxury cursor-pointer"
          >
            VIEW ATELIER
          </button>
          
          <button
            onClick={() => {
              const el = document.getElementById('reviews');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-2.5 border border-luxury-obsidian/30 hover:border-luxury-obsidian text-[10px] uppercase tracking-widest text-luxury-obsidian font-medium btn-luxury cursor-pointer"
          >
            MAISON VOICES 🫶
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom Scroll Indicator Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer z-35"
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
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </div>
  );
}
