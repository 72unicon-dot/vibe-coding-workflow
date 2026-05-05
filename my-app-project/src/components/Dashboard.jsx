import React, { useState, useEffect } from 'react';
import { Sun, Cloud, Wind, Droplets, Bell, ChevronRight, CheckCircle2, Circle } from 'lucide-react';

export default function Dashboard({ farmInfo }) {
  const [weather, setWeather] = useState({ temp: 24, desc: '맑음', hum: 56, wind: 2.3 });
  const [tasks, setTasks] = useState([
    { id: 1, title: '사과 적과 작업', time: '오전', done: false },
    { id: 2, title: '복숭아 봉지 씌우기', time: '오후', done: false },
    { id: 3, title: '배 나무 물주기', time: '오후', done: true },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div className="flex flex-col bg-surface min-h-screen">
      {/* Hero Header */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        {farmInfo.farmPhoto ? (
          <img src={farmInfo.farmPhoto} alt="Farm" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-primary-light flex items-center justify-center">
            <span className="text-6xl">🍏</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl font-bold mb-1">{farmInfo.farmName}</h1>
          <p className="text-sm opacity-90 font-medium">농장주 {farmInfo.ownerName}</p>
        </div>
        <button className="absolute top-10 right-6 p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
          <Bell size={20} />
        </button>
      </div>

      {/* Content Area */}
      <div className="px-6 -mt-10 relative z-10 space-y-6 pb-10">
        {/* Greetings */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-5 shadow-sm border border-white/50">
          <p className="text-gray-800 font-medium leading-snug">
            안녕하세요, {farmInfo.ownerName}님!<br />
            <span className="text-gray-400 text-sm font-normal">오늘도 건강한 하루 되세요 🌱</span>
          </p>
        </div>

        {/* Weather Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">오늘의 날씨</h2>
            <button className="text-gray-300"><ChevronRight size={20} /></button>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-secondary-light rounded-2xl text-secondary">
                <Sun size={32} />
              </div>
              <div>
                <div className="text-3xl font-bold">{weather.temp}°C</div>
                <div className="text-xs text-gray-500 font-medium">{weather.desc}</div>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-y-2 border-l border-gray-100 pl-6">
              <div className="flex items-center space-x-2 text-gray-400">
                <Droplets size={14} />
                <span className="text-xs font-medium">습도 {weather.hum}%</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Wind size={14} />
                <span className="text-xs font-medium">바람 {weather.wind} m/s</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Notice */}
        <div className="bg-danger/5 border border-danger/10 rounded-2xl p-4 flex items-start space-x-3">
          <div className="p-1 bg-danger text-white rounded-lg mt-0.5">
            <Bell size={12} fill="currentColor" />
          </div>
          <div className="flex-1">
            <h3 className="text-xs font-bold text-danger mb-1">AI 영농 알림</h3>
            <p className="text-[11px] text-gray-600 leading-normal">
              탄저병 발생 위험이 높습니다. 최근 기온과 습도 조건으로 보아 발생 가능성이 증가하고 있습니다.
            </p>
            <button className="text-[10px] font-bold text-gray-400 mt-2 flex items-center">
              자세히 보기 <ChevronRight size={10} className="ml-0.5" />
            </button>
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">오늘의 할 일</h2>
            <button className="text-primary text-xs font-bold">전체보기</button>
          </div>
          <div className="space-y-3">
            {tasks.map(task => (
              <div 
                key={task.id} 
                className="flex items-center justify-between p-3 rounded-2xl bg-surface/50 group cursor-pointer"
                onClick={() => toggleTask(task.id)}
              >
                <div className="flex items-center space-x-3">
                  {task.done ? (
                    <CheckCircle2 className="text-primary" size={20} />
                  ) : (
                    <Circle className="text-gray-200" size={20} />
                  )}
                  <span className={`text-sm font-medium ${task.done ? 'text-gray-300 line-through' : 'text-gray-700'}`}>
                    {task.title}
                  </span>
                </div>
                <div className="px-2 py-1 bg-white rounded-lg text-[10px] font-bold text-gray-400 shadow-sm">
                  {task.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Record */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
           <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">최근 기록</h2>
            <button className="text-gray-300"><ChevronRight size={20} /></button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-surface rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1596701062351-be5f3128ff0e?w=100" alt="record" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-gray-700">병충해 진단: 잿빛곰팡이병 (추정)</h4>
              <p className="text-[10px] text-gray-400 mt-0.5">진단일 2024.05.19</p>
            </div>
            <div className="px-2 py-1 bg-danger/10 text-danger text-[10px] font-bold rounded-lg">
              위험
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
