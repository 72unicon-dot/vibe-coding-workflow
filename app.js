// ============================================================
// 바이브코딩 단계별 데모 - 메인 앱 로직
// ============================================================

const state = {
  currentStage: 0,         // 0~10 (11단계)
  scenarioId: null,        // 선택된 데모 시나리오 ID
  userInputs: {},          // 사용자가 직접 입력한 값 (단계별)
  userPrompts: {},         // 사용자가 수정한 프롬프트
  aiResults: {},           // AI 실행 결과
  aiLoading: false,        // AI 로딩 상태
  completed: new Set(),    // 완료한 단계
  mode: "demo",            // "demo" or "input"
  autoRelay: true          // 자동 릴레이 활성화 여부
};

// ============================================================
// 에이전트 페르소나 (시스템 프롬프트) 정의
// ============================================================
const SYSTEM_ROLES = {
  0: "당신은 혁신적인 앱 아이디어를 발굴하고 구체화하는 전문 Product Planner입니다.",
  1: "당신은 비즈니스 요구사항을 명확히 분석하고 MVP 범위를 설정하는 전문 Business Analyst입니다.",
  2: "당신은 사용자의 경험을 설계하고 최적의 동선을 구축하는 UX Architect입니다.",
  3: "당신은 각 화면의 구성 요소와 인터랙션을 상세히 명세하는 UI Designer입니다.",
  4: "당신은 브랜드의 일관성을 유지하기 위해 디자인 원칙과 Tailwind CSS 토큰을 정립하는 Design Ops 전문가입니다.",
  5: "당신은 기획 내용을 바탕으로 상용 앱 수준의 프리미엄 UI 시안을 코딩하는 전문 UI/UX Artist입니다.",
  6: "당신은 프로젝트의 표준 구조를 설계하고 개발 환경을 최적화하는 DevOps Engineer입니다.",
  7: "당신은 디자인 시스템을 100% 준수하며 유지보수가 용이한 코드를 작성하는 Senior Full-stack Developer입니다. 데이터는 반드시 localStorage를 활용하며 단일 파일로 동작하게 만드세요.",
  8: "당신은 앱의 예외 상황을 진단하고 안정성을 검증하는 QA Engineer입니다.",
  9: "당신은 완성된 앱을 가장 효율적으로 세상에 배포하는 Cloud Infrastructure Engineer입니다.",
  10: "당신은 사용자 피드백을 분석하여 서비스의 지속적인 성장을 이끄는 Product Manager입니다."
};

// ============================================================
// 초기화
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  renderStepNav();
  renderStage();
  bindGlobalEvents();
});

function bindGlobalEvents() {
  document.getElementById("prevBtn").addEventListener("click", goPrev);
  document.getElementById("nextBtn").addEventListener("click", goNext);
  document.getElementById("resetBtn").addEventListener("click", resetAll);
  document.getElementById("demoModeBtn").addEventListener("click", setDemoMode);
  document.getElementById("directModeBtn").addEventListener("click", setDirectMode);
  
  const apiSettingsBtn = document.getElementById("apiSettingsBtn");
  if (apiSettingsBtn) apiSettingsBtn.addEventListener("click", openApiModal);
  
  const closeApiModalBtn = document.getElementById("closeApiModalBtn");
  if (closeApiModalBtn) closeApiModalBtn.addEventListener("click", closeApiModal);
  
  const cancelApiModalBtn = document.getElementById("cancelApiModalBtn");
  if (cancelApiModalBtn) cancelApiModalBtn.addEventListener("click", closeApiModal);
  
  const saveApiModalBtn = document.getElementById("saveApiModalBtn");
  if (saveApiModalBtn) saveApiModalBtn.addEventListener("click", saveApiKey);

  const closePreviewModalBtn = document.getElementById("closePreviewModalBtn");
  if (closePreviewModalBtn) {
    closePreviewModalBtn.addEventListener("click", () => {
      document.getElementById("previewModal").classList.add("hidden");
      document.getElementById("previewIframe").srcdoc = ""; // 메모리 정리
    });
  }

  const batchDownloadOpenBtn = document.getElementById("batchDownloadOpenBtn");
  if (batchDownloadOpenBtn) batchDownloadOpenBtn.addEventListener("click", openBatchDownloadModal);

  const closeBatchDownloadModalBtn = document.getElementById("closeBatchDownloadModalBtn");
  if (closeBatchDownloadModalBtn) closeBatchDownloadModalBtn.addEventListener("click", closeBatchDownloadModal);

  const executeBatchDownloadBtn = document.getElementById("executeBatchDownloadBtn");
  if (executeBatchDownloadBtn) executeBatchDownloadBtn.addEventListener("click", executeBatchDownload);

  const toggleAutoRelayBtn = document.getElementById("toggleAutoRelayBtn");
  if (toggleAutoRelayBtn) {
    toggleAutoRelayBtn.addEventListener("click", () => {
      state.autoRelay = !state.autoRelay;
      updateAutoRelayUI();
      showToast(`자동 릴레이가 ${state.autoRelay ? '활성화' : '비활성화'}되었습니다.`);
      renderStage(); // 리렌더링하여 배지 업데이트
    });
  }
}

