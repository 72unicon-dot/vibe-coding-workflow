import React, { useState, useEffect } from 'react';
import WeatherWidget from './WeatherWidget';
import AddTaskModal from './AddTaskModal';

export default function Home({ onSelectTask, onOpenAlbum }) {
  const [tasks, setTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // 로컬스토리지에서 작업 로드
  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  const refreshTasks = () => {
    const stored = localStorage.getItem('tasks');
    setTasks(stored ? JSON.parse(stored) : []);
  };

  const handleAddTask = (newTask) => {
    const updated = [...tasks, newTask];
    localStorage.setItem('tasks', JSON.stringify(updated));
    setTasks(updated);
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <WeatherWidget />
      <h1 className="text-2xl font-bold mb-4 text-primary">오늘의 작업</h1>
      <ul className="space-y-2 mb-4">
        {tasks.length === 0 && <li className="text-gray-500">작업이 없습니다.</li>}
        {tasks.map((task) => (
          <li
            key={task.id}
            className="p-3 bg-white rounded shadow cursor-pointer hover:bg-gray-50"
            onClick={() => onSelectTask(task.id)}
          >
            <div className="font-semibold">{task.title}</div>
            <div className="text-sm text-gray-600">{task.dueDate}</div>
          </li>
        ))}
      </ul>
      <button
        className="bg-secondary text-white py-2 px-4 rounded mr-2"
        onClick={() => setShowAddModal(true)}
      >
        작업 추가
      </button>
      <button
        className="bg-primary text-white py-2 px-4 rounded"
        onClick={onOpenAlbum}
      >
        앨범 보기
      </button>
      {showAddModal && (
        <AddTaskModal
          onClose={() => setShowAddModal(false)}
          onAdd={(task) => {
            handleAddTask(task);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}
