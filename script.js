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
    content.innerHTML = `
        <h2>Tasks</h2>
        <div class="task-container">
            <input type="text" id="taskInput" placeholder="Enter a new task" />
            <button onclick="addTask()">Add Task</button>
            <ul id="taskList"></ul>
        </div>
    `;

    // 🔑 Add listener for Enter key
    const taskInput = document.getElementById("taskInput");
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
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
                <img src="dp.jpg" alt="dp" class="about-hero-photo">
                <div class="about-text">
                    <h1>Robin Jethro Manuel</h1>
                    <p>Welcome to <strong>DevMan Command Center</strong>! This is your personal workspace where you can:</p>
                    <ul>
                        <li>Keep all your files and projects in one place</li>
                        <li>Track your tasks and progress easily</li>
                        <li>Chat and collaborate with your team</li>
                    </ul>
                    <p>Everything you need, simple and connected.</p>
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
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        // Create a new list item
        const li = document.createElement("li");

        // Add a checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.style.marginRight = "10px";

        // When checked, toggle strikethrough
        checkbox.addEventListener("change", function() {
            if (checkbox.checked) {
                li.style.textDecoration = "line-through";
            } else {
                li.style.textDecoration = "none";
            }
        });

        // Task text
        const span = document.createElement("span");
        span.textContent = taskInput.value;

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.onclick = () => li.remove();

        // Build list item
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        // Add to task list
        taskList.appendChild(li);

        // Clear input
        taskInput.value = "";
    } else {
        alert("Please enter a task.");
    }
}