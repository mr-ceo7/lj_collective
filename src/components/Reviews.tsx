import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShieldCheck, Heart, Sparkles, MessageSquareQuote } from 'lucide-react';
import { Review } from '../types';

interface ReviewsProps {
  initialReviews: Review[];
}

export default function Reviews({ initialReviews }: ReviewsProps) {
  const [reviewsList, setReviewsList] = useState<Review[]>(initialReviews);
  
  // Custom new review state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newLocation, setNewLocation] = useState('');
  const [newItemPurchased, setNewItemPurchased] = useState('Bespoke Ivory Silk Gown');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const addedReview: Review = {
      id: `custom-${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      comment: newComment,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      }),
      location: newLocation || 'Atelier Client',
      verified: true,
      itemPurchased: newItemPurchased
    };

    setReviewsList([addedReview, ...reviewsList]);
    setNewAuthor('');
    setNewComment('');
    setNewLocation('');
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setIsFormOpen(false);
    }, 2500);
  };

  return (
    <section id="reviews" className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-luxury-pearl-warm border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 gap-6">
          <div>
            <span className="mono-label text-luxury-crimson block mb-2">Maison Voices 🫶</span>
            <h2 className="font-serif text-3xl md:text-5xl text-luxury-obsidian tracking-wide font-light">
              Client Appreciations
            </h2>
          </div>
          
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="px-5 py-2.5 bg-luxury-crimson hover:bg-luxury-crimson-light text-white text-xs uppercase tracking-widest transition-colors font-semibold shadow-md cursor-pointer"
          >
            {isFormOpen ? 'Close Legacy Form' : 'Submit Appreciation'}
          </button>
        </div>

        {/* Legacy Submission Form */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden mb-16 border-b border-stone-300/60"
            >
              <div className="clay-card p-6 md:p-8 max-w-2xl mx-auto mb-8">
                <span className="mono-label text-luxury-crimson block mb-3 text-center">Inscribe a Legacy Note</span>
                <p className="text-[11px] text-stone-400 font-sans italic text-center mb-6">
                  Share your fitting experience, fabric impressions, and bespoke collection highlights.
                </p>

                {submittedMessage ? (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="py-12 text-center flex flex-col items-center justify-center"
                  >
                    <Sparkles className="text-luxury-crimson mb-3 animate-pulse" size={32} />
                    <p className="font-serif text-lg text-luxury-obsidian font-medium">Appreciation Logged Successfully</p>
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 mt-2 font-mono">Gratitude for your valuable critique.</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="mono-label text-[9px] text-stone-400 block mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={newAuthor}
                          onChange={(e) => setNewAuthor(e.target.value)}
                          placeholder="e.g. Princess Alexandra"
                          className="w-full clay-input px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mono-label text-[9px] text-stone-400 block mb-1">Your Location</label>
                        <input
                          type="text"
                          value={newLocation}
                          onChange={(e) => setNewLocation(e.target.value)}
                          placeholder="e.g. Geneva, Switzerland"
                          className="w-full clay-input px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="mono-label text-[9px] text-stone-400 block mb-1">Piece Purchased</label>
                        <select
                          value={newItemPurchased}
                          onChange={(e) => setNewItemPurchased(e.target.value)}
                          className="w-full clay-input px-3 py-2 text-xs focus:outline-none"
                        >
                          <option value="Bespoke Ivory Silk Gown" className="bg-luxury-pearl text-luxury-obsidian">Bespoke Ivory Silk Gown</option>
                          <option value="Architectural Cashmere Trench Coat" className="bg-luxury-pearl text-luxury-obsidian">Architectural Cashmere Trench Coat</option>
                          <option value="Hand-Pleated Silk Silhouette Dress" className="bg-luxury-pearl text-luxury-obsidian">Hand-Pleated Silk Silhouette Dress</option>
                          <option value="Minimalist 18K Gold Atelier Choker" className="bg-luxury-pearl text-luxury-obsidian">Minimalist 18K Gold Atelier Choker</option>
                        </select>
                      </div>
                      <div>
                        <label className="mono-label text-[9px] text-stone-400 block mb-1">Couture Rating</label>
                        <div className="flex items-center space-x-1 py-1.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewRating(star)}
                              className="text-luxury-sand focus:outline-none cursor-pointer"
                            >
                              <Star size={16} fill={star <= newRating ? 'var(--color-luxury-sand)' : 'none'} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="mono-label text-[9px] text-stone-400 block mb-1">Appreciation Comment *</label>
                      <textarea
                        required
                        rows={3}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Detail your experience with our textiles, sizing precision, or concierge services..."
                        className="w-full clay-input px-3 py-2 text-xs focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-luxury-crimson hover:bg-luxury-crimson-light text-white text-xs uppercase tracking-widest font-bold transition-colors duration-300 cursor-pointer shadow-md"
                    >
                      LOG APPRECIATION
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Masonry-like Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewsList.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="clay-card p-6 flex flex-col justify-between hover:border-luxury-sand/30 border border-white/5 transition-all duration-300 relative group"
            >
              {/* Decorative luxury quote icon in background */}
              <div className="absolute right-6 top-6 text-luxury-obsidian/5 group-hover:text-luxury-sand/10 transition-colors pointer-events-none duration-500">
                <MessageSquareQuote size={48} />
              </div>

              <div>
                {/* Rating Stars and verified tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-0.5">
                    {Array.from({ length: 5 }).map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        size={12}
                        className="text-luxury-sand"
                        fill={starIdx < review.rating ? 'var(--color-luxury-sand)' : 'none'}
                      />
                    ))}
                  </div>
                  {review.verified && (
                    <div className="flex items-center space-x-1 text-[10px] uppercase tracking-wider text-luxury-sand-light font-mono font-bold">
                      <ShieldCheck size={12} />
                      <span>Verified Collector</span>
                    </div>
                  )}
                </div>

                {/* Comment Text */}
                <p className="font-serif text-sm italic text-luxury-obsidian/95 leading-relaxed text-justify-luxury mb-6">
                  "{review.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="border-t border-white/10 pt-4 mt-auto">
                <div className="flex justify-between items-end gap-2">
                  <div>
                    <h4 className="text-sm font-serif font-bold text-luxury-obsidian">
                      {review.author}
                    </h4>
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-mono mt-0.5 block">
                      {review.location}
                    </span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[10px] uppercase tracking-wider text-luxury-sand font-mono font-bold block">
                      {review.itemPurchased}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400 mt-0.5 block">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global summary count */}
        <div className="mt-12 flex items-center justify-center space-x-2 text-xs text-stone-400 font-serif italic">
          <Heart size={12} className="text-luxury-crimson" />
          <span>Curated with pure devotion for {reviewsList.length} global collectors.</span>
        </div>

      </div>
    </section>
  );
}
