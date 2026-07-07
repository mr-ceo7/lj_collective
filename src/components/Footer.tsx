import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Instagram, Facebook, Mail, Check, MessageCircle } from 'lucide-react';

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
    <footer className="bg-[#161616] text-[#F2F1ED] pt-12 pb-6 px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-10 border-b border-stone-800">
          
          {/* Brand History */}
          <div className="space-y-5">
            <div>
              <img src="/assets/logo-transparent.png" alt="LJ Collective" className="h-36 w-auto mb-2" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-luxury-sand-light mt-1 block font-semibold">Elegance tailored for you</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-sans text-justify-luxury max-w-sm">
              LJ Collective is a premier Kenyan luxury design house based in Nairobi, bridging rich heritage craftsmanship with modern structural silhouettes for the global collector.
            </p>
            <div className="flex items-center space-x-5 pt-2">
              <a href="https://www.instagram.com/lj__collective/?__pwa=1" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-stone-400 hover:text-luxury-sand transition-colors">
                <Instagram size={22} />
              </a>
              <a href="https://wa.me/254725220195" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-stone-400 hover:text-luxury-sand transition-colors">
                <MessageCircle size={22} />
              </a>
              <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-stone-400 hover:text-luxury-sand transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5.5 h-5.5">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a href="mailto:concierge@ljcollective.com" aria-label="Email" className="text-stone-400 hover:text-luxury-sand transition-colors">
                <Mail size={22} />
              </a>
            </div>
          </div>

          {/* Links Section: Customer Service & Maison */}
          <div className="md:pl-6">
            <span className="mono-label text-luxury-sand block mb-5 text-[10px] font-bold">Client Care & Atelier</span>
            <ul className="space-y-3 text-xs text-stone-400">
              <li><a href="#" className="hover:text-white transition-colors">Nairobi Atelier & Heritage</a></li>
              <li><a href="#" className="hover:text-white transition-colors">White-Glove Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bespoke In-Atelier Adjustments</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Private Dressing Room Fittings</a></li>
              <li><a href="https://wa.me/254725220195" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-medium">Atelier Concierge: +254 725 220 195</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-5">
            <div>
              <span className="mono-label text-luxury-sand block mb-2 text-[10px] font-bold">Join the Gazette</span>
              <p className="text-xs text-stone-400 leading-relaxed font-sans">
                Subscribe to receive private lookbooks, invitation-only viewings, and studio logs.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-2 text-xs text-luxury-sand font-serif bg-[#0F0F0F] p-3 border border-luxury-sand/30"
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
                    className="bg-transparent text-xs text-white placeholder-stone-500 focus:outline-none w-full tracking-wider uppercase font-sans"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-stone-400 hover:text-luxury-sand transition-colors pl-2"
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
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-stone-600 text-[10px] uppercase tracking-widest gap-4">
          <div>
            <span>© 2026 LJ Collective. All Rights Reserved.</span>
            <span className="block mt-1 text-[8px] text-stone-500 tracking-[0.12em] font-mono lowercase">Powered by Galvaniy Technologies</span>
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
