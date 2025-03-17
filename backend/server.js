const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Change to your MySQL user
  password: 'Qwerty1914!',  // Add your MySQL password here
  database: 'app_database'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database.');
});

// API Routes
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: 'User registered successfully!' });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.status(200).json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});

// Register route to handle user registration
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Validate input (ensure username and password are provided)
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Insert user data into MySQL database
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});
