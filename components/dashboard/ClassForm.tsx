'use client';

import { useState, useEffect } from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface CurriculumItem {
  text: string;
}

interface LearningPath {
  stage: string;
  duration: string;
  description: string;
  skills: string[];
}

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ClassFormProps {
  editMode?: boolean;
  initialData?: any;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export default function ClassForm({ editMode = false, initialData, onCancel, onSuccess }: ClassFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    type: 'studio' as 'studio' | 'at-home',
    instrument: 'guitar' as 'guitar' | 'piano' | 'singing',
    hero: {
      badge: '',
      title: '',
      titleHighlight: '',
      description: '',
      heroImage: '',
    },
    features: [] as Feature[],
    curriculum: [] as CurriculumItem[],
    learningPaths: [] as LearningPath[],
    benefits: [] as Benefit[],
    practiceTips: {
      routineTips: [''],
      mistakes: [''],
    },
    cta: {
      title: '',
      description: '',
    },
    images: {
      heroImage: '',
      curriculumImage: '',
      teachingImage: '',
    },
    metadata: {
      title: '',
      description: '',
      keywords: '',
      ogTitle: '',
      ogDescription: '',
      ogUrl: '',
      ogImage: '',
      twitterTitle: '',
      twitterDescription: '',
      twitterImage: '',
      canonical: '',
      robots: 'index, follow',
    },
    seo: {
      structuredData: {
        jobTitle: '',
        knowsAbout: [''],
      },
      faqs: [] as FAQ[],
    },
  });

  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [curriculumImage, setCurriculumImage] = useState<File | null>(null);
  const [teachingImage, setTeachingImage] = useState<File | null>(null);
  const [existingHeroImage, setExistingHeroImage] = useState<string>('');
  const [existingCurriculumImage, setExistingCurriculumImage] = useState<string>('');
  const [existingTeachingImage, setExistingTeachingImage] = useState<string>('');

  // Populate form when initialData is provided
  useEffect(() => {
    if (editMode && initialData) {
      setFormData({
        slug: initialData.slug || '',
        title: initialData.title || '',
        type: initialData.type || 'studio',
        instrument: initialData.instrument || 'guitar',
        hero: initialData.hero || {
          badge: '',
          title: '',
          titleHighlight: '',
          description: '',
          heroImage: '',
        },
        features: initialData.features || [],
        curriculum: initialData.curriculum || [],
        learningPaths: initialData.learningPaths || [],
        benefits: initialData.benefits || [],
        practiceTips: initialData.practiceTips || {
          routineTips: [''],
          mistakes: [''],
        },
        cta: initialData.cta || {
          title: '',
          description: '',
        },
        images: initialData.images || {
          heroImage: '',
          curriculumImage: '',
          teachingImage: '',
        },
        metadata: initialData.metadata || {
          title: '',
          description: '',
          keywords: '',
          ogTitle: '',
          ogDescription: '',
          ogUrl: '',
          ogImage: '',
          twitterTitle: '',
          twitterDescription: '',
          twitterImage: '',
          canonical: '',
          robots: 'index, follow',
        },
        seo: initialData.seo || {
          structuredData: {
            jobTitle: '',
            knowsAbout: [''],
          },
          faqs: [],
        },
      });
      setExistingHeroImage(initialData.hero?.heroImage || initialData.images?.heroImage || '');
      setExistingCurriculumImage(initialData.images?.curriculumImage || '');
      setExistingTeachingImage(initialData.images?.teachingImage || '');
    }
  }, [editMode, initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const parts = name.split('.');
      if (parts[0] === 'hero') {
        setFormData(prev => ({
          ...prev,
          hero: {
            ...prev.hero,
            [parts[1]]: value,
          },
        }));
      } else if (parts[0] === 'metadata') {
        setFormData(prev => ({
          ...prev,
          metadata: {
            ...prev.metadata,
            [parts[1]]: value,
          },
        }));
      } else if (parts[0] === 'cta') {
        setFormData(prev => ({
          ...prev,
          cta: {
            ...prev.cta,
            [parts[1]]: value,
          },
        }));
      } else if (parts[0] === 'practiceTips') {
        setFormData(prev => ({
          ...prev,
          practiceTips: {
            ...prev.practiceTips,
            [parts[1]]: value,
          },
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFeatureChange = (index: number, field: keyof Feature, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) =>
        i === index ? { ...feature, [field]: value } : feature
      ),
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, { icon: '', title: '', description: '' }],
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleCurriculumChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      curriculum: prev.curriculum.map((item, i) =>
        i === index ? { text: value } : item
      ),
    }));
  };

  const addCurriculumItem = () => {
    setFormData(prev => ({
      ...prev,
      curriculum: [...prev.curriculum, { text: '' }],
    }));
  };

  const removeCurriculumItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      curriculum: prev.curriculum.filter((_, i) => i !== index),
    }));
  };

  const handleLearningPathChange = (index: number, field: keyof LearningPath, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      learningPaths: prev.learningPaths.map((path, i) =>
        i === index ? { ...path, [field]: value } : path
      ),
    }));
  };

  const handleLearningPathSkillsChange = (index: number, skillIndex: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      learningPaths: prev.learningPaths.map((path, i) =>
        i === index
          ? {
              ...path,
              skills: path.skills.map((skill, si) => (si === skillIndex ? value : skill)),
            }
          : path
      ),
    }));
  };

  const addLearningPathSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      learningPaths: prev.learningPaths.map((path, i) =>
        i === index ? { ...path, skills: [...path.skills, ''] } : path
      ),
    }));
  };

  const removeLearningPathSkill = (index: number, skillIndex: number) => {
    setFormData(prev => ({
      ...prev,
      learningPaths: prev.learningPaths.map((path, i) =>
        i === index
          ? { ...path, skills: path.skills.filter((_, si) => si !== skillIndex) }
          : path
      ),
    }));
  };

  const addLearningPath = () => {
    setFormData(prev => ({
      ...prev,
      learningPaths: [...prev.learningPaths, { stage: '', duration: '', description: '', skills: [''] }],
    }));
  };

  const removeLearningPath = (index: number) => {
    setFormData(prev => ({
      ...prev,
      learningPaths: prev.learningPaths.filter((_, i) => i !== index),
    }));
  };

  const handleBenefitChange = (index: number, field: keyof Benefit, value: string) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.map((benefit, i) =>
        i === index ? { ...benefit, [field]: value } : benefit
      ),
    }));
  };

  const addBenefit = () => {
    setFormData(prev => ({
      ...prev,
      benefits: [...prev.benefits, { icon: '', title: '', description: '' }],
    }));
  };

  const removeBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  const handlePracticeTipChange = (type: 'routineTips' | 'mistakes', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      practiceTips: {
        ...prev.practiceTips,
        [type]: prev.practiceTips[type].map((tip, i) => (i === index ? value : tip)),
      },
    }));
  };

  const addPracticeTip = (type: 'routineTips' | 'mistakes') => {
    setFormData(prev => ({
      ...prev,
      practiceTips: {
        ...prev.practiceTips,
        [type]: [...prev.practiceTips[type], ''],
      },
    }));
  };

  const removePracticeTip = (type: 'routineTips' | 'mistakes', index: number) => {
    setFormData(prev => ({
      ...prev,
      practiceTips: {
        ...prev.practiceTips,
        [type]: prev.practiceTips[type].filter((_, i) => i !== index),
      },
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
      // Validate ID in edit mode
      if (editMode && (!initialData?._id)) {
        alert('Error: No ID found for editing. Please try again.');
        setLoading(false);
        return;
      }
      // Prepare data object
      const dataToSubmit = {
        ...formData,
        features: formData.features.filter(f => 
          f.title.trim() !== '' && f.icon.trim() !== '' && f.description.trim() !== ''
        ),
        curriculum: formData.curriculum.filter(c => c.text.trim() !== ''),
        learningPaths: formData.learningPaths.filter(lp => 
          lp.stage.trim() !== '' && lp.duration.trim() !== '' && lp.description.trim() !== ''
        ),
        benefits: formData.benefits.filter(b => 
          b.title.trim() !== '' && b.icon.trim() !== '' && b.description.trim() !== ''
        ),
        practiceTips: {
          routineTips: formData.practiceTips.routineTips.filter(tip => tip.trim() !== ''),
          mistakes: formData.practiceTips.mistakes.filter(mistake => mistake.trim() !== ''),
        },
        seo: {
          ...formData.seo,
          structuredData: {
            ...formData.seo.structuredData,
            knowsAbout: formData.seo.structuredData.knowsAbout?.filter(item => item.trim() !== '') || [],
          },
          faqs: formData.seo.faqs.filter(faq => 
            faq.question.trim() !== '' && faq.answer.trim() !== ''
          ),
        },
      };

      // Log the object to console
      console.log('Class Data Object:', JSON.stringify(dataToSubmit, null, 2));

      // Create FormData for file uploads
      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify(dataToSubmit));
      if (heroImage) {
        formDataToSend.append('heroImage', heroImage);
      }
      if (curriculumImage) {
        formDataToSend.append('curriculumImage', curriculumImage);
      }
      if (teachingImage) {
        formDataToSend.append('teachingImage', teachingImage);
      }

      // Submit to API
      let url = '/api/classes';
      const method = editMode ? 'PUT' : 'POST';
      
      if (editMode && initialData?._id) {
        // Ensure ID is converted to string and is valid
        const id = String(initialData._id).trim();
        
        // Basic ObjectId format check (24 hex characters)
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        const isValidId = objectIdRegex.test(id);
        
        console.log('Submitting update with ID:', { 
          id, 
          idType: typeof id, 
          idLength: id.length,
          isValid: isValidId,
          originalId: initialData._id,
          originalIdType: typeof initialData._id
        });
        
        if (!isValidId) {
          alert(`Error: Invalid ID format. ID: "${id}". Please try editing again.`);
          setLoading(false);
          return;
        }
        
        url = `/api/classes/${id}`;
      }
      
      console.log('Submitting form:', { url, method, editMode });
      
      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      const responseText = await response.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response:', e, 'Response:', responseText);
        alert(`Error: Invalid response from server. Status: ${response.status}`);
        setLoading(false);
        return;
      }
      
      console.log('Form submission response:', result);

      if (result.success) {
        alert(editMode ? 'Class updated successfully!' : 'Class created successfully!');
        if (onSuccess) {
          onSuccess();
        }
        if (!editMode) {
          // Reset form only if not in edit mode
          setFormData({
          slug: '',
          title: '',
          type: 'studio',
          instrument: 'guitar',
          hero: {
            badge: '',
            title: '',
            titleHighlight: '',
            description: '',
            heroImage: '',
          },
          features: [],
          curriculum: [],
          learningPaths: [],
          benefits: [],
          practiceTips: {
            routineTips: [''],
            mistakes: [''],
          },
          cta: {
            title: '',
            description: '',
          },
          images: {
            heroImage: '',
            curriculumImage: '',
            teachingImage: '',
          },
          metadata: {
            title: '',
            description: '',
            keywords: '',
            ogTitle: '',
            ogDescription: '',
            ogUrl: '',
            ogImage: '',
            twitterTitle: '',
            twitterDescription: '',
            twitterImage: '',
            canonical: '',
            robots: 'index, follow',
          },
          seo: {
            structuredData: {
              jobTitle: '',
              knowsAbout: [''],
            },
            faqs: [],
          },
          });
          setHeroImage(null);
          setCurriculumImage(null);
          setTeachingImage(null);
          setExistingHeroImage('');
          setExistingCurriculumImage('');
          setExistingTeachingImage('');
        }
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
              placeholder="guitar-classes-in-lahore"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            >
              <option value="studio">Studio</option>
              <option value="at-home">At Home</option>
            </select>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Instrument</label>
            <select
              name="instrument"
              value={formData.instrument}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            >
              <option value="guitar">Guitar</option>
              <option value="piano">Piano</option>
              <option value="singing">Singing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Hero Section</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Badge</label>
            <input
              type="text"
              name="hero.badge"
              value={formData.hero.badge}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Title</label>
            <input
              type="text"
              name="hero.title"
              value={formData.hero.title}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Title Highlight</label>
            <input
              type="text"
              name="hero.titleHighlight"
              value={formData.hero.titleHighlight}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Description</label>
          <textarea
            name="hero.description"
            value={formData.hero.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      {/* Features */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Features</h2>
          <button
            type="button"
            onClick={addFeature}
            className="px-3 sm:px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base font-semibold min-h-[44px] touch-manipulation"
          >
            Add Feature
          </button>
        </div>
        {formData.features.map((feature, index) => (
          <div key={index} className="p-3 sm:p-4 bg-white/5 rounded-lg space-y-2 sm:space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              <input
                type="text"
                placeholder="Icon (SVG component name)"
                value={feature.icon}
                onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
              <input
                type="text"
                placeholder="Title"
                value={feature.title}
                onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <textarea
              placeholder="Description"
              value={feature.description}
              onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
              rows={2}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="px-3 sm:px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base font-semibold min-h-[44px] touch-manipulation"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Curriculum */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Curriculum</h2>
          <button
            type="button"
            onClick={addCurriculumItem}
            className="px-3 sm:px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base font-semibold min-h-[44px] touch-manipulation"
          >
            Add Item
          </button>
        </div>
        {formData.curriculum.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={item.text}
              onChange={(e) => handleCurriculumChange(index, e.target.value)}
              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
            <button
              type="button"
              onClick={() => removeCurriculumItem(index)}
              className="px-3 sm:px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base font-semibold min-h-[44px] touch-manipulation"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Learning Paths */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Learning Paths</h2>
          <button
            type="button"
            onClick={addLearningPath}
            className="px-3 sm:px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base font-semibold min-h-[44px] touch-manipulation"
          >
            Add Learning Path
          </button>
        </div>
        {formData.learningPaths.map((path, index) => (
          <div key={index} className="p-3 sm:p-4 bg-white/5 rounded-lg space-y-2 sm:space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
              <input
                type="text"
                placeholder="Stage (e.g., Beginner)"
                value={path.stage}
                onChange={(e) => handleLearningPathChange(index, 'stage', e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
              <input
                type="text"
                placeholder="Duration (e.g., Months 1-3)"
                value={path.duration}
                onChange={(e) => handleLearningPathChange(index, 'duration', e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <textarea
              placeholder="Description"
              value={path.description}
              onChange={(e) => handleLearningPathChange(index, 'description', e.target.value)}
              rows={2}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-white/80">Skills</label>
                <button
                  type="button"
                  onClick={() => addLearningPathSkill(index)}
                  className="px-3 py-1.5 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                >
                  Add Skill
                </button>
              </div>
              {path.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleLearningPathSkillsChange(index, skillIndex, e.target.value)}
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeLearningPathSkill(index, skillIndex)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removeLearningPath(index)}
                className="px-3 sm:px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base font-semibold min-h-[44px] touch-manipulation"
              >
                Remove Path
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Benefits</h2>
          <button
            type="button"
            onClick={addBenefit}
            className="px-3 sm:px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base font-semibold min-h-[44px] touch-manipulation"
          >
            Add Benefit
          </button>
        </div>
        {formData.benefits.map((benefit, index) => (
          <div key={index} className="p-3 sm:p-4 bg-white/5 rounded-lg space-y-2 sm:space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              <input
                type="text"
                placeholder="Icon (SVG component name)"
                value={benefit.icon}
                onChange={(e) => handleBenefitChange(index, 'icon', e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
              <input
                type="text"
                placeholder="Title"
                value={benefit.title}
                onChange={(e) => handleBenefitChange(index, 'title', e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <textarea
              placeholder="Description"
              value={benefit.description}
              onChange={(e) => handleBenefitChange(index, 'description', e.target.value)}
              rows={2}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removeBenefit(index)}
                className="px-3 sm:px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base font-semibold min-h-[44px] touch-manipulation"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Practice Tips */}
      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-2xl font-bold text-white">Practice Tips</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-white/80">Routine Tips</label>
              <button
                type="button"
                onClick={() => addPracticeTip('routineTips')}
                className="px-3 py-1.5 bg-red-600 text-white rounded text-xs hover:bg-red-700"
              >
                Add
              </button>
            </div>
            {formData.practiceTips.routineTips.map((tip, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tip}
                  onChange={(e) => handlePracticeTipChange('routineTips', index, e.target.value)}
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
                <button
                  type="button"
                  onClick={() => removePracticeTip('routineTips', index)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-white/80">Common Mistakes</label>
              <button
                type="button"
                onClick={() => addPracticeTip('mistakes')}
                className="px-3 py-1.5 bg-red-600 text-white rounded text-xs hover:bg-red-700"
              >
                Add
              </button>
            </div>
            {formData.practiceTips.mistakes.map((mistake, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={mistake}
                  onChange={(e) => handlePracticeTipChange('mistakes', index, e.target.value)}
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
                <button
                  type="button"
                  onClick={() => removePracticeTip('mistakes', index)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">CTA Section</h2>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Title</label>
          <input
            type="text"
            name="cta.title"
            value={formData.cta.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Description</label>
          <textarea
            name="cta.description"
            value={formData.cta.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      {/* Complete Metadata */}
      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-2xl font-bold text-white">Complete Metadata</h2>
        <div className="space-y-2">
          <input
            type="text"
            name="metadata.title"
            value={formData.metadata.title}
            onChange={handleInputChange}
            placeholder="Page Title"
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
          <textarea
            name="metadata.description"
            value={formData.metadata.description}
            onChange={handleInputChange}
            placeholder="Meta Description"
            rows={3}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
          <input
            type="text"
            name="metadata.keywords"
            value={formData.metadata.keywords}
            onChange={handleInputChange}
            placeholder="Keywords (comma separated)"
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
          <div className="grid md:grid-cols-2 gap-2">
            <input
              type="text"
              name="metadata.ogTitle"
              value={formData.metadata.ogTitle}
              onChange={handleInputChange}
              placeholder="OpenGraph Title"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
            <input
              type="text"
              name="metadata.ogUrl"
              value={formData.metadata.ogUrl}
              onChange={handleInputChange}
              placeholder="OpenGraph URL (full URL)"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
          </div>
          <textarea
            name="metadata.ogDescription"
            value={formData.metadata.ogDescription}
            onChange={handleInputChange}
            placeholder="OpenGraph Description"
            rows={2}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
          <input
            type="text"
            name="metadata.ogImage"
            value={formData.metadata.ogImage}
            onChange={handleInputChange}
            placeholder="OpenGraph Image URL"
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
          <div className="grid md:grid-cols-2 gap-2">
            <input
              type="text"
              name="metadata.twitterTitle"
              value={formData.metadata.twitterTitle}
              onChange={handleInputChange}
              placeholder="Twitter Title"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
            <input
              type="text"
              name="metadata.twitterImage"
              value={formData.metadata.twitterImage}
              onChange={handleInputChange}
              placeholder="Twitter Image URL"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
          </div>
          <textarea
            name="metadata.twitterDescription"
            value={formData.metadata.twitterDescription}
            onChange={handleInputChange}
            placeholder="Twitter Description"
            rows={2}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
          <div className="grid md:grid-cols-2 gap-2">
            <input
              type="text"
              name="metadata.canonical"
              value={formData.metadata.canonical}
              onChange={handleInputChange}
              placeholder="Canonical URL (full URL)"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
            <input
              type="text"
              name="metadata.robots"
              value={formData.metadata.robots}
              onChange={handleInputChange}
              placeholder="Robots (e.g., index, follow)"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
          </div>
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
              onChange={(e) => setFormData(prev => ({
                ...prev,
                seo: {
                  ...prev.seo,
                  structuredData: {
                    ...prev.seo.structuredData,
                    jobTitle: e.target.value,
                  },
                },
              }))}
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
          <label className="block text-sm font-medium text-white/80 mb-2">Hero Image</label>
          {existingHeroImage && (
            <div className="mb-2">
              <p className="text-white/60 text-sm mb-2">Current Image:</p>
              <img src={existingHeroImage} alt="Current Hero" className="w-32 h-32 object-cover rounded" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setHeroImage(e.target.files?.[0] || null)}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
          <p className="text-white/40 text-xs mt-1">{editMode ? 'Leave empty to keep current image' : ''}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Curriculum Image</label>
          {existingCurriculumImage && (
            <div className="mb-2">
              <p className="text-white/60 text-sm mb-2">Current Image:</p>
              <img src={existingCurriculumImage} alt="Current Curriculum" className="w-32 h-32 object-cover rounded" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCurriculumImage(e.target.files?.[0] || null)}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
          <p className="text-white/40 text-xs mt-1">{editMode ? 'Leave empty to keep current image' : ''}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Teaching Image</label>
          {existingTeachingImage && (
            <div className="mb-2">
              <p className="text-white/60 text-sm mb-2">Current Image:</p>
              <img src={existingTeachingImage} alt="Current Teaching" className="w-32 h-32 object-cover rounded" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setTeachingImage(e.target.files?.[0] || null)}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          />
          <p className="text-white/40 text-xs mt-1">{editMode ? 'Leave empty to keep current image' : ''}</p>
        </div>
      </div>

      {/* Submit Button */}
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
          {loading ? (editMode ? 'Updating...' : 'Submitting...') : (editMode ? 'Update' : 'Submit')}
        </button>
      </div>
    </form>
  );
}

