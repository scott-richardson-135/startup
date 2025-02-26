import React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    const handleLoginClick = () => {
      const users = JSON.parse(localStorage.getItem('hangleUsers')) || {};
      
      if (users[email] && users[email].password === password)
        localStorage.setItem('hangleCurrentUser', email); 
        navigate('/play');
      };
    
      const handleCreateClick = () => {
        if (!email || !password) {
          return;
        }

        const users = JSON.parse(localStorage.getItem('hangleUsers')) || {};
        if (users[email]) {
          return;
        }

        users[email] = {
          password,
          stats: {wins: 0, losses: 0, gamesPlayed: 0}

        };

        localStorage.setItem('hangleUsers', JSON.stringify(users));
        localStorage.setItem('hangleCurrentUser', email);
        navigate('/play');
      };


  return (
    <main className='container-fluid bg-white text-center'>
      <h1>Welcome to Hangle</h1>

    <img src="logo.png" alt="Hangman Logo" className="logo" />

    <form onSubmit={(e) => e.preventDefault()}>
        <div className="input-group">
            <span className="input-group-text">Email</span>
            <input className="form-control" type="text" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="input-group">
            <span className="input-group-text">Password</span>
            <input className="form-control" type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>


        <button type = "button" onClick={handleLoginClick} className="btn btn-success">Login</button>
        <button type = "button" onClick={handleCreateClick} className="btn btn-secondary">Create</button>  



    </form>
    </main>
  );
}