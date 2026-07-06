import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Ruler, Info } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'cm' | 'inch'>('cm');

  if (!isOpen) return null;

  // Sizing data based on Parisian Haute Couture / RTW standards
  const sizingData = [
    { fr: 'FR 34', int: 'XS', bustCm: 80, bustIn: 31.5, waistCm: 62, waistIn: 24.4, hipsCm: 86, hipsIn: 33.8 },
    { fr: 'FR 36', int: 'S', bustCm: 84, bustIn: 33.1, waistCm: 66, waistIn: 26.0, hipsCm: 90, hipsIn: 35.4 },
    { fr: 'FR 38', int: 'M', bustCm: 88, bustIn: 34.6, waistCm: 70, waistIn: 27.6, hipsCm: 94, hipsIn: 37.0 },
    { fr: 'FR 40', int: 'L', bustCm: 92, bustIn: 36.2, waistCm: 74, waistIn: 29.1, hipsCm: 98, hipsIn: 38.6 },
    { fr: 'FR 42', int: 'XL', bustCm: 96, bustIn: 37.8, waistCm: 78, waistIn: 30.7, hipsCm: 102, hipsIn: 40.2 },
  ];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-luxury-obsidian/45 backdrop-blur-xs"
      />

      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="relative bg-luxury-pearl w-full max-w-lg shadow-2xl rounded-xs border border-stone-200/50 p-6 z-10 overflow-y-auto max-h-[90vh]"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-luxury-obsidian/70 hover:text-luxury-crimson transition-colors cursor-pointer p-1"
          aria-label="Close size guide"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-2 mb-6 border-b border-stone-200/50 pb-4">
          <Ruler size={18} className="text-luxury-crimson animate-pulse" />
          <h4 className="font-serif text-lg uppercase tracking-wider text-luxury-obsidian font-medium">
            Maison Size & Fitting Guide
          </h4>
        </div>

        {/* Unit Selector */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] uppercase tracking-widest text-stone-500 font-mono">
            Parisian Sizing Standard
          </span>
          <div className="border border-stone-200 p-0.5 rounded-xs flex space-x-1 bg-stone-50/50">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-[9px] font-mono tracking-widest uppercase transition-all rounded-xs cursor-pointer ${
                unit === 'cm'
                  ? 'bg-luxury-obsidian text-white font-semibold'
                  : 'text-stone-500 hover:text-luxury-obsidian'
              }`}
            >
              Metric (CM)
            </button>
            <button
              onClick={() => setUnit('inch')}
              className={`px-3 py-1 text-[9px] font-mono tracking-widest uppercase transition-all rounded-xs cursor-pointer ${
                unit === 'inch'
                  ? 'bg-luxury-obsidian text-white font-semibold'
                  : 'text-stone-500 hover:text-luxury-obsidian'
              }`}
            >
              Imperial (IN)
            </button>
          </div>
        </div>

        {/* Sizing Table */}
        <div className="border border-stone-200 overflow-hidden mb-6 rounded-xs">
          <table className="w-full border-collapse text-left text-xs font-mono">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-[9px] uppercase tracking-wider text-stone-500">
                <th className="p-3 font-semibold">Paris (FR)</th>
                <th className="p-3 font-semibold">Intl</th>
                <th className="p-3 font-semibold">Bust</th>
                <th className="p-3 font-semibold">Waist</th>
                <th className="p-3 font-semibold">Hips</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-luxury-obsidian">
              {sizingData.map((row) => (
                <tr key={row.fr} className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-3 font-bold text-luxury-crimson-light">{row.fr}</td>
                  <td className="p-3 font-semibold">{row.int}</td>
                  <td className="p-3">
                    {unit === 'cm' ? `${row.bustCm} cm` : `${row.bustIn}"`}
                  </td>
                  <td className="p-3">
                    {unit === 'cm' ? `${row.waistCm} cm` : `${row.waistIn}"`}
                  </td>
                  <td className="p-3">
                    {unit === 'cm' ? `${row.hipsCm} cm` : `${row.hipsIn}"`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measuring Instructions */}
        <div className="bg-stone-50 border border-stone-200/50 p-4 rounded-xs text-[11px] text-stone-600 space-y-3 leading-relaxed">
          <div className="flex items-start space-x-2">
            <Info size={14} className="text-luxury-crimson shrink-0 mt-0.5" />
            <span className="font-semibold text-luxury-obsidian font-sans uppercase tracking-widest text-[9px]">
              How to Measure
            </span>
          </div>
          <div className="space-y-2">
            <p>
              <strong className="text-luxury-obsidian font-sans">Bust:</strong> Measure horizontally around the fullest part of your chest, keeping the tape snug but not tight.
            </p>
            <p>
              <strong className="text-luxury-obsidian font-sans">Waist:</strong> Measure around the narrowest part of your natural waistline, usually above your navel.
            </p>
            <p>
              <strong className="text-luxury-obsidian font-sans">Hips:</strong> Stand with feet together and measure around the widest point of your hips.
            </p>
          </div>
        </div>

        {/* Custom tailored note */}
        <div className="text-center mt-6">
          <p className="text-[10px] italic text-luxury-crimson-light font-serif">
            Note: All bespoke haute-couture items can be custom-tailored to your exact proportions at our Parisian atelier.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
