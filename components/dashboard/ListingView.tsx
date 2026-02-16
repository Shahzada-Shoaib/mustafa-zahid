'use client';

import { useState, useMemo } from 'react';

interface ListingItem {
  _id: string;
  name?: string;
  title?: string;
  slug: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  date?: string;
  author?: string;
  category?: string;
  type?: string;
  instrument?: string;
}

interface ListingViewProps {
  type: 'singers' | 'qawwals' | 'blogs' | 'classes';
  items: ListingItem[];
  loading?: boolean;
  onEdit: (id: string) => void;
  onDelete: (ids: string[]) => void;
  onRefresh?: () => void;
}

export default function ListingView({
  type,
  items,
  loading = false,
  onEdit,
  onDelete,
  onRefresh,
}: ListingViewProps) {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string[]>([]);

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    
    const query = searchQuery.toLowerCase();
    return items.filter((item) => {
      const name = (item.name || item.title || '').toLowerCase();
      const slug = item.slug.toLowerCase();
      return name.includes(query) || slug.includes(query);
    });
  }, [items, searchQuery]);

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredItems.map((item) => item._id));
    } else {
      setSelectedItems([]);
    }
  };

  // Handle individual selection
  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    }
  };

  // Handle delete confirmation
  const handleDeleteClick = (ids: string[]) => {
    setDeleteTarget(ids);
    setShowDeleteConfirm(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    onDelete(deleteTarget);
    setSelectedItems([]);
    setShowDeleteConfirm(false);
    setDeleteTarget([]);
  };

  // Get display name
  const getDisplayName = (item: ListingItem) => {
    return item.name || item.title || 'Untitled';
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const allSelected = filteredItems.length > 0 && selectedItems.length === filteredItems.length;
  const someSelected = selectedItems.length > 0 && selectedItems.length < filteredItems.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white/60">Loading...</div>
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60 text-lg">
          {searchQuery ? 'No items found matching your search.' : `No ${type} found.`}
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="flex-1 w-full sm:max-w-md">
            <input
              type="text"
              placeholder={`Search ${type}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'table'
                  ? 'bg-red-600 text-white'
                  : 'bg-white/5 text-white/60 hover:text-white'
              }`}
            >
              Table
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'cards'
                  ? 'bg-red-600 text-white'
                  : 'bg-white/5 text-white/60 hover:text-white'
              }`}
            >
              Cards
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div className="flex items-center justify-between p-4 bg-red-600/20 border border-red-600/30 rounded-lg">
            <span className="text-white">
              {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
            </span>
            <button
              onClick={() => handleDeleteClick(selectedItems)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Selected
            </button>
          </div>
        )}
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-red-600 focus:ring-red-500"
                    ref={(input) => {
                      if (input) {
                        input.indeterminate = someSelected;
                      }
                    }}
                  />
                </th>
                <th className="text-left py-3 px-4 text-white/80 font-semibold text-sm">Image</th>
                <th className="text-left py-3 px-4 text-white/80 font-semibold text-sm">Name</th>
                <th className="text-left py-3 px-4 text-white/80 font-semibold text-sm">Slug</th>
                {type === 'blogs' && (
                  <>
                    <th className="text-left py-3 px-4 text-white/80 font-semibold text-sm">Date</th>
                    <th className="text-left py-3 px-4 text-white/80 font-semibold text-sm">Author</th>
                  </>
                )}
                {type === 'classes' && (
                  <>
                    <th className="text-left py-3 px-4 text-white/80 font-semibold text-sm">Type</th>
                    <th className="text-left py-3 px-4 text-white/80 font-semibold text-sm">Instrument</th>
                  </>
                )}
                <th className="text-left py-3 px-4 text-white/80 font-semibold text-sm">Created</th>
                <th className="text-right py-3 px-4 text-white/80 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item._id)}
                      onChange={(e) => handleSelectItem(item._id, e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-red-600 focus:ring-red-500"
                    />
                  </td>
                  <td className="py-3 px-4">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={getDisplayName(item)}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center text-white/40 text-xs">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-white font-medium">{getDisplayName(item)}</td>
                  <td className="py-3 px-4 text-white/60 text-sm">{item.slug}</td>
                  {type === 'blogs' && (
                    <>
                      <td className="py-3 px-4 text-white/60 text-sm">{item.date || 'N/A'}</td>
                      <td className="py-3 px-4 text-white/60 text-sm">{item.author || 'N/A'}</td>
                    </>
                  )}
                  {type === 'classes' && (
                    <>
                      <td className="py-3 px-4 text-white/60 text-sm capitalize">{item.type || 'N/A'}</td>
                      <td className="py-3 px-4 text-white/60 text-sm capitalize">{item.instrument || 'N/A'}</td>
                    </>
                  )}
                  <td className="py-3 px-4 text-white/60 text-sm">{formatDate(item.createdAt)}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => onEdit(item._id)}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick([item._id])}
                        className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Cards View */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="glass-card rounded-xl p-4 space-y-3 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item._id)}
                  onChange={(e) => handleSelectItem(item._id, e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-red-600 focus:ring-red-500 mt-1"
                />
                {item.image ? (
                  <img
                    src={item.image}
                    alt={getDisplayName(item)}
                    className="w-16 h-16 object-cover rounded flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 bg-white/10 rounded flex items-center justify-center text-white/40 text-xs flex-shrink-0">
                    No Image
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate">{getDisplayName(item)}</h3>
                  <p className="text-white/60 text-sm truncate">{item.slug}</p>
                  {type === 'blogs' && (
                    <p className="text-white/40 text-xs mt-1">
                      {item.date} • {item.author}
                    </p>
                  )}
                  {type === 'classes' && (
                    <p className="text-white/40 text-xs mt-1 capitalize">
                      {item.type} • {item.instrument}
                    </p>
                  )}
                  <p className="text-white/40 text-xs mt-1">{formatDate(item.createdAt)}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2 border-t border-white/10">
                <button
                  onClick={() => onEdit(item._id)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick([item._id])}
                  className="flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-xl p-6 max-w-md w-full">
            <h3 className="text-white text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="text-white/80 mb-6">
              Are you sure you want to delete {deleteTarget.length} item{deleteTarget.length > 1 ? 's' : ''}? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteTarget([]);
                }}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

