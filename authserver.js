const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(".")); // serve root directory

const USERS_FILE = "./authusers.json";

// Load users
function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(USERS_FILE));
}

// Save users
function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Signup
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();

    if (users.find(u => u.username === username)) {
        return res.json({ success: false, message: "Username already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    users.push({ username, password: hashed });
    saveUsers(users);

    res.json({ success: true });
});

// Login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();

    const user = users.find(u => u.username === username);
    if (!user) return res.json({ success: false, message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ success: false, message: "Wrong password" });

    res.json({ success: true });
});

// Start server
app.listen(3000, () => console.log("Auth server running on http://localhost:3000"));
