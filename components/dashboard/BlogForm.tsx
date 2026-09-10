'use client';

import { useState, useEffect, useRef } from 'react';
import RichTextEditor, { RichTextEditorRef } from './RichTextEditor';
import InternalLinkDialog from './InternalLinkDialog';

interface BlogFormProps {
  editMode?: boolean;
  initialData?: any;
  onCancel?: () => void;
  onSuccess?: () => void;
}

type HeadingLevel = 'h1' | 'h2' | 'h3';
type SectionLayout = 'stacked' | 'image-left' | 'image-right';

interface BlogSection {
  id: string;
  heading: string;
  headingLevel: HeadingLevel;
  description: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  imagePosition: 'before' | 'after';
  layout: SectionLayout;
}

const EMPTY_METADATA = {
  title: '',
  description: '',
  keywords: '',
  ogTitle: '',
  ogDescription: '',
  twitterTitle: '',
  twitterDescription: '',
};

const createEmptySection = (id: string): BlogSection => ({
  id,
  heading: '',
  headingLevel: 'h2',
  description: '',
  image: '',
  imageAlt: '',
  imageCaption: '',
  imagePosition: 'after',
  layout: 'stacked',
});

const normalizeSections = (data: any): BlogSection[] => {
  const sourceSections = Array.isArray(data?.sections) ? data.sections : [];

  if (sourceSections.length === 0) {
    const legacySection = createEmptySection('section-1');
    legacySection.description = typeof data?.content === 'string' ? data.content : '';
    return [legacySection];
  }

  const usedIds = new Set<string>();

  return sourceSections.map((section: any, index: number) => {
    const requestedId = typeof section?.id === 'string' && section.id.trim()
      ? section.id.trim()
      : `section-${index + 1}`;
    let id = requestedId;
    let duplicateNumber = 2;

    while (usedIds.has(id)) {
      id = `${requestedId}-${duplicateNumber}`;
      duplicateNumber += 1;
    }
    usedIds.add(id);

    return {
      id,
      heading: typeof section?.heading === 'string' ? section.heading : '',
      headingLevel: ['h1', 'h2', 'h3'].includes(section?.headingLevel)
        ? section.headingLevel as HeadingLevel
        : 'h2',
      description: typeof section?.description === 'string' ? section.description : '',
      image: typeof section?.image === 'string' ? section.image : '',
      imageAlt: typeof section?.imageAlt === 'string' ? section.imageAlt : '',
      imageCaption: typeof section?.imageCaption === 'string' ? section.imageCaption : '',
      imagePosition: section?.imagePosition === 'before' ? 'before' : 'after',
      layout: ['stacked', 'image-left', 'image-right'].includes(section?.layout)
        ? section.layout as SectionLayout
        : 'stacked',
    };
  });
};

const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const buildLegacyContent = (sections: BlogSection[]) => sections
  .map((section) => {
    const heading = section.heading.trim()
      ? `<${section.headingLevel}>${escapeHtml(section.heading.trim())}</${section.headingLevel}>`
      : '';

    return [heading, section.description].filter(Boolean).join('\n');
  })
  .filter(Boolean)
  .join('\n');

let sectionIdCounter = 0;

const createSectionId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  sectionIdCounter += 1;
  return `section-${Date.now()}-${sectionIdCounter}`;
};

