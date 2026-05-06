import React, { useState } from 'react';
import { Camera, Plus } from 'lucide-react';

export default function Onboarding({ onComplete }) {
  const [farmName, setFarmName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleStart = () => {
    if (!farmName || !ownerName) return alert('농장 이름과 농장주 이름을 입력해주세요.');
    onComplete({ farmName, ownerName, farmPhoto: photo });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col justify-between max-w-md mx-auto">
      <div className="flex flex-col items-center mt-10">
        <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">🌱</span>
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">과수원 영농일지를<br />시작해볼까요?</h1>
        <p className="text-gray-400 text-sm text-center mb-10 leading-relaxed">
          등록한 사진과 농장 이름, 농장주 이름은<br />다음에 앱을 열었을 때 홈 화면에<br />표시됩니다.
        </p>

        <div className="w-full space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 ml-1">🏠 농장 이름</label>
            <input
              type="text"
              placeholder="예) 선중 과수원"
              className="w-full bg-surface border-none rounded-2xl py-4 px-5 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 ml-1">👤 농장주 이름</label>
            <input
              type="text"
              placeholder="예) 김선중"
              className="w-full bg-surface border-none rounded-2xl py-4 px-5 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 ml-1">📸 사진 등록</label>
            <label className="block w-full aspect-video bg-surface rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden group">
              {photo ? (
                <img src={photo} alt="Farm" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Plus className="text-gray-300 mb-2 group-hover:text-primary transition-colors" size={32} />
                  <span className="text-xs text-gray-400 group-hover:text-primary transition-colors">사진 선택 또는 촬영</span>
                </>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
            </label>
            <p className="text-[10px] text-gray-400 mt-2 text-center">개인 사진 또는 과수원 사진을<br />등록해주세요.</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleStart}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/20"
      >
        시작하기
      </button>
    </div>
  );
}
