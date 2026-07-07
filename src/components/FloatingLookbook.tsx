import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, Pause, Loader2 } from 'lucide-react';
import { CampaignAsset } from '../admin/types';

// Default items if no campaigns are added/published in the admin yet
const defaultLookbookItems: Partial<CampaignAsset>[] = [
  {
    id: 'lb1',
    imageUrl: '/assets/SaveClip.App_726247220_18412051285196378_8868740418072431020_n.jpg',
    title: 'Sculpted Silk Drape',
    tag: 'Summer Atelier',
    ctaText: 'View Collection',
    ctaLink: '#showroom',
  },
  {
    id: 'lb2',
    imageUrl: '/assets/SaveClip.App_624834568_18017954063804569_8949826810407604632_n.jpg',
    title: 'Atelier Velvet Gown',
    tag: 'Haute Couture',
    ctaText: 'Shop Now',
    ctaLink: '#showroom',
  },
  {
    id: 'lb3',
    imageUrl: '/assets/SaveClip.App_722933692_17939682528252474_6588271153929750448_n.jpg',
    title: 'Gold Filigree Embroidery',
    tag: 'Bespoke Craft',
    ctaText: 'Explore Piece',
    ctaLink: '#showroom',
  },
  {
    id: 'lb4',
    imageUrl: '/assets/SaveClip.App_726380751_18412051270196378_903608071847032010_n.jpg',
    title: 'Structured Silhouette',
    tag: 'Winter Tailoring',
    ctaText: 'View Details',
    ctaLink: '#showroom',
  }
];

