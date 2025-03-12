import React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    const handleLoginClick = async () => {
      if (!email || !password) {
        alert("Enter a username and password");
        return;
      }

      try {
        console.log("Attempting login...");
        await loginUser();
        console.log("Login process completed.");
      } catch (error) {
        alert("Invalid credentials");
        console.error("Error: ", error)
      }
        
      };
    
      const handleCreateClick = async () => {
        if (!email || !password) {
          alert("Enter a username and password");
          return;
        }

        try {
          await createUser();
        } catch (error) {
          console.error('Error:', error);
        }
      };

      async function createUser() {
        await loginOrCreate(`/api/auth/create`);
      }

      async function loginUser() {
        await loginOrCreate('/api/auth/login')
      }

      async function loginOrCreate(endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify({email, password}),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        });

        if (response.status === 200) {
          localStorage.setItem('hangleCurrentUser', email);
          navigate('/play');
        }
        else {
          const body = await response.json();
          alert(`⚠ Error: ${body.msg}`);
        }
      }


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