'use client';

import { useState, useEffect } from 'react';

interface InternalLinkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (url: string, text: string) => void;
}

interface LinkOption {
  type: 'static' | 'blog' | 'singer' | 'qawwal' | 'class';
  slug: string;
  title: string;
  url: string;
}

export default function InternalLinkDialog({ isOpen, onClose, onInsert }: InternalLinkDialogProps) {
  const [linkType, setLinkType] = useState<'static' | 'blog' | 'singer' | 'qawwal' | 'class'>('static');
  const [selectedPage, setSelectedPage] = useState('');
  const [linkText, setLinkText] = useState('');
  const [pages, setPages] = useState<LinkOption[]>([]);
  const [loading, setLoading] = useState(false);

  // Static pages
  const staticPages: LinkOption[] = [
    { type: 'static', slug: '', title: 'Home', url: '/' },
    { type: 'static', slug: '', title: 'About', url: '/about' },
    { type: 'static', slug: '', title: 'Blog', url: '/blog' },
    { type: 'static', slug: '', title: 'Singers', url: '/singers' },
    { type: 'static', slug: '', title: 'Qawwals', url: '/qawwals' },
    { type: 'static', slug: '', title: 'Music Classes', url: '/music-classes' },
  ];

  // Fetch dynamic pages based on type
  useEffect(() => {
    if (!isOpen || linkType === 'static') {
      setPages(staticPages);
      return;
    }

    const fetchPages = async () => {
      setLoading(true);
      try {
        let endpoint = '';
        let urlPrefix = '';
        
        switch (linkType) {
          case 'blog':
            endpoint = '/api/blogs';
            urlPrefix = '/blog/';
            break;
          case 'singer':
            endpoint = '/api/singers';
            urlPrefix = '/singers/';
            break;
          case 'qawwal':
            endpoint = '/api/qawwals';
            urlPrefix = '/qawwals/';
            break;
          case 'class':
            endpoint = '/api/classes';
            urlPrefix = '/music-classes/';
            break;
        }

        const response = await fetch(endpoint);
        const result = await response.json();
        
        if (result.success && Array.isArray(result.data)) {
          const formattedPages: LinkOption[] = result.data.map((item: any) => ({
            type: linkType,
            slug: item.slug || item._id,
            title: item.title || item.name || item.slug,
            url: `${urlPrefix}${item.slug || item._id}`,
          }));
          setPages(formattedPages);
        } else {
          setPages([]);
        }
      } catch (error) {
        console.error(`Error fetching ${linkType} pages:`, error);
        setPages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [isOpen, linkType]);

  const handleInsert = () => {
    if (!selectedPage || !linkText.trim()) {
      alert('Please select a page and enter link text');
      return;
    }

    const selected = pages.find(p => p.url === selectedPage);
    if (selected) {
      onInsert(selected.url, linkText.trim());
      setLinkText('');
      setSelectedPage('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Add Internal Link</h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {/* Link Type Selection */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Link Type
            </label>
            <select
              value={linkType}
              onChange={(e) => {
                setLinkType(e.target.value as any);
                setSelectedPage('');
              }}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-red-500"
            >
              <option value="static">Static Page</option>
              <option value="blog">Blog Post</option>
              <option value="singer">Singer</option>
              <option value="qawwal">Qawwal</option>
              <option value="class">Music Class</option>
            </select>
          </div>

          {/* Page Selection */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Select Page
            </label>
            {loading ? (
              <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60">
                Loading...
              </div>
            ) : (
              <select
                value={selectedPage}
                onChange={(e) => setSelectedPage(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-red-500"
              >
                <option value="">-- Select a page --</option>
                {pages.map((page) => (
                  <option key={page.url} value={page.url}>
                    {page.title}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Link Text */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Link Text
            </label>
            <input
              type="text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="Text to display for the link"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Preview */}
          {selectedPage && linkText && (
            <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-xs text-white/60 mb-1">Preview:</p>
              <a
                href={selectedPage}
                className="text-red-400 hover:text-red-300 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkText}
              </a>
              <p className="text-xs text-white/40 mt-1">{selectedPage}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleInsert}
              disabled={!selectedPage || !linkText.trim()}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-500 hover:to-red-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Insert Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

