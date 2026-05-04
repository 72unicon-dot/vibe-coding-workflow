// ============================================================
// 바이브코딩 단계별 데모 - 시나리오 데이터 (11단계 워크플로우)
// ============================================================

const STAGES = [
  {
    id: 1,
    key: "idea",
    icon: "💡",
    title: "1단계 · 아이디어",
    subtitle: "어떤 앱을 만들 것인가?",
    color: "indigo",
    description: "앱의 기본 아이디어를 도출하는 단계입니다. 누구를 위해 어떤 문제를 해결할지 정의합니다.",
    teachingPoints: [
      "AI에게 '무엇을 만들지'를 명확히 전달하기 위한 출발점",
      "핵심 타겟 사용자와 그들이 겪는 문제에 집중하기"
    ],
    promptTemplate: `나는 [타겟 사용자]를 위한 [앱 종류]를 만들고 싶어.\n이들이 겪는 핵심 문제는 [문제]이고,\n해결책은 [해결책]이야.\n이 아이디어를 더 구체화해줄래?`,
    practice: "본인이 만들고 싶은 앱의 대상과 해결할 문제를 적어보세요.",
    hasPRD: false
  },
  {
    id: 2,
    key: "prd",
    icon: "📄",
    title: "2단계 · PRD.md",
    subtitle: "제품 요구사항 문서 작성",
    color: "purple",
    description: "아이디어를 구체적인 요구사항 문서(PRD)로 작성하여 AI와 팀원에게 공유할 기준을 만듭니다.",
    teachingPoints: [
      "MVP(최소기능제품) 사고: 핵심 기능 3개 이내로 좁히기",
      "성공 지표는 측정 가능해야 함 (예: 가입 후 7일 내 1회 사용)"
    ],
    promptTemplate: `위 아이디어를 바탕으로 마크다운 형식의 PRD.md(제품 요구사항 문서)를 작성해줘. MVP 핵심 기능 3가지와 측정 가능한 성공 지표를 명확히 포함해줘.`,
    practice: "아래 폼을 채워 나만의 PRD를 완성해보세요."
  },
  {
    id: 3,
    key: "user_flow",
    icon: "🔄",
    title: "3단계 · USER_FLOW.md",
    subtitle: "사용자 흐름 정의",
    color: "blue",
    description: "사용자가 앱에 접속해서 목표를 달성하기까지의 주요 이동 경로(흐름)를 정의합니다.",
    teachingPoints: [
      "사용자 여정을 단계별로 시각화하거나 텍스트로 나열하기",
      "예외 상황(로그인 실패 등)도 함께 고려하기"
    ],
    promptTemplate: `위 PRD 내용을 바탕으로 사용자가 앱의 핵심 기능을 사용하기까지의 흐름을 USER_FLOW.md로 작성해줘. 주요 화면 이름과 단계별 행동을 명확히 해줘.`,
    practice: "사용자가 첫 화면에서 핵심 기능을 쓰기까지의 클릭 순서를 적어보세요."
  },
  {
    id: 4,
    key: "ui_spec",
    icon: "🖥️",
    title: "4단계 · UI_SPEC.md",
    subtitle: "화면 명세서",
    color: "cyan",
    description: "USER_FLOW에 등장하는 각 화면에 어떤 UI 요소(버튼, 입력창 등)가 들어가야 하는지 구체적으로 명세합니다.",
    teachingPoints: [
      "화면별로 필요한 컴포넌트 목록 정리",
      "각 요소의 기능과 상태(활성/비활성) 정의"
    ],
    promptTemplate: `위 USER_FLOW를 바탕으로 각 화면의 상세 UI 명세(UI_SPEC.md)를 작성해줘. 컴포넌트(버튼, 입력창, 목록 등)의 배치를 목록화해줘.`,
    practice: "메인 화면에 들어가야 할 필수 버튼 3가지를 적어보세요."
  },
  {
    id: 5,
    key: "design_system",
    icon: "🎨",
    title: "5단계 · DESIGN_SYSTEM.md",
    subtitle: "디자인 규칙 정의",
    color: "pink",
    description: "앱 전체의 일관성을 유지하기 위한 디자인 시스템(색상, 폰트, 간격 등)을 정의합니다.",
    teachingPoints: [
      "브랜드 컬러와 서브 컬러 지정",
      "폰트 크기와 버튼 스타일 통일"
    ],
    promptTemplate: `위 UI_SPEC을 아름답게 구현하기 위한 DESIGN_SYSTEM.md를 작성해줘. 프리미엄 느낌의 색상(Primary, Secondary), 구글 폰트, 공통 UI 컴포넌트의 Tailwind CSS 클래스 규칙을 제안해줘.`,
    practice: "앱의 메인 테마 색상(예: 파란색, 초록색)을 결정해보세요."
  },
  {
    id: 6,
    key: "ai_ui_mockup",
    icon: "✨",
    title: "6단계 · AI UI 시안 생성",
    subtitle: "시각적 목업 생성",
    color: "amber",
    description: "지금까지 정의된 문서들을 바탕으로 AI가 실제 눈으로 볼 수 있는 HTML/Tailwind 기반 UI 시안을 생성합니다.",
    teachingPoints: [
      "문서를 기반으로 명확한 프롬프트 작성",
      "Tailwind CSS를 활용한 빠른 시각화"
    ],
    promptTemplate: `위 명세서들을 바탕으로 단일 HTML 파일로 구성된 최고 수준의 프론트엔드 UI 시안 코드를 작성해줘. 반드시 Tailwind CSS CDN을 사용하고 디자인 시스템의 규칙을 지켜줘.`,
    practice: "AI 직접 실행 후 생성된 UI 시안을 '앱 미리보기'로 확인해보세요."
  },
  {
    id: 7,
    key: "developer_approval",
    icon: "✅",
    title: "7단계 · 개발자 승인",
    subtitle: "로컬 개발 환경 및 폴더 구조 세팅",
    color: "emerald",
    description: "지금까지 생성된 문서를 바탕으로 실제 개발을 진행할 로컬 폴더 구조를 생성하고 초기 세팅을 진행합니다.",
    teachingPoints: [
      "체계적인 폴더 구조의 중요성",
      "명세서(문서)를 docs 폴더에 모아 관리하기"
    ],
    promptTemplate: `지금까지 작성된 모든 문서(md 파일)를 다운받았어. 이제 로컬 PC에서 개발을 시작하기 위해 아래와 같은 폴더 구조를 만들고 초기 세팅을 진행하는 터미널 명령어(스크립트)를 작성해줘.

my-app-project/
├── docs/
│   ├── 00_IDEA.md
│   ├── 01_PRD.md
│   ├── 02_USER_FLOW.md
│   ├── 03_UI_SPEC.md
│   ├── 04_TECH_SPEC.md
│   ├── 05_AGENT_INSTRUCTIONS.md
│   ├── 06_TEST_DEPLOY_MAINTENANCE.md
│   └── CHANGELOG.md
├── src/
├── public/
├── package.json
├── README.md
└── .env.example`,
    practice: "제안된 스크립트를 터미널에 복사 붙여넣기하여 실제 폴더를 만들어보세요."
  },
  {
    id: 8,
    key: "implementation",
    icon: "💻",
    title: "8단계 · 코드 구현",
    subtitle: "실제 기능 개발",
    color: "slate",
    description: "지금까지 작성된 2단계부터 6단계까지의 모든 문서(PRD, USER_FLOW, UI_SPEC 등)와 UI 시안을 바탕으로 실제 동작하는 앱의 코드를 구현합니다.",
    teachingPoints: [
      "이벤트 리스너 연결 및 상태 관리",
      "로컬 스토리지 또는 API 연동"
    ],
    promptTemplate: `지금까지 2단계부터 6단계까지 작성된 모든 명세서(PRD.md, USER_FLOW.md, UI_SPEC.md, DESIGN_SYSTEM.md)와 승인된 HTML UI 시안을 종합하여, 요구사항의 핵심 기능이 실제로 동작하는 프론트엔드 코드(HTML/CSS/JS)를 개발해줘. 데이터는 localStorage를 활용하고, 단일 HTML 파일로 실행 가능한 전체 코드를 제공해줘.`,
    practice: "어떤 버튼을 눌렀을 때 어떤 기능이 실행되어야 할지 연결지어보세요."
  },
  {
    id: 9,
    key: "test",
    icon: "🧪",
    title: "9단계 · 테스트",
    subtitle: "버그 확인 및 수정",
    color: "orange",
    description: "구현된 기능이 의도한 대로 동작하는지, 예외 상황에서 에러가 없는지 테스트합니다.",
    teachingPoints: [
      "기본 기능(Happy Path) 외의 예외 상황 체크",
      "콘솔 에러 확인"
    ],
    promptTemplate: `위 구현된 코드에서 발생할 수 있는 잠재적 버그 3가지와, 이를 예방/검증하기 위한 테스트 시나리오를 알려줘.`,
    practice: "아무것도 입력하지 않고 '추가' 버튼을 눌렀을 때 어떻게 되는지 확인해보세요."
  },
  {
    id: 10,
    key: "deployment",
    icon: "🚀",
    title: "10단계 · 배포",
    subtitle: "라이브 서버 업로드",
    color: "teal",
    description: "완성된 앱을 실제 사용자들이 접속할 수 있는 인터넷 URL로 배포합니다.",
    teachingPoints: [
      "GitHub 등에 코드 올리기",
      "Vercel, Netlify 등 무료 호스팅 서비스 활용"
    ],
    promptTemplate: `완성된 이 HTML/JS 웹앱을 Vercel 또는 Netlify에 무료로 배포하는 방법을 가장 쉬운 단계별 스크린샷 묘사와 함께 알려줘.`,
    practice: "Netlify Drop을 이용해 코드를 드래그 앤 드롭으로 배포해보세요."
  },
  {
    id: 11,
    key: "feedback",
    icon: "💬",
    title: "11단계 · 피드백 반영",
    subtitle: "사용자 의견 수렴 및 개선",
    color: "rose",
    description: "배포된 앱에 대한 사용자들의 피드백을 수집하고, 다음 버전(v1.1) 업데이트를 기획합니다.",
    teachingPoints: [
      "사용자 피드백 수집 채널 마련",
      "피드백 우선순위 설정"
    ],
    promptTemplate: `사용자들에게서 "다크모드가 있었으면 좋겠다", "로딩이 조금 느리다"는 피드백이 들어왔어. 이를 반영하기 위한 다음 업데이트(v1.1) 계획을 세워줘.`,
    practice: "친구에게 배포 URL을 공유하고 피드백을 1개 이상 받아보세요."
  }
];