function updateAutoRelayUI() {
  const btn = document.getElementById("toggleAutoRelayBtn");
  const icon = document.getElementById("autoRelayStatusIcon");
  if (btn && icon) {
    if (state.autoRelay) {
      btn.className = "text-sm px-3 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition flex items-center gap-1 font-semibold";
      btn.innerHTML = `<span id="autoRelayStatusIcon">🟢</span> 자동 릴레이: ON`;
    } else {
      btn.className = "text-sm px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-500 hover:bg-slate-100 transition flex items-center gap-1 font-semibold";
      btn.innerHTML = `<span id="autoRelayStatusIcon">⚪</span> 자동 릴레이: OFF`;
    }
  }
}

// ============================================================
// 좌측 단계 네비게이션
// ============================================================
function renderStepNav() {
  const nav = document.getElementById("stepNav");
  nav.innerHTML = STAGES.map((s, idx) => {
    const isActive = idx === state.currentStage;
    const isDone = state.completed.has(idx);
    const baseCls = "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition cursor-pointer";
    const stateCls = isActive
      ? "bg-indigo-100 text-indigo-900 font-semibold border border-indigo-300"
      : isDone
      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
      : "text-slate-600 hover:bg-slate-100";

    return `
      <div class="${baseCls} ${stateCls}" data-step="${idx}">
        <span class="text-lg">${s.icon}</span>
        <div class="flex-1 min-w-0">
          <div class="truncate">${s.title}</div>
        </div>
        ${isDone ? '<span class="text-emerald-500">✓</span>' : ''}
      </div>
    `;
  }).join("");

  nav.querySelectorAll("[data-step]").forEach(el => {
    el.addEventListener("click", () => {
      state.currentStage = parseInt(el.dataset.step);
      renderStage();
      renderStepNav();
    });
  });

  // 현재 시나리오 박스
  const scenarioBox = document.getElementById("currentScenarioBox");
  if (state.scenarioId) {
    const sc = DEMO_SCENARIOS.find(s => s.id === state.scenarioId);
    scenarioBox.innerHTML = `<strong>${sc.name}</strong><br/><span class="text-slate-500">${sc.description}</span>`;
  } else {
    scenarioBox.innerHTML = '<span class="text-slate-400">시나리오 선택 시 자동 반영됩니다</span>';
  }
}

// ============================================================
// 진행률 바
// ============================================================
function updateProgress() {
  const total = STAGES.length;
  const done = state.completed.size;
  const percent = Math.round((done / total) * 100);
  document.getElementById("progressBar").style.width = `${percent}%`;
  document.getElementById("progressLabel").textContent = `${done} / ${total} 단계`;
  document.getElementById("progressPercent").textContent = `${percent}%`;
}