export default function BlogForm({ editMode = false, initialData, onCancel, onSuccess }: BlogFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    content: '',
    date: '',
    author: '',
    category: '',
    excerpt: '',
    metadata: EMPTY_METADATA,
  });

  const [image, setImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string>('');
  const [sections, setSections] = useState<BlogSection[]>([
    createEmptySection('section-1'),
  ]);
  const [sectionFiles, setSectionFiles] = useState<Record<string, File>>({});
  const [sectionPreviewUrls, setSectionPreviewUrls] = useState<Record<string, string>>({});
  const [linkSectionId, setLinkSectionId] = useState<string | null>(null);
  const editorRefs = useRef<Record<string, RichTextEditorRef | null>>({});
  const sectionFileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const sectionPreviewUrlsRef = useRef<Record<string, string>>({});

  // Populate form when initialData is provided
  useEffect(() => {
    if (editMode && initialData) {
      Object.values(sectionPreviewUrlsRef.current).forEach((url) => URL.revokeObjectURL(url));
      sectionPreviewUrlsRef.current = {};
      setSectionPreviewUrls({});
      setSectionFiles({});
      setLinkSectionId(null);
      setImage(null);
      setFormData({
        slug: initialData.slug || '',
        title: initialData.title || '',
        content: initialData.content || '',
        date: initialData.date || '',
        author: initialData.author || '',
        category: initialData.category || '',
        excerpt: initialData.excerpt || '',
        metadata: {
          ...EMPTY_METADATA,
          ...(initialData.metadata || {}),
        },
      });
      setSections(normalizeSections(initialData));
      setExistingImage(initialData.image || '');
    }
  }, [editMode, initialData]);

  useEffect(() => () => {
    Object.values(sectionPreviewUrlsRef.current).forEach((url) => URL.revokeObjectURL(url));
    sectionPreviewUrlsRef.current = {};
  }, []);

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
        [name]: value,
      }));
    }
  };

  const updateSection = (id: string, updates: Partial<BlogSection>) => {
    setSections((currentSections) => currentSections.map((section) => (
      section.id === id ? { ...section, ...updates, id: section.id } : section
    )));
  };

  const addSection = () => {
    setSections((currentSections) => [
      ...currentSections,
      createEmptySection(createSectionId()),
    ]);
  };

  const removeSectionFile = (id: string) => {
    const previewUrl = sectionPreviewUrlsRef.current[id];
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      const nextPreviewUrls = { ...sectionPreviewUrlsRef.current };
      delete nextPreviewUrls[id];
      sectionPreviewUrlsRef.current = nextPreviewUrls;
      setSectionPreviewUrls(nextPreviewUrls);
    }

    setSectionFiles((currentFiles) => {
      const nextFiles = { ...currentFiles };
      delete nextFiles[id];
      return nextFiles;
    });

    if (sectionFileInputRefs.current[id]) {
      sectionFileInputRefs.current[id]!.value = '';
    }
  };

  const removeSection = (id: string) => {
    removeSectionFile(id);
    delete editorRefs.current[id];
    delete sectionFileInputRefs.current[id];
    setLinkSectionId((currentId) => currentId === id ? null : currentId);
    setSections((currentSections) => currentSections.filter((section) => section.id !== id));
  };

  const moveSection = (id: string, direction: -1 | 1) => {
    setSections((currentSections) => {
      const currentIndex = currentSections.findIndex((section) => section.id === id);
      const destinationIndex = currentIndex + direction;
      if (
        currentIndex === -1 ||
        destinationIndex < 0 ||
        destinationIndex >= currentSections.length
      ) {
        return currentSections;
      }

      const reorderedSections = [...currentSections];
      [reorderedSections[currentIndex], reorderedSections[destinationIndex]] = [
        reorderedSections[destinationIndex],
        reorderedSections[currentIndex],
      ];
      return reorderedSections;
    });
  };

  const handleSectionImageChange = (id: string, file: File | null) => {
    if (!file) return;

    const previousPreviewUrl = sectionPreviewUrlsRef.current[id];
    if (previousPreviewUrl) {
      URL.revokeObjectURL(previousPreviewUrl);
    }

    const previewUrl = URL.createObjectURL(file);
    const nextPreviewUrls = {
      ...sectionPreviewUrlsRef.current,
      [id]: previewUrl,
    };

    sectionPreviewUrlsRef.current = nextPreviewUrls;
    setSectionPreviewUrls(nextPreviewUrls);
    setSectionFiles((currentFiles) => ({
      ...currentFiles,
      [id]: file,
    }));
  };

  const clearSectionImage = (id: string) => {
    removeSectionFile(id);
    updateSection(id, { image: '' });
  };

  const handleInsertLink = (url: string, text: string) => {
    if (!linkSectionId) return;

    const editor = editorRefs.current[linkSectionId]?.getEditor();
    if (!editor) return;

    editor
      .chain()
      .focus()
      .insertContent(`<a href="${url}">${text}</a>`)
      .run();
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
      const legacyContent = buildLegacyContent(sections);
      const dataToSubmit = {
        ...formData,
        content: legacyContent,
        sections,
      };

      console.log('Blog Data Object:', JSON.stringify(dataToSubmit, null, 2));

      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify(dataToSubmit));
      if (image) {
        formDataToSend.append('image', image);
      }
      const activeSectionIds = new Set(sections.map((section) => section.id));
      Object.entries(sectionFiles).forEach(([sectionId, file]) => {
        if (activeSectionIds.has(sectionId)) {
          formDataToSend.append(`sectionImage:${sectionId}`, file);
        }
      });

      // Submit to API
      let url = '/api/blogs';
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
        
        url = `/api/blogs/${id}`;
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
        alert(editMode ? 'Blog post updated successfully!' : 'Blog post created successfully!');
        if (onSuccess) {
          onSuccess();
        }
        if (!editMode) {
          Object.values(sectionPreviewUrlsRef.current).forEach((url) => URL.revokeObjectURL(url));
          sectionPreviewUrlsRef.current = {};
          setSectionPreviewUrls({});
          setSectionFiles({});
          setLinkSectionId(null);
          setFormData({
            slug: '',
            title: '',
            content: '',
            date: '',
            author: '',
            category: '',
            excerpt: '',
            metadata: EMPTY_METADATA,
          });
          setSections([createEmptySection(createSectionId())]);
          setImage(null);
          setExistingImage('');
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
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Date</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              placeholder="YYYY-MM-DD"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Excerpt</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 resize-y"
          />
        </div>
      </div>

      {/* Blog Sections */}
      <div className="space-y-4 sm:space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Blog Sections</h2>
            <p className="mt-1 text-xs sm:text-sm text-white/50">
              Build the article with ordered headings, descriptions, and optional images.
            </p>
          </div>
          <button
            type="button"
            onClick={addSection}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-600/20 px-4 py-2 text-sm font-semibold text-red-300 transition-colors hover:bg-red-600/30 focus:outline-none focus:ring-2 focus:ring-red-500/60"
          >
            <span aria-hidden="true" className="text-lg leading-none">+</span>
            Add Section
          </button>
        </div>

        {sections.length === 0 && (
          <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.03] px-5 py-8 text-center">
            <p className="text-sm text-white/60">No sections yet. Add a section to start writing.</p>
            <button
              type="button"
              onClick={addSection}
              className="mt-4 min-h-[44px] rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Add First Section
            </button>
          </div>
        )}

        {sections.map((section, index) => {
          const previewUrl = sectionPreviewUrls[section.id] || section.image;
          const headingInputId = `blog-section-${index + 1}-heading`;
          const levelInputId = `blog-section-${index + 1}-level`;
          const imageInputId = `blog-section-${index + 1}-image`;
          const altInputId = `blog-section-${index + 1}-image-alt`;
          const captionInputId = `blog-section-${index + 1}-image-caption`;
          const positionInputId = `blog-section-${index + 1}-image-position`;
          const layoutInputId = `blog-section-${index + 1}-layout`;
          const layoutHelpId = `blog-section-${index + 1}-layout-help`;
          const descriptionLabelId = `blog-section-${index + 1}-description-label`;

          return (
            <section
              key={section.id}
              aria-labelledby={`blog-section-${index + 1}-title`}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
            >
              <div className="flex flex-col gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <h3
                  id={`blog-section-${index + 1}-title`}
                  className="font-semibold text-white"
                >
                  Section {index + 1}
                  {section.heading.trim() && (
                    <span className="ml-2 font-normal text-white/45">— {section.heading.trim()}</span>
                  )}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => moveSection(section.id, -1)}
                    disabled={index === 0}
                    aria-label={`Move section ${index + 1} up`}
                    title="Move section up"
                    className="min-h-[40px] min-w-[40px] rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500/60 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <span aria-hidden="true">↑</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSection(section.id, 1)}
                    disabled={index === sections.length - 1}
                    aria-label={`Move section ${index + 1} down`}
                    title="Move section down"
                    className="min-h-[40px] min-w-[40px] rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500/60 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <span aria-hidden="true">↓</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSection(section.id)}
                    aria-label={`Remove section ${index + 1}`}
                    className="min-h-[40px] rounded-lg border border-red-500/25 bg-red-600/10 px-3 py-2 text-xs sm:text-sm font-medium text-red-300 transition-colors hover:bg-red-600/20 focus:outline-none focus:ring-2 focus:ring-red-500/60"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="space-y-5 p-4 sm:p-5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-4">
                  <div>
                    <label
                      htmlFor={levelInputId}
                      className="mb-1.5 block text-xs sm:text-sm font-medium text-white/80"
                    >
                      Heading Level
                    </label>
                    <select
                      id={levelInputId}
                      value={section.headingLevel}
                      onChange={(event) => updateSection(section.id, {
                        headingLevel: event.target.value as HeadingLevel,
                      })}
                      className="min-h-[44px] w-full rounded-lg border border-white/10 bg-[#111] px-3 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
                    >
                      <option value="h1">H1</option>
                      <option value="h2">H2</option>
                      <option value="h3">H3</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor={headingInputId}
                      className="mb-1.5 block text-xs sm:text-sm font-medium text-white/80"
                    >
                      Heading
                    </label>
                    <input
                      id={headingInputId}
                      type="text"
                      value={section.heading}
                      onChange={(event) => updateSection(section.id, { heading: event.target.value })}
                      placeholder="Enter this section's heading"
                      className="min-h-[44px] w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none sm:px-4 sm:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={layoutInputId}
                    className="mb-1.5 block text-xs sm:text-sm font-medium text-white/80"
                  >
                    Section Layout
                  </label>
                  <select
                    id={layoutInputId}
                    aria-describedby={layoutHelpId}
                    value={section.layout}
                    onChange={(event) => updateSection(section.id, {
                      layout: event.target.value as SectionLayout,
                    })}
                    className="min-h-[44px] w-full rounded-lg border border-white/10 bg-[#111] px-3 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
                  >
                    <option value="stacked">Stacked — image above or below text</option>
                    <option value="image-left">Image left — text right</option>
                    <option value="image-right">Text left — image right</option>
                  </select>
                  <p id={layoutHelpId} className="mt-1.5 text-xs text-white/45">
                    Split layouts display as two columns on larger screens and stack on mobile.
                  </p>
                </div>

                <div role="group" aria-labelledby={descriptionLabelId}>
                  <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <span
                      id={descriptionLabelId}
                      className="text-xs sm:text-sm font-medium text-white/80"
                    >
                      Description
                    </span>
                    <button
                      type="button"
                      onClick={() => setLinkSectionId(section.id)}
                      className="self-start rounded-lg border border-red-500/30 bg-red-600/20 px-3 py-1.5 text-xs sm:text-sm font-medium text-red-300 transition-colors hover:bg-red-600/30 focus:outline-none focus:ring-2 focus:ring-red-500/60 sm:self-auto"
                    >
                      Add Internal Link
                    </button>
                  </div>
                  <RichTextEditor
                    ref={(editor) => {
                      if (editor) {
                        editorRefs.current[section.id] = editor;
                      } else {
                        delete editorRefs.current[section.id];
                      }
                    }}
                    value={section.description}
                    onChange={(description) => updateSection(section.id, { description })}
                    placeholder={`Write section ${index + 1} content here...`}
                  />
                </div>

                <div className="rounded-lg border border-white/10 bg-black/10 p-3 sm:p-4">
                  <h4 className="text-sm font-semibold text-white">Section Image</h4>
                  <p className="mt-1 text-xs text-white/45">
                    Add an optional image and describe it for readers and search engines.
                  </p>

                  <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[180px_minmax(0,1fr)]">
                    <div>
                      {previewUrl ? (
                        <div className="space-y-2">
                          <img
                            src={previewUrl}
                            alt={section.imageAlt || section.heading || `Section ${index + 1} preview`}
                            className="h-40 w-full rounded-lg border border-white/10 object-cover lg:h-36"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (sectionFiles[section.id]) {
                                removeSectionFile(section.id);
                              } else {
                                clearSectionImage(section.id);
                              }
                            }}
                            className="min-h-[40px] w-full rounded-lg border border-red-500/25 bg-red-600/10 px-3 py-2 text-xs font-medium text-red-300 transition-colors hover:bg-red-600/20 focus:outline-none focus:ring-2 focus:ring-red-500/60"
                          >
                            {sectionFiles[section.id] ? 'Cancel New Image' : 'Remove Image'}
                          </button>
                        </div>
                      ) : (
                        <div className="flex h-36 items-center justify-center rounded-lg border border-dashed border-white/15 bg-white/[0.02] px-4 text-center text-xs text-white/35">
                          Image preview
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label
                          htmlFor={imageInputId}
                          className="mb-1.5 block text-xs sm:text-sm font-medium text-white/80"
                        >
                          Upload Image
                        </label>
                        <input
                          id={imageInputId}
                          ref={(input) => {
                            if (input) {
                              sectionFileInputRefs.current[section.id] = input;
                            } else {
                              delete sectionFileInputRefs.current[section.id];
                            }
                          }}
                          type="file"
                          accept="image/*"
                          onChange={(event) => handleSectionImageChange(
                            section.id,
                            event.target.files?.[0] || null,
                          )}
                          className="min-h-[44px] w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-red-600 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-red-500 sm:text-sm"
                        />
                        {sectionFiles[section.id] && (
                          <p className="mt-1.5 break-all text-xs text-emerald-400/80">
                            Selected: {sectionFiles[section.id].name}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor={altInputId}
                            className="mb-1.5 block text-xs font-medium text-white/70"
                          >
                            Alt Text
                          </label>
                          <input
                            id={altInputId}
                            type="text"
                            value={section.imageAlt}
                            onChange={(event) => updateSection(section.id, { imageAlt: event.target.value })}
                            placeholder="Describe the image"
                            className="min-h-[42px] w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-red-500 focus:outline-none"
                          />
                        </div>
                        {section.layout === 'stacked' && (
                          <div>
                            <label
                              htmlFor={positionInputId}
                              className="mb-1.5 block text-xs font-medium text-white/70"
                            >
                              Image Position
                            </label>
                            <select
                              id={positionInputId}
                              value={section.imagePosition}
                              onChange={(event) => updateSection(section.id, {
                                imagePosition: event.target.value as BlogSection['imagePosition'],
                              })}
                              className="min-h-[42px] w-full rounded-lg border border-white/10 bg-[#111] px-3 py-2 text-sm text-white focus:border-red-500 focus:outline-none"
                            >
                              <option value="before">Before description</option>
                              <option value="after">After description</option>
                            </select>
                          </div>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor={captionInputId}
                          className="mb-1.5 block text-xs font-medium text-white/70"
                        >
                          Caption
                        </label>
                        <input
                          id={captionInputId}
                          type="text"
                          value={section.imageCaption}
                          onChange={(event) => updateSection(section.id, { imageCaption: event.target.value })}
                          placeholder="Optional caption displayed below the image"
                          className="min-h-[42px] w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-red-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {sections.length > 0 && (
          <button
            type="button"
            onClick={addSection}
            className="w-full min-h-[46px] rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-white/60 transition-colors hover:border-red-500/40 hover:bg-red-600/10 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500/60"
          >
            + Add Another Section
          </button>
        )}
      </div>

      {/* Metadata */}
      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Metadata</h2>
        <div className="space-y-2 sm:space-y-3">
          <input
            type="text"
            name="metadata.title"
            value={formData.metadata.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
          />
          <textarea
            name="metadata.description"
            value={formData.metadata.description}
            onChange={handleInputChange}
            placeholder="Description"
            rows={3}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 resize-y"
          />
          <input
            type="text"
            name="metadata.keywords"
            value={formData.metadata.keywords}
            onChange={handleInputChange}
            placeholder="Keywords"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
          />
          <input
            type="text"
            name="metadata.ogTitle"
            value={formData.metadata.ogTitle}
            onChange={handleInputChange}
            placeholder="OG Title"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
          />
          <textarea
            name="metadata.ogDescription"
            value={formData.metadata.ogDescription}
            onChange={handleInputChange}
            placeholder="OG Description"
            rows={2}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 resize-y"
          />
          <input
            type="text"
            name="metadata.twitterTitle"
            value={formData.metadata.twitterTitle}
            onChange={handleInputChange}
            placeholder="Twitter Title"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 min-h-[44px]"
          />
          <textarea
            name="metadata.twitterDescription"
            value={formData.metadata.twitterDescription}
            onChange={handleInputChange}
            placeholder="Twitter Description"
            rows={2}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-red-500 resize-y"
          />
        </div>
      </div>

      {/* Image */}
      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Image</h2>
        <div>
          <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Blog Image</label>
          {existingImage && (
            <div className="mb-2">
              <p className="text-white/60 text-sm mb-2">Current Image:</p>
              <img src={existingImage} alt="Current" className="w-32 h-32 object-cover rounded" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-red-500 min-h-[44px] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-500 file:cursor-pointer"
          />
          <p className="text-white/40 text-xs mt-1">{editMode ? 'Leave empty to keep current image' : ''}</p>
        </div>
      </div>

      {/* Internal Link Dialog */}
      <InternalLinkDialog
        isOpen={linkSectionId !== null}
        onClose={() => setLinkSectionId(null)}
        onInsert={handleInsertLink}
      />

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
