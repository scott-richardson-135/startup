import React from 'react';
import { useState, useEffect } from 'react';
import './play.css';

export function Play() {

    //state variables
    const [word, setWord] = useState("");
    const [displayWord, setDisplayWord] = useState("");
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [incorrectGuesses, setIncorrectGuesses] = useState([]);
    const [remainingGuesses, setRemainingGuesses] = useState(6);
    const [notifications, setNotifications] = useState([]);
    const [guess, setGuess] = useState("");

    //Get word, will be an api call eventually
    useEffect(() => {
        const randomWord = "PLACEHOLDER"; //this is where the API call needs to put the word
        setWord(randomWord);
        setDisplayWord("_ ".repeat(randomWord.length).trim())
    }, [])

    //logic for guessed letter
    const handleGuess = (letter) => {
        letter = letter.toUpperCase();

        if (!letter.match(/[A-Z]/) || guessedLetters.includes(letter)) return;

        setGuessedLetters((prev) => [...prev, letter]); //adds letter to guessed letters while managing state

        if (word.includes(letter)) {
            //update the display word
            let updatedDisplayWord = word.split("").map((char) => (guessedLetters.includes(char) || char === letter ? char : "_")).join(" ");
            setDisplayWord(updatedDisplayWord);
        }
        else {
            setIncorrectGuesses((prev) => [...prev, letter]);
            setRemainingGuesses(remainingGuesses - 1);
        }

        setGuess("");
    }

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



        {/*Word Display*/}
        <div className="word-container mt-4">
            {/* <!--displays the underlines for the word to be guessed, eventualy guessed letters will replace _-->
            <!--api call will be around here to get a random word to guess--> */}
            <h2>Word to Guess</h2>
            <div className="word-box border p-3" id="word-display">{displayWord}</div>
        </div>
        <br />


        {/*Guess input*/}
        <div className="input-container my-3">
            {/* <!--little text box to enter a letter to guess--> */}
            <label for="guess-input" className="form-label">Guess a letter:</label>
            <div className="input-group w-50 mx-auto"> 
                <input type="text"
                className="form-control text-center"
                id="guess-input" maxlength="1"
                value = {guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGuess(guess)} 
                />
                <button id="guess-button" className="btn btn-success"
                onClick={() => handleGuess(guess)}
                >Guess</button>
            </div>
        </div>



        <div className="incorrect-guesses">
            {/* <!--small little box that displays the letters that were guessed and not correct--> */}
            <p className="fw-bold">Incorrect guesses: <span id="incorrect-letters" className="text-danger">{incorrectGuesses.join(", ") || "None"}</span></p>
        </div>

        <div className="remaining-guesses">
            {/* <!--shows number of guesses remaining, if I wanted to get fancy I could do a hangman type thing--> */}
            <p className="fw-bold">Guesses remaining: <span id="guesses-left" className="text-primary">{remainingGuesses}</span></p>
        </div>
    </main>
  );
}