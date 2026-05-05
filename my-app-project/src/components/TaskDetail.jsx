import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import { diagnoseImage } from '../api/diagnose';

export default function TaskDetail({ taskId, onBack }) {
  const [task, setTask] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [loading, setLoading] = useState(false);

  // 작업 정보 로드
  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      const tasks = JSON.parse(stored);
      const found = tasks.find(t => t.id === taskId);
      setTask(found);
    }
  }, [taskId]);

  const handleDiagnose = async () => {
    if (!task || !task.photoUrl) return;
    setLoading(true);
    try {
      // OpenAI API 호출을 통한 이미지 진단 (간단 텍스트 프롬프트 기반)
      const result = await diagnoseImage(task.photoUrl);
      setDiagnosis(result);
    } catch (e) {
      console.error(e);
      setDiagnosis('진단에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!task) return <div className="p-4">작업을 찾을 수 없습니다.</div>;

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <button
        onClick={onBack}
        className="mb-4 text-primary underline"
      >
        ← 홈으로 돌아가기
      </button>
      <h2 className="text-2xl font-bold mb-2 text-primary">{task.title}</h2>
      <p className="mb-2 text-gray-600">마감일: {task.dueDate}</p>
      {task.photoUrl && (
        <img src={task.photoUrl} alt="Task" className="mb-4 max-w-full rounded" />
      )}
      <button
        onClick={handleDiagnose}
        disabled={loading}
        className="bg-secondary text-white py-2 px-4 rounded mr-2"
      >
        {loading ? <Spinner /> : '병충해 진단'}
      </button>
      {diagnosis && (
        <div className="mt-4 p-3 bg-white rounded shadow">
          <h3 className="font-semibold mb-1">진단 결과</h3>
          <p>{diagnosis}</p>
        </div>
      )}
    </div>
  );
}
