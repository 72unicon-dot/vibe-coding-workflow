import React, { useState } from 'react';
import { Search, Grid, List, ChevronRight } from 'lucide-react';

export default function Album() {
  const [filter, setFilter] = useState('전체');
  const filters = ['전체', '사과', '복숭아', '배', '진단', '작업'];

  const photos = [
    { id: 1, date: '05.20', img: 'https://images.unsplash.com/photo-1596701062351-be5f3128ff0e?w=200' },
    { id: 2, date: '05.19', img: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=200' },
    { id: 3, date: '05.19', img: 'https://images.unsplash.com/photo-1560806133-1ee2f6ef539d?w=200' },
    { id: 4, date: '05.19', img: 'https://images.unsplash.com/photo-1596701062351-be5f3128ff0e?w=200' },
    { id: 5, date: '05.18', img: 'https://images.unsplash.com/photo-1560806133-1ee2f6ef539d?w=200' },
    { id: 6, date: '05.18', img: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=200' },
  ];

  return (
    <div className="flex flex-col bg-white min-h-screen pb-10">
      {/* Header */}
      <div className="px-6 pt-10 pb-4 space-y-4 bg-white sticky top-0 z-20">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">영농 앨범</h1>
          <button className="text-gray-300"><Search size={20} /></button>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
          <input 
            type="text" 
            placeholder="사진 검색 (예: 사과 적과)"
            className="w-full bg-surface border-none rounded-2xl py-3 pl-11 pr-4 text-xs font-medium outline-none"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                filter === f ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-surface text-gray-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 space-y-8 mt-2">
        {/* Month Section */}
        <div>
          <h3 className="text-xs font-bold text-gray-300 mb-4 px-1">2024년 5월</h3>
          <div className="grid grid-cols-3 gap-3">
            {photos.map(p => (
              <div key={p.id} className="relative aspect-square rounded-2xl overflow-hidden shadow-sm group cursor-pointer">
                <img src={p.img} alt="photo" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-white/20 backdrop-blur-md rounded-md text-[8px] font-bold text-white">
                  {p.date}
                </div>
              </div>
            ))}
          </div>
        </div>

         {/* Month Section 2 */}
         <div>
          <h3 className="text-xs font-bold text-gray-300 mb-4 px-1">2024년 4월</h3>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden shadow-sm bg-surface">
                <img 
                  src={`https://images.unsplash.com/photo-1596701062351-be5f3128ff0e?w=200&sig=${i}`} 
                  alt="photo" 
                  className="w-full h-full object-cover opacity-80" 
                />
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-white/20 backdrop-blur-md rounded-md text-[8px] font-bold text-white">
                  04.{30-i}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
