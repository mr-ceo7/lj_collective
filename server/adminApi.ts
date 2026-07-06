import crypto from 'crypto';
import express, { RequestHandler } from 'express';
import dotenv from 'dotenv';
import { products as seedProducts } from '../src/data';
import { Product } from '../src/types';
import { CampaignAsset, LeadRecord } from '../src/admin/types';

dotenv.config();

const app = express();
const port = Number(process.env.ADMIN_API_PORT || 8787);

let products: Product[] = [...seedProducts];
let campaigns: CampaignAsset[] = [];
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
  const configuredToken = process.env.ADMIN_API_TOKEN;
  if (!configuredToken) {
    response.status(500).send('ADMIN_API_TOKEN is not configured on the server.');
    return;
  }

  const token = request.header('authorization')?.replace(/^Bearer\s+/i, '') || '';
  if (!safeCompare(token, configuredToken)) {
    response.status(401).send('Invalid admin token.');
    return;
  }

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
  const { title, imageUrl, placement = 'landing', status = 'draft' } = request.body as Partial<CampaignAsset>;
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
  };
  campaigns = [campaign, ...campaigns];
  response.status(201).json(campaign);
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

app.listen(port, () => {
  console.log(`LJ Collective admin API listening on http://localhost:${port}`);
});
