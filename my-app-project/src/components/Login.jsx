import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 간단 로컬스토리지 로그인 (비밀번호 검증 생략)
    const user = { id: Date.now().toString(), username };
    localStorage.setItem('vibe_user', JSON.stringify(user));
    onLogin(user);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-primary text-center mb-6">농사 도우미</h1>
        <input
          type="text"
          placeholder="아이디를 입력하세요"
          className="border border-gray-300 rounded-lg py-2 px-4 mb-4 w-full"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          className="border border-gray-300 rounded-lg py-2 px-4 mb-4 w-full"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-primary text-white py-2 rounded-lg w-full"
        >
          로그인
        </button>
      </div>
    </div>
  );
}
