```markdown
# DESIGN_SYSTEM.md - 농사 도우미

## 1. 색상 팔레트
농사 도우미 앱은 사용자에게 프리미엄 느낌을 주기 위해 다음과 같은 색상 팔레트를 사용할 것입니다.

### Primary 색상
- **주요 색상**: #4B8B3B (진한 녹색)
  - 설명: 자연과 농업을 상징하는 색상으로, 신뢰성과 안정감을 제공합니다.

### Secondary 색상
- **보조 색상**: #FFB74D (주황색)
  - 설명: 따뜻함과 친근함을 주는 색상으로, 사용자에게 긍정적인 반응을 유도합니다.

### 배경 색상
- **배경 색상**: #F5F5F5 (연한 회색)
  - 설명: 눈에 편안한 색상으로, 콘텐츠를 돋보이게 합니다.

### 텍스트 색상
- **기본 텍스트 색상**: #333333 (어두운 회색)
  - 설명: 가독성이 뛰어난 색상으로, 정보 전달에 효과적입니다.
- **보조 텍스트 색상**: #777777 (중간 회색)
  - 설명: 보조 정보를 표현할 때 사용됩니다.

## 2. 글꼴
농사 도우미 앱은 다음의 구글 폰트를 사용합니다.
- **주요 글꼴**: [Roboto](https://fonts.google.com/specimen/Roboto)
  - 설명: 읽기 쉽고 현대적인 느낌을 주는 글꼴로, 다양한 두께를 지원하여 유연한 디자인이 가능합니다.
- **보조 글꼴**: [Open Sans](https://fonts.google.com/specimen/Open+Sans)
  - 설명: 부드러운 곡선과 깔끔한 디자인으로, 주로 버튼 및 강조 텍스트에 사용됩니다.

## 3. 공통 UI 컴포넌트
### 버튼
- **기본 버튼**:
  - 배경색: `bg-primary`
  - 텍스트 색상: `text-white`
  - 테두리: `border border-transparent`
  - 패딩: `py-2 px-4`
  - rounded: `rounded-lg`
  - hover 효과: `hover:bg-green-700`
  
- **보조 버튼**:
  - 배경색: `bg-secondary`
  - 텍스트 색상: `text-white`
  - 패딩: `py-2 px-4`
  - rounded: `rounded-lg`
  - hover 효과: `hover:bg-orange-500`

### 입력창
- **기본 입력창**:
  - 경계: `border border-gray-300`
  - 패딩: `py-2 px-4`
  - rounded: `rounded-lg`
  - 포커스 효과: `focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50`

### 리스트 항목
- **리스트 항목**:
  - 배경색: `bg-white`
  - 경계: `border-b border-gray-200`
  - 패딩: `py-3 px-4`
  - hover 효과: `hover:bg-gray-100`

### 텍스트
- **헤더 텍스트**:
  - 글꼴 크기: `text-2xl`
  - 글꼴 두께: `font-bold`
  - 색상: `text-primary`

- **본문 텍스트**:
  - 글꼴 크기: `text-base`
  - 색상: `text-gray-700`

## 4. Tailwind CSS 클래스 규칙
모든 UI 구성 요소는 Tailwind CSS를 사용하여 일관되게 스타일링됩니다. 아래는 각 컴포넌트에 대한 Tailwind CSS 클래스 규칙입니다.

1. **버튼**: 기본 버튼과 보조 버튼은 각각 `bg-primary`, `bg-secondary` 클래스를 사용하여 색상을 설정하고, `rounded-lg`로 모서리를 둥글게 하며, 패딩 및 hover 효과를 추가합니다.
  
2. **입력창**: 기본 입력창은 `border`, `rounded-lg` 클래스를 사용하여 시각적인 일관성을 유지하며, 포커스 상태에서의 효과를 통해 사용자 경험을 향상시킵니다.

3. **리스트 항목**: 각 리스트 항목은 `border-b` 클래스를 사용하여 구분선을 추가하고, hover 효과로 사용자 인터랙션을 강조합니다.

위의 디자인 시스템은 농사 도우미 앱의 사용자 인터페이스를 일관되게 유지하고, 사용자에게 프리미엄 경험을 제공하는 데 중점을 두고 있습니다. 앞으로의 개발 과정에서도 이 디자인 시스템을 기반으로 시각적 요소를 정의하고 개선해 나가야 합니다.
```