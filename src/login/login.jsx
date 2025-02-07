import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();
    
    const handleLoginClick = () => {
        navigate('/play');
      };
    
      const handleCreateClick = () => {
        navigate('/play');  // Redirect to the same page for now
      };


  return (
    <main className='container-fluid bg-white text-center'>
      <h1>Welcome to Hangle</h1>

    <img src="logo.png" alt="Hangman Logo" className="logo" />

    <form method="get" action="play.html">
        <div className="input-group">
            <span className="input-group-text">Email</span>
            <input className="form-control" type="text" placeholder="your@email.com" />
        </div>
        <div className="input-group">
            <span className="input-group-text">Password</span>
            <input className="form-control" type="text" placeholder="password" />
        </div>


        <button type = "button" onClick={handleLoginClick} className="btn btn-success">Login</button>
        <button type = "button" onClick={handleCreateClick} className="btn btn-secondary">Create</button>  



    </form>
    </main>
  );
}