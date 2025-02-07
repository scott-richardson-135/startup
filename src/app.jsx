import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Stats } from './stats/stats';


export default function App() {
  return (
    <BrowserRouter>
    <div className='body bg-white'>
    <header className="container-fluid">
        {/* Header stuff */}
        <nav className="navbar fixed-top">
            <h1>Hangle</h1>
            <menu className="navbar nav"> 
            <li className="nav-item">
                <NavLink className="nav-link active" to="/">Login</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link active" to="play">Play</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link active" to="stats">Statistics</NavLink>
            </li>
            </menu>
        </nav>
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
  </BrowserRouter>
  );
}

function NotFound() {
    return <main className='container-fluid bg-white text-center'>404: Return to sender. Address unknown.</main>;
  }