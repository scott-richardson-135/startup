import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (<div className='body bg-white'>
    <header className="container-fluid">
        {/* Header stuff */}
        <nav className="navbar fixed-top">
            <h1>Hangle</h1>
            <menu className="navbar nav"> 
                <li className="nav-item"><a className="nav-link active" href="index.html">Login</a></li>
                <li className="nav-item"><a className="nav-link active" href="play.html">Play</a></li>
                <li className="nav-item"><a className="nav-link active" href="stats.html">Statistics</a></li>
            </menu>
        </nav>
    </header>

    <main>App components go here</main>

    <footer> 
        <div class="container-fluid">
            <span class="text-reset">Scott Richardson </span>
            <a class="text-reset" href="https://github.com/scott-richardson-135/startup">GitHub</a>
        </div>
    </footer>
  </div>);
}