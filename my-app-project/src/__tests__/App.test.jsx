// src/__tests__/App.test.jsx
/**
 * @vitest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Mock fetch for OpenAI diagnosis endpoint
global.fetch = vi.fn((url, options) => {
  if (url === '/api/diagnose') {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ result: '병충해 진단 결과: 정상(특이사항 없음)' }),
    });
  }
  // Fallback for other calls (e.g., weather widget)
  return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
});

describe('전체 앱 플로우', () => {
  beforeEach(() => {
    // clear localStorage before each test
    localStorage.clear();
  });

  test('로그인 후 작업 추가 → 진단까지 정상 동작', async () => {
    render(<App />);

    // 로그인 화면
    const usernameInput = screen.getByPlaceholderText('아이디를 입력하세요');
    const passwordInput = screen.getByPlaceholderText('비밀번호를 입력하세요');
    const loginBtn = screen.getByRole('button', { name: /로그인/i });
    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(passwordInput, 'secret');
    await userEvent.click(loginBtn);

    // 홈 화면 확인
    expect(await screen.findByText('오늘의 작업')).toBeInTheDocument();

    // 작업 추가 버튼 클릭 -> 모달 열림
    const addBtn = screen.getByRole('button', { name: /작업 추가/i });
    await userEvent.click(addBtn);

    // 모달 입력
    const titleInput = screen.getByPlaceholderText('작업 제목');
    const dateInput = screen.getByPlaceholderText('날짜 선택');
    await userEvent.type(titleInput, '수확 준비');
    await userEvent.type(dateInput, '2026-06-01');
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    const fileInput = document.querySelector('input[type="file"]');
    await userEvent.upload(fileInput, file);

    const saveBtn = screen.getByRole('button', { name: /저장/i });
    await userEvent.click(saveBtn);

    // 작업 리스트에 새 작업이 보인다
    const taskItem = await screen.findByText('수확 준비');
    expect(taskItem).toBeInTheDocument();

    // 작업 상세 화면 열기
    await userEvent.click(taskItem);

    // 진단 버튼 클릭 → fetch mock 반환값 사용
    const diagnoseBtn = screen.getByRole('button', { name: /병충해 진단/i });
    await userEvent.click(diagnoseBtn);

    // 로딩 스피너가 사라지고 결과가 표시될 때까지 기다림
    await waitFor(() => {
      expect(screen.getAllByText(/진단 결과/)[0]).toBeInTheDocument();
    });
    expect(screen.getByText(/병충해 진단 결과/)).toBeInTheDocument();
  });
});
