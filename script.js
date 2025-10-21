// Navigation
function navigateTo(section) {
    const content = document.getElementById('content');

    switch (section) {
        case 'home':
            content.innerHTML = `
                <div class="highlight-card">
                    <h2>Welcome to Devman Command Center</h2>
                    <p>Your personal dashboard for tasks, projects, schedules, and more.</p>
                </div>
            `;
            break;

        case 'tasks':
            content.innerHTML = `
                <div class="task-container">
                    <h2>Tasks</h2>
                    <input type="text" id="taskInput" placeholder="Enter a new task">
                    <select id="taskPriority">
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>
                    <button onclick="addTask()">Add Task</button>
                    
                    <div id="taskProgressBar">
                        <div id="taskProgressFill"></div>
                    </div>
                    
                    <ul id="taskList"></ul>
                </div>
            `;
            renderTasks();
            break;

        case 'projects':
            content.innerHTML = `
                <div class="task-container">
                    <h2>Projects</h2>
                    <input type="text" id="projectInput" placeholder="Enter project name">
                    <button onclick="addProject()">Add Project</button>
                    <ul id="projectList"></ul>
                </div>
            `;
            renderProjects();
            break;

        case 'schedule':
            content.innerHTML = `
                <div class="task-container">
                    <h2>Schedule</h2>
                    <input type="text" id="scheduleInput" placeholder="Enter schedule item">
                    <input type="date" id="scheduleDate">
                    <input type="time" id="scheduleTime" step="60">
                    <button onclick="addSchedule()">Add Schedule</button>
                    <ul id="scheduleList"></ul>
                </div>
            `;
            renderSchedules();
            break;

        case 'notes':
            content.innerHTML = `
                <div class="highlight-card">
                    <h2>Notes</h2>
                    <p>Here you can jot down quick notes or reminders. (Coming soon!)</p>
                </div>
            `;
            break;

        case 'settings':
            content.innerHTML = `
                <div class="highlight-card">
                    <h2>Settings</h2>
                    <p>Customize your dashboard preferences here. (Feature coming soon!)</p>
                </div>
            `;
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
                                I am a motivated and detail-oriented IT professional in training, passionate about cybersecurity, web development, and innovative technology solutions. 
                                I combine technical expertise with a problem-solving mindset to deliver effective and practical outcomes.
                            </p>
                            <p>
                                Experienced in web development, network security, and programming, and certified in Java and Web App Development, 
                                I am committed to continuous learning and professional growth. My work focuses on creating secure, efficient, and user-friendly solutions that make a tangible impact.
                            </p>
                            <div class="highlights-cards">
                                <div class="highlight-card">
                                    <h3>Certifications</h3>
                                    <p>Cisco Intro to Cybersecurity | NC 3 Java and Web App Development</p>
                                </div>
                                <div class="highlight-card">
                                    <h3>Technical Skills</h3>
                                    <p>Web Development | Network Security | Programming | Hardware Troubleshooting</p>
                                </div>
                                <div class="highlight-card">
                                    <h3>Projects</h3>
                                    <p>Time Tracker and KPI System | DevMan Command Center</p>
                                </div>
                                <div class="highlight-card">
                                    <h3>Trainings</h3>
                                    <p>SC-900 Microsoft Security, Compliance and Identity Fundamentals | Python Software Programming 101</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `;
            break;

            case 'logout':
            content.innerHTML = `
                <div class="highlight-card">
                    <h2>Logout</h2>
                    <p>You have been logged out. See you next time!</p>
                </div>
            `;
            break;
    }
}

// ================= TASKS =================
let tasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput").value.trim();
    const priority = document.getElementById("taskPriority").value;

    if (taskInput === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({ text: taskInput, priority, completed: false });
    renderTasks();

    document.getElementById("taskInput").value = "";
}

function renderTasks() {
    const list = document.getElementById("taskList");
    if (!list) return;
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${task.text} <span class="priority-label ${task.priority}">${task.priority}</span></span>
            <div>
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="deleteTask(${index})">✖</button>
            </div>
        `;
        if (task.completed) li.classList.add("completed");
        list.appendChild(li);
    });

    updateTaskProgress();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function updateTaskProgress() {
    const completed = tasks.filter(t => t.completed).length;
    const total = tasks.length;
    const percent = total ? (completed / total) * 100 : 0;

    const fill = document.getElementById("taskProgressFill");
    if (fill) fill.style.width = percent + "%";
}

// ================= PROJECTS =================
let projects = [];

function addProject() {
    const input = document.getElementById("projectInput").value.trim();
    if (input === "") {
        alert("Please enter a project name.");
        return;
    }
    projects.push(input);
    renderProjects();

    document.getElementById("projectInput").value = "";
}

function renderProjects() {
    const list = document.getElementById("projectList");
    if (!list) return;
    list.innerHTML = "";

    projects.forEach((proj, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${proj}</span>
            <button onclick="deleteProject(${index})">Remove</button>
        `;
        list.appendChild(li);
    });
}

function deleteProject(index) {
    projects.splice(index, 1);
    renderProjects();
}

// ================= SCHEDULE =================
let schedules = [];

function addSchedule() {
    const input = document.getElementById("scheduleInput").value.trim();
    const date = document.getElementById("scheduleDate").value;
    const time = document.getElementById("scheduleTime").value; // HH:MM only

    if (!input || !date || !time) {
        alert("Please enter all fields.");
        return;
    }

    schedules.push({ text: input, date, time });
    renderSchedules();

    // Clear inputs
    document.getElementById("scheduleInput").value = "";
    document.getElementById("scheduleDate").value = "";
    document.getElementById("scheduleTime").value = "";
}

function renderSchedules() {
    const scheduleList = document.getElementById("scheduleList");
    if (!scheduleList) return;

    scheduleList.innerHTML = "";

    schedules.forEach((item, index) => {
        const dateTime = new Date(`${item.date}T${item.time}`);
        const formattedDate = dateTime.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
        const formattedTime = dateTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });

        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${item.text}</strong> 
            <span class="schedule-datetime">(${formattedDate} - ${formattedTime})</span>
            <button onclick="deleteSchedule(${index})">Delete</button>
        `;
        scheduleList.appendChild(li);
    });
}

function deleteSchedule(index) {
    schedules.splice(index, 1);
    renderSchedules();
}