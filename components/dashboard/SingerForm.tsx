'use client';

import { useState, useEffect } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface SingerFormProps {
  editMode?: boolean;
  initialData?: any;
  onCancel?: () => void;
  onSuccess?: () => void;
}

const emptyMetadata = {
  title: '',
  description: '',
  keywords: '',
  ogTitle: '',
  ogDescription: '',
  twitterTitle: '',
  twitterDescription: '',
};

export default function SingerForm({ editMode = false, initialData, onCancel, onSuccess }: SingerFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: '',
    name: '',
    genre: '',
    bio: '',
    birthDate: '',
    birthplace: '',
    careerStart: 0,
    fullBio: [''] as string[],
    metadata: { ...emptyMetadata },
    seo: {
      structuredData: {
        jobTitle: '',
        knowsAbout: [''] as string[],
      },
      faqs: [] as FAQ[],
    },
  });

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [existingMainImage, setExistingMainImage] = useState<string>('');
  const [existingGalleryImages, setExistingGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    if (editMode && initialData) {
      setFormData({
        slug: initialData.slug || '',
        name: initialData.name || '',
        genre: initialData.genre || '',
        bio: initialData.bio || '',
        birthDate: initialData.birthDate || '',
        birthplace: initialData.birthplace || '',
        careerStart: initialData.careerStart || 0,
        fullBio: initialData.fullBio && initialData.fullBio.length > 0 ? initialData.fullBio : [''],
        metadata: { ...emptyMetadata, ...initialData.metadata },
        seo: {
          structuredData: {
            jobTitle: initialData.seo?.structuredData?.jobTitle ?? '',
            knowsAbout:
              initialData.seo?.structuredData?.knowsAbout?.length
                ? [...initialData.seo.structuredData.knowsAbout]
                : [''],
          },
          faqs: Array.isArray(initialData.seo?.faqs) ? initialData.seo.faqs : [],
        },
      });
      setExistingMainImage(initialData.image || '');
      setExistingGalleryImages(initialData.gallery || []);
    }
  }, [editMode, initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'careerStart' ? parseInt(value, 10) || 0 : value,
      }));
    }
  };

  const handleArrayChange = (field: 'fullBio', index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field: 'fullBio') => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ''],
    }));
  };

  const removeArrayItem = (field: 'fullBio', index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }));
  };

  const handleFAQChange = (index: number, field: keyof FAQ, value: string) => {
    setFormData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        faqs: prev.seo.faqs.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq)),
      },
    }));
  };

  const addFAQ = () => {
    setFormData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        faqs: [...prev.seo.faqs, { question: '', answer: '' }],
      },
    }));
  };

  const removeFAQ = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        faqs: prev.seo.faqs.filter((_, i) => i !== index),
      },
    }));
  };

  const handleSEOStructuredDataChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        structuredData: {
          ...prev.seo.structuredData,
          [field]: value,
        },
      },
    }));
  };

  const handleKnowsAboutChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        structuredData: {
          ...prev.seo.structuredData,
          knowsAbout:
            prev.seo.structuredData.knowsAbout?.map((item, i) => (i === index ? value : item)) || [],
        },
      },
    }));
  };

  const addKnowsAbout = () => {
    setFormData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        structuredData: {
          ...prev.seo.structuredData,
          knowsAbout: [...(prev.seo.structuredData.knowsAbout || []), ''],
        },
      },
    }));
  };

  const removeKnowsAbout = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        structuredData: {
          ...prev.seo.structuredData,
          knowsAbout: prev.seo.structuredData.knowsAbout?.filter((_, i) => i !== index) || [],
        },
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editMode && !initialData?._id) {
        alert('Error: No ID found for editing. Please try again.');
        setLoading(false);
        return;
      }

      const dataToSubmit = {
        ...formData,
        fullBio: formData.fullBio.filter((bio) => bio.trim() !== ''),
        gallery: existingGalleryImages,
        seo: {
          ...formData.seo,
          structuredData: {
            ...formData.seo.structuredData,
            knowsAbout:
              formData.seo.structuredData.knowsAbout?.filter((item) => item.trim() !== '') || [],
          },
          faqs: formData.seo.faqs.filter((faq) => faq.question.trim() !== ''),
        },
      };

      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify(dataToSubmit));
      if (mainImage) {
        formDataToSend.append('mainImage', mainImage);
      }
      galleryImages.forEach((file) => {
        formDataToSend.append('gallery', file);
      });

      let url = '/api/singers';
      const method = editMode ? 'PUT' : 'POST';

      if (editMode && initialData?._id) {
        const id = String(initialData._id).trim();
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        if (!objectIdRegex.test(id)) {
          alert(`Error: Invalid ID format. ID: "${id}". Please try editing again.`);
          setLoading(false);
          return;
        }
        url = `/api/singers/${id}`;
      }

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      const responseText = await response.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch {
        alert(`Error: Invalid response from server. Status: ${response.status}`);
        setLoading(false);
        return;
      }

      if (result.success) {
        alert(editMode ? 'Singer updated successfully!' : 'Singer created successfully!');
        onSuccess?.();
        if (!editMode) {
          setFormData({
            slug: '',
            name: '',
            genre: '',
            bio: '',
            birthDate: '',
            birthplace: '',
            careerStart: 0,
            fullBio: [''],
            metadata: { ...emptyMetadata },
            seo: {
              structuredData: { jobTitle: '', knowsAbout: [''] },
              faqs: [],
            },
          });
          setMainImage(null);
          setGalleryImages([]);
          setExistingMainImage('');
          setExistingGalleryImages([]);
        }
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      alert(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Birth Date</label>
            <input
              type="text"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Birthplace</label>
            <input
              type="text"
              name="birthplace"
              value={formData.birthplace}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Career Start</label>
            <input
              type="number"
              name="careerStart"
              value={formData.careerStart}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
          <p className="text-white/40 text-xs mt-1.5">
            Links: <code className="text-white/55">[visible text](https://…)</code> or{' '}
            <code className="text-white/55">[/singers/slug]</code> — same in full bio paragraphs and FAQ answers.
          </p>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Full Bio</h2>
          <button
            type="button"
            onClick={() => addArrayItem('fullBio')}
            className="px-3 sm:px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base font-semibold min-h-[44px] touch-manipulation"
          >
            Add Paragraph
          </button>
        </div>
        {formData.fullBio.map((bio, index) => (
          <div key={index} className="flex gap-2">
            <textarea
              value={bio}
              onChange={(e) => handleArrayChange('fullBio', index, e.target.value)}
              rows={3}
              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('fullBio', index)}
              className="px-3 sm:px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base font-semibold min-h-[44px] touch-manipulation"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-2xl font-bold text-white">Metadata</h2>
        <div className="space-y-2">
          <input
            type="text"
            name="metadata.title"
            value={formData.metadata.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
          <textarea
            name="metadata.description"
            value={formData.metadata.description}
            onChange={handleInputChange}
            placeholder="Description"
            rows={3}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
          <input
            type="text"
            name="metadata.keywords"
            value={formData.metadata.keywords}
            onChange={handleInputChange}
            placeholder="Keywords"
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
          <input
            type="text"
            name="metadata.ogTitle"
            value={formData.metadata.ogTitle}
            onChange={handleInputChange}
            placeholder="OG Title"
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
          <textarea
            name="metadata.ogDescription"
            value={formData.metadata.ogDescription}
            onChange={handleInputChange}
            placeholder="OG Description"
            rows={2}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
          <input
            type="text"
            name="metadata.twitterTitle"
            value={formData.metadata.twitterTitle}
            onChange={handleInputChange}
            placeholder="Twitter Title"
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
          <textarea
            name="metadata.twitterDescription"
            value={formData.metadata.twitterDescription}
            onChange={handleInputChange}
            placeholder="Twitter Description"
            rows={2}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-2xl font-bold text-white">SEO</h2>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Job Title</label>
            <input
              type="text"
              value={formData.seo.structuredData.jobTitle}
              onChange={(e) => handleSEOStructuredDataChange('jobTitle', e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-white/80">Knows About</label>
              <button
                type="button"
                onClick={addKnowsAbout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
              >
                Add
              </button>
            </div>
            {formData.seo.structuredData.knowsAbout?.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleKnowsAboutChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
                <button
                  type="button"
                  onClick={() => removeKnowsAbout(index)}
                  className="px-3 sm:px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base font-semibold min-h-[44px] touch-manipulation"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-white/80">FAQs</label>
              <button
                type="button"
                onClick={addFAQ}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
              >
                Add FAQ
              </button>
            </div>
            <p className="text-white/40 text-xs mb-2">
              Questions and answers support inline links:{' '}
              <code className="text-white/55">[label](https://…)</code> or <code className="text-white/55">[/path]</code>
            </p>
            {formData.seo.faqs.map((faq, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg space-y-2 mb-2">
                <input
                  type="text"
                  placeholder="Question"
                  value={faq.question}
                  onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
                />
                <textarea
                  placeholder="Answer"
                  value={faq.answer}
                  onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                  rows={2}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeFAQ(index)}
                    className="px-3 sm:px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base font-semibold min-h-[44px] touch-manipulation"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-2xl font-bold text-white">Images</h2>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Main Image</label>
          {existingMainImage && (
            <div className="mb-2">
              <p className="text-white/60 text-sm mb-2">Current Image:</p>
              <img src={existingMainImage} alt="Current" className="w-32 h-32 object-cover rounded" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setMainImage(e.target.files?.[0] || null)}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
          <p className="text-white/40 text-xs mt-1">{editMode ? 'Leave empty to keep current image' : ''}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Gallery Images</label>
          {existingGalleryImages.length > 0 && (
            <div className="mb-2">
              <p className="text-white/60 text-sm mb-2">Current Gallery ({existingGalleryImages.length} images):</p>
              <div className="flex flex-wrap gap-2">
                {existingGalleryImages.map((img, idx) => (
                  <img key={idx} src={img} alt={`Gallery ${idx + 1}`} className="w-24 h-24 object-cover rounded" />
                ))}
              </div>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setGalleryImages(Array.from(e.target.files || []))}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
          <p className="text-white/40 text-xs mt-1">{editMode ? 'Select new images to add to gallery' : ''}</p>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-3 sm:pt-4">
        {editMode && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 sm:px-8 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all font-semibold min-h-[48px] touch-manipulation text-sm sm:text-base"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-500 hover:to-red-600 active:from-red-700 active:to-red-800 transition-all font-semibold disabled:opacity-50 min-h-[48px] touch-manipulation text-sm sm:text-base"
        >
          {loading ? (editMode ? 'Updating...' : 'Submitting...') : editMode ? 'Update' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
