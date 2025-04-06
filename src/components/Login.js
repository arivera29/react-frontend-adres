import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/autenticar', { username, password }); // cambia la URL a la de tu backend
      const token = res.data.token;
      localStorage.setItem('token', token);
      onLogin();
    } catch (err) {
      alert('Login fallido');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="username" placeholder="Email" onChange={e => setUsername(e.target.value)} />
        <input className="form-control mb-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-primary" type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
