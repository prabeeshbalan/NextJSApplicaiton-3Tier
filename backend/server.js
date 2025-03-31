const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    'http://localhost:3000',  // Your Next.js dev server
    'http://localhost:3001',  // Another frontend
    'http://localhost:3002'   // Current frontend
  ],
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));

app.use(cors({
  origin: "http://localhost:3000", // Allow frontend origin
  credentials: true
}));

// Middleware
app.use(bodyParser.json());

// Database Configuration
const dbConfig = {
  host: process.env.DB_HOST || 'db',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: fs.readFileSync(process.env.DB_USER_FILE, 'utf8').trim(),
  password: process.env.DB_PASSWORD_FILE ? fs.readFileSync(process.env.DB_PASSWORD_FILE, 'utf8').trim() : "fallback_password",
  database: process.env.DB_NAME || 'app_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);
const db = mysql.createConnection(dbConfig);

// Database connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', database: 'connected' });
});

// User Registration
app.post('/register', (req, res) => {
  console.log('Incoming request:', req.body);

  const { username, password } = req.body;
  if (!username || !password) {
    console.log('Missing credentials');
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  pool.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Registration error:', err.sqlMessage);
      return res.status(500).json({ message: 'Registration failed', error: err.sqlMessage });
    }
    console.log('User registered:', result);
    res.status(201).json({ message: 'User registered successfully' });
  });
});

// User Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  pool.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ message: 'Login failed' });
    }

    if (results.length > 0) {
      res.status(200).json({
        message: 'Login successful',
        user: { username: results[0].username }
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start Server
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});