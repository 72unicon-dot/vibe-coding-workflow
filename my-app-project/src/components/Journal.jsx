import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Image as ImageIcon } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function Journal() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="flex flex-col bg-white min-h-screen pb-10">
      {/* Header */}
      <div className="px-6 pt-10 pb-4 flex justify-between items-center bg-white sticky top-0 z-20">
        <h1 className="text-xl font-bold flex items-center space-x-2">
          <span className="p-1.5 bg-primary-light rounded-lg text-primary"><Plus size={16} /></span>
          <span>영농일지</span>
        </h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="p-2 bg-primary text-white rounded-full shadow-lg shadow-primary/20"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Calendar Section */}
      <div className="px-6 mb-6">
        <div className="bg-surface rounded-3xl p-4">
          <div className="flex justify-between items-center mb-4 px-2">
            <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="text-gray-400"><ChevronLeft size={20} /></button>
            <h2 className="font-bold text-gray-700">{format(currentDate, 'yyyy년 M월')}</h2>
            <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="text-gray-400"><ChevronRight size={20} /></button>
          </div>
          
          <div className="grid grid-cols-7 gap-y-2 text-center">
            {['일', '월', '화', '수', '목', '금', '토'].map(day => (
              <div key={day} className="text-[11px] font-bold text-gray-300 py-2">{day}</div>
            ))}
            {calendarDays.map((day, i) => {
              const isSelected = isSameDay(day, selectedDate);
              const isCurrentMonth = isSameMonth(day, monthStart);
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(day)}
                  className={`relative py-3 flex items-center justify-center text-sm font-medium transition-all ${
                    isSelected ? 'text-white' : isCurrentMonth ? 'text-gray-700' : 'text-gray-200'
                  }`}
                >
                  {isSelected && <div className="absolute inset-0.5 bg-primary rounded-xl z-0 shadow-sm shadow-primary/30" />}
                  <span className="relative z-10">{format(day, 'd')}</span>
                  {/* Event Dots */}
                  {isCurrentMonth && format(day, 'd') % 7 === 0 && !isSelected && (
                    <div className="absolute bottom-1 w-1 h-1 bg-primary rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Daily Schedule */}
      <div className="px-6 space-y-6">
        <div>
          <h3 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
            <span>{format(selectedDate, 'M월 d일(eee)', { locale: ko })} 오늘의 일정</span>
          </h3>
          
          <div className="space-y-3">
            {[
              { id: 1, title: '사과 적과 작업', time: '09:00', type: '중요', color: 'danger' },
              { id: 2, title: '복숭아 봉지 씌우기', time: '14:00', type: '보통', color: 'primary' },
              { id: 3, title: '농약 살포 (온가루병 예방)', time: '16:00', type: '주의', color: 'secondary' },
            ].map(item => (
              <div key={item.id} className="bg-surface/50 rounded-2xl p-4 flex items-center space-x-4 border border-transparent hover:border-gray-100 transition-all">
                <div className="text-[11px] font-bold text-gray-400 whitespace-nowrap">{item.time}</div>
                <div className="flex-1 text-sm font-semibold text-gray-700">{item.title}</div>
                <div className={`px-2 py-0.5 rounded-lg text-[9px] font-bold text-white bg-${item.color}`}>
                  {item.type}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Memo Section */}
        <div>
          <h3 className="font-bold text-gray-800 mb-3">메모</h3>
          <textarea 
            placeholder="오늘의 작업 내용을 메모하세요..."
            className="w-full bg-surface border-none rounded-2xl p-4 text-sm text-gray-600 placeholder:text-gray-300 min-h-[100px] outline-none"
          />
        </div>

        {/* Photo Section */}
        <div>
          <h3 className="font-bold text-gray-800 mb-3">사진</h3>
          <div className="flex space-x-3">
            <button className="w-20 aspect-square bg-surface rounded-2xl flex flex-col items-center justify-center text-gray-300 border-2 border-dashed border-gray-100">
              <Plus size={20} />
              <span className="text-[10px] font-bold mt-1">사진 추가</span>
            </button>
            <div className="w-20 aspect-square bg-surface rounded-2xl overflow-hidden shadow-sm">
               <img src="https://images.unsplash.com/photo-1596701062351-be5f3128ff0e?w=100" alt="record" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <button className="w-full bg-primary py-4 rounded-2xl text-white font-bold shadow-lg shadow-primary/20 mt-4">
          저장하기
        </button>
      </div>
    </div>
  );
}
