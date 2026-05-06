import React, { useState } from 'react';
import { ChevronLeft, FileText, Download, Calendar as CalendarIcon, Check } from 'lucide-react';

export default function Settings() {
  const [period, setPeriod] = useState('최근 1개월');
  const [items, setItems] = useState(['작업 내역', '병충해 진단', '날씨 정보', '메모']);

  const toggleItem = (item) => {
    setItems(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  return (
    <div className="flex flex-col bg-white min-h-screen pb-10">
      {/* Header */}
      <div className="px-6 pt-10 pb-4 flex items-center space-x-4 bg-white sticky top-0 z-20">
        <button className="text-gray-400"><ChevronLeft size={24} /></button>
        <h1 className="text-xl font-bold">엑셀 다운로드</h1>
      </div>

      <div className="px-6 space-y-8 mt-4">
        {/* Period Selection */}
        <section>
          <h3 className="font-bold text-gray-800 mb-4">기간 선택</h3>
          <div className="flex space-x-2 mb-4">
            {['최근 1주일', '최근 1개월', '최근 3개월'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                  period === p ? 'bg-primary text-white shadow-md' : 'bg-surface text-gray-400'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="bg-surface rounded-2xl p-4 flex items-center justify-between text-xs font-bold text-gray-500">
            <div className="flex items-center space-x-2">
              <CalendarIcon size={14} />
              <span>2024.04.20</span>
            </div>
            <span>~</span>
            <div className="flex items-center space-x-2">
              <CalendarIcon size={14} />
              <span>2024.05.20</span>
            </div>
          </div>
        </section>

        {/* Product Selection */}
        <section>
          <h3 className="font-bold text-gray-800 mb-4">작물 선택</h3>
          <div className="grid grid-cols-4 gap-2">
            {['전체', '사과', '복숭아', '배', '포도', '감귤', '기타'].map(f => (
              <button key={f} className={`py-2 rounded-xl text-[10px] font-bold ${f === '전체' ? 'bg-primary text-white' : 'bg-surface text-gray-400'}`}>
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* Item Selection */}
        <section>
          <h3 className="font-bold text-gray-800 mb-4">포함 항목</h3>
          <div className="grid grid-cols-2 gap-3">
            {['작업 내역', '병충해 진단', '날씨 정보', '메모', '사진 목록'].map(item => {
              const isSelected = items.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => toggleItem(item)}
                  className={`flex items-center space-x-2 p-3 rounded-2xl border transition-all ${
                    isSelected ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 bg-white text-gray-400'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${isSelected ? 'bg-primary border-primary' : 'border-gray-200'}`}>
                    {isSelected && <Check size={12} className="text-white" />}
                  </div>
                  <span className="text-xs font-bold">{item}</span>
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-gray-300 mt-4 leading-relaxed">
            * 선택한 항목의 데이터가 엑셀 파일로<br />생성됩니다.
          </p>
        </section>

        <button className="w-full bg-primary py-4 rounded-2xl text-white font-bold shadow-lg shadow-primary/20 flex items-center justify-center space-x-2">
          <FileText size={18} />
          <span>엑셀 다운로드</span>
        </button>
      </div>
    </div>
  );
}
