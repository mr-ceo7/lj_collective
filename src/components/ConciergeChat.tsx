import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Sparkles, X, Send, User, Check } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  timestamp: string;
}

export default function ConciergeChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'concierge',
      text: 'Welcome to the private world of LJ Collective. I am Jean-Luc, your dedicated Client Advisor. How may I assist you with our silhouettes, bespoke sizing, or private salon bookings today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (hasUnread) {
      setHasUnread(false);
    }
  };

  const getConciergeResponse = (userMessage: string): string => {
    const text = userMessage.toLowerCase();
    
    if (text.includes('fit') || text.includes('appointment') || text.includes('book') || text.includes('salon')) {
      return 'An exceptional choice. Our private salon at Place Vendôme in Paris offers exclusive, individual fitting appointments with our master couturiers. I have recorded your request, and our Salon Concierge will reach out directly to you at royalmintdev@gmail.com to schedule your private viewing and champagne consultation. Is there a specific date or silhouette you are considering?';
    }
    
    if (text.includes('size') || text.includes('measure') || text.includes('proportion') || text.includes('fit')) {
      return 'Our master silhouettes are graded according to traditional Parisian Haute Couture standards. However, because absolute fit is paramount, our atelier is delighted to provide bespoke adjustments for all items. We can arrange a digital consultation with a fit expert. Which silhouette has captured your attention?';
    }
    
    if (text.includes('material') || text.includes('textile') || text.includes('silk') || text.includes('wool') || text.includes('cashmere')) {
      return 'We source only the finest heritage textiles in the world—including organic mulberry silk from Lyon, Grade-A Mongolian cashmere, and heavyweight Japanese satin crêpe. Every fiber is selected for its architectural weight and drape. I can have our textile library portfolio sent to royalmintdev@gmail.com if you would like to explore our raw materials.';
    }
    
    if (text.includes('ship') || text.includes('delivery') || text.includes('pack') || text.includes('care')) {
      return 'All LJ Collective orders are delivered via white-glove climate-controlled couriers in archival solid wood boxes, accompanied by cedar garment hangers and breathable cotton shields. Shipping is fully complimentary and insured globally. For maintenance, we recommend only professional haute-couture dry cleaning. May I email you our full Care & Longevity Handbook?';
    }

    return 'Thank you for your inquiry. I am personally relaying your request to our lead atelier coordinator. A member of our private client team will email you at royalmintdev@gmail.com within the hour to assist you further. Is there anything else I can arrange for you in the meantime, madam/monsieur?';
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate luxury concierge thinking/typing delay
    setTimeout(() => {
      setIsTyping(false);
      const replyText = getConciergeResponse(text);
      const conciergeMsg: ChatMessage = {
        id: `concierge-${Date.now()}`,
        sender: 'concierge',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, conciergeMsg]);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const suggestions = [
    'Book Private Atelier Fitting',
    'Inquire about Sizing',
    'Custom Bespoke Tailoring',
    'Archival Delivery & Care',
  ];

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-8 right-8 z-[75] select-none pointer-events-auto">
        <button
          id="concierge-trigger-btn"
          onClick={handleToggle}
          className="relative w-14 h-14 rounded-full clay-btn flex items-center justify-center text-luxury-obsidian transition-all duration-500 cursor-pointer shadow-2xl group"
          aria-label="Toggle Salon Concierge"
        >
          {isOpen ? (
            <X size={20} className="transition-transform duration-300" />
          ) : (
            <div className="relative">
              <MessageSquare size={20} className="group-hover:scale-105 transition-transform" />
              <Sparkles size={11} className="absolute -top-2 -right-2 text-luxury-sand animate-pulse" />
              {hasUnread && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-red-500 border border-luxury-pearl animate-bounce" />
              )}
            </div>
          )}
        </button>

        {/* Floating Tooltip Label */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              className="absolute right-18 top-1/2 -translate-y-1/2 bg-luxury-obsidian text-luxury-pearl px-3 py-1.5 rounded-xs border border-luxury-obsidian/20 shadow-xl pointer-events-none whitespace-nowrap"
            >
              <div className="flex items-center space-x-1.5">
                <span className="font-mono text-[9px] uppercase tracking-widest">Atelier Concierge</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Interface Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 35, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-26 right-8 z-[75] w-96 max-w-[calc(100vw-2rem)] h-[550px] max-h-[80vh] clay-card rounded-2xl flex flex-col justify-between overflow-hidden select-none"
          >
            {/* Header */}
            <div className="p-4 bg-luxury-obsidian text-luxury-pearl flex items-center justify-between border-b border-luxury-obsidian/20">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-luxury-sand/15 border border-luxury-sand flex items-center justify-center">
                  <Sparkles size={14} className="text-luxury-sand animate-pulse" />
                </div>
                <div>
                  <h4 className="font-serif text-sm tracking-wider uppercase text-luxury-pearl font-medium">
                    Maison Concierge
                  </h4>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[8px] font-mono uppercase tracking-widest text-stone-400">
                      Jean-Luc • Online
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-stone-400 hover:text-luxury-crimson p-1 cursor-pointer transition-colors"
                aria-label="Close Chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none bg-stone-50/20">
              {messages.map((msg) => {
                const isConcierge = msg.sender === 'concierge';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start space-x-2.5 max-w-[85%] ${
                      isConcierge ? 'self-start' : 'self-end ml-auto flex-row-reverse space-x-reverse'
                    }`}
                  >
                    {/* Mini Avatar */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-mono tracking-tighter shrink-0 ${
                        isConcierge
                          ? 'bg-luxury-sand/10 border border-luxury-sand text-luxury-sand'
                          : 'bg-luxury-crimson text-white'
                      }`}
                    >
                      {isConcierge ? 'LJC' : <User size={10} />}
                    </div>

                    {/* Chat Bubble */}
                    <div className="space-y-1">
                      <div
                        className={`p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                          isConcierge
                            ? 'bg-white/90 border border-white/85 text-luxury-obsidian font-sans rounded-tl-none'
                            : 'bg-luxury-crimson text-white font-sans rounded-tr-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <div
                        className={`text-[8px] font-mono text-stone-400 flex items-center space-x-1 ${
                          isConcierge ? 'justify-start' : 'justify-end'
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                        {!isConcierge && <Check size={8} className="text-luxury-sand" />}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start space-x-2.5 max-w-[85%] self-start">
                  <div className="w-6 h-6 rounded-full bg-luxury-sand/10 border border-luxury-sand text-luxury-sand flex items-center justify-center text-[8px] font-mono">
                    LJC
                  </div>
                  <div className="bg-white/90 border border-white/80 p-3 rounded-2xl rounded-tl-none shadow-xs">
                    <div className="flex space-x-1.5 items-center h-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-luxury-sand animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-luxury-sand animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-luxury-sand animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Panel */}
            <div className="p-3 border-t border-stone-200/40 bg-white/70 backdrop-blur-md space-y-1.5">
              <p className="text-[8px] font-mono uppercase tracking-widest text-stone-400">
                Suggested Private Inquiry
              </p>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => handleSuggestionClick(sug)}
                    className="px-3.5 py-1.5 text-[9px] font-mono tracking-wide rounded-full clay-btn text-stone-600 hover:text-luxury-crimson transition-all cursor-pointer"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(inputValue);
              }}
              className="p-3 bg-white border-t border-stone-200/40 flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Compose message to concierge..."
                className="flex-1 clay-input rounded-full py-2 px-4 text-xs text-luxury-obsidian outline-none font-sans"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-luxury-obsidian hover:bg-luxury-crimson text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <Send size={12} />
              </button>
            </form>

            {/* Legal / Discreet Branding Footer */}
            <div className="bg-stone-50 border-t border-stone-100 py-1.5 px-3 text-center">
              <p className="text-[7.5px] font-mono uppercase tracking-widest text-stone-400">
                LJ Collective PRIVATE CONCIERGE SERVICE • PARIS, FR
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
