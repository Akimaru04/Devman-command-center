function navigateTo(section) {
    const content = document.getElementById('content');

    switch (section) {
        case 'home':
            content.innerHTML = '<h1>Home</h1><p>Welcome to the dashboard.</p>';
            break;
        case 'projects':
            content.innerHTML = '<h1>Projects</h1><p>Here are your ongoing projects.</p>';
            break;
        case 'tasks':
    function renderTasksSection() {
    const content = document.getElementById('content');

    // HTML
    content.innerHTML = `
        <h2>Tasks</h2>
        <div class="task-container">
            <div id="taskProgressContainer" style="margin-bottom:20px;">
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <span>Progress</span>
                    <span id="taskProgressText">0%</span>
                </div>
                <div id="taskProgressBar">
                    <div id="taskProgressFill"></div>
                </div>
            </div>

            <div style="display:flex; gap:10px; margin-bottom:10px;">
                <input type="text" id="taskInput" placeholder="Enter a new task" />
                <select id="taskPriority">
                    <option value="High">High</option>
                    <option value="Medium" selected>Medium</option>
                    <option value="Low">Low</option>
                </select>
                <button id="addTaskBtn">Add Task</button>
            </div>

            <h3>Ongoing Tasks</h3>
            <ul id="ongoingTasks"></ul>

            <h3 id="completedTitle" style="display:none;">
                Completed Tasks
                <button id="toggleCompletedBtn" style="margin-left:10px;">Hide</button>
            </h3>
            <ul id="completedTasks"></ul>
        </div>
    `;

    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const toggleCompletedBtn = document.getElementById('toggleCompletedBtn');

    // Add task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (!taskText) return;

        const priority = document.getElementById('taskPriority').value;

        const li = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        const prioritySpan = document.createElement('span');
        prioritySpan.textContent = priority;
        prioritySpan.classList.add('priority-label');

        // Priority colors
        if (priority === 'High') prioritySpan.style.backgroundColor = '#f44336';
        else if (priority === 'Medium') prioritySpan.style.backgroundColor = '#ff9800';
        else prioritySpan.style.backgroundColor = '#4CAF50';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.style.marginLeft = '10px';
        checkbox.addEventListener('change', () => toggleTask(li, checkbox.checked));

        li.appendChild(taskSpan);
        li.appendChild(prioritySpan);
        li.appendChild(checkbox);

        document.getElementById('ongoingTasks').appendChild(li);
        taskInput.value = '';

        sortTasksByPriority();
        updateTaskProgress();
    }

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Toggle completed tasks visibility
    toggleCompletedBtn.addEventListener('click', () => {
        const completedList = document.getElementById('completedTasks');
        if (completedList.style.display === 'none') {
            completedList.style.display = 'block';
            toggleCompletedBtn.textContent = 'Hide';
        } else {
            completedList.style.display = 'none';
            toggleCompletedBtn.textContent = 'Show';
        }
    });

    // Move tasks between ongoing/completed
    function toggleTask(taskElement, isCompleted) {
        const completedTitle = document.getElementById('completedTitle');
        const completedList = document.getElementById('completedTasks');
        const ongoingList = document.getElementById('ongoingTasks');

        taskElement.style.transition = 'opacity 0.4s, transform 0.4s';
        taskElement.style.opacity = 0;
        taskElement.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            if (isCompleted) {
                taskElement.querySelector('input')?.remove();
                taskElement.classList.add('completed');
                completedList.appendChild(taskElement);
                completedTitle.style.display = 'block';
            } else {
                taskElement.classList.remove('completed');
                ongoingList.appendChild(taskElement);
                if (completedList.children.length === 0) {
                    completedTitle.style.display = 'none';
                }
            }

            taskElement.style.transition = 'opacity 0.4s, transform 0.4s';
            taskElement.style.opacity = 1;
            taskElement.style.transform = 'translateY(0)';

            sortTasksByPriority();
            updateTaskProgress();
        }, 400);
    }

    // Sort ongoing tasks by priority
    function sortTasksByPriority() {
        const list = document.getElementById('ongoingTasks');
        const items = Array.from(list.children);
        const priorityMap = { 'High': 3, 'Medium': 2, 'Low': 1 };

        items.sort((a, b) => {
            const priA = a.querySelector('span.priority-label').textContent;
            const priB = b.querySelector('span.priority-label').textContent;
            return priorityMap[priB] - priorityMap[priA];
        });

        items.forEach(item => list.appendChild(item));
    }

    // Update progress bar
    function updateTaskProgress() {
        const ongoing = document.getElementById('ongoingTasks').children.length;
        const completed = document.getElementById('completedTasks').children.length;
        const total = ongoing + completed;
        const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

        document.getElementById('taskProgressText').textContent = progress + '%';
        document.getElementById('taskProgressFill').style.width = progress + '%';
    }
}

// Initialize task section
renderTasksSection();
            break;
        case 'notes':
            content.innerHTML = '<h1>Notes</h1><p>Take notes and organize your thoughts.</p>';
            break;
        case 'calendar':
            content.innerHTML = '<h1>Schedule</h1><p>View your schedule and upcoming events.</p>';
            break;
        case 'settings':
            content.innerHTML = '<h1>Settings</h1><p>Adjust your preferences here.</p>';
            break;
        case 'about':
    content.innerHTML = `
        <section class="about-hero">
            <div class="about-container">
                <img src="dp.jpg" alt="Robin Jethro Manuel" class="about-hero-photo">
                <div class="about-text">
                    <h1>Robin Jethro Manuel</h1>
                    <h2>IT Student | Cybersecurity Enthusiast | Web Developer</h2>
                    <p>
                        I am a motivated and detail-oriented IT professional in training, passionate about cybersecurity, web development, and innovative technology solutions. I combine technical expertise with a problem-solving mindset to deliver effective and practical outcomes.
                    </p>
                    <p>
                        Experienced in web development, network security, and programming, and certified in Java and Web App Development, I am committed to continuous learning and professional growth. My work focuses on creating secure, efficient, and user-friendly solutions that make a tangible impact.
                    </p>
                    <div class="highlights-cards">
                        <div class="highlight-card">
                            <h3>Certifications</h3>
                            <p>Cisco Intro to Cybersecurity, NC 3 Java and Web App Development</p>
                        </div>
                        <div class="highlight-card">
                            <h3>Technical Skills</h3>
                            <p>Web Development, Network Security, Programming, Hardware Troubleshooting</p>
                        </div>
                        <div class="highlight-card">
                            <h3>Projects</h3>
                            <p>Time Tracker and KPI SYSTEM, DevMan Command Center</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    break;
        default:
            content.innerHTML = '<h1>404</h1><p>Section not found.</p>';
    }
}

// 🚀 Keep this OUTSIDE navigateTo()
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement('li');

    // Task text
    const span = document.createElement('span');
    span.textContent = taskText;
    span.onclick = () => {
        span.classList.toggle('completed');
    };

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = '✕';
    delBtn.onclick = () => li.remove();

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);

    taskInput.value = "";
}