// ============================================================
// 메인 단계 렌더링
// ============================================================
function renderStage() {
  const stage = STAGES[state.currentStage];
  const container = document.getElementById("stageContent");

  // 현재 데모 시나리오의 결과물
  const scenario = state.scenarioId ? DEMO_SCENARIOS.find(s => s.id === state.scenarioId) : null;
  const output = scenario ? scenario.outputs[stage.key] : null;

  container.innerHTML = `
    <div class="p-8 lg:p-10">

      <!-- 헤더 -->
      <div class="mb-6 pb-6 border-b border-slate-200">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-4xl">${stage.icon}</span>
          <div>
            <h2 class="text-2xl font-bold text-slate-900">${stage.title}</h2>
            <p class="text-sm text-slate-500 mt-0.5">${stage.subtitle}</p>
          </div>
        </div>
        <p class="text-slate-700 mt-3 leading-relaxed">${stage.description}</p>
      </div>

      <!-- 에이전트 페르소나 표시 -->
      <div class="mb-6 bg-indigo-900 text-indigo-100 rounded-xl p-4 flex items-center gap-4 shadow-lg border border-indigo-700">
        <div class="bg-indigo-700 p-3 rounded-full text-2xl">🤖</div>
        <div>
          <div class="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-0.5">Active Agent Persona</div>
          <div class="text-sm font-semibold">${SYSTEM_ROLES[state.currentStage] || "바이브코딩 AI 에이전트"}</div>
        </div>
        ${state.autoRelay ? `
          <div class="ml-auto flex items-center gap-2 bg-indigo-800 px-3 py-1.5 rounded-lg border border-indigo-600">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span class="text-[10px] font-bold">AUTO-RELAY ACTIVE</span>
          </div>
        ` : ''}
      </div>

      <!-- 강의 포인트 -->
      <div class="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h3 class="font-bold text-amber-900 mb-3 flex items-center gap-2">
          <span>📌</span> 강의 핵심 포인트
        </h3>
        <ul class="space-y-2">
          ${stage.teachingPoints.map(p => `
            <li class="flex gap-2 text-sm text-amber-900">
              <span class="text-amber-500 mt-0.5">▸</span>
              <span>${p}</span>
            </li>
          `).join("")}
        </ul>
      </div>
      
      <!-- 프롬프트 템플릿 -->
      <div class="mb-6">
        <h3 class="font-bold text-slate-900 mb-2 flex items-center gap-2">
          <span>💬</span> AI 프롬프트 템플릿
        </h3>
        <textarea id="promptTextarea" class="w-full bg-slate-900 text-slate-100 rounded-xl p-5 font-mono text-sm whitespace-pre-wrap leading-relaxed shadow-inner resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[480px]">${escapeHtml(state.userPrompts[state.currentStage] !== undefined ? state.userPrompts[state.currentStage] : stage.promptTemplate)}</textarea>
        <div class="mt-2 flex gap-2">
          
          <button onclick="copyToClipboard(document.getElementById('promptTextarea').value)"
            class="text-xs px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 transition">
            📋 프롬프트 복사
          </button>
          <button id="executeAIBtn" class="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition flex items-center gap-1 disabled:opacity-50" ${state.aiLoading ? 'disabled' : ''}>
            🚀 직접 시행
          </button>
          ${state.currentStage === 5 ? `
            <button id="generateUIMockupBtn" class="text-xs px-3 py-1.5 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 transition font-semibold flex items-center gap-1 shadow-sm">
              🎨 AI 시안 자동 생성
            </button>
            <button id="previewAppBtn" class="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition font-semibold flex items-center gap-1 shadow-md">
              👁️ 시안 미리보기
            </button>
          ` : ''}
          ${state.currentStage === 7 ? `
            <button id="previewAppBtn" class="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition font-semibold flex items-center gap-1 shadow-md">
              👁️ 코드 구현 앱 미리보기
            </button>
          ` : ''}
        </div>
      </div>

      <!-- AI 실행 결과 -->
      ${state.aiLoading ? `
        <div class="mb-6">
          <h3 class="font-bold text-slate-900 mb-2 flex items-center gap-2"><span>🤖</span> AI 실행 결과</h3>
          <div class="bg-indigo-50 border border-indigo-200 rounded-xl p-8 flex flex-col items-center justify-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-3"></div>
            <p class="text-sm text-indigo-800">AI가 응답을 생성 중입니다...</p>
          </div>
        </div>
      ` : state.aiResults[state.currentStage] ? `
        <div class="mb-6">
          <h3 class="font-bold text-slate-900 mb-2 flex items-center gap-2"><span>🤖</span> AI 실행 결과</h3>
          <div class="bg-white border-2 border-indigo-200 rounded-xl p-6 shadow-sm overflow-x-auto">
            <div class="prose prose-sm max-w-none text-slate-800">
              ${marked.parse(state.aiResults[state.currentStage])}
            </div>
            <div class="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
              <button id="downloadMdBtn" class="text-xs px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition flex items-center gap-1">
                💾 MD 다운로드
              </button>

              ${state.currentStage < STAGES.length - 1 ? `
                <button id="sendToNextStageBtn" class="text-xs px-4 py-2 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition font-semibold flex items-center gap-1">
                  ➡️ 다음 단계(${STAGES[state.currentStage + 1].title.split('·')[0].trim()}) 프롬프트로 보내기
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      ` : ''}

      <!-- 데모 결과물 (시나리오 선택된 경우) -->
      ${output ? `
        <div class="mb-6">
          <h3 class="font-bold text-slate-900 mb-2 flex items-center gap-2">
            <span>✨</span> 예시 결과물 — ${output.title}
          </h3>
          <div class="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-5">
            <pre class="whitespace-pre-wrap text-sm text-slate-800 leading-relaxed font-sans">${escapeHtml(output.content)}</pre>
          </div>
        </div>
      ` : ''}

      <!-- 실습 과제 -->
      <div class="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-5">
        <h3 class="font-bold text-emerald-900 mb-2 flex items-center gap-2">
          <span>✏️</span> 학습자 실습 과제
        </h3>
        <p class="text-sm text-emerald-900 leading-relaxed">${stage.practice}</p>
      </div>

      <!-- 단계 완료 체크 -->
      <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
        <label class="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
          <input type="checkbox" id="stageCompleteCheck" ${state.completed.has(state.currentStage) ? 'checked' : ''}
            class="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
          <span>이 단계를 학습 완료했어요</span>
        </label>
      </div>
    </div>
  `;

  // 체크박스 이벤트
  const cb = document.getElementById("stageCompleteCheck");
  if (cb) {
    cb.addEventListener("change", (e) => {
      if (e.target.checked) state.completed.add(state.currentStage);
      else state.completed.delete(state.currentStage);
      updateProgress();
      renderStepNav();
    });
  }

  // 프롬프트 수정 이벤트
  const promptTextarea = document.getElementById("promptTextarea");
  if (promptTextarea) {
    promptTextarea.addEventListener("input", (e) => {
      state.userPrompts[state.currentStage] = e.target.value;
    });
  }

  // 직접 시행 버튼 이벤트
  const executeAIBtn = document.getElementById("executeAIBtn");
  if (executeAIBtn) {
    executeAIBtn.addEventListener("click", executeAI);
  }

  // MD 다운로드 버튼 이벤트
  const downloadMdBtn = document.getElementById("downloadMdBtn");
  if (downloadMdBtn) {
    downloadMdBtn.addEventListener("click", () => {
      let content = state.aiResults[state.currentStage];
      let appName = "VibeApp";
      if (state.scenarioId) {
        const sc = DEMO_SCENARIOS.find(s => s.id === state.scenarioId);
        if (sc) appName = sc.name.replace(/[^a-zA-Z0-9가-힣]/g, '').trim() || "VibeApp";
      }
      const stage = STAGES[state.currentStage];
      const keyDisplay = {
        idea: 'idea', prd: 'PRD', user_flow: 'USER_Flow', ui_spec: 'UI_Spec',
        design_system: 'Design_System', ai_ui_mockup: 'AI_UI_Mockup', developer_approval: 'Developer_Approval',
        implementation: 'Implementation', test: 'Test', deployment: 'Deployment', feedback: 'Feedback'
      };
      const stageName = keyDisplay[stage.key] || stage.key;
      const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${appName}_${state.currentStage + 1}_${stageName}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast("MD 파일이 다운로드 되었습니다.");
    });
  }

  // 다음 단계로 보내기 버튼 이벤트
  const sendToNextStageBtn = document.getElementById("sendToNextStageBtn");
  if (sendToNextStageBtn) {
    sendToNextStageBtn.addEventListener("click", () => {
      let content = "";
      const scenario = state.scenarioId ? DEMO_SCENARIOS.find(s => s.id === state.scenarioId) : null;
      
      for (let i = 0; i <= state.currentStage; i++) {
        const stageKey = STAGES[i].key;
        const resultText = state.aiResults[i] || (scenario && scenario.outputs[stageKey] ? scenario.outputs[stageKey].content : null);
        
        if (resultText) {
          content += `\n[${STAGES[i].title.split('·')[1].trim()}]\n${resultText}\n`;
        }
      }
      
      const nextStageIdx = state.currentStage + 1;
      const nextStage = STAGES[nextStageIdx];
      
      let nextPrompt = state.userPrompts[nextStageIdx] !== undefined 
        ? state.userPrompts[nextStageIdx] 
        : nextStage.promptTemplate;
        
      const combinedPrompt = `[이전 단계 결과 참고]\n${content}\n---\n\n${nextPrompt}`;
      state.userPrompts[nextStageIdx] = combinedPrompt;
      
      goNext();
      showToast("결과가 다음 단계 프롬프트에 추가되었습니다!");
    });
  }

  // UI 시안 자동 생성 버튼 이벤트
  const generateUIMockupBtn = document.getElementById("generateUIMockupBtn");
  if (generateUIMockupBtn) {
    generateUIMockupBtn.addEventListener("click", generateUIMockup);
  }



  // 앱 미리보기 이벤트 (3단계 전용)
  const previewAppBtn = document.getElementById("previewAppBtn");
  if (previewAppBtn) {
    previewAppBtn.addEventListener("click", () => {
      const content = state.aiResults[state.currentStage] || "";
      let html = extractCodeBlock(content, 'html');
      let css = extractCodeBlock(content, 'css');
      let js = extractCodeBlock(content, 'javascript') || extractCodeBlock(content, 'js');

      // 단일 파일로 뭉쳐진 경우 처리 (HTML 내부에 style, script가 이미 존재할 수 있음)
      if (!html && content.toLowerCase().includes('<html')) {
        const match = content.match(/<html[\s\S]*<\/html>/i);
        if (match) html = match[0];
      }

      if (!html) {
        showToast("렌더링할 HTML 코드를 찾을 수 없습니다.");
        return;
      }

      // 조합
      let finalHtml = html;
      if (css && !finalHtml.includes(css)) {
        if (finalHtml.includes('</head>')) {
          finalHtml = finalHtml.replace('</head>', `<style>\n${css}\n</style>\n</head>`);
        } else {
          finalHtml = `<style>\n${css}\n</style>\n${finalHtml}`;
        }
      }
      if (js && !finalHtml.includes(js)) {
        if (finalHtml.includes('</body>')) {
          finalHtml = finalHtml.replace('</body>', `<script>\n${js}\n</script>\n</body>`);
        } else {
          finalHtml += `\n<script>\n${js}\n</script>`;
        }
      }

      const iframe = document.getElementById("previewIframe");
      iframe.srcdoc = finalHtml;
      document.getElementById("previewModal").classList.remove("hidden");
    });
  }
  // 이전/다음 버튼 활성화
  document.getElementById("prevBtn").disabled = state.currentStage === 0;
  document.getElementById("nextBtn").textContent =
    state.currentStage === STAGES.length - 1 ? "🎉 학습 완료" : "다음 단계 →";

  updateProgress();
}

// ============================================================
// 네비게이션
// ============================================================
function goPrev() {
  if (state.currentStage > 0) {
    state.currentStage--;
    renderStage();
    renderStepNav();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function goNext() {
  // 현재 단계 자동 완료 처리
  state.completed.add(state.currentStage);

  if (state.currentStage < STAGES.length - 1) {
    state.currentStage++;
    renderStage();
    renderStepNav();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    showCompletionModal();
  }
}

function resetAll() {
  if (!confirm("학습 진행 상황을 모두 초기화할까요?")) return;
  state.currentStage = 0;
  state.scenarioId = null;
  state.userInputs = {};
  state.completed.clear();
  renderStage();
  renderStepNav();
}

function setDemoMode() {
  state.mode = "demo";
  state.scenarioId = "todo"; // 데모 모드 클릭 시 바로 할일 관리 앱 시나리오 적용
  renderStage();
  renderStepNav();
  showToast("데모 모드로 설정되었습니다.");
}

function setDirectMode() {
  state.mode = "input";
  state.scenarioId = null; // 직접 입력 모드 시 시나리오 해제
  renderStage();
  renderStepNav();
  showToast("직접 입력 모드로 설정되었습니다.");
}

// ============================================================
// API 및 직접 시행 모달 로직
// ============================================================
function openApiModal() {
  const key = localStorage.getItem("openai_api_key") || "";
  document.getElementById("apiKeyInput").value = key;
  document.getElementById("apiModal").classList.remove("hidden");
}

function closeApiModal() {
  document.getElementById("apiModal").classList.add("hidden");
}

function saveApiKey() {
  const key = document.getElementById("apiKeyInput").value.trim();
  if (key) {
    localStorage.setItem("openai_api_key", key);
    showToast("API 키가 저장되었습니다.");
  } else {
    localStorage.removeItem("openai_api_key");
    showToast("API 키가 삭제되었습니다.");
  }
  closeApiModal();
}

async function executeAI(customPrompt) {
  const apiKey = localStorage.getItem("openai_api_key");
  if (!apiKey) {
    showToast("OpenAI API 키가 필요합니다. 상단의 API 설정을 확인해주세요.");
    openApiModal();
    return;
  }
  
  

  let prompt = "";
  if (typeof customPrompt === 'string') {
    prompt = customPrompt;
  } else {
    const textarea = document.getElementById("promptTextarea");
    if (textarea) prompt = textarea.value.trim();
  }

  if (!prompt) {
    showToast("프롬프트를 입력해주세요.");
    return;
  }

  state.aiLoading = true;
  renderStage(); // Show loading UI

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // 가볍고 빠른 모델 기본 사용
        messages: [
          { role: "system", content: SYSTEM_ROLES[state.currentStage] || "당신은 바이브코딩 전문가입니다." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "API 호출 실패");
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    state.aiResults[state.currentStage] = content;
    
    // 자동 릴레이 수행
    if (state.autoRelay && state.currentStage < STAGES.length - 1) {
      setTimeout(() => {
        autoRelayToNextStage();
      }, 1000);
    }
  } catch (error) {
    console.error("OpenAI Error:", error);
    alert(`AI 실행 중 오류가 발생했습니다:\n${error.message}`);
  } finally {
    state.aiLoading = false;
    renderStage();
  }
}

async function generateUIMockup() {
  const apiKey = localStorage.getItem("openai_api_key");
  if (!apiKey) {
    showToast("OpenAI API 키가 필요합니다. 상단의 API 설정을 확인해주세요.");
    openApiModal();
    return;
  }

  const scenario = state.scenarioId ? DEMO_SCENARIOS.find(s => s.id === state.scenarioId) : null;
  const prdContent = state.aiResults[1] || (scenario ? scenario.outputs.prd.content : "");
  const userFlow = state.aiResults[2] || (scenario ? scenario.outputs.user_flow.content : "");
  const uiSpec = state.aiResults[3] || (scenario ? scenario.outputs.ui_spec.content : "");
  const designSystem = state.aiResults[4] || (scenario ? scenario.outputs.design_system.content : "");

  if (!uiSpec || !designSystem) {
    showToast("이전 단계(UI_SPEC, DESIGN_SYSTEM) 결과가 부족합니다. 앞 단계를 먼저 시행해주세요.");
    return;
  }

  const prompt = `너는 세계 최고 수준의 프론트엔드 UI/UX 디자이너이자 프로그래머야. 
다음은 우리가 기획한 앱의 명세서들이야.

[PRD]
${prdContent}

[USER FLOW]
${userFlow}

[UI SPEC]
${uiSpec}

[DESIGN SYSTEM]
${designSystem}

위 내용을 바탕으로 'UI 시안 검토' 페이지를 단일 HTML 파일로 작성해줘.
반드시 Tailwind CSS(CDN)를 사용해서 **상용 앱 수준의 매우 세련되고 현대적인 프리미엄 디자인(Dribbble 스타일)**을 만들어야 해.

[디자인 필수 규칙]
1. 화면은 좌우 2단으로 구성해:
   - 왼쪽 영역: 앱 이름, 한 줄 소개, 주요 화면 목록을 트렌디한 카드나 리스트 형태로 구성해.
   - 오른쪽 영역: 애플 공식 아이폰 스타일의 정교한 모바일 프레임(목업)을 CSS로 그리고, 그 안에 첫 번째 메인 화면(홈 화면)의 실제 UI를 밀도 있게 구현해.
2. 모바일 UI 디테일:
   - 폰트어썸(FontAwesome)이나 CDN 기반 아이콘을 반드시 사용해.
   - 상단 상태바 (시간, 배터리 등) 및 하단 네비게이션 바(아이콘 메뉴)를 반드시 포함해.
   - 위젯, 할 일 목록, 카드 등을 Glassmorphism(유리 질감), 부드러운 그라데이션, 고품질 그림자(shadow-lg, shadow-xl, hover 효과)를 사용해 디자인할 것.
   - 촌스러운 흑백이나 원색은 절대 피하고, 트렌디한 컬러 팔레트(예: 부드러운 그린, 블루그레이, 파스텔톤 등)를 적용할 것.
3. 폰트: 구글 폰트(Inter 또는 Noto Sans KR)를 CDN으로 불러와 전체 페이지에 적용할 것.

결과는 반드시 \`\`\`html 코드 블록 안에 완성된 단일 HTML 코드로만 응답해줘. 다른 설명은 생략해.`;

  // UI 로딩 표시
  const btn = document.getElementById("generateUIMockupBtn");
  const originalText = btn.innerHTML;
  btn.innerHTML = `<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-rose-700"></div> 생성 중...`;
  btn.disabled = true;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o", // UI 코딩은 시각적 이해도가 높은 모델 권장
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "API 호출 실패");
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    let html = extractCodeBlock(content, 'html');
    if (!html && content.toLowerCase().includes('<html')) {
      const match = content.match(/<html[\s\S]*<\/html>/i);
      if (match) html = match[0];
    }

    if (!html) {
      showToast("렌더링할 HTML 코드를 찾을 수 없습니다.");
      return;
    }

    const iframe = document.getElementById("previewIframe");
    iframe.srcdoc = html;
    document.getElementById("previewModal").classList.remove("hidden");
    
    // 시안을 상태에 저장하여 다음 단계로 넘길 수 있도록 함
    state.aiResults[5] = html;
    showToast("프리미엄 UI 시안이 생성되었습니다!");

    // 자동 릴레이 수행
    if (state.autoRelay) {
      setTimeout(() => {
        autoRelayToNextStage();
      }, 1500);
    }
    
  } catch (error) {
    console.error("OpenAI Error:", error);
    alert(`UI 시안 생성 중 오류가 발생했습니다:\\n${error.message}`);
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

/**
 * [자동화 기능] 현재 결과를 다음 단계의 프롬프트로 자동 전송하고 이동합니다.
 */
function autoRelayToNextStage() {
  let content = "";
  const scenario = state.scenarioId ? DEMO_SCENARIOS.find(s => s.id === state.scenarioId) : null;
  
  // 현재 단계까지의 모든 결과를 모음 (문맥 유지)
  for (let i = 0; i <= state.currentStage; i++) {
    const stageKey = STAGES[i].key;
    const resultText = state.aiResults[i] || (scenario && scenario.outputs[stageKey] ? scenario.outputs[stageKey].content : null);
    
    if (resultText) {
      content += `\n### [${STAGES[i].title.split('·')[1].trim()}]\n${resultText}\n`;
    }
  }
  
  const nextStageIdx = state.currentStage + 1;
  if (nextStageIdx >= STAGES.length) return;

  const nextStage = STAGES[nextStageIdx];
  
  let nextPrompt = state.userPrompts[nextStageIdx] !== undefined 
    ? state.userPrompts[nextStageIdx] 
    : nextStage.promptTemplate;
    
  const combinedPrompt = `[이전 단계의 전체 기획 맥락]\n${content}\n---\n\n위 내용을 바탕으로 다음 단계를 수행해줘:\n${nextPrompt}`;
  state.userPrompts[nextStageIdx] = combinedPrompt;
  
  goNext();
  showToast("에이전트가 다음 단계를 위해 문맥을 분석 중입니다...");
}



// ============================================================
// 학습 완료 모달
// ============================================================
function showCompletionModal() {
  const overlay = document.createElement("div");
  overlay.className = "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6";
  overlay.innerHTML = `
    <div class="bg-white rounded-2xl p-8 max-w-md text-center shadow-2xl">
      <div class="text-6xl mb-4">🎉</div>
      <h2 class="text-2xl font-bold text-slate-900 mb-2">학습 완료!</h2>
      <p class="text-slate-600 mb-6 leading-relaxed">
        바이브코딩 11단계 전 과정을 마쳤습니다.<br/>
        이제 본인의 앱 아이디어로 직접 도전해보세요!
      </p>
      <button onclick="this.closest('.fixed').remove()"
        class="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">
        닫기
      </button>
    </div>
  `;
  document.body.appendChild(overlay);
  state.completed.add(state.currentStage);
  updateProgress();
  renderStepNav();
}

// ============================================================
// 유틸
// ============================================================
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeJs(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

function extractCodeBlock(markdown, lang) {
  const regex = new RegExp(`\`\`\`${lang}\\n([\\s\\S]*?)\`\`\``, 'i');
  const match = markdown.match(regex);
  return match ? match[1] : null;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("프롬프트가 복사됐어요! AI에게 붙여넣어 보세요.");
  });
}

function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl z-50 text-sm";
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// ============================================================
// 일괄 다운로드 모달 로직
// ============================================================
function openBatchDownloadModal() {
  const listContainer = document.getElementById("batchDownloadList");
  const scenario = state.scenarioId ? DEMO_SCENARIOS.find(s => s.id === state.scenarioId) : null;
  
  let html = '';
  let hasItems = false;
  
  STAGES.forEach((stage, idx) => {
    const aiContent = state.aiResults[idx];
    const demoContent = scenario && scenario.outputs[stage.key] ? scenario.outputs[stage.key].content : null;
    const content = aiContent || demoContent;
    
    if (content) {
      hasItems = true;
      const isHtml = idx === 5 || idx === 7; // AI UI 시안 생성, 코드 구현
      const ext = isHtml ? 'html' : 'md';
      
      html += `
        <label class="flex items-center gap-3 p-3 border border-slate-200 rounded-xl mb-2 hover:bg-slate-50 cursor-pointer transition">
          <input type="checkbox" value="${idx}" class="batch-dl-checkbox w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" checked />
          <div class="flex-1">
            <div class="font-semibold text-slate-800 text-sm">${idx + 1}단계: ${stage.title.split('·')[1] ? stage.title.split('·')[1].trim() : stage.title}</div>
            <div class="text-xs text-slate-500 mt-0.5">.${ext} 파일</div>
          </div>
        </label>
      `;
    }
  });
  
  if (!hasItems) {
    html = `<div class="text-center py-6 text-slate-500 text-sm">아직 생성되거나 선택된 데모 결과물이 없습니다.</div>`;
    document.getElementById("executeBatchDownloadBtn").disabled = true;
  } else {
    document.getElementById("executeBatchDownloadBtn").disabled = false;
  }
  
  listContainer.innerHTML = html;
  document.getElementById("batchDownloadModal").classList.remove("hidden");
}

