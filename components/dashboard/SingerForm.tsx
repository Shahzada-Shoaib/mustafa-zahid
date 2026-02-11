'use client';

import { useState } from 'react';

interface Album {
  name: string;
  year: number;
  description: string;
  cover?: string;
}

interface Song {
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
  song: string;
}

interface Milestone {
  year: number;
  event: string;
}

interface FAQ {
  question: string;
  answer: string;
}

export default function SingerForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: '',
    name: '',
    genre: '',
    bio: '',
    birthDate: '',
    birthplace: '',
    careerStart: 0,
    fullBio: [''],
    albums: [] as Album[],
    songs: [] as Song[],
    awards: [] as Award[],
    collaborations: [] as Collaboration[],
    stats: {
      albums: 0,
      songs: 0,
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
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }));
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

  const handleAlbumChange = (index: number, field: keyof Album, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      albums: prev.albums.map((album, i) =>
        i === index ? { ...album, [field]: value } : album
      ),
    }));
  };

  const addAlbum = () => {
    setFormData(prev => ({
      ...prev,
      albums: [...prev.albums, { name: '', year: 0, description: '', cover: '' }],
    }));
  };

  const removeAlbum = (index: number) => {
    setFormData(prev => ({
      ...prev,
      albums: prev.albums.filter((_, i) => i !== index),
    }));
  };

  const handleSongChange = (index: number, field: keyof Song, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      songs: prev.songs.map((song, i) =>
        i === index ? { ...song, [field]: value } : song
      ),
    }));
  };

  const addSong = () => {
    setFormData(prev => ({
      ...prev,
      songs: [...prev.songs, { name: '', description: '', year: undefined }],
    }));
  };

  const removeSong = (index: number) => {
    setFormData(prev => ({
      ...prev,
      songs: prev.songs.filter((_, i) => i !== index),
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
      collaborations: [...prev.collaborations, { artist: '', song: '' }],
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
      // Prepare data object
      const dataToSubmit = {
        ...formData,
        fullBio: formData.fullBio.filter(bio => bio.trim() !== ''),
        achievements: formData.achievements.filter(ach => ach.trim() !== ''),
        albums: formData.albums.filter(album => album.name.trim() !== ''),
        songs: formData.songs.filter(song => song.name.trim() !== ''),
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

      // Log the object to console
      console.log('Singer Data Object:', JSON.stringify(dataToSubmit, null, 2));

      // Create FormData for file uploads
      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify(dataToSubmit));
      if (mainImage) {
        formDataToSend.append('mainImage', mainImage);
      }
      galleryImages.forEach((file) => {
        formDataToSend.append('gallery', file);
      });

      // Submit to API
      const response = await fetch('/api/singers', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        alert('Singer created successfully!');
        // Reset form
        setFormData({
          slug: '',
          name: '',
          genre: '',
          bio: '',
          birthDate: '',
          birthplace: '',
          careerStart: 0,
          fullBio: [''],
          albums: [],
          songs: [],
          awards: [],
          collaborations: [],
          stats: {
            albums: 0,
            songs: 0,
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Birth Date</label>
            <input
              type="text"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Birthplace</label>
            <input
              type="text"
              name="birthplace"
              value={formData.birthplace}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Career Start</label>
            <input
              type="number"
              name="careerStart"
              value={formData.careerStart}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Full Bio</h2>
          <button
            type="button"
            onClick={() => addArrayItem('fullBio')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Albums */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Albums</h2>
          <button
            type="button"
            onClick={addAlbum}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Add Album
          </button>
        </div>
        {formData.albums.map((album, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Album Name"
                value={album.name}
                onChange={(e) => handleAlbumChange(index, 'name', e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
              <input
                type="number"
                placeholder="Year"
                value={album.year}
                onChange={(e) => handleAlbumChange(index, 'year', parseInt(e.target.value) || 0)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <textarea
              placeholder="Description"
              value={album.description}
              onChange={(e) => handleAlbumChange(index, 'description', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removeAlbum(index)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Songs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Songs</h2>
          <button
            type="button"
            onClick={addSong}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Add Song
          </button>
        </div>
        {formData.songs.map((song, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Song Name"
                value={song.name}
                onChange={(e) => handleSongChange(index, 'name', e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
              <input
                type="number"
                placeholder="Year (optional)"
                value={song.year || ''}
                onChange={(e) => handleSongChange(index, 'year', e.target.value ? parseInt(e.target.value) : undefined)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <textarea
              placeholder="Description"
              value={song.description}
              onChange={(e) => handleSongChange(index, 'description', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removeSong(index)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Awards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Awards</h2>
          <button
            type="button"
            onClick={addAward}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Collaborations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Collaborations</h2>
          <button
            type="button"
            onClick={addCollaboration}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
                placeholder="Song"
                value={collab.song}
                onChange={(e) => handleCollaborationChange(index, 'song', e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removeCollaboration(index)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Albums</label>
            <input
              type="number"
              value={formData.stats.albums}
              onChange={(e) => handleStatsChange('albums', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Songs</label>
            <input
              type="number"
              value={formData.stats.songs}
              onChange={(e) => handleStatsChange('songs', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Awards</label>
            <input
              type="number"
              value={formData.stats.awards}
              onChange={(e) => handleStatsChange('awards', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Views</label>
            <input
              type="text"
              value={formData.stats.views}
              onChange={(e) => handleStatsChange('views', e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Streams</label>
            <input
              type="text"
              value={formData.stats.streams}
              onChange={(e) => handleStatsChange('streams', e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Followers</label>
            <input
              type="text"
              value={formData.stats.followers}
              onChange={(e) => handleStatsChange('followers', e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Milestones</h2>
          <button
            type="button"
            onClick={addMilestone}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Achievements</h2>
          <button
            type="button"
            onClick={() => addArrayItem('achievements')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Metadata */}
      <div className="space-y-4">
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
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">SEO</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Job Title</label>
            <input
              type="text"
              value={formData.seo.structuredData.jobTitle}
              onChange={(e) => handleSEOStructuredDataChange('jobTitle', e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
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
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
                <textarea
                  placeholder="Answer"
                  value={faq.answer}
                  onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeFAQ(index)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
      <div className="space-y-4">
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
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-500 hover:to-red-600 transition-all font-semibold disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

