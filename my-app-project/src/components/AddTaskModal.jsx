import React, { useState } from 'react';

export default function AddTaskModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [photoFile, setPhotoFile] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    // 사진을 Cloudinary 등에 업로드하는 로직을 간단히 모킹
    let photoUrl = '';
    if (photoFile) {
      // 실제 구현에서는 fetch POST to Cloudinary. 여기선 파일 객체를 URL.createObjectURL 로 대체
      photoUrl = URL.createObjectURL(photoFile);
    }
    const newTask = {
      id: Date.now().toString(),
      title,
      dueDate,
      photoUrl,
    };
    onAdd(newTask);
    // 폼 초기화
    setTitle('');
    setDueDate('');
    setPhotoFile(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-primary">작업 추가</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="작업 제목"
            className="border border-gray-300 rounded-lg py-2 px-3 mb-3 w-full"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="날짜 선택"
            className="border border-gray-300 rounded-lg py-2 px-3 mb-3 w-full"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            className="mb-4"
            onChange={e => setPhotoFile(e.target.files[0])}
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 py-1 px-3 rounded"
            >
              취소
            </button>
            <button
              type="submit"
              className="bg-primary text-white py-1 px-3 rounded"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
