'use client';

import { FormEvent, useEffect, useState } from 'react';

interface ProductFormProps {
  editMode?: boolean;
  initialData?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const emptyForm = {
  title: '', slug: '', description: '', price: '', category: 'Original Artwork',
  dimensions: '', medium: '', status: 'available', featured: false, image: '',
};

export default function ProductForm({ editMode = false, initialData, onSuccess, onCancel }: ProductFormProps) {
  const [form, setForm] = useState<any>(emptyForm);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editMode && initialData) {
      setForm({ ...emptyForm, ...initialData, price: String(initialData.price ?? '') });
      setPreview(initialData.image || '');
      setExistingGallery(Array.isArray(initialData.gallery) ? initialData.gallery : []);
    } else {
      setForm(emptyForm);
      setPreview('');
      setExistingGallery([]);
    }
    setImage(null);
    setGalleryFiles([]);
    setError('');
  }, [editMode, initialData]);

  const setField = (name: string, value: string | boolean) => setForm((current: any) => ({ ...current, [name]: value }));

  const handleTitle = (title: string) => {
    const slug = editMode ? form.slug : title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setForm((current: any) => ({ ...current, title, slug }));
  };

  const handleImage = (file?: File) => {
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const addGalleryImages = (files: FileList | null) => {
    if (!files) return;
    setGalleryFiles((current) => [...current, ...Array.from(files)]);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!image && !form.image) return setError('Product image is required.');
    setSaving(true);
    setError('');
    try {
      const payload = new FormData();
      payload.append('data', JSON.stringify({ ...form, gallery: existingGallery, price: Number(form.price) }));
      if (image) payload.append('image', image);
      galleryFiles.forEach((file) => payload.append('gallery', file, file.name));
      const response = await fetch(editMode ? `/api/products/${initialData._id}` : '/api/products', {
        method: editMode ? 'PUT' : 'POST', body: payload,
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || 'Could not save product');
      if (!editMode) setForm(emptyForm);
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'Could not save product');
    } finally {
      setSaving(false);
    }
  };

  const inputClass = 'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-red-500 focus:outline-none';

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-red-400">Art & Collectibles</p>
        <h2 className="mt-2 font-display text-2xl font-bold">{editMode ? 'Edit product' : 'Add a new product'}</h2>
      </div>
      {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">{error}</div>}
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2"><span className="text-sm text-white/70">Title *</span><input required className={inputClass} value={form.title} onChange={(e) => handleTitle(e.target.value)} placeholder="Crimson Melody" /></label>
        <label className="space-y-2"><span className="text-sm text-white/70">Slug *</span><input required className={inputClass} value={form.slug} onChange={(e) => setField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))} placeholder="crimson-melody" /></label>
        <label className="space-y-2"><span className="text-sm text-white/70">Price (PKR) *</span><input required min="0" type="number" className={inputClass} value={form.price} onChange={(e) => setField('price', e.target.value)} placeholder="45000" /></label>
        <label className="space-y-2"><span className="text-sm text-white/70">Category *</span><input required className={inputClass} value={form.category} onChange={(e) => setField('category', e.target.value)} placeholder="Original Artwork" /></label>
        <label className="space-y-2"><span className="text-sm text-white/70">Medium</span><input className={inputClass} value={form.medium} onChange={(e) => setField('medium', e.target.value)} placeholder="Acrylic on canvas" /></label>
        <label className="space-y-2"><span className="text-sm text-white/70">Dimensions</span><input className={inputClass} value={form.dimensions} onChange={(e) => setField('dimensions', e.target.value)} placeholder="24 × 36 inches" /></label>
        <label className="space-y-2"><span className="text-sm text-white/70">Availability</span><select className={inputClass} value={form.status} onChange={(e) => setField('status', e.target.value)}><option className="bg-neutral-900" value="available">Available</option><option className="bg-neutral-900" value="reserved">Reserved</option><option className="bg-neutral-900" value="sold">Sold</option></select></label>
        <label className="flex items-center gap-3 self-end rounded-xl border border-white/10 bg-white/5 px-4 py-3"><input type="checkbox" checked={form.featured} onChange={(e) => setField('featured', e.target.checked)} /><span>Feature on homepage</span></label>
      </div>
      <label className="block space-y-2"><span className="text-sm text-white/70">Description *</span><textarea required rows={5} className={inputClass} value={form.description} onChange={(e) => setField('description', e.target.value)} placeholder="Tell the story behind this piece..." /></label>
      <div className="grid items-center gap-5 md:grid-cols-[180px_1fr]">
        <div className="aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5">{preview ? <img src={preview} alt="Product preview" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-white/35">Image preview</div>}</div>
        <label className="space-y-2"><span className="text-sm text-white/70">Product image *</span><input type="file" accept="image/*" onChange={(e) => handleImage(e.target.files?.[0])} className="block w-full rounded-xl border border-dashed border-white/20 p-5 text-sm text-white/60 file:mr-4 file:rounded-full file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-white" /></label>
      </div>
      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
        <div>
          <p className="font-medium text-white">Additional gallery images</p>
          <p className="mt-1 text-xs text-white/45">You can select and upload multiple photos at once.</p>
        </div>
        <input type="file" accept="image/*" multiple onChange={(e) => addGalleryImages(e.target.files)} className="block w-full rounded-xl border border-dashed border-white/20 p-5 text-sm text-white/60 file:mr-4 file:rounded-full file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-white" />
        {(existingGallery.length > 0 || galleryFiles.length > 0) && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {existingGallery.map((src) => <div key={src} className="group relative aspect-square overflow-hidden rounded-xl border border-white/10"><img src={src} alt="Saved gallery image" className="h-full w-full object-cover"/><button type="button" onClick={() => setExistingGallery((current) => current.filter((url) => url !== src))} className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/80 text-lg text-white hover:bg-red-600" aria-label="Remove saved image">×</button></div>)}
            {galleryFiles.map((file, index) => <div key={`${file.name}-${file.lastModified}-${index}`} className="group relative aspect-square overflow-hidden rounded-xl border border-red-500/30"><img src={URL.createObjectURL(file)} alt="New gallery preview" className="h-full w-full object-cover"/><span className="absolute bottom-2 left-2 rounded bg-red-600 px-2 py-1 text-[10px] uppercase">New</span><button type="button" onClick={() => setGalleryFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/80 text-lg text-white hover:bg-red-600" aria-label="Remove new image">×</button></div>)}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-3"><button disabled={saving} className="rounded-full bg-red-600 px-7 py-3 font-semibold transition hover:bg-red-500 disabled:opacity-50">{saving ? 'Saving...' : editMode ? 'Update product' : 'Add product'}</button>{onCancel && <button type="button" onClick={onCancel} className="rounded-full border border-white/15 px-7 py-3 text-white/75 hover:bg-white/5">Cancel</button>}</div>
    </form>
  );
}
