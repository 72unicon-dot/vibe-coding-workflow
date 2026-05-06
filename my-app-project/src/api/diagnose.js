// src/api/diagnose.js - client side wrapper to call Vercel serverless function
/**
 * Vercel 서버리스 함수 (/api/diagnose) 로 이미지 진단 요청을 보냅니다.
 * @param {string} imageUrl - 접근 가능한 이미지 URL
 * @returns {Promise<string>} - 진단 결과 문자열
 */
export async function diagnoseImage(imageUrl) {
  // Vite 환경변수에서 API 키를 읽어옵니다.
  try {
    const response = await fetch('/api/diagnose', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    });
    if (!response.ok) {
      const err = await response.text();
      console.error('Server error', response.status, err);
      return '진단에 실패했습니다.';
    }
    const data = await response.json();
    return data.result || '진단 결과를 가져올 수 없습니다.';
  } catch (e) {
    console.error('Network error', e);
    return '진단에 실패했습니다.';
  }
}