export default function FloatingLookbook() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [items, setItems] = useState<Partial<CampaignAsset>[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [spotlightedIndex, setSpotlightedIndex] = useState<number | null>(null);

  // Animation values stored in refs to avoid re-triggering React renders at 60fps
  const animTimeRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);
  const lastFrameTimeRef = useRef<number>(0);

  // Sync state with refs for access inside requestAnimationFrame
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Fetch lookbook items from backend
  useEffect(() => {
    let active = true;
    async function fetchLookbook() {
      try {
        const response = await fetch('/api/lookbook');
        if (!response.ok) {
          throw new Error('Failed to fetch lookbook assets');
        }
        const data = await response.json();
        if (active) {
          if (Array.isArray(data) && data.length > 0) {
            setItems(data);
          } else {
            setItems(defaultLookbookItems);
          }
        }
      } catch (err) {
        console.error('Error fetching lookbook campaigns:', err);
        if (active) {
          setItems(defaultLookbookItems);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void fetchLookbook();
    return () => {
      active = false;
    };
  }, []);

  // Main animation engine loop
  useEffect(() => {
    if (loading || items.length === 0) return;

    let frameId: number;
    const CYCLE_DURATION = 5000; // Total cycle per photo (5s)
    const SPIN_DURATION = 1800;   // Spin duration (1.8s)
    const DWELL_DURATION = 3200;  // Dwell duration (3.2s)
    const N = items.length;

    // Custom ease function: accelerates in first 20% of timeline, then decelerates in remaining 80%
    function ease(p: number) {
      if (p < 0.2) {
        const t = p / 0.2;
        return 0.1 * t * t;
      } else {
        const t = (p - 0.2) / 0.8;
        return 0.1 + 0.9 * (1 - Math.pow(1 - t, 3));
      }
    }

    const updateCarousel = (timestamp: number) => {
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = timestamp;
      }
      
      const deltaTime = timestamp - lastFrameTimeRef.current;
      lastFrameTimeRef.current = timestamp;

      // Accumulate time only if not paused
      if (!isPausedRef.current) {
        animTimeRef.current += deltaTime;
      }

      const t = animTimeRef.current;
      const cycleIndex = Math.floor(t / CYCLE_DURATION);
      const progress = t % CYCLE_DURATION;

      // Determine current target angles
      // targetAngle(C) = PI/2 - C * (2 * PI / N)
      const startAlpha = -((cycleIndex - 1) * (2 * Math.PI) / N);
      const endAlpha = -(cycleIndex * (2 * Math.PI) / N);

      let alpha = endAlpha;
      let currentSpotlight: number | null = null;
      let dwellRatio = 0;

      // Identify the previously spotlighted card to scale it down smoothly
      const prevSpotlight = (cycleIndex - 1 + N) % N;

      if (progress < SPIN_DURATION) {
        const p = progress / SPIN_DURATION;
        alpha = startAlpha + (endAlpha - startAlpha) * ease(p);
        currentSpotlight = null;
      } else {
        alpha = endAlpha;
        currentSpotlight = cycleIndex % N;
        dwellRatio = (progress - SPIN_DURATION) / DWELL_DURATION;
      }

      // Sync spotlighted index to state for rendering overlays
      setSpotlightedIndex(currentSpotlight);

      // Measure container to calculate elliptical radii dynamically
      const containerEl = containerRef.current;
      if (containerEl) {
        const width = containerEl.clientWidth;
        const height = containerEl.clientHeight;
        
        // Define radii: wider on desktop, more compact on mobile
        const isMobile = width < 768;
        const rx = isMobile ? width * 0.32 : width * 0.35;
        const ry = isMobile ? height * 0.08 : height * 0.12;

        // Position each card
        items.forEach((_, i) => {
          const cardEl = cardRefs.current[i];
          if (cardEl) {
            // Absolute angle for card i
            const theta = Math.PI / 2 + (i * (2 * Math.PI) / N) + alpha;

            // X and Y coordinates along the ellipse relative to center
            const x = rx * Math.cos(theta);
            const y = ry * Math.sin(theta);

            // Normalized depth from 0 (back) to 1 (front)
            const depth = Math.sin(theta); // -1 at back, 1 at front
            const normDepth = (depth + 1) / 2;

            // Base scaling and visual filters: non-linear scaling curve so they get larger and larger as they near the front
            const minScale = isMobile ? 0.45 : 0.52;
            const maxScale = isMobile ? 0.90 : 1.15;
            let scale = minScale + (maxScale - minScale) * Math.pow(normDepth, 1.6);
            let opacity = 0.25 + 0.75 * Math.pow(normDepth, 1.2);
            let zIndex = Math.round(10 + 90 * normDepth);
            let blurVal = 5 * (1 - normDepth);

            // 1. Spotlight card scale-up effect during dwell phase
            if (currentSpotlight === i) {
              if (isMobile) {
                // Calculate target scale to cover 92% of mobile viewport width (card base width is 140px)
                const targetScale = (width * 0.92) / 140;
                scale += (targetScale - maxScale) * Math.min(1, dwellRatio * 2.5);
              } else {
                const extraScale = 0.35;
                scale += extraScale * Math.min(1, dwellRatio * 2.5); // Quick scaling up at start of dwell
              }
              opacity = 1.0;
              zIndex = 150; // Ensure it stands on top of everything
              blurVal = 0;
            }

            // 2. Previously spotlighted card scale-down (decay) effect during spin phase
            if (progress < SPIN_DURATION && i === prevSpotlight) {
              const p = progress / SPIN_DURATION;
              const decay = 1 - ease(p); // Smooth decay matching the ease of rotation

              if (isMobile) {
                const targetScale = (width * 0.92) / 140;
                const boost = (targetScale - maxScale) * decay;
                scale += boost;
              } else {
                const boost = 0.35 * decay;
                scale += boost;
              }
              opacity = opacity + (1.0 - opacity) * decay;
              zIndex = 150; // Keep it on top during the transition
              blurVal = blurVal * (1 - decay);
            }

            // Apply transforms and styles
            cardEl.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${scale})`;
            cardEl.style.opacity = `${opacity}`;
            cardEl.style.zIndex = `${zIndex}`;
            cardEl.style.filter = blurVal > 0.5 ? `blur(${blurVal}px)` : 'none';
          }
        });
      }

      frameId = requestAnimationFrame(updateCarousel);
    };

    frameId = requestAnimationFrame(updateCarousel);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [loading, items]);

  const handleScrollToShowroom = () => {
    const el = document.getElementById('showroom');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section className="relative w-full h-[80vh] bg-luxury-pearl flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-stone-400">
          <Loader2 size={30} className="animate-spin text-luxury-crimson" />
          <span className="mono-label text-[10px]">Loading Atelier Canvas...</span>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[85vh] min-h-[600px] md:h-screen bg-luxury-pearl-warm overflow-hidden flex flex-col items-center justify-center py-20 px-6 select-none"
      id="floating-lookbook"
    >
      {/* Subtle Background Atmosphere Grid */}
      <div className="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-[0.03]">
        <div className="border-r border-luxury-obsidian h-full"></div>
        <div className="border-r border-luxury-obsidian h-full"></div>
        <div className="border-r border-luxury-obsidian h-full"></div>
        <div className="h-full"></div>
      </div>

      {/* Floating Canvas Title (Static top layer) */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none">
        <span className="mono-label text-luxury-crimson mb-2 block tracking-[0.25em]">
          Curated Atelier Space
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-luxury-obsidian tracking-wide leading-tight">
          The Cinematic Lookbook
        </h2>
      </div>

      {/* Orbit Cards Container */}
      <div className="relative w-full h-full flex items-center justify-center lookbook-carousel-container pointer-events-none">
        {items.map((item, idx) => {
          const isSpotlighted = spotlightedIndex === idx;
          return (
            <div
              key={item.id || `lookbook-${idx}`}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              className="absolute w-[140px] h-[200px] md:w-[220px] md:h-[320px] clay-card p-2 shadow-2xl transition-shadow duration-300 border border-white/5 lookbook-orbit-card pointer-events-auto rounded-xs overflow-hidden cursor-pointer"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate3d(-50%, -50%, 0) scale(0.1)',
                opacity: 0,
              }}
            >
              <div className="relative w-full h-full overflow-hidden bg-stone-900 group">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Spotlight Overlay & CTA */}
                <div 
                  className={`absolute bottom-0 left-0 w-full p-3 md:p-4 bg-gradient-to-t from-black via-black/85 to-transparent border-t border-white/5 transition-all duration-500 flex flex-col justify-end ${
                    isSpotlighted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-luxury-crimson font-mono font-bold mb-1">
                    {item.tag || 'Lookbook'}
                  </span>
                  <h3 className="text-white font-serif text-xs md:text-sm font-medium leading-tight mb-2 md:mb-3">
                    {item.title}
                  </h3>
                  <a
                    href={item.ctaLink || '#showroom'}
                    onClick={(e) => {
                      if (item.ctaLink === '#showroom' || !item.ctaLink) {
                        e.preventDefault();
                        handleScrollToShowroom();
                      }
                    }}
                    className="inline-flex items-center justify-between bg-luxury-crimson hover:bg-white text-white hover:text-black text-[8px] md:text-[9px] font-semibold uppercase tracking-widest px-2.5 py-1.5 md:px-3 md:py-2 transition-colors duration-300 rounded-xs"
                  >
                    <span>{item.ctaText || 'Explore'}</span>
                    <ArrowUpRight size={10} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Paused state indicator */}
      {isPaused && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 lookbook-paused-indicator px-4 py-2 rounded-full shadow-lg pointer-events-none animate-pulse">
          <Pause size={10} className="text-luxury-crimson" />
          <span className="font-mono text-[8px] uppercase tracking-widest text-luxury-obsidian/75">
            PAUSED — Hovering / Holding
          </span>
        </div>
      )}
    </section>
  );
}
