# 📋 코딩 계획서 (Coding Plan)

## 1. 프로젝트 개요
- **앱 이름**: 과수원 영농일지 앱
- **목표**: 귀농한 과수원 농부가 날씨 정보, 스케줄 관리, 병충해 진단, 사진 앨범 기능을 한곳에서 활용하도록 지원
- **버전**: v1.0 (MVP)

## 2. 핵심 기능 검토 (PRD 기반)
| 번호 | 기능 | 설명 | 구현 우선순위 |
|------|------|------|----------------|
| 1 | 날씨 정보 제공 | 현재날씨·예보 기반 과수 관리 정보 제공 | High |
| 2 | 영농 스케줄 관리 | 오늘 할 일 기록, 사진 첨부, 일정 알림 | High |
| 3 | 병충해 진단 | 사진 업로드 → AI(오픈AI/Gemini) 분석 결과 제공 | Medium |
| 4 | 영농 앨범 | 사진 업로드·조회·다운로드 기능 | Medium |

## 3. 기술 스택 (Tech Spec 기반)
- **프론트엔드**: HTML + TailwindCSS (이미 사용 중) + Vanilla JavaScript
- **백엔드**: Vercel Serverless Functions (Node.js) – API 라우트
- **AI 진단**: OpenAI GPT-4o 또는 Gemini Vision API (이미 연동 경험 있음)
- **날씨 API**: OpenWeatherMap (무료 tier)
- **스토리지**: Vercel KV 또는 Cloudflare Workers KV (키‑밸류 저장) / 이미지 업로드는 Cloudinary 무료 플랜
- **배포**: Vercel (무료 플랜) – CI/CD 자동 배포
- **인증**: 간단 JWT 기반 로컬스토리지 (MVP) – 추후 Firebase Auth 고려

## 4. 데이터 모델 (엔티티 + 관계)
```mermaid
direction LR
classDiagram
    class User {
        +string id
        +string username
        +string passwordHash
    }
    class Task {
        +string id
        +string userId
        +string title
        +string description
        +date dueDate
        +string photoUrl
    }
    class Photo {
        +string id
        +string userId
        +string url
        +string type ("weather"|"disease"|"album")
        +date createdAt
    }
    User "1" --> "*" Task : owns
    User "1" --> "*" Photo : uploads
```

## 5. 페이지/컴포넌트 구조 (UI Spec 기반)
1. **Login** – 로그인/회원가입 화면
2. **Home** – 오늘 작업 리스트, 날씨 위젯, 작업 추가 버튼
3. **AddTaskModal** – 작업 입력 폼 (제목, 설명, 날짜, 사진)
4. **TaskDetail** – 선택된 작업 상세 보기, 사진 미리보기, 병충해 진단 버튼
5. **Album** – 사진 앨범 갤러리, 다운로드 옵션
6. **Settings** – 계정·앱 설정 (추후 구현)

## 6. 구현 단계 (스프린트 별)
### Sprint 1 – 기본 UI & 로컬스토리지
- 로그인 UI 구현 (간단 UI, 로컬스토리지 저장)
- Home 화면 UI 구성, 작업 리스트 로컬스토리지 CRUD 구현
- TailwindCSS 스타일링 적용 (다크모드, 그라디언트 등 프리미엄 디자인)
### Sprint 2 – 외부 API 연동
- OpenWeatherMap API 연동, 날씨 위젯 실시간 업데이트
- Vercel Serverless 함수 설정 (날씨 프록시, 인증 등)
### Sprint 3 – 사진 업로드 & 앨범
- Cloudinary 업로드 모듈 구현, 업로드된 이미지 URL 저장
- Album 페이지 UI 구현, 사진 조회·다운로드 기능
### Sprint 4 – AI 병충해 진단
- OpenAI/Gemini Vision API 호출 래퍼 함수 작성
- TaskDetail 페이지에 진단 버튼 추가, 결과 표시 UI
### Sprint 5 – 배포 & 테스트
- Vercel에 전체 프로젝트 배포
- CI 테스트 스크립트 작성 (Jest 기본 테스트)
- 문서 업데이트 (README, 사용자 가이드)

## 7. 품질 보증 (Test & Deploy)
- 단위 테스트: `taskService.test.js`, `api.test.js`
- UI 테스트: Cypress 간단 시나리오 (로그인 → 작업 추가 → 진단)
- 배포 전 자동 빌드 체크 (Vercel preview).

## 8. 위험 요소 및 대응 방안
| 위험 요소 | 영향 | 대응 방안 |
|----------|------|-----------|
| API 키 유출 | 보안 | 환경 변수 .env 로 관리, Vercel Secrets 사용 |
| 무료 호스팅 한도 초과 | 서비스 중단 | 사용량 모니터링, 필요 시 유료 플랜 전환 |
| 이미지 용량 제한 | 사용자 불편 | 이미지 압축 (client-side) 적용 |

---
위 계획서를 검토하시고 **승인** 혹은 **수정 요청**을 알려주시면 다음 단계(코드 구현)로 진행하겠습니다.
