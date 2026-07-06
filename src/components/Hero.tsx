import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Calendar, ChevronDown, ShoppingBag } from 'lucide-react';

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
  
  const yAccent = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);

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
      className="relative w-full h-[100vh] min-h-[600px] bg-luxury-pearl overflow-hidden flex items-center justify-center"
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

      {/* Editorial product focus */}
      <div className="absolute inset-0 max-w-7xl mx-auto w-full h-full pointer-events-none hidden md:block z-20">
        <motion.div
          style={{ y: yAccent }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-[6%] top-[19%] w-[170px] lg:w-[230px] aspect-[4/5] border border-white/10 bg-black/20 p-2 shadow-2xl backdrop-blur-xs"
        >
          <img
            src="/assets/burgundy-blazer.png"
            alt="Bespoke Velvet Blazer"
            className="w-full h-full object-cover img-editorial"
          />
          <div className="mt-3 flex items-center justify-between gap-3 text-[8px] uppercase tracking-widest text-luxury-obsidian/70">
            <span>Winter Silhouette</span>
            <span className="text-luxury-sand">Limited</span>
          </div>
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
            className="block italic text-luxury-crimson font-normal mt-1 text-[0.86em]"
          >
            Collective
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.68 }}
          className="mt-5 max-w-xl font-serif text-lg md:text-2xl leading-snug text-luxury-obsidian"
        >
          Couture gowns, tailored occasionwear, and private fitting experiences.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-[11px] md:text-xs font-sans tracking-[0.18em] uppercase text-luxury-obsidian/80 mt-4 max-w-lg leading-relaxed"
        >
          Limited atelier quantities, insured delivery, and bespoke alteration support for every collector.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3"
        >
          <button
            onClick={() => {
              const el = document.getElementById('showroom');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex min-w-[190px] items-center justify-center gap-2 px-7 py-3.5 bg-luxury-obsidian border border-luxury-obsidian text-[10px] uppercase tracking-widest text-luxury-pearl font-semibold btn-luxury cursor-pointer"
          >
            <ShoppingBag size={13} />
            Shop The Collection
          </button>
          
          <button
            onClick={handleBookFitting}
            className="inline-flex min-w-[190px] items-center justify-center gap-2 px-7 py-3.5 border border-luxury-obsidian/35 hover:border-luxury-obsidian text-[10px] uppercase tracking-widest text-luxury-obsidian font-semibold btn-luxury cursor-pointer"
          >
            <Calendar size={13} />
            Book Private Fitting
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[8px] uppercase tracking-[0.2em] text-luxury-obsidian/70"
        >
          <span>Insured delivery</span>
          <span className="h-1 w-1 rounded-full bg-luxury-crimson" />
          <span>Private alterations</span>
          <span className="h-1 w-1 rounded-full bg-luxury-crimson" />
          <span>Limited atelier stock</span>
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