function closeBatchDownloadModal() {
  document.getElementById("batchDownloadModal").classList.add("hidden");
}

async function executeBatchDownload() {
  const checkboxes = document.querySelectorAll('.batch-dl-checkbox:checked');
  if (checkboxes.length === 0) {
    showToast("다운로드할 항목을 선택해주세요.");
    return;
  }
  
  const scenario = state.scenarioId ? DEMO_SCENARIOS.find(s => s.id === state.scenarioId) : null;
  
  // 브라우저 팝업 차단을 피하기 위해 순차적으로 약간의 지연시간을 두고 다운로드
  for (let i = 0; i < checkboxes.length; i++) {
    const idx = parseInt(checkboxes[i].value);
    const stage = STAGES[idx];
    
    const aiContent = state.aiResults[idx];
    const demoContent = scenario && scenario.outputs[stage.key] ? scenario.outputs[stage.key].content : null;
    let content = aiContent || demoContent;
    
    const isHtml = idx === 5 || idx === 7; 
    let ext = isHtml ? 'html' : 'md';
    let mimeType = isHtml ? 'text/html' : 'text/markdown';
    
    if (isHtml) {
        // extractCodeBlock이 있으면 html 코드블록 추출, 없으면 전체 사용
        const extracted = extractCodeBlock(content, 'html');
        if (extracted) {
            content = extracted;
        } else if (content.toLowerCase().includes('<html')) {
            const match = content.match(/<html[\s\S]*<\/html>/i);
            if (match) content = match[0];
        }
    }
    
    let appName = "VibeApp";
    if (state.scenarioId) {
      const sc = DEMO_SCENARIOS.find(s => s.id === state.scenarioId);
      if (sc) appName = sc.name.replace(/[^a-zA-Z0-9가-힣]/g, '').trim() || "VibeApp";
    }
    const keyDisplay = {
      idea: 'idea', prd: 'PRD', user_flow: 'USER_Flow', ui_spec: 'UI_Spec',
      design_system: 'Design_System', ai_ui_mockup: 'AI_UI_Mockup', developer_approval: 'Developer_Approval',
      implementation: 'Implementation', test: 'Test', deployment: 'Deployment', feedback: 'Feedback'
    };
    const stageName = keyDisplay[stage.key] || stage.key;
    const filename = `${appName}_${idx + 1}_${stageName}.${ext}`;
    
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    await new Promise(r => setTimeout(r, 400)); // 0.4초 대기
  }
  
  showToast(`${checkboxes.length}개 파일 다운로드가 완료되었습니다.`);
  closeBatchDownloadModal();
}
