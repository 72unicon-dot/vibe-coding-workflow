```markdown
# 농사일기 디자인 시스템 (DESIGN_SYSTEM.md)

## 1. 색상 팔레트
### Primary Color
- **색상 코드**: `#4CAF50` (녹색)
- **설명**: 자연과 농업을 상징하는 색상으로, 주요 버튼 및 강조 요소에 사용됩니다.

### Secondary Color
- **색상 코드**: `#FFC107` (노란색)
- **설명**: 따뜻함과 친근함을 나타내며, 보조 버튼 및 알림 요소에 사용됩니다.

### Neutrals
- **배경색**: `#F5F5F5` (연한 회색)
- **텍스트 색상**: `#212121` (어두운 회색)
- **보조 텍스트 색상**: `#757575` (회색)

## 2. 폰트
- **주 폰트**: `Roboto`, sans-serif
- **폰트 스타일**:
    - 제목: Bold, 24px
    - 본문: Regular, 16px
    - 버튼: Medium, 18px

### 구글 폰트 CSS 링크
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
```

## 3. 공통 UI 컴포넌트 스타일
### 버튼
- **기본 버튼**:
    - 배경색: `bg-primary`
    - 텍스트 색상: `text-white`
    - 테두리: `rounded-lg`
    - 패딩: `px-6 py-2`
    - 글꼴: `font-medium`
    - 크기: `text-lg`
    
- **보조 버튼**:
    - 배경색: `bg-secondary`
    - 텍스트 색상: `text-white`
    - 테두리: `rounded-lg`
    - 패딩: `px-4 py-1`
    - 글꼴: `font-medium`
    - 크기: `text-sm`

### 입력 필드
- **기본 입력 필드**:
    - 배경색: `bg-white`
    - 테두리: `border border-gray-400 rounded-md`
    - 패딩: `px-4 py-2`
    - 글꼴: `font-normal`
    - 크기: `text-base`
    
- **포커스 시**:
    - 테두리 색상: `border-primary`
    - 그림자: `shadow-md`

### 카드
- **작업 카드**:
    - 배경색: `bg-white`
    - 테두리: `border border-gray-300 rounded-lg`
    - 패딩: `p-4`
    - 그림자: `shadow-lg`
    - 글꼴: `font-normal`

### 스위치
- **스위치 스타일**:
    - 기본 스위치: `bg-gray-300 rounded-full`
    - 활성화 시: `bg-primary`
    - 크기: `h-6 w-12`
    - 스위치 버튼: `bg-white rounded-full h-6 w-6`

## 4. 아이콘
- **아이콘 스타일**: 
    - 색상: `text-gray-600`
    - 크기: `h-6 w-6`
    - 마진: `mr-2`

## 5. 레이아웃
- **기본 레이아웃**:
    - 전체 화면: `flex flex-col items-center justify-center`
    - 마진: `m-4`
    - 패딩: `p-4`
    - 최대 너비: `max-w-lg`

### 반응형 디자인
- **모바일**: `w-full`
- **태블릿**: `md:w-3/4`
- **데스크탑**: `lg:w-1/2`

## 6. 애니메이션
- **버튼 호버 애니메이션**:
    - `transition duration-300 ease-in-out`
    - `transform hover:scale-105`
    
- **카드 애니메이션**:
    - `transition duration-300 ease-in-out`
    - `transform hover:shadow-xl`

---

이 디자인 시스템은 농사일기에 필요한 모든 UI 요소와 스타일을 정의하여 일관된 사용자 경험을 제공합니다.
```