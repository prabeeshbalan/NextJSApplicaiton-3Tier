// app/page.js
'use client';  // Add this at the top of your file to mark it as a client component

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Call your backend API to handle registration
    try {
      const response = await axios.post('http://localhost:3001/register', {
        username,
        password
      });
      console.log(response.data);
      // Handle successful registration (redirect, show message, etc.)
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}