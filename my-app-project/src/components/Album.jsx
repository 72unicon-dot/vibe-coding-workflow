import React, { useState, useEffect } from 'react';

export default function Album({ onBack }) {
  const [photos, setPhotos] = useState([]);

  // localStorage 에 저장된 앨범 사진 로드
  useEffect(() => {
    const stored = localStorage.getItem('albumPhotos');
    if (stored) setPhotos(JSON.parse(stored));
  }, []);

  const handleDownload = (url) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'photo.jpg';
    a.click();
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <button
        onClick={onBack}
        className="mb-4 text-primary underline"
      >
        ← 홈으로 돌아가기
      </button>
      <h2 className="text-2xl font-bold mb-4 text-primary">앨범</h2>

      {photos.length === 0 ? (
        <p className="text-gray-500">저장된 사진이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {photos.map((url, idx) => (
            <div key={idx} className="bg-white p-2 rounded shadow">
              <img src={url} alt={`album-${idx}`} className="mb-2 max-w-full rounded" />
              <button
                onClick={() => handleDownload(url)}
                className="bg-primary text-white py-1 px-2 rounded w-full"
              >
                다운로드
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
