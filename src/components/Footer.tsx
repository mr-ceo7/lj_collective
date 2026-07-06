import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Instagram, Facebook, Mail, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1000);
  };

  return (
    <footer className="bg-[#161616] text-[#F2F1ED] pt-20 pb-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-stone-800">
          
          {/* Brand History */}
          <div className="space-y-6">
            <div>
              <img src="/assets/logo-transparent.png" alt="LJ Collective" className="h-14 w-auto mb-4" />
              <span className="text-[8px] uppercase tracking-[0.2em] text-luxury-crimson mt-1 block">Elegance tailored for you</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-sans text-justify-luxury max-w-sm">
              Founded under the guiding philosophy of immersive structural poetry, the Maison tailoring studio continues to bridge traditional French haute-couture hand-pleating with clean, minimalist shapes for the modern global collector.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="#" aria-label="Instagram" className="text-stone-400 hover:text-luxury-crimson transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" aria-label="Facebook" className="text-stone-400 hover:text-luxury-crimson transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" aria-label="Email" className="text-stone-400 hover:text-luxury-crimson transition-colors">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Links Section 1: Customer Service */}
          <div>
            <span className="mono-label text-luxury-crimson block mb-6 text-[10px]">Client Care</span>
            <ul className="space-y-3.5 text-xs text-stone-400">
              <li><a href="#" className="hover:text-white transition-colors">White-Glove Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bespoke In-Atelier Adjustments</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Private Dressing Room Schedules</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Couture Archival & Preservation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Atelier Concierge Line: +33 (0) 1 45 61</a></li>
            </ul>
          </div>

          {/* Links Section 2: Maison History */}
          <div>
            <span className="mono-label text-luxury-crimson block mb-6 text-[10px]">The Maison</span>
            <ul className="space-y-3.5 text-xs text-stone-400">
              <li><a href="#" className="hover:text-white transition-colors">Artisanal Heritage & Ethics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">The Parisian Sewing Atelier</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partnership & Precious Gold Sourcing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Maison Pressroom & Chronicles</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Career Opportunities</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-6">
            <div>
              <span className="mono-label text-luxury-crimson block mb-2 text-[10px]">Join the Gazette</span>
              <p className="text-xs text-stone-400 leading-relaxed font-sans">
                Subscribe to receive private lookbooks, invitation-only couture viewings, and studio logs.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-2 text-xs text-luxury-crimson font-serif bg-stone-900 p-3 border border-luxury-crimson/30"
                >
                  <Check size={14} className="text-emerald-500" />
                  <span>Subscribed to private logs.</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative border-b border-stone-700 pb-2 flex items-center">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR MAIL..."
                    className="bg-transparent text-xs text-white placeholder-stone-600 focus:outline-none w-full tracking-wider uppercase font-sans"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-stone-400 hover:text-luxury-crimson transition-colors pl-2"
                    aria-label="Submit newsletter email"
                  >
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </AnimatePresence>

            <span className="text-[9px] text-stone-600 leading-normal block">
              By subscribing, you agree to the privacy policy of the Maison.
            </span>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between text-stone-600 text-[10px] uppercase tracking-widest gap-4">
          <div>
            <span>© 2026 LJ Collective. All Rights Reserved.</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-stone-400 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-stone-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-stone-400 transition-colors">Accessibility Charter</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
