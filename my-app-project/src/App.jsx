import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Journal from './components/Journal';
import Diagnosis from './components/Diagnosis';
import Album from './components/Album';
import Settings from './components/Settings';
import BottomNav from './components/BottomNav';

export default function App() {
  const [farmInfo, setFarmInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('farm_info');
    if (stored) {
      setFarmInfo(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const handleOnboardingComplete = (info) => {
    localStorage.setItem('farm_info', JSON.stringify(info));
    setFarmInfo(info);
  };

  if (loading) return null;

  if (!farmInfo) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-surface pb-20 font-sans text-gray-900">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl relative overflow-hidden">
        {activeTab === 'home' && <Dashboard farmInfo={farmInfo} />}
        {activeTab === 'journal' && <Journal />}
        {activeTab === 'diagnosis' && <Diagnosis />}
        {activeTab === 'album' && <Album />}
        {activeTab === 'settings' && <Settings />}
        
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}
