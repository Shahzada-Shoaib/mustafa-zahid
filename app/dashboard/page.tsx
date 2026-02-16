'use client';

import { useState, useEffect } from 'react';
import SingerForm from '@/components/dashboard/SingerForm';
import QawwalForm from '@/components/dashboard/QawwalForm';
import BlogForm from '@/components/dashboard/BlogForm';
import ClassForm from '@/components/dashboard/ClassForm';
import StatsCards from '@/components/dashboard/StatsCards';
import ListingView from '@/components/dashboard/ListingView';

type TabType = 'singers' | 'qawwals' | 'blogs' | 'classes';
type ViewMode = 'list' | 'create' | 'edit';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('singers');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch items when tab or view mode changes
  useEffect(() => {
    if (viewMode === 'list') {
      fetchItems();
    }
  }, [activeTab, viewMode]);

  // Reset edit mode when tab changes
  useEffect(() => {
    if (viewMode === 'edit') {
      setViewMode('list');
      setEditingId(null);
      setEditingData(null);
    }
  }, [activeTab]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const endpoint = activeTab === 'classes' ? '/api/classes?forDashboard=true' : `/api/${activeTab}`;
      const response = await fetch(endpoint);
      const result = await response.json();
      
      if (result.success) {
        setItems(result.data || []);
      } else {
        console.error('Error fetching items:', result.error);
        setItems([]);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (type: string) => {
    setActiveTab(type as TabType);
    setViewMode('list');
  };

  const handleEdit = async (id: string) => {
    setLoading(true);
    try {
      // For classes, use slug route (it handles both ID and slug)
      // For others, use id route
      const endpoint = `/api/${activeTab}/${id}`;
      console.log('Fetching item for edit:', { endpoint, id, activeTab, idType: typeof id, idLength: id?.length });
      
      const response = await fetch(endpoint);
      const responseText = await response.text();
      console.log('Raw response:', { status: response.status, statusText: response.statusText, text: responseText });
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse JSON:', e, 'Response text:', responseText);
        alert(`Error: Invalid response from server. Status: ${response.status}`);
        return;
      }
      
      console.log('Parsed response:', result);
      
      if (!response.ok || !result.success) {
        const errorMsg = result.error || result.message || `HTTP ${response.status}: ${response.statusText}`;
        console.error('Error details:', { 
          status: response.status, 
          result, 
          errorMsg,
          fullResult: JSON.stringify(result, null, 2)
        });
        alert(`Error: ${errorMsg}`);
        return;
      }
      
      if (result.data) {
        // Ensure _id is a string
        const dataWithStringId = {
          ...result.data,
          _id: result.data._id?.toString() || result.data._id || id,
        };
        console.log('Edit data loaded:', { _id: dataWithStringId._id, hasId: !!dataWithStringId._id });
        setEditingId(id);
        setEditingData(dataWithStringId);
        setViewMode('edit');
      } else {
        console.error('No data in response:', result);
        alert('Error: No data received from server');
      }
    } catch (error: any) {
      console.error('Error fetching item:', error);
      alert(`Error: ${error.message || 'Failed to fetch item'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ids: string[]) => {
    try {
      const endpoint = `/api/${activeTab}`;
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(`Successfully deleted ${result.deletedCount} item(s)`);
        fetchItems(); // Refresh list
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error: any) {
      console.error('Error deleting items:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleCancelEdit = () => {
    setViewMode('list');
    setEditingId(null);
    setEditingData(null);
  };

  const handleFormSuccess = () => {
    setViewMode('list');
    setEditingId(null);
    setEditingData(null);
    fetchItems(); // Refresh list
  };


  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Admin <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg">
            Manage singers, qawwals, blog posts, and classes
          </p>
        </div>

        {/* Stats Cards */}
        <StatsCards onCardClick={handleCardClick} />

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8 border-b border-white/10 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => {
              setActiveTab('singers');
              setViewMode('list');
            }}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 font-semibold transition-all whitespace-nowrap min-h-[44px] touch-manipulation ${
              activeTab === 'singers'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-white/60 hover:text-white/80 active:text-white'
            }`}
          >
            Singers
          </button>
          <button
            onClick={() => {
              setActiveTab('qawwals');
              setViewMode('list');
            }}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 font-semibold transition-all whitespace-nowrap min-h-[44px] touch-manipulation ${
              activeTab === 'qawwals'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-white/60 hover:text-white/80 active:text-white'
            }`}
          >
            Qawwals
          </button>
          <button
            onClick={() => {
              setActiveTab('blogs');
              setViewMode('list');
            }}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 font-semibold transition-all whitespace-nowrap min-h-[44px] touch-manipulation ${
              activeTab === 'blogs'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-white/60 hover:text-white/80 active:text-white'
            }`}
          >
            Blogs
          </button>
          <button
            onClick={() => {
              setActiveTab('classes');
              setViewMode('list');
            }}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 font-semibold transition-all whitespace-nowrap min-h-[44px] touch-manipulation ${
              activeTab === 'classes'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-white/60 hover:text-white/80 active:text-white'
            }`}
          >
            Classes
          </button>
        </div>

        {/* Mode Toggle */}
        {viewMode !== 'edit' && (
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-red-600 text-white'
                  : 'bg-white/5 text-white/60 hover:text-white'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => {
                setViewMode('create');
                setEditingId(null);
                setEditingData(null);
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'create'
                  ? 'bg-red-600 text-white'
                  : 'bg-white/5 text-white/60 hover:text-white'
              }`}
            >
              Create New
            </button>
          </div>
        )}

        {/* Content */}
        <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
          {viewMode === 'list' && (
            <ListingView
              type={activeTab}
              items={items}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRefresh={fetchItems}
            />
          )}

          {(viewMode === 'create' || viewMode === 'edit') && (
            <>
              {activeTab === 'singers' && (
                <SingerForm
                  editMode={viewMode === 'edit'}
                  initialData={editingData}
                  onCancel={viewMode === 'edit' ? handleCancelEdit : undefined}
                  onSuccess={handleFormSuccess}
                />
              )}
              {activeTab === 'qawwals' && (
                <QawwalForm
                  editMode={viewMode === 'edit'}
                  initialData={editingData}
                  onCancel={viewMode === 'edit' ? handleCancelEdit : undefined}
                  onSuccess={handleFormSuccess}
                />
              )}
              {activeTab === 'blogs' && (
                <BlogForm
                  editMode={viewMode === 'edit'}
                  initialData={editingData}
                  onCancel={viewMode === 'edit' ? handleCancelEdit : undefined}
                  onSuccess={handleFormSuccess}
                />
              )}
              {activeTab === 'classes' && (
                <ClassForm
                  editMode={viewMode === 'edit'}
                  initialData={editingData}
                  onCancel={viewMode === 'edit' ? handleCancelEdit : undefined}
                  onSuccess={handleFormSuccess}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
