document.getElementById('toggleAuth').addEventListener('click', function() {
    const authBtn = document.getElementById('authBtn');
    if (authBtn.textContent === 'Login') {
        authBtn.textContent = 'Sign Up';
        this.textContent = 'Already have an account? Login';
    } else {
        authBtn.textContent = 'Login';
        this.textContent = "Don't have an account? Sign up";
    }
});

document.getElementById('authForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const action = document.getElementById('authBtn').textContent.toLowerCase();

    fetch('auth.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, action })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            if (action === 'login') {
                window.location.href = 'homepage.html'; // Replace with the actual homepage URL
            } else {
                alert('Sign-up successful! Please log in.');
                document.getElementById('authBtn').textContent = 'Login';
                document.getElementById('toggleAuth').textContent = "Don't have an account? Sign up";
            }
        } else {
            alert('Error: ' + (data.error || 'Invalid credentials or sign-up failed'));
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