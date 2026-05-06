import React, { useState } from 'react';
import { Camera, Plus, Info, ChevronRight, Activity } from 'lucide-react';

export default function Diagnosis() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleStartDiagnosis = () => {
    setLoading(true);
    // AI 진단 시뮬레이션
    setTimeout(() => {
      setResult({
        disease: '탄저병 (추정)',
        confidence: 85,
        date: '2024.05.19',
        risk: '높음',
        riskScore: 80,
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col bg-white min-h-screen pb-10">
      {/* Header */}
      <div className="px-6 pt-10 pb-4 flex justify-between items-center bg-white sticky top-0 z-20">
        <h1 className="text-xl font-bold">병충해 진단</h1>
        <button className="text-gray-300"><Info size={20} /></button>
      </div>

      <div className="px-6 space-y-8">
        {/* Tab Switcher */}
        <div className="flex bg-surface p-1 rounded-2xl">
          <button className="flex-1 py-3 text-xs font-bold bg-primary text-white rounded-xl shadow-sm transition-all">잎 진단</button>
          <button className="flex-1 py-3 text-xs font-bold text-gray-400 rounded-xl transition-all">줄기/과실 진단</button>
        </div>

        {/* Upload Area */}
        <div className="space-y-4">
          <label className="block w-full aspect-square bg-surface rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all group overflow-hidden">
             {loading ? (
               <div className="flex flex-col items-center">
                 <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                 <span className="text-xs font-bold text-gray-400">AI가 분석 중입니다...</span>
               </div>
             ) : (
               <>
                <Camera className="text-gray-300 mb-3 group-hover:text-primary transition-colors" size={48} />
                <span className="text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">사진 촬영 또는 업로드</span>
                <p className="text-[10px] text-gray-400 mt-2">잎 뒷면이 잘 보이게 촬영해주세요.</p>
               </>
             )}
             <input type="file" className="hidden" accept="image/*" onChange={handleStartDiagnosis} />
          </label>
        </div>

        {/* Results Area */}
        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
              <h3 className="font-bold text-gray-800 mb-4">최근 진단 결과</h3>
              <div className="bg-white rounded-3xl p-5 shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center space-x-5">
                <div className="w-20 h-20 bg-surface rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1596701062351-be5f3128ff0e?w=100" alt="leaf" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-gray-800">{result.disease}</h4>
                    <span className="px-2 py-0.5 bg-danger/10 text-danger text-[9px] font-bold rounded-md">위험</span>
                  </div>
                  <div className="text-[11px] text-gray-400 font-medium">신뢰도 {result.confidence}%</div>
                  <div className="text-[11px] text-gray-400 font-medium mt-0.5">진단일 {result.date}</div>
                </div>
              </div>
            </div>

            {/* Risk Gauge */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4">위험도</h3>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <div className="text-2xl font-black text-secondary mb-1">높음</div>
                    <p className="text-[10px] text-gray-400 leading-normal">병 발생 가능성이 매우 높습니다.<br />조기 방제가 필요합니다.</p>
                  </div>
                  <Activity className="text-secondary opacity-20" size={64} strokeWidth={1} />
                </div>
                
                {/* Simple Gauge Visual */}
                <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400 transition-all duration-1000"
                    style={{ width: `${result.riskScore}%` }}
                  />
                </div>
              </div>
            </div>

            <button className="w-full bg-primary py-4 rounded-2xl text-white font-bold shadow-lg shadow-primary/20 flex items-center justify-center space-x-2">
              <span>조치 가이드 보기</span>
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
