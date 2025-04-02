// pages/api/register.js

import mysql from 'mysql2/promise';
import fs from 'fs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }

      const dbConfig = {
        host: process.env.DB_HOST || 'db',
        port: parseInt(process.env.DB_PORT) || 3306,
        user: fs.readFileSync(process.env.DB_USER_FILE, 'utf8').trim(),
        password: process.env.DB_PASSWORD_FILE ? fs.readFileSync(process.env.DB_PASSWORD_FILE, 'utf8').trim() : "fallback_password",
        database: process.env.DB_NAME || 'app_db',
      };

      const connection = await mysql.createConnection(dbConfig);
      const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
      const [results] = await connection.execute(query, [username, password]);
      await connection.end();

      res.status(201).json({ message: 'User registered successfully', results });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Registration failed', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}