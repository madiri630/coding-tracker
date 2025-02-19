document.addEventListener("DOMContentLoaded", loadProblems);

function addProblem() {
    const title = document.getElementById("problemTitle").value.trim();
    const platform = document.getElementById("platform").value;
    const status = document.getElementById("status").value;

    if (title === "") {
        alert("Please enter a problem title!");
        return;
    }

    const problem = { title, platform, status };
    let problems = JSON.parse(localStorage.getItem("problems")) || [];
    problems.push(problem);
    localStorage.setItem("problems", JSON.stringify(problems));

    document.getElementById("problemTitle").value = "";
    loadProblems();
}

function loadProblems() {
    const problemList = document.getElementById("problemList");
    problemList.innerHTML = "";

    let problems = JSON.parse(localStorage.getItem("problems")) || [];
    problems.forEach((problem, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${problem.title}</td>
            <td>${problem.platform}</td>
            <td>${problem.status}</td>
            <td>
                <button class="edit" onclick="editProblem(${index})">✏️ Edit</button>
                <button class="delete" onclick="deleteProblem(${index})">❌ Delete</button>
            </td>
        `;
        problemList.appendChild(row);
    });
}

function editProblem(index) {
    let problems = JSON.parse(localStorage.getItem("problems")) || [];
    const newStatus = prompt("Update Status (Not Attempted, In Progress, Solved):", problems[index].status);
    
    if (newStatus) {
        problems[index].status = newStatus;
        localStorage.setItem("problems", JSON.stringify(problems));
        loadProblems();
    }
}

function deleteProblem(index) {
    let problems = JSON.parse(localStorage.getItem("problems")) || [];
    problems.splice(index, 1);
    localStorage.setItem("problems", JSON.stringify(problems));
    loadProblems();
}
