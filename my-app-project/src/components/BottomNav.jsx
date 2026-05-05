import React from 'react';
import { Home, Calendar, Camera, Image, Settings } from 'lucide-react';

export default function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'home', icon: Home, label: '홈' },
    { id: 'journal', icon: Calendar, label: '영농일지' },
    { id: 'diagnosis', icon: Camera, label: '진단' },
    { id: 'album', icon: Image, label: '앨범' },
    { id: 'settings', icon: Settings, label: '설정' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2 flex justify-between items-center z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center space-y-1 ${
              isActive ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
