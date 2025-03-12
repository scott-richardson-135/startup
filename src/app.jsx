import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, useNavigate, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Stats } from './stats/stats';


function AppContent() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
    
        try {
            console.log("logging out");
    
            const response = await fetch('/api/auth/logout', {
                method: 'DELETE',
                credentials: "include",
            });
    
            console.log(`Logout response status: ${response.status}`);
    
            if (response.ok) {
                console.log("Logout successful. Clearing local storage...");
                localStorage.removeItem('hangleCurrentUser');
                navigate('/'); // Redirect to login
            }
            else {
                console.error("Logout failed");
                alert("Logout failed")
            }
        }
        catch (error) {
            console.error("Network error during logout:", error);
            alert("⚠ Error: Unable to connect to the server.");
        }
    };

    
  return (
    <div className='body bg-white'>
    <header className="container-fluid">
        {/* Header stuff */}
        {location.pathname !== '/' && (
            <nav className="navbar fixed-top">
            <h1>Hangle</h1>
            <menu className="navbar nav"> 
            <li className="nav-item">
                <button className="nav-link active" onClick={handleLogout}>Log Out</button>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link active" to="play">Play</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link active" to="stats">Statistics</NavLink>
            </li>
            </menu>
        </nav>)}
    </header>


    <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/play' element={<Play />} />
        <Route path='/stats' element={<Stats />} />
        <Route path='*' element={<NotFound />} />
    </Routes>

    <footer> 
        <div class="container-fluid">
            <span class="text-reset">Scott Richardson </span>
            <a class="text-reset" href="https://github.com/scott-richardson-135/startup">GitHub</a>
        </div>
    </footer>
  </div>
  );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}




function NotFound() {
    return <main className='container-fluid bg-white text-center'>404: Return to sender. Address unknown.</main>;
  }