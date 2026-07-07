import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import express, { RequestHandler } from 'express';
import dotenv from 'dotenv';
import { products as seedProducts } from '../src/data';
import { Product } from '../src/types';
import { CampaignAsset, LeadRecord } from '../src/admin/types';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT || process.env.ADMIN_API_PORT || 8787);

let products: Product[] = [...seedProducts];
let campaigns: CampaignAsset[] = [
  // Seed lookbook campaigns so the carousel has content out of the box
  {
    id: 'lookbook-seed-1',
    title: 'Sculpted Silk Drape',
    imageUrl: '/assets/SaveClip.App_726247220_18412051285196378_8868740418072431020_n.jpg',
    placement: 'lookbook',
    status: 'published',
    sortOrder: 1,
    createdAt: new Date().toISOString(),
    tag: 'Summer Atelier',
    ctaText: 'View Collection',
    ctaLink: '#showroom',
  },
  {
    id: 'lookbook-seed-2',
    title: 'Atelier Velvet Gown',
    imageUrl: '/assets/SaveClip.App_624834568_18017954063804569_8949826810407604632_n.jpg',
    placement: 'lookbook',
    status: 'published',
    sortOrder: 2,
    createdAt: new Date().toISOString(),
    tag: 'Haute Couture',
    ctaText: 'Shop Now',
    ctaLink: '#showroom',
  },
  {
    id: 'lookbook-seed-3',
    title: 'Gold Filigree Embroidery',
    imageUrl: '/assets/SaveClip.App_722933692_17939682528252474_6588271153929750448_n.jpg',
    placement: 'lookbook',
    status: 'published',
    sortOrder: 3,
    createdAt: new Date().toISOString(),
    tag: 'Bespoke Craft',
    ctaText: 'Explore Piece',
    ctaLink: '#showroom',
  },
  {
    id: 'lookbook-seed-4',
    title: 'Structured Silhouette',
    imageUrl: '/assets/SaveClip.App_726380751_18412051270196378_903608071847032010_n.jpg',
    placement: 'lookbook',
    status: 'published',
    sortOrder: 4,
    createdAt: new Date().toISOString(),
    tag: 'Winter Tailoring',
    ctaText: 'View Details',
    ctaLink: '#showroom',
  },
  {
    id: 'lookbook-seed-5',
    title: 'Midnight Noir Elegance',
    imageUrl: '/assets/SaveClip.App_623758730_18076782257608947_7818919390501333055_n.jpg',
    placement: 'lookbook',
    status: 'published',
    sortOrder: 5,
    createdAt: new Date().toISOString(),
    tag: 'Evening Collection',
    ctaText: 'Discover More',
    ctaLink: '#showroom',
  },
  {
    id: 'lookbook-seed-6',
    title: 'Parisian Atelier Dream',
    imageUrl: '/assets/SaveClip.App_620992128_17955701148055842_8542658560222115683_n.jpg',
    placement: 'lookbook',
    status: 'published',
    sortOrder: 6,
    createdAt: new Date().toISOString(),
    tag: 'Essential Classic',
    ctaText: 'Shop Collection',
    ctaLink: '#showroom',
  },
];
let leads: LeadRecord[] = [
  {
    id: 'lead-private-fitting-demo',
    name: 'Private Salon Inquiry',
    email: 'client@example.com',
    source: 'private-fitting',
    status: 'new',
    interest: 'Winter Silhouette appointment',
    createdAt: new Date().toISOString(),
  },
];

app.use(express.json({ limit: '1mb' }));

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

const requireAdmin: RequestHandler = (request, response, next) => {
  // Free to enter for now! Bypassing authentication check.
  next();
};

function productFromBody(body: Partial<Product>): Product {
  if (!body.name || !body.description || !Array.isArray(body.images) || body.images.length === 0) {
    throw new Error('Product name, description, and at least one image are required.');
  }

  return {
    id: body.id || `product-${crypto.randomUUID()}`,
    name: String(body.name),
    category: body.category || 'ready-to-wear',
    collection: body.collection || 'Essential Classic',
    price: Number(body.price || 0),
    description: String(body.description),
    details: Array.isArray(body.details) ? body.details.map(String) : [],
    sizes: Array.isArray(body.sizes) && body.sizes.length > 0 ? body.sizes.map(String) : ['One Size'],
    images: body.images.map(String),
    stock: Math.max(0, Number(body.stock || 0)),
    featured: Boolean(body.featured),
    materials: body.materials ? String(body.materials) : '',
    origin: body.origin ? String(body.origin) : '',
  };
}