// 미리 정의된 데모 시나리오 (강의 시연용 예시 앱)
const DEMO_SCENARIOS = [
  {
    id: "todo",
    name: "📝 할일 관리 앱",
    description: "초보자가 만들기 가장 좋은 입문용 예시",
    prdSample: {
      appName: "오늘의 할 일",
      oneLiner: "하루 3개만 적는 미니멀 투두 앱",
      targetUser: "일이 많은 20-40대 직장인/학생",
      problem: "할 일이 너무 많아 정작 중요한 일이 뭔지 흐려진다.",
      solution: "하루에 단 3개의 핵심 할 일만 등록하도록 강제하여 집중력을 높인다.",
      features: "1. 할 일 추가/완료/삭제 (1일 3개 제한)\n2. 오늘의 할 일 자동 분류 (어제·오늘·내일)\n3. 주간 완료율 시각화 (진행률 바)",
      successKpi: "가입 후 7일 내 5회 이상 등록한 사용자 비율 30% 이상",
      constraint: "무료 호스팅(Vercel), 1인 개발, 2주 내 MVP 출시"
    },
    outputs: {
      idea: {
        title: "아이디어 스케치",
        content: `**핵심 아이디어**: "할 일 목록이 넘쳐나서 포기하는 사람들을 위한, 하루 딱 3개만 등록하는 투두 앱"`
      },
      prd: {
        title: "PRD.md",
        content: `**앱 이름**: 오늘의 할 일\n**타겟 사용자**: 직장인 / 학생 (20-40대)\n**핵심 기능**: 1. 일일 3개 제한 할일 등록, 2. 완료 체크, 3. 진행률 바`
      },
      user_flow: {
        title: "USER_FLOW.md",
        content: `1. 사용자가 앱에 접속한다.\n2. 메인 화면에서 빈 입력창을 확인한다.\n3. 할 일을 입력하고 추가 버튼을 누른다.\n4. 리스트에 항목이 추가되고, 하루 3개 초과 시 '더 이상 추가할 수 없습니다' 알림이 뜬다.\n5. 항목 앞의 체크박스를 누르면 완료선(취소선)이 그어진다.`
      },
      ui_spec: {
        title: "UI_SPEC.md",
        content: `**[메인 화면]**\n- 상단 타이틀: "오늘의 할 일 (0/3)"\n- 입력 폼: 텍스트 입력 필드 + '추가' 버튼\n- 리스트 영역: 각 항목별 체크박스, 텍스트, 삭제 아이콘\n- 하단 진행률 바: 0%~100% 게이지 시각화`
      },
      design_system: {
        title: "DESIGN_SYSTEM.md",
        content: `**Primary Color**: #4F46E5 (Indigo 600)\n**Background**: #F8FAFC (Slate 50)\n**Typography**: Noto Sans KR, 본문 16px\n**Card Style**: 흰색 배경, rounded-xl, shadow-sm`
      },
      ai_ui_mockup: {
        title: "AI UI 시안 (HTML)",
        content: `<!-- 완성된 Tailwind HTML 시안 코드가 여기에 생성됩니다 -->\n<div class="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-10">...</div>`
      },
      developer_approval: {
        title: "개발자 승인 및 세팅",
        content: `**생성된 스크립트 실행 완료**: my-todo-app 폴더가 생성되었고, docs 디렉토리 내에 명세서들이 저장되었습니다.`
      },
      implementation: {
        title: "코드 구현 로직",
        content: `// 로컬 스토리지 기반 추가 로직\nfunction addTask(text) {\n  const tasks = JSON.parse(localStorage.getItem('tasks')||'[]');\n  if(tasks.length >= 3) return alert('하루 3개까지만 가능!');\n  tasks.push({id: Date.now(), text, done: false});\n  localStorage.setItem('tasks', JSON.stringify(tasks));\n  render();\n}`
      },
      test: {
        title: "테스트 결과",
        content: `**테스트 케이스 1**: 4번째 할 일 입력 시도\n**결과**: 경고창 정상 출력됨 (Pass)\n**버그 리포트**: 띄어쓰기만 입력해도 등록되는 버그 발견 -> trim() 처리로 수정 완료.`
      },
      deployment: {
        title: "배포 결과물",
        content: `**Vercel 배포 완료!**\nURL: https://my-todo-3-tasks.vercel.app\nGitHub 저장소 연동으로 자동 배포 구성 완료.`
      },
      feedback: {
        title: "피드백 반영",
        content: `**수집된 피드백**: "어제 못 끝낸 일을 오늘로 넘기는 기능이 필요해요."\n**v1.1 업데이트 계획**: '이월하기' 스와이프 액션 추가 기획 진행.`
      }
    }
  }
];

