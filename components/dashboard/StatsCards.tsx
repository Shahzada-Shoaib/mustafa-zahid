'use client';

import { useEffect, useState } from 'react';

interface Stats {
  singers: number;
  qawwals: number;
  blogs: number;
  classes: number;
}

export default function StatsCards({ onCardClick }: { onCardClick?: (type: string) => void }) {
  const [stats, setStats] = useState<Stats>({
    singers: 0,
    qawwals: 0,
    blogs: 0,
    classes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [singersRes, qawwalsRes, blogsRes, classesRes] = await Promise.all([
          fetch('/api/singers'),
          fetch('/api/qawwals'),
          fetch('/api/blogs'),
          fetch('/api/classes?forDashboard=true'),
        ]);

        const singersData = await singersRes.json();
        const qawwalsData = await qawwalsRes.json();
        const blogsData = await blogsRes.json();
        const classesData = await classesRes.json();

        setStats({
          singers: singersData.success ? singersData.data.length : 0,
          qawwals: qawwalsData.success ? qawwalsData.data.length : 0,
          blogs: blogsData.success ? blogsData.data.length : 0,
          classes: classesData.success ? classesData.data.length : 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      label: 'Singers',
      count: stats.singers,
      color: 'from-red-600 to-red-700',
      hoverColor: 'hover:from-red-500 hover:to-red-600',
      type: 'singers',
    },
    {
      label: 'Qawwals',
      count: stats.qawwals,
      color: 'from-orange-600 to-orange-700',
      hoverColor: 'hover:from-orange-500 hover:to-orange-600',
      type: 'qawwals',
    },
    {
      label: 'Blogs',
      count: stats.blogs,
      color: 'from-blue-600 to-blue-700',
      hoverColor: 'hover:from-blue-500 hover:to-blue-600',
      type: 'blogs',
    },
    {
      label: 'Classes',
      count: stats.classes,
      color: 'from-green-600 to-green-700',
      hoverColor: 'hover:from-green-500 hover:to-green-600',
      type: 'classes',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
      {cards.map((card) => (
        <button
          key={card.type}
          onClick={() => onCardClick?.(card.type)}
          className={`glass-card rounded-xl p-4 sm:p-6 text-left transition-all ${card.hoverColor} ${
            onCardClick ? 'cursor-pointer active:scale-95' : 'cursor-default'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-xs sm:text-sm font-medium mb-1">{card.label}</p>
              {loading ? (
                <div className="h-8 w-16 bg-white/10 rounded animate-pulse" />
              ) : (
                <p className="text-2xl sm:text-3xl font-bold text-white">{card.count}</p>
              )}
            </div>
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}>
              <span className="text-white text-lg sm:text-xl font-bold">
                {card.label.charAt(0)}
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

