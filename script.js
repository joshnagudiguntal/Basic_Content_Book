// Load saved content when the page opens
// Check Login
if (
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/"
) {
    let loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn !== "true") {
        window.location.href = "login.html";
    }
}
window.onload = function () {
    loadContents();
};


// Add Content
function addContent() {

    let title = document.getElementById("title").value;
    let category = document.getElementById("category").value;
    let content = document.getElementById("content").value;

    if (title === "" || category === "" || content === "") {
        alert("Please fill all fields.");
        return;
    }

    let contents = JSON.parse(localStorage.getItem("contents")) || [];

    let newContent = {
    title: title,
    category: category,
    content: content,
    date: new Date().toLocaleString()
};

    contents.push(newContent);

    localStorage.setItem("contents", JSON.stringify(contents));

    document.getElementById("title").value = "";
    document.getElementById("category").value = "";
    document.getElementById("content").value = "";

    alert("Content saved successfully!");

    loadContents();
}


// Display Contents
function loadContents() {

    let contents =
        JSON.parse(localStorage.getItem("contents")) || [];

    let contentList =
        document.getElementById("contentList");

    contentList.innerHTML = "";
    document.getElementById("contentCount").innerText =
    "Total Contents: " + contents.length;

    contents.forEach(function (item, index) {

        let card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${item.title}</h3>

            <p class="category">
                ${item.category}
            </p>
            <p class="content-date">
    📅 ${item.date || "No date available"}
</p>

            <p class="content-text">
                ${item.content}
            </p>

            <button onclick="editContent(${index})">
                Edit
            </button>

            <button onclick="deleteContent(${index})">
                Delete
            </button>
        `;

        contentList.appendChild(card);
    });
}


// Delete Content
function deleteContent(index) {

    let contents =
        JSON.parse(localStorage.getItem("contents")) || [];

    contents.splice(index, 1);

    localStorage.setItem(
        "contents",
        JSON.stringify(contents)
    );

    loadContents();
}


// Edit Content
function editContent(index) {

    let contents =
        JSON.parse(localStorage.getItem("contents")) || [];

    let item = contents[index];

    document.getElementById("title").value =
        item.title;

    document.getElementById("category").value =
        item.category;

    document.getElementById("content").value =
        item.content;

    contents.splice(index, 1);

    localStorage.setItem(
        "contents",
        JSON.stringify(contents)
    );

    loadContents();

    window.location.href = "#add-content";
}


// Search Content
function searchContent() {

    let searchValue =
        document.getElementById("search").value.toLowerCase();

    let cards =
        document.querySelectorAll(".card");

    cards.forEach(function (card) {

        let text =
            card.innerText.toLowerCase();

        if (text.includes(searchValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });
}
// Filter Content by Category
function filterContent() {

    let selectedCategory =
        document.getElementById("filterCategory").value;

    let cards =
        document.querySelectorAll(".card");

    cards.forEach(function (card) {

        let category =
            card.querySelector(".category").innerText;

        if (
            selectedCategory === "" ||
            category === selectedCategory
        ) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });
}
// Reset Search and Category Filter
function resetFilters() {

    document.getElementById("search").value = "";

    document.getElementById("filterCategory").value = "";

    let cards = document.querySelectorAll(".card");

    cards.forEach(function (card) {
        card.style.display = "block";
    });
}
// Register User
function registerUser() {

    let name =
        document.getElementById("registerName").value;

    let email =
        document.getElementById("registerEmail").value;

    let password =
        document.getElementById("registerPassword").value;

    let confirmPassword =
        document.getElementById("confirmPassword").value;


    if (name === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Please fill all fields.");
        return;
    }


    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }


    let user = {
        name: name,
        email: email,
        password: password
    };


    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );


    alert("Registration successful!");

    window.location.href = "login.html";
}
// Login User
function loginUser() {

    let email =
        document.getElementById("loginEmail").value;

    let password =
        document.getElementById("loginPassword").value;


    if (email === "" || password === "") {
        alert("Please enter email and password.");
        return;
    }


    let savedUser =
        JSON.parse(localStorage.getItem("user"));


    if (!savedUser) {
        alert("No account found. Please register first.");
        return;
    }


    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {

        localStorage.setItem("loggedIn", "true");

        alert("Login successful!");

        window.location.href = "index.html";

    } else {

        alert("Invalid email or password.");

    }
}
// Logout User
function logoutUser() {

    localStorage.removeItem("loggedIn");

    alert("You have been logged out.");

    window.location.href = "login.html";
}