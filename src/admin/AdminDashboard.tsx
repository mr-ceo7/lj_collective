import { type FormEvent, useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ImageUp, KeyRound, LayoutDashboard, PackagePlus, RefreshCw, Save, Trash2, Users } from 'lucide-react';
import { Product } from '../types';
import { CampaignAsset, LeadRecord } from './types';

type AdminTab = 'products' | 'campaigns' | 'leads';

const emptyProduct: Omit<Product, 'id'> = {
  name: '',
  category: 'ready-to-wear',
  collection: 'Essential Classic',
  price: 0,
  description: '',
  details: [''],
  sizes: ['One Size'],
  images: ['', ''],
  stock: 1,
  featured: false,
  materials: '',
  origin: '',
};

async function adminFetch<T>(path: string, token: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export default function AdminDashboard() {
  const [token, setToken] = useState(() => sessionStorage.getItem('ljc_admin_token') || '');
  const [activeTab, setActiveTab] = useState<AdminTab>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignAsset[]>([]);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [productDraft, setProductDraft] = useState(emptyProduct);
  const [campaignDraft, setCampaignDraft] = useState({
    title: '',
    imageUrl: '',
    placement: 'landing' as CampaignAsset['placement'],
    status: 'draft' as CampaignAsset['status'],
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = token.trim().length > 0;

  const loadAdminData = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setStatusMessage('');
    try {
      const [nextProducts, nextCampaigns, nextLeads] = await Promise.all([
        adminFetch<Product[]>('/api/admin/products', token),
        adminFetch<CampaignAsset[]>('/api/admin/campaigns', token),
        adminFetch<LeadRecord[]>('/api/admin/leads', token),
      ]);
      setProducts(nextProducts);
      setCampaigns(nextCampaigns);
      setLeads(nextLeads);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to load admin data.');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    void loadAdminData();
  }, [loadAdminData]);

  const handleTokenSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sessionStorage.setItem('ljc_admin_token', token);
    void loadAdminData();
  };

  const handleCreateProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage('');
    const payload = {
      ...productDraft,
      price: Number(productDraft.price),
      stock: Number(productDraft.stock),
      details: productDraft.details.filter(Boolean),
      sizes: productDraft.sizes.filter(Boolean),
      images: productDraft.images.filter(Boolean),
    };

    try {
      const created = await adminFetch<Product>('/api/admin/products', token, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setProducts((current) => [created, ...current]);
      setProductDraft(emptyProduct);
      setStatusMessage('Product added to catalog.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to create product.');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    await adminFetch<{ ok: true }>(`/api/admin/products/${productId}`, token, { method: 'DELETE' });
    setProducts((current) => current.filter((product) => product.id !== productId));
  };

  const handleCreateCampaign = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage('');
    try {
      const created = await adminFetch<CampaignAsset>('/api/admin/campaigns', token, {
        method: 'POST',
        body: JSON.stringify(campaignDraft),
      });
      setCampaigns((current) => [created, ...current]);
      setCampaignDraft({ title: '', imageUrl: '', placement: 'landing', status: 'draft' });
      setStatusMessage('Campaign photo saved.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to save campaign.');
    }
  };

  const handleUpdateLeadStatus = async (leadId: string, status: LeadRecord['status']) => {
    const updated = await adminFetch<LeadRecord>(`/api/admin/leads/${leadId}`, token, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    setLeads((current) => current.map((lead) => (lead.id === leadId ? updated : lead)));
  };

  return (
    <main className="min-h-screen bg-luxury-pearl text-luxury-obsidian px-5 py-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <a href="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 hover:text-luxury-crimson">
              <ArrowLeft size={14} />
              Storefront
            </a>
            <div className="mt-4 flex items-center gap-3">
              <LayoutDashboard size={22} className="text-luxury-sand" />
              <div>
                <p className="mono-label text-luxury-crimson">Secure Admin</p>
                <h1 className="font-serif text-3xl md:text-5xl">Commerce Control Room</h1>
              </div>
            </div>
          </div>

          <form onSubmit={handleTokenSubmit} className="flex w-full gap-2 md:w-auto">
            <label className="sr-only" htmlFor="admin-token">Admin API token</label>
            <input
              id="admin-token"
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="Admin API token"
              className="clay-input min-w-0 flex-1 px-4 py-3 text-xs md:w-72"
            />
            <button type="submit" className="inline-flex items-center gap-2 bg-luxury-crimson px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white">
              <KeyRound size={14} />
              Unlock
            </button>
          </form>
        </header>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {[
              ['products', PackagePlus, 'Products'],
              ['campaigns', ImageUp, 'Campaign Photos'],
              ['leads', Users, 'Clients & Leads'],
            ].map(([id, Icon, label]) => (
              <button
                key={id as string}
                onClick={() => setActiveTab(id as AdminTab)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-[10px] uppercase tracking-widest ${activeTab === id ? 'clay-btn-active' : 'clay-btn'}`}
              >
                <Icon size={14} />
                {label as string}
              </button>
            ))}
          </div>
          <button onClick={loadAdminData} className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 hover:text-luxury-crimson">
            <RefreshCw size={13} className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {statusMessage && (
          <div className="mt-5 border border-luxury-crimson/30 bg-luxury-crimson/10 px-4 py-3 text-xs text-luxury-obsidian">
            {statusMessage}
          </div>
        )}

        {!isAuthenticated ? (
          <section className="mt-10 border border-white/10 p-6">
            <h2 className="font-serif text-2xl">Admin API token required</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-400">
              This admin surface is intentionally backed by `/api/admin/*`. Set `ADMIN_API_TOKEN` on the server and enter it above.
            </p>
          </section>
        ) : activeTab === 'products' ? (
          <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(320px,420px)_1fr]">
            <form onSubmit={handleCreateProduct} className="space-y-4 border border-white/10 p-5">
              <h2 className="font-serif text-2xl">Add Product</h2>
              <input required value={productDraft.name} onChange={(e) => setProductDraft({ ...productDraft, name: e.target.value })} placeholder="Product name" className="clay-input w-full px-3 py-2 text-xs" />
              <div className="grid grid-cols-2 gap-3">
                <input required type="number" value={productDraft.price} onChange={(e) => setProductDraft({ ...productDraft, price: Number(e.target.value) })} placeholder="Price" className="clay-input px-3 py-2 text-xs" />
                <input required type="number" value={productDraft.stock} onChange={(e) => setProductDraft({ ...productDraft, stock: Number(e.target.value) })} placeholder="Stock" className="clay-input px-3 py-2 text-xs" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select value={productDraft.category} onChange={(e) => setProductDraft({ ...productDraft, category: e.target.value as Product['category'] })} className="clay-input px-3 py-2 text-xs">
                  <option value="ready-to-wear">Ready-to-wear</option>
                  <option value="haute-couture">Haute couture</option>
                  <option value="accessories">Accessories</option>
                  <option value="jewelry">Jewelry</option>
                </select>
                <select value={productDraft.collection} onChange={(e) => setProductDraft({ ...productDraft, collection: e.target.value as Product['collection'] })} className="clay-input px-3 py-2 text-xs">
                  <option value="Summer Atelier">Summer Atelier</option>
                  <option value="Winter Silhouette">Winter Silhouette</option>
                  <option value="Essential Classic">Essential Classic</option>
                </select>
              </div>
              <textarea required value={productDraft.description} onChange={(e) => setProductDraft({ ...productDraft, description: e.target.value })} placeholder="Description" rows={4} className="clay-input w-full px-3 py-2 text-xs" />
              <input value={productDraft.images.join(', ')} onChange={(e) => setProductDraft({ ...productDraft, images: e.target.value.split(',').map((value) => value.trim()) })} placeholder="Image URLs, comma separated" className="clay-input w-full px-3 py-2 text-xs" />
              <input value={productDraft.sizes.join(', ')} onChange={(e) => setProductDraft({ ...productDraft, sizes: e.target.value.split(',').map((value) => value.trim()) })} placeholder="Sizes, comma separated" className="clay-input w-full px-3 py-2 text-xs" />
              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 bg-luxury-crimson px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white">
                <Save size={14} />
                Save Product
              </button>
            </form>

            <div className="overflow-hidden border border-white/10">
              <table className="w-full min-w-[720px] text-left text-xs">
                <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-stone-400">
                  <tr><th className="p-3">Product</th><th>Category</th><th>Stock</th><th>Price</th><th></th></tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-t border-white/10">
                      <td className="p-3 font-serif text-base">{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.stock}</td>
                      <td>Ksh {product.price.toLocaleString()}</td>
                      <td className="pr-3 text-right">
                        <button onClick={() => handleDeleteProduct(product.id)} className="text-stone-400 hover:text-luxury-crimson" aria-label={`Delete ${product.name}`}>
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : activeTab === 'campaigns' ? (
          <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(320px,420px)_1fr]">
            <form onSubmit={handleCreateCampaign} className="space-y-4 border border-white/10 p-5">
              <h2 className="font-serif text-2xl">Post Campaign Photo</h2>
              <input required value={campaignDraft.title} onChange={(e) => setCampaignDraft({ ...campaignDraft, title: e.target.value })} placeholder="Campaign title" className="clay-input w-full px-3 py-2 text-xs" />
              <input required value={campaignDraft.imageUrl} onChange={(e) => setCampaignDraft({ ...campaignDraft, imageUrl: e.target.value })} placeholder="Uploaded image URL" className="clay-input w-full px-3 py-2 text-xs" />
              <div className="grid grid-cols-2 gap-3">
                <select value={campaignDraft.placement} onChange={(e) => setCampaignDraft({ ...campaignDraft, placement: e.target.value as CampaignAsset['placement'] })} className="clay-input px-3 py-2 text-xs">
                  <option value="hero">Hero</option>
                  <option value="landing">Landing</option>
                  <option value="lookbook">Lookbook</option>
                  <option value="product-story">Product story</option>
                </select>
                <select value={campaignDraft.status} onChange={(e) => setCampaignDraft({ ...campaignDraft, status: e.target.value as CampaignAsset['status'] })} className="clay-input px-3 py-2 text-xs">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 bg-luxury-crimson px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white">
                <ImageUp size={14} />
                Save Campaign
              </button>
            </form>

            <div className="grid gap-4 md:grid-cols-2">
              {campaigns.map((campaign) => (
                <article key={campaign.id} className="border border-white/10 p-3">
                  <img src={campaign.imageUrl} alt={campaign.title} className="aspect-[4/3] w-full object-cover" />
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-lg">{campaign.title}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-stone-400">{campaign.placement} / {campaign.status}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <section className="mt-8 overflow-hidden border border-white/10">
            <table className="w-full min-w-[760px] text-left text-xs">
              <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-stone-400">
                <tr><th className="p-3">Client</th><th>Source</th><th>Interest</th><th>Status</th><th>Created</th></tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-t border-white/10">
                    <td className="p-3"><div className="font-serif text-base">{lead.name}</div><div className="text-stone-400">{lead.email}</div></td>
                    <td>{lead.source}</td>
                    <td>{lead.interest || 'General inquiry'}</td>
                    <td>
                      <select value={lead.status} onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as LeadRecord['status'])} className="clay-input px-3 py-2 text-xs">
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </main>
  );
}
