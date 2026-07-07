import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

export default function ConciergeChat() {
  return (
    <div className="fixed bottom-8 right-8 z-[75] select-none pointer-events-auto">
      <a
        id="concierge-trigger-btn"
        href="https://wa.me/254725220195"
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 rounded-full clay-btn flex items-center justify-center text-luxury-obsidian transition-all duration-500 cursor-pointer shadow-2xl group"
        aria-label="Contact Atelier Concierge on WhatsApp"
      >
        <div className="relative">
          <MessageSquare size={20} className="group-hover:scale-105 transition-transform" />
          <Sparkles size={11} className="absolute -top-2 -right-2 text-luxury-sand animate-pulse" />
        </div>
      </a>
    </div>
  );
}
