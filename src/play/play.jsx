import React from 'react';
import './play.css';

export function Play() {

    //state variables
    const [word, setWord] = useState("");
    const [displayWord, setDisplayWOrd] = useState("");
    










  return (
    <main className='container-fluid bg-white text-center'>
    <img src="logo.png" alt="Hangman Logo" className="logo"/> 
        <div className="players mt-4">
            {/* <!--display for player name, no functionality yet--> */}
            <h3>Player: <span className="player-name fw-bold">Player Name Here</span></h3>
        </div>

        <ul className="notification list-group my-3">
            {/* <!--placeholder for web socket notifications--> */}
            <li className="list-group-item">Player 1 guessed correctly</li>
            <li className="list-group-item">Player 2 failed</li>
        </ul>

        <br />




        <div className="word-container mt-4">
            {/* <!--displays the underlines for the word to be guessed, eventualy guessed letters will replace _-->
            <!--api call will be around here to get a random word to guess--> */}
            <h2>Word to Guess</h2>
            <div className="word-box border p-3" id="word-display">_ _ _ _ _</div>
        </div>
        <br />


        <div className="input-container my-3">
            {/* <!--little text box to enter a letter to guess--> */}
            <label for="guess-input" className="form-label">Guess a letter:</label>
            <div className="input-group w-50 mx-auto"> 
                <input type="text" className="form-control text-center" id="guess-input" maxlength="1"/>
                <button id="guess-button" className="btn btn-success">Guess</button>
            </div>
        </div>

        <div className="incorrect-guesses">
            {/* <!--small little box that displays the letters that were guessed and not correct--> */}
            <p className="fw-bold">Incorrect guesses: <span id="incorrect-letters" className="text-danger">placeholder</span></p>
        </div>

        <div className="remaining-guesses">
            {/* <!--shows number of guesses remaining, if I wanted to get fancy I could do a hangman type thing--> */}
            <p className="fw-bold">Guesses remaining: <span id="guesses-left" className="text-primary">placeholder</span></p>
        </div>
    </main>
  );
}