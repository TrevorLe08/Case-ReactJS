const express = require('express');
const router = express.Router();

const users = [
    {
        id: 1,
        name: 'Administrator',
        username: 'admin',
        password: '12345678',
        isAdmin: true
    }, {
        id: 2,
        name: 'Trevor Le',
        username: 'trevor',
        password: '12345678',
        isAdmin: false
    },{
        id: 3,
        name: 'LTMT',
        username: 'ltmt',
        password: '12345678',
        isAdmin: false
    },
];

router.post("/register", (req, res) => {
    const { name, username, password } = req.body;
    const exists = users.some(user => user.username === username);
    if (exists) {
        return res.status(409).json({ message: "Username already exists" });
    }
    const newUser = {
        id: users.length + 1,
        name,
        username,
        password,
        isAdmin: false,
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    res.json({ message: "Login successful", user });
});

module.exports = router;