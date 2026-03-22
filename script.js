const userForm = document.getElementById("userForm");
const userList = document.getElementById("userList");

let users = JSON.parse(localStorage.getItem("users")) || [];

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function renderUsers() {
  userList.innerHTML = "";

  if (users.length === 0) {
    userList.innerHTML = "<p>No users added yet.</p>";
    return;
  }

  users.forEach((user, index) => {
    const div = document.createElement("div");
    div.className = "user-card";

    div.innerHTML = `
      <strong>${user.username}</strong> (${user.role})<br>
      Status: ${user.active ? "Active" : "Disabled"}<br><br>
      <button onclick="resetPassword(${index})">Reset Password</button>
      <button onclick="toggleUser(${index})">
        ${user.active ? "Disable" : "Enable"}
      </button>
    `;

    userList.appendChild(div);
  });
}

function resetPassword(index) {
  alert("Password reset for " + users[index].username);
}

function toggleUser(index) {
  users[index].active = !users[index].active;
  saveUsers();
  renderUsers();
}

userForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const role = document.getElementById("role").value;

  const newUser = {
    username: username,
    role: role,
    active: true
  };

  users.push(newUser);
  saveUsers();
  renderUsers();
  userForm.reset();
});

renderUsers();
