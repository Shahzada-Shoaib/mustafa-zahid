'use client';

import { useState } from 'react';
import SingerForm from '@/components/dashboard/SingerForm';
import QawwalForm from '@/components/dashboard/QawwalForm';
import BlogForm from '@/components/dashboard/BlogForm';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'singers' | 'qawwals' | 'blogs'>('singers');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Admin <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg">
            Manage singers, qawwals, and blog posts
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8 border-b border-white/10 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveTab('singers')}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 font-semibold transition-all whitespace-nowrap min-h-[44px] touch-manipulation ${
              activeTab === 'singers'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-white/60 hover:text-white/80 active:text-white'
            }`}
          >
            Singers
          </button>
          <button
            onClick={() => setActiveTab('qawwals')}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 font-semibold transition-all whitespace-nowrap min-h-[44px] touch-manipulation ${
              activeTab === 'qawwals'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-white/60 hover:text-white/80 active:text-white'
            }`}
          >
            Qawwals
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 font-semibold transition-all whitespace-nowrap min-h-[44px] touch-manipulation ${
              activeTab === 'blogs'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-white/60 hover:text-white/80 active:text-white'
            }`}
          >
            Blogs
          </button>
        </div>

        {/* Form Content */}
        <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
          {activeTab === 'singers' && <SingerForm />}
          {activeTab === 'qawwals' && <QawwalForm />}
          {activeTab === 'blogs' && <BlogForm />}
        </div>
      </div>
    </div>
  );
}

