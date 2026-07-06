import { Product, Review, Collection } from './types';

export const collections: Collection[] = [
  {
    id: 'summer-atelier',
    name: 'Summer Atelier',
    tagline: 'Sun-drenched luxury in hand-woven organza and fluid silk drapings.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80',
    description: 'An exploration of light, shadow, and lightweight structure. Inspired by the warmth of Mediterranean afternoons, each piece is a celebration of relaxed sophistication and effortless movement.'
  },
  {
    id: 'winter-silhouette',
    name: 'Winter Silhouette',
    tagline: 'Tailored architectural wools and heavy satin eveningwear.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80',
    description: 'Bespoke tailoring meets high-density warmth. This collection focuses on dramatic silhouettes, structural collars, and double-faced premium cashmere to guard against the elements with ultimate grace.'
  },
  {
    id: 'essential-classic',
    name: 'Essential Classic',
    tagline: 'The foundation of the modern collectors wardrobe.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    description: 'Timeless masterpieces designed to transcend seasonal trends. Hand-finished details, impeccable seams, and luxurious raw textiles that form the core signature of LJ Collective.'
  }
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Bespoke Ivory Silk Gown',
    category: 'haute-couture',
    collection: 'Summer Atelier',
    price: 3450,
    description: 'An ethereal creation crafted from 100% organic mulberry silk. Features a fluid, bias-cut silhouette that ripples elegantly with every movement, structured by a subtle internal bodice for seamless posture.',
    details: [
      '100% fine Italian mulberry silk',
      'Hand-draped bias-cut pattern',
      'Concealed French zip closure',
      'Fully lined in silk habotai',
      'Ethically crafted in our Parisian atelier'
    ],
    sizes: ['FR 34', 'FR 36', 'FR 38', 'FR 40', 'FR 42'],
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 5,
    featured: true,
    materials: '100% Organic Mulberry Silk & Habotai Lining',
    origin: 'Paris, France'
  },
  {
    id: 'p2',
    name: 'Architectural Cashmere Trench Coat',
    category: 'ready-to-wear',
    collection: 'Winter Silhouette',
    price: 4200,
    description: 'A structural masterpiece rendered in double-faced virgin wool and premium grade-A cashmere. Boasts a strong shoulder line, dramatic split-collar detailing, and an elegant hand-stitched sash belt.',
    details: [
      '80% Virgin Wool, 20% Mongolian Cashmere',
      'Hand-stitched double-faced edge finish',
      'Deep sculptural storm flaps',
      'Internal secret passport pocket',
      'Comes with cedar garment bag and brass hanger'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 8,
    featured: true,
    materials: '80% Virgin Wool, 20% Grade-A Mongolian Cashmere',
    origin: 'Ulaanbaatar & Paris'
  },
  {
    id: 'p3',
    name: 'Hand-Pleated Silk Silhouette Dress',
    category: 'haute-couture',
    collection: 'Essential Classic',
    price: 2890,
    description: 'A classical tribute to couture draping. Designed with precision soleil hand-pleating, creating a shimmering play of light. Fits close through the waist before falling into a full, dramatic architectural hem.',
    details: [
      '100% Plissé silk chiffon',
      'Individually heat-treated pleats for lifetime retention',
      'Internal silk corset construction',
      'Delivered in bespoke wooden archival box',
      'Dry clean only by couture specialists'
    ],
    sizes: ['FR 34', 'FR 36', 'FR 38', 'FR 40'],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 3,
    featured: true,
    materials: '100% Plissé Silk Chiffon with Structured Inner Corset',
    origin: 'Parisian Atelier, France'
  },
  {
    id: 'p4',
    name: 'Atelier Noir Hourglass Gown',
    category: 'haute-couture',
    collection: 'Winter Silhouette',
    price: 3800,
    description: 'The ultimate statement in midnight noir elegance. Form-fitted through the torso with an internal boned bustier, flaring dramatically into an architectural mermaid train. Masterfully tailored to define and celebrate natural contours.',
    details: [
      'Heavy-weight Japanese satin crêpe',
      'Hand-finished sweetheart neckline',
      'Internal structural boning',
      'Reinforced sweeping train with protective underskirt',
      'Tailored individually upon request'
    ],
    sizes: ['FR 36', 'FR 38', 'FR 40', 'FR 42'],
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 4,
    featured: false,
    materials: 'Premium Heavy-weight Japanese Satin Crêpe',
    origin: 'Kyoto & Paris Atelier'
  },
  {
    id: 'p5',
    name: 'Satin Slip & Sculpted Slip Dress',
    category: 'ready-to-wear',
    collection: 'Summer Atelier',
    price: 1950,
    description: 'Exquisite minimalism at its finest. Made from high-luster satin with delicate hand-rolled lace trims along the plunging low-back. Tailored to glide smoothly across the skin for an unforgettable second-skin feel.',
    details: [
      '95% Satin Silk, 5% Lycra for comfort drape',
      'Plunging low-back with cross-strap detail',
      'French Leavers lace details',
      'Adjustable internal support strap',
      'Hypoallergenic gold adjustment hardware'
    ],
    sizes: ['FR 34', 'FR 36', 'FR 38', 'FR 40'],
    images: [
      'https://images.unsplash.com/photo-1549064482-6779ba329226?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518764871604-ed411131a76f?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 12,
    featured: false,
    materials: '95% Premium Satin Silk, 5% Lycra & French Leavers Lace',
    origin: 'Lyon, France'
  },
  {
    id: 'p6',
    name: 'Double-Breasted Sculptural Blazer',
    category: 'ready-to-wear',
    collection: 'Essential Classic',
    price: 2100,
    description: 'Sharply tailored shoulders and an architectural cinched waist redefine the traditional blazer. Adorned with monogrammed matte gold buttons, this structural outerwear piece transitions effortlessly from formal meetings to luxury evening occasions.',
    details: [
      '100% fine British wool twill',
      'Cinched-waist structural hourglass design',
      'Maison signature gold-plated brass monogram buttons',
      'Cupro jacquard logo lining',
      'Slightly extended cuffs for a modern drape'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 7,
    featured: true,
    materials: '100% Fine British Wool Twill with Cupro Lining',
    origin: 'Huddersfield & Paris'
  },
  {
    id: 'p7',
    name: 'Emerald Silk Atelier Scarf',
    category: 'accessories',
    collection: 'Summer Atelier',
    price: 650,
    description: 'A beautiful piece of wearable art. Features custom hand-painted botanical motifs inspired by historic French glass gardens. Hand-rolled edges finished by artisans in Lyon, France.',
    details: [
      '100% silk twill (14mm weight)',
      'Hand-rolled and hand-sewn edges',
      'Custom heritage garden watercolor print',
      'Measures 90cm x 90cm',
      'Presented in standard orange luxury gift box'
    ],
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 25,
    featured: false,
    materials: '100% Silk Twill (14mm weight)',
    origin: 'Lyon, France'
  },
  {
    id: 'p8',
    name: 'Minimalist 18K Gold Atelier Choker',
    category: 'jewelry',
    collection: 'Essential Classic',
    price: 5200,
    description: 'A seamless collar of solid 18K yellow gold, brushed to a soft, warm satin finish. Features a flexible internal memory core that conforms comfortably to the neckline with a secure luxury clasp.',
    details: [
      'Solid 18K yellow gold (certified ethical sourcing)',
      'Satin brushed exterior, polished interior finish',
      'Flexible internal memory-wire alloy structure',
      'Discreet integrated spring-loaded safety lock',
      'Total weight: 24.5g'
    ],
    sizes: ['38 cm', '40 cm'],
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 3,
    featured: true,
    materials: 'Solid 18K Gold with flexible memory alloy',
    origin: 'Arezzo, Italy'
  }
];

export const reviews: Review[] = [
  {
    id: 'r1',
    author: 'Amandine de Beauvoir',
    rating: 5,
    comment: 'The drape of the Bespoke Ivory Silk Gown is absolutely celestial. It fits as if it were molded directly onto my silhouette. The hand-finished Parisian seams are a true testament to the heights of high couture.',
    date: 'June 18, 2026',
    location: 'Paris, France',
    verified: true,
    itemPurchased: 'Bespoke Ivory Silk Gown'
  },
  {
    id: 'r2',
    author: 'Victoria Sterling-Hume',
    rating: 5,
    comment: 'Outstanding density and weight. The Cashmere Trench is incredibly architectural and blocks cold Alpine winds completely while retaining an elegant, lightweight aesthetic. Truly the crown jewel of my outerwear wardrobe.',
    date: 'April 02, 2026',
    location: 'London, UK',
    verified: true,
    itemPurchased: 'Architectural Cashmere Trench Coat'
  },
  {
    id: 'r3',
    author: 'Yuki Takahashi',
    rating: 5,
    comment: 'The 18K Gold Choker has a beautiful, understated warmth. It is beautifully balanced and sits flush against the neck. The packaging, white glove courier delivery, and customer experience was absolutely impeccable.',
    date: 'May 12, 2026',
    location: 'Tokyo, Japan',
    verified: true,
    itemPurchased: 'Minimalist 18K Gold Atelier Choker'
  },
  {
    id: 'r4',
    author: 'Alessia Moretti',
    rating: 5,
    comment: 'I wore the Atelier Noir Hourglass Gown for the Milan Opera Season Opener. The internal corset was comfortable for a 4-hour performance, and the sweeping train commanded absolute attention. Pure dramatic poetry.',
    date: 'December 22, 2025',
    location: 'Milan, Italy',
    verified: true,
    itemPurchased: 'Atelier Noir Hourglass Gown'
  },
  {
    id: 'r5',
    author: 'Eleanor Vance',
    rating: 5,
    comment: 'Minimalism executed at its peak. The Satin Slip Dress feels incredibly smooth and is cut beautifully on the bias. The French Leavers lace along the spine is a subtle, elegant detail that highlights the brand’s perfectionism.',
    date: 'January 14, 2026',
    location: 'New York, USA',
    verified: true,
    itemPurchased: 'Satin Slip & Sculpted Slip Dress'
  }
];
