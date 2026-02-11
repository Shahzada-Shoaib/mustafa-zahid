'use client';

import { useState } from 'react';

interface Performance {
  name: string;
  description: string;
  year?: number;
}

interface Award {
  name: string;
  year: number;
  category: string;
}

interface Collaboration {
  artist: string;
  performance: string;
}

interface Milestone {
  year: number;
  event: string;
}

interface FAQ {
  question: string;
  answer: string;
}

export default function QawwalForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: '',
    name: '',
    bio: '',
    birthDate: '',
    birthplace: '',
    careerStart: 0,
    fullBio: [''],
    performances: [] as Performance[],
    awards: [] as Award[],
    collaborations: [] as Collaboration[],
    stats: {
      performances: 0,
      recordings: 0,
      awards: 0,
      views: '',
      streams: '',
      followers: '',
    },
    milestones: [] as Milestone[],
    achievements: [''],
    metadata: {
      title: '',
      description: '',
      keywords: '',
      ogTitle: '',
      ogDescription: '',
      twitterTitle: '',
      twitterDescription: '',
    },
    seo: {
      structuredData: {
        jobTitle: '',
        knowsAbout: [''],
      },
      faqs: [] as FAQ[],
    },
  });

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'metadata') {
        setFormData(prev => ({
          ...prev,
          metadata: {
            ...prev.metadata,
            [child]: value,
          },
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'careerStart' ? parseInt(value) || 0 : value,
      }));
    }
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as string[]), ''],
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index),
    }));
  };

  const handlePerformanceChange = (index: number, field: keyof Performance, value: string | number | undefined) => {
    setFormData(prev => ({
      ...prev,
      performances: prev.performances.map((perf, i) =>
        i === index ? { ...perf, [field]: value } : perf
      ),
    }));
  };

  const addPerformance = () => {
    setFormData(prev => ({
      ...prev,
      performances: [...prev.performances, { name: '', description: '', year: undefined }],
    }));
  };

  const removePerformance = (index: number) => {
    setFormData(prev => ({
      ...prev,
      performances: prev.performances.filter((_, i) => i !== index),
    }));
  };

  const handleAwardChange = (index: number, field: keyof Award, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      awards: prev.awards.map((award, i) =>
        i === index ? { ...award, [field]: value } : award
      ),
    }));
  };

  const addAward = () => {
    setFormData(prev => ({
      ...prev,
      awards: [...prev.awards, { name: '', year: 0, category: '' }],
    }));
  };

  const removeAward = (index: number) => {
    setFormData(prev => ({
      ...prev,
      awards: prev.awards.filter((_, i) => i !== index),
    }));
  };

  const handleCollaborationChange = (index: number, field: keyof Collaboration, value: string) => {
    setFormData(prev => ({
      ...prev,
      collaborations: prev.collaborations.map((collab, i) =>
        i === index ? { ...collab, [field]: value } : collab
      ),
    }));
  };

  const addCollaboration = () => {
    setFormData(prev => ({
      ...prev,
      collaborations: [...prev.collaborations, { artist: '', performance: '' }],
    }));
  };

  const removeCollaboration = (index: number) => {
    setFormData(prev => ({
      ...prev,
      collaborations: prev.collaborations.filter((_, i) => i !== index),
    }));
  };

  const handleMilestoneChange = (index: number, field: keyof Milestone, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.map((milestone, i) =>
        i === index ? { ...milestone, [field]: value } : milestone
      ),
    }));
  };

  const addMilestone = () => {
    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, { year: 0, event: '' }],
    }));
  };

  const removeMilestone = (index: number) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index),
    }));
  };

  const handleFAQChange = (index: number, field: keyof FAQ, value: string) => {
    setFormData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        faqs: prev.seo.faqs.map((faq, i) =>
          i === index ? { ...faq, [field]: value } : faq
        ),
      },
    }));
  };

  const addFAQ = () => {
    setFormData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        faqs: [...prev.seo.faqs, { question: '', answer: '' }],
      },
    }));
  };

  const removeFAQ = (index: number) => {
    setFormData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        faqs: prev.seo.faqs.filter((_, i) => i !== index),
      },
    }));
  };

  const handleStatsChange = (field: keyof typeof formData.stats, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [field]: value,
      },
    }));
  };

  const handleSEOStructuredDataChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
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
    setFormData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        structuredData: {
          ...prev.seo.structuredData,
          knowsAbout: prev.seo.structuredData.knowsAbout?.map((item, i) =>
            i === index ? value : item
          ) || [],
        },
      },
    }));
  };

  const addKnowsAbout = () => {
    setFormData(prev => ({
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
    setFormData(prev => ({
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
      const dataToSubmit = {
        ...formData,
        fullBio: formData.fullBio.filter(bio => bio.trim() !== ''),
        achievements: formData.achievements.filter(ach => ach.trim() !== ''),
        performances: formData.performances.filter(perf => perf.name.trim() !== ''),
        awards: formData.awards.filter(award => award.name.trim() !== ''),
        collaborations: formData.collaborations.filter(collab => collab.artist.trim() !== ''),
        milestones: formData.milestones.filter(milestone => milestone.event.trim() !== ''),
        seo: {
          ...formData.seo,
          structuredData: {
            ...formData.seo.structuredData,
            knowsAbout: formData.seo.structuredData.knowsAbout?.filter(item => item.trim() !== '') || [],
          },
          faqs: formData.seo.faqs.filter(faq => faq.question.trim() !== ''),
        },
      };

      console.log('Qawwal Data Object:', JSON.stringify(dataToSubmit, null, 2));

      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify(dataToSubmit));
      if (mainImage) {
        formDataToSend.append('mainImage', mainImage);
      }
      galleryImages.forEach((file) => {
        formDataToSend.append('gallery', file);
      });

      const response = await fetch('/api/qawwals', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        alert('Qawwal created successfully!');
        setFormData({
          slug: '',
          name: '',
          bio: '',
          birthDate: '',
          birthplace: '',
          careerStart: 0,
          fullBio: [''],
          performances: [],
          awards: [],
          collaborations: [],
          stats: {
            performances: 0,
            recordings: 0,
            awards: 0,
            views: '',
            streams: '',
            followers: '',
          },
          milestones: [],
          achievements: [''],
          metadata: {
            title: '',
            description: '',
            keywords: '',
            ogTitle: '',
            ogDescription: '',
            twitterTitle: '',
            twitterDescription: '',
          },
          seo: {
            structuredData: {
              jobTitle: '',
              knowsAbout: [''],
            },
            faqs: [],
          },
        });
        setMainImage(null);
        setGalleryImages([]);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      {/* Basic Information */}
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
        </div>
      </div>

      {/* Full Bio Array */}
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

      {/* Performances */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Performances</h2>
          <button
            type="button"
            onClick={addPerformance}
            className="px-3 sm:px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base font-semibold min-h-[44px] touch-manipulation"
          >
            Add Performance
          </button>
        </div>
        {formData.performances.map((perf, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Performance Name"
                value={perf.name}
                onChange={(e) => handlePerformanceChange(index, 'name', e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
              <input
                type="number"
                placeholder="Year (optional)"
                value={perf.year || ''}
                onChange={(e) => handlePerformanceChange(index, 'year', e.target.value ? parseInt(e.target.value) : undefined)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <textarea
              placeholder="Description"
              value={perf.description}
              onChange={(e) => handlePerformanceChange(index, 'description', e.target.value)}
              rows={2}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removePerformance(index)}
                className="px-3 sm:px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base font-semibold min-h-[44px] touch-manipulation"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Awards */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Awards</h2>
          <button
            type="button"
            onClick={addAward}
            className="px-3 sm:px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base font-semibold min-h-[44px] touch-manipulation"
          >
            Add Award
          </button>
        </div>
        {formData.awards.map((award, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Award Name"
                value={award.name}
                onChange={(e) => handleAwardChange(index, 'name', e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
              <input
                type="number"
                placeholder="Year"
                value={award.year}
                onChange={(e) => handleAwardChange(index, 'year', parseInt(e.target.value) || 0)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
              <input
                type="text"
                placeholder="Category"
                value={award.category}
                onChange={(e) => handleAwardChange(index, 'category', e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removeAward(index)}
                className="px-3 sm:px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base font-semibold min-h-[44px] touch-manipulation"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Collaborations */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Collaborations</h2>
          <button
            type="button"
            onClick={addCollaboration}
            className="px-3 sm:px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base font-semibold min-h-[44px] touch-manipulation"
          >
            Add Collaboration
          </button>
        </div>
        {formData.collaborations.map((collab, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Artist"
                value={collab.artist}
                onChange={(e) => handleCollaborationChange(index, 'artist', e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
              <input
                type="text"
                placeholder="Performance"
                value={collab.performance}
                onChange={(e) => handleCollaborationChange(index, 'performance', e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removeCollaboration(index)}
                className="px-3 sm:px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base font-semibold min-h-[44px] touch-manipulation"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-2xl font-bold text-white">Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Performances</label>
            <input
              type="number"
              value={formData.stats.performances}
              onChange={(e) => handleStatsChange('performances', parseInt(e.target.value) || 0)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Recordings</label>
            <input
              type="number"
              value={formData.stats.recordings}
              onChange={(e) => handleStatsChange('recordings', parseInt(e.target.value) || 0)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Awards</label>
            <input
              type="number"
              value={formData.stats.awards}
              onChange={(e) => handleStatsChange('awards', parseInt(e.target.value) || 0)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Views</label>
            <input
              type="text"
              value={formData.stats.views}
              onChange={(e) => handleStatsChange('views', e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Streams</label>
            <input
              type="text"
              value={formData.stats.streams}
              onChange={(e) => handleStatsChange('streams', e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Followers</label>
            <input
              type="text"
              value={formData.stats.followers}
              onChange={(e) => handleStatsChange('followers', e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Milestones</h2>
          <button
            type="button"
            onClick={addMilestone}
            className="px-3 sm:px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base font-semibold min-h-[44px] touch-manipulation"
          >
            Add Milestone
          </button>
        </div>
        {formData.milestones.map((milestone, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Year"
                value={milestone.year}
                onChange={(e) => handleMilestoneChange(index, 'year', parseInt(e.target.value) || 0)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
              <input
                type="text"
                placeholder="Event"
                value={milestone.event}
                onChange={(e) => handleMilestoneChange(index, 'event', e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removeMilestone(index)}
                className="px-3 sm:px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base font-semibold min-h-[44px] touch-manipulation"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Achievements</h2>
          <button
            type="button"
            onClick={() => addArrayItem('achievements')}
            className="px-3 sm:px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base font-semibold min-h-[44px] touch-manipulation"
          >
            Add Achievement
          </button>
        </div>
        {formData.achievements.map((achievement, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={achievement}
              onChange={(e) => handleArrayChange('achievements', index, e.target.value)}
              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('achievements', index)}
              className="px-3 sm:px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base font-semibold min-h-[44px] touch-manipulation"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Metadata */}
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

      {/* SEO */}
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

      {/* Images */}
      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-2xl font-bold text-white">Images</h2>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Main Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setMainImage(e.target.files?.[0] || null)}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Gallery Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setGalleryImages(Array.from(e.target.files || []))}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-3 sm:pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-500 hover:to-red-600 active:from-red-700 active:to-red-800 transition-all font-semibold disabled:opacity-50 min-h-[48px] touch-manipulation text-sm sm:text-base"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

