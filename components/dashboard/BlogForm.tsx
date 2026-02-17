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
    metadata: {
      title: '',
      description: '',
      keywords: '',
      ogTitle: '',
      ogDescription: '',
      twitterTitle: '',
      twitterDescription: '',
    },
  });

  const [image, setImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string>('');
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const editorRef = useRef<RichTextEditorRef>(null);

  // Populate form when initialData is provided
  useEffect(() => {
    if (editMode && initialData) {
      setFormData({
        slug: initialData.slug || '',
        title: initialData.title || '',
        content: initialData.content || '',
        date: initialData.date || '',
        author: initialData.author || '',
        category: initialData.category || '',
        excerpt: initialData.excerpt || '',
        metadata: initialData.metadata || {
          title: '',
          description: '',
          keywords: '',
          ogTitle: '',
          ogDescription: '',
          twitterTitle: '',
          twitterDescription: '',
        },
      });
      setExistingImage(initialData.image || '');
    }
  }, [editMode, initialData]);

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

  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content,
    }));
  };

  const handleInsertLink = (url: string, text: string) => {
    // Get Tiptap editor instance
    const editor = editorRef.current?.getEditor();
    if (!editor) return;

    // Insert link with text at current cursor position
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
      const dataToSubmit = {
        ...formData,
      };

      console.log('Blog Data Object:', JSON.stringify(dataToSubmit, null, 2));

      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify(dataToSubmit));
      if (image) {
        formDataToSend.append('image', image);
      }

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
          setFormData({
          slug: '',
          title: '',
          content: '',
          date: '',
          author: '',
          category: '',
          excerpt: '',
          metadata: {
            title: '',
            description: '',
            keywords: '',
            ogTitle: '',
            ogDescription: '',
            twitterTitle: '',
            twitterDescription: '',
          },
          });
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
        <div>
          <div className="flex justify-between items-center mb-1.5 sm:mb-2">
            <label className="block text-xs sm:text-sm font-medium text-white/80">Content</label>
            <button
              type="button"
              onClick={() => setShowLinkDialog(true)}
              className="px-3 py-1.5 text-xs sm:text-sm bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors font-medium border border-red-500/30"
            >
              Add Internal Link
            </button>
          </div>
          <RichTextEditor
            ref={editorRef}
            value={formData.content}
            onChange={handleContentChange}
            placeholder="Write your blog content here..."
          />
        </div>
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
        isOpen={showLinkDialog}
        onClose={() => setShowLinkDialog(false)}
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