app.get('/api/admin/products', requireAdmin, (_request, response) => {
  response.json(products);
});

app.post('/api/admin/products', requireAdmin, (request, response) => {
  try {
    const product = productFromBody(request.body);
    products = [product, ...products];
    response.status(201).json(product);
  } catch (error) {
    response.status(400).send(error instanceof Error ? error.message : 'Invalid product payload.');
  }
});

app.patch('/api/admin/products/:id', requireAdmin, (request, response) => {
  const existing = products.find((product) => product.id === request.params.id);
  if (!existing) {
    response.status(404).send('Product not found.');
    return;
  }

  try {
    const updated = productFromBody({ ...existing, ...request.body, id: existing.id });
    products = products.map((product) => (product.id === existing.id ? updated : product));
    response.json(updated);
  } catch (error) {
    response.status(400).send(error instanceof Error ? error.message : 'Invalid product payload.');
  }
});

app.delete('/api/admin/products/:id', requireAdmin, (request, response) => {
  products = products.filter((product) => product.id !== request.params.id);
  response.json({ ok: true });
});

app.get('/api/admin/campaigns', requireAdmin, (_request, response) => {
  response.json(campaigns);
});

app.post('/api/admin/campaigns', requireAdmin, (request, response) => {
  const { title, imageUrl, placement = 'landing', status = 'draft', tag, ctaText, ctaLink } = request.body as Partial<CampaignAsset>;
  if (!title || !imageUrl) {
    response.status(400).send('Campaign title and imageUrl are required.');
    return;
  }

  const campaign: CampaignAsset = {
    id: `campaign-${crypto.randomUUID()}`,
    title,
    imageUrl,
    placement,
    status,
    sortOrder: campaigns.length + 1,
    createdAt: new Date().toISOString(),
    tag: tag || '',
    ctaText: ctaText || '',
    ctaLink: ctaLink || '',
  };
  campaigns = [campaign, ...campaigns];
  response.status(201).json(campaign);
});

app.delete('/api/admin/campaigns/:id', requireAdmin, (request, response) => {
  const exists = campaigns.some((c) => c.id === request.params.id);
  if (!exists) {
    response.status(404).send('Campaign not found.');
    return;
  }
  campaigns = campaigns.filter((c) => c.id !== request.params.id);
  response.json({ ok: true });
});

// Public endpoint — no auth required. Returns only published lookbook campaigns.
app.get('/api/lookbook', (_request, response) => {
  const lookbookItems = campaigns
    .filter((c) => c.placement === 'lookbook' && c.status === 'published')
    .sort((a, b) => a.sortOrder - b.sortOrder);
  response.json(lookbookItems);
});

app.get('/api/admin/leads', requireAdmin, (_request, response) => {
  response.json(leads);
});

app.patch('/api/admin/leads/:id', requireAdmin, (request, response) => {
  const existing = leads.find((lead) => lead.id === request.params.id);
  if (!existing) {
    response.status(404).send('Lead not found.');
    return;
  }

  const updated: LeadRecord = {
    ...existing,
    status: request.body.status || existing.status,
    notes: request.body.notes ?? existing.notes,
  };
  leads = leads.map((lead) => (lead.id === existing.id ? updated : lead));
  response.json(updated);
});

app.post('/api/admin/uploads/campaign-signature', requireAdmin, (_request, response) => {
  response.status(501).json({
    message: 'Configure a storage adapter here to return a signed upload URL for S3, Cloudinary, Firebase Storage, or Supabase Storage.',
  });
});

// Resolve the static files directory:
// If running from server/ directory in dev, serve from '../dist'.
// If bundled in production (dist/server.js), serve from current directory '.'.
const distPath = __dirname.endsWith('server')
  ? path.resolve(__dirname, '../dist')
  : path.resolve(__dirname, '.');

app.use(express.static(distPath));

// Fallback index.html for client-side routing, excluding API routes
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, async () => {
  console.log(`LJ Collective admin API listening on http://localhost:${port}`);
  console.log(`__dirname is: ${__dirname}`);
  console.log(`distPath is: ${distPath}`);
  try {
    const fs = await import('fs');
    console.log(`Files in distPath:`, fs.readdirSync(distPath));
    const assetsPath = path.join(distPath, 'assets');
    if (fs.existsSync(assetsPath)) {
      console.log(`Files in distPath/assets (first 15):`, fs.readdirSync(assetsPath).slice(0, 15));
    } else {
      console.log(`distPath/assets does not exist!`);
    }
  } catch (err) {
    console.error(`Error listing diagnostic directories:`, err);
  }
});
