import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import TaskDetail from './components/TaskDetail';
import Album from './components/Album';

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home'); // 'home', 'task', 'album'
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // 로그인 상태 복원
  useEffect(() => {
    const stored = localStorage.getItem('vibe_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const handleSelectTask = (id) => {
    setSelectedTaskId(id);
    setView('task');
  };

  const handleOpenAlbum = () => setView('album');

  const handleBackHome = () => {
    setView('home');
    setSelectedTaskId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {view === 'home' && (
        <Home onSelectTask={handleSelectTask} onOpenAlbum={handleOpenAlbum} />
      )}
      {view === 'task' && selectedTaskId && (
        <TaskDetail taskId={selectedTaskId} onBack={handleBackHome} />
      )}
      {view === 'album' && <Album onBack={handleBackHome} />}
    </div>
  );
}
