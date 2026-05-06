아래는 "농사 도우미" 앱의 프론트엔드 전체 코드를 포함한 단일 HTML 파일입니다. 이 코드는 localStorage를 사용하여 사용자의 작업과 피드백을 저장하고, 다양한 화면을 제공합니다. 각 화면은 버튼 클릭 시 전환되며, 작업 추가 및 피드백 제출 기능이 포함되어 있습니다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>농사 도우미</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        .hidden {
            display: none;
        }
    </style>
</head>
<body class="bg-gray-100 font-sans">

    <!-- 로그인 화면 -->
    <div id="login" class="flex items-center justify-center h-screen">
        <div class="bg-white p-8 rounded-lg shadow-lg w-96">
            <h1 class="text-2xl font-bold text-primary text-center mb-6">농사 도우미</h1>
            <input type="text" id="username" placeholder="아이디를 입력하세요" class="border border-gray-300 rounded-lg py-2 px-4 mb-4 w-full">
            <input type="password" id="password" placeholder="비밀번호를 입력하세요" class="border border-gray-300 rounded-lg py-2 px-4 mb-4 w-full">
            <button onclick="login()" class="bg-primary text-white py-2 rounded-lg w-full">로그인</button>
            <p class="text-center mt-4"><a href="#" class="text-secondary">회원가입</a></p>
        </div>
    </div>

    <!-- 홈 화면 -->
    <div id="home" class="p-4 hidden">
        <div class="bg-white p-6 rounded-lg shadow-lg mb-4">
            <h1 class="text-2xl font-bold text-primary mb-4">오늘의 작업</h1>
            <ul id="task-list">
                <!-- 작업 리스트가 여기에 동적으로 추가됨 -->
            </ul>
            <div class="mt-4">
                <h2 class="text-xl font-bold">날씨 정보</h2>
                <p class="text-lg">현재 온도: <span class="font-bold" id="current-temp">25°C</span></p>
                <p class="text-lg">예보: 내일 비예보</p>
            </div>
            <button onclick="showAddTask()" class="bg-secondary text-white py-2 rounded-lg w-full mt-4">작업 추가</button>
        </div>
    </div>

    <!-- 작업 관리 화면 -->
    <div id="task-management" class="p-4 hidden">
        <h1 class="text-2xl font-bold text-primary mb-4">작업 관리</h1>
        <ul id="task-management-list" class="bg-white p-4 rounded-lg shadow-lg mb-4">
            <!-- 작업 리스트가 여기에 동적으로 추가됨 -->
        </ul>
        <button onclick="showAddTask()" class="bg-secondary text-white py-2 rounded-lg w-full">작업 추가</button>
        <button onclick="showHome()" class="bg-primary text-white py-2 rounded-lg w-full mt-4">홈으로 돌아가기</button>
    </div>

    <!-- 작업 추가 화면 -->
    <div id="add-task" class="p-4 hidden">
        <h1 class="text-2xl font-bold text-primary mb-4">작업 추가</h1>
        <input type="text" id="new-task" placeholder="작업명을 입력하세요" class="border border-gray-300 rounded-lg py-2 px-4 mb-4 w-full">
        <button onclick="addTask()" class="bg-secondary text-white py-2 rounded-lg w-full">추가</button>
        <button onclick="showHome()" class="bg-primary text-white py-2 rounded-lg w-full mt-4">홈으로 돌아가기</button>
    </div>

    <!-- 피드백 화면 -->
    <div id="feedback" class="p-4 hidden">
        <h1 class="text-2xl font-bold text-primary mb-4">피드백</h1>
        <p>앱 사용 만족도 평가</p>
        <div class="flex space-x-2 mb-4">
            <span class="star" onclick="selectRating(1)">☆</span>
            <span class="star" onclick="selectRating(2)">☆</span>
            <span class="star" onclick="selectRating(3)">☆</span>
            <span class="star" onclick="selectRating(4)">☆</span>
            <span class="star" onclick="selectRating(5)">☆</span>
        </div>
        <input type="text" id="feedback-comment" placeholder="추가 의견을 남겨주세요" class="border border-gray-300 rounded-lg py-2 px-4 mb-4 w-full">
        <button onclick="submitFeedback()" class="bg-secondary text-white py-2 rounded-lg w-full">제출</button>
        <button onclick="showHome()" class="bg-primary text-white py-2 rounded-lg w-full mt-4">홈으로 돌아가기</button>
    </div>

    <script>
        let tasks = [];
        let rating = 0;

        function login() {
            // 로그인 후 홈 화면으로 이동
            document.getElementById('login').classList.add('hidden');
            document.getElementById('home').classList.remove('hidden');
            loadTasks();
        }

        function loadTasks() {
            // localStorage에서 작업 로드
            const savedTasks = localStorage.getItem('tasks');
            tasks = savedTasks ? JSON.parse(savedTasks) : [];
            renderTaskList();
        }

        function renderTaskList() {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.className = 'border-b border-gray-200 py-3 flex justify-between';
                li.innerHTML = `
                    <span>${task.name}</span>
                    <input type="checkbox" class="form-checkbox h-5 w-5 text-primary" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
                `;
                taskList.appendChild(li);
            });
        }

        function toggleTask(index) {
            tasks[index].completed = !tasks[index].completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTaskList();
        }

        function showTaskManagement() {
            document.getElementById('home').classList.add('hidden');
            document.getElementById('task-management').classList.remove('hidden');
            renderTaskManagementList();
        }

        function renderTaskManagementList() {
            const taskManagementList = document.getElementById('task-management-list');
            taskManagementList.innerHTML = '';
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.className = 'border-b border-gray-200 py-3 flex justify-between';
                li.innerHTML = `
                    <span>${task.name}</span>
                    <button class="text-red-500" onclick="deleteTask(${index})">삭제</button>
                `;
                taskManagementList.appendChild(li);
            });
        }

        function deleteTask(index) {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTaskManagementList();
        }

        function showAddTask() {
            document.getElementById('home').classList.add('hidden');
            document.getElementById('add-task').classList.remove('hidden');
        }

        function addTask() {
            const taskName = document.getElementById('new-task').value;
            if (taskName) {
                tasks.push({ name: taskName, completed: false });
                localStorage.setItem('tasks', JSON.stringify(tasks));
                document.getElementById('new-task').value = '';
                showHome();
                renderTaskList();
            }
        }

        function showHome() {
            document.getElementById('task-management').classList.add('hidden');
            document.getElementById('add-task').classList.add('hidden');
            document.getElementById('feedback').classList.add('hidden');
            document.getElementById('home').classList.remove('hidden');
            renderTaskList();
        }

        function selectRating(r) {
            rating = r;
            const stars = document.querySelectorAll('.star');
            stars.forEach((star, index) => {
                star.textContent = index < rating ? '★' : '☆';
            });
        }

        function submitFeedback() {
            const comment = document.getElementById('feedback-comment').value;
            if (rating > 0) {
                console.log(`Feedback submitted: Rating - ${rating}, Comment - ${comment}`);
                alert('피드백이 제출되었습니다!');
                showHome();
            } else {
                alert('평점을 선택해 주세요.');
            }
        }

        // 초기화 함수
        document.addEventListener('DOMContentLoaded', () => {
            showHome();
        });
    </script>

</body>
</html>
```

### 설명
- **로그인 화면**: 사용자가 아이디와 비밀번호를 입력하여 로그인합니다.
- **홈 화면**: 사용자가 오늘의 작업과 날씨 정보를 확인할 수 있습니다. 작업을 추가할 수 있는 버튼이 있습니다.
- **작업 관리 화면**: 사용자가 추가한 작업을 관리할 수 있는 화면입니다. 작업을 삭제할 수 있습니다.
- **작업 추가 화면**: 새로운 작업을 추가할 수 있는 화면입니다.
- **피드백 화면**: 사용자 피드백을 수집할 수 있는 화면입니다. 평점을 선택하고 추가 의견을 남길 수 있습니다.

### 기능
- 모든 작업은 localStorage에 저장되어 페이지를 새로고침해도 유지됩니다.
- 작업 추가, 삭제, 완료 체크 기능이 포함되어 있습니다.
- 피드백을 제출할 수 있는 기능이 포함되어 있습니다.

이 코드를 HTML 파일로 저장하고 웹 브라우저에서 실행하면 "농사 도우미" 앱을 사용할 수 있습니다.