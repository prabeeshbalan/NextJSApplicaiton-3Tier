'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Use proxy path instead of direct backend URL
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        password
      });
      console.log('Registration successful:', response.data);
      // Handle success
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error (e.g., show error message to user)
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