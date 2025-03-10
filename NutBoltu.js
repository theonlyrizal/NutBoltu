document.getElementById('toggleSignup').addEventListener('click', function() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn.textContent === 'Login') {
        loginBtn.textContent = 'Sign Up';
        this.textContent = 'Already have an account? Login';
    } else {
        loginBtn.textContent = 'Login';
        this.textContent = "Don't have an account? Sign up";
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'homepage.html'; // Replace with the actual homepage URL
        } else {
            alert('Invalid login credentials');
        }
    })
    .catch(error => console.error('Error:', error));
});

// filepath: /D:/WebDev/NutBoltu/server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'your-username',
    password: 'your-password',
    database: 'your-database'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.send({ success: true });
        } else {
            res.send({ success: false });
        }
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});