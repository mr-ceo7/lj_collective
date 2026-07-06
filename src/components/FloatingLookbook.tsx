import React, { useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface LookbookItem {
  id: string;
  image: string;
  title: string;
  tag: string;
  alignment: string; // CSS position classes
  depth: number;      // Parallax multiplier
}

const lookbookItems: LookbookItem[] = [
  {
    id: 'lb1',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80',
    title: 'The Organza Study',
    tag: 'Haute Couture',
    alignment: 'top-12 left-6 md:top-24 md:left-[5%]',
    depth: 45,
  },
  {
    id: 'lb2',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    title: 'Sartorial Yellow Gown',
    tag: 'Collection 2026',
    alignment: 'bottom-8 left-12 md:bottom-16 md:left-[22%]',
    depth: -30,
  },
  {
    id: 'lb3',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    title: 'Architectural Pleating',
    tag: 'Bespoke Craft',
    alignment: 'top-8 right-6 md:top-16 md:right-[15%]',
    depth: 60,
  },
  {
    id: 'lb4',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
    title: 'Heavy Wool Silhouette',
    tag: 'Winter Tailoring',
    alignment: 'bottom-16 right-12 md:bottom-28 md:right-[5%]',
    depth: -20,
  }
];

export default function FloatingLookbook() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Smooth motion values for spring-driven mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Configure spring animations
  const springConfig = { damping: 30, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized mouse coordinates from -0.5 to 0.5 relative to the center of lookbook
    const normX = (e.clientX - rect.left) / width - 0.5;
    const normY = (e.clientY - rect.top) / height - 0.5;
    
    mouseX.set(normX);
    mouseY.set(normY);
  };

  const handleMouseLeave = () => {
    // Return to center when mouse leaves the bounding box
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleScrollToShowroom = () => {
    const el = document.getElementById('showroom');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[85vh] min-h-[600px] md:h-screen bg-luxury-pearl-warm overflow-hidden flex flex-col items-center justify-center py-20 px-6 cursor-crosshair select-none"
      id="floating-lookbook"
    >
      {/* Subtle Background Atmosphere Grid */}
      <div className="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-[0.03]">
        <div className="border-r border-luxury-obsidian h-full"></div>
        <div className="border-r border-luxury-obsidian h-full"></div>
        <div className="border-r border-luxury-obsidian h-full"></div>
        <div className="h-full"></div>
      </div>

      {/* Floating Canvas Items */}
      {lookbookItems.map((item, index) => {
        // Calculate offset based on depth and smooth spring values
        const xTranslate = useSpring(
          useMotionValue(0), 
          { damping: 30 + index * 5, stiffness: 100 - index * 10 }
        );
        const yTranslate = useSpring(
          useMotionValue(0),
          { damping: 30 + index * 5, stiffness: 100 - index * 10 }
        );

        // Bind raw calculations to spring motion values
        smoothX.on('change', (val) => xTranslate.set(val * item.depth * 2));
        smoothY.on('change', (val) => yTranslate.set(val * item.depth * 2));

        return (
          <motion.div
            key={item.id}
            style={{ x: xTranslate, y: yTranslate }}
            className={`absolute ${item.alignment} w-[140px] h-[200px] md:w-[220px] md:h-[320px] clay-card p-2.5 shadow-2xl group hover:border-luxury-crimson transition-all duration-500 pointer-events-auto`}
          >
            <div className="relative w-full h-full overflow-hidden bg-stone-100">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Card Hover Information */}
              <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-[8px] uppercase tracking-wider text-luxury-crimson font-mono">{item.tag}</span>
                <p className="text-white font-serif text-xs md:text-sm">{item.title}</p>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Center Cinematic Branding Anchor */}
      <div className="relative z-10 text-center max-w-lg md:max-w-2xl flex flex-col items-center pointer-events-none">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mono-label text-luxury-crimson-light mb-3"
        >
          Curated Visual Space
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl md:text-5xl lg:text-6xl text-luxury-obsidian tracking-wide mb-6 leading-tight"
        >
          The Floating Lookbook
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xs md:text-sm font-sans tracking-wide text-luxury-obsidian/80 mb-8 max-w-sm md:max-w-md leading-relaxed text-center"
        >
          Hover and glide over the canvas. An tactile dialogue with materials, light volumes, and structured drapes of our inaugural collection.
        </motion.p>

        <motion.button
          onClick={handleScrollToShowroom}
          className="pointer-events-auto inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-luxury-obsidian hover:text-luxury-crimson font-medium border-b border-luxury-obsidian/30 pb-1 cursor-pointer transition-colors"
          whileHover={{ x: 2 }}
        >
          <span>Explore Showroom</span>
          <ArrowUpRight size={14} />
        </motion.button>
      </div>
    </section>
  );
}
