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
    const [gameOver, setGameOver] = useState(false);
    const [gameResult, setGameResult] = useState(null);
    const userName = localStorage.getItem('hangleCurrentUser');
     


    //Get word, will be an api call eventually
    useEffect(() => {
        const randomWord = "PLACEHOLDER"; //this is where the API call needs to put the word
        setWord(randomWord);
        setDisplayWord("_ ".repeat(randomWord.length).trim())
    }, [])

    //Mock Notifications
    useEffect(()=> {
        const messages = [
            "Player 1 Lost",
            "Player 2 Won",
            "Player 2 started a game",
            "Player 3 said hi"
        ];


        const interval = setInterval(() => {
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            setNotifications((prev) => [...prev.slice(-2), randomMessage])
        }, 5000)

        return () => clearInterval(interval);
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

            //endgame check
            if (updatedDisplayWord.replace(/ /g, "") === word) {
                endGame("win");
            } 
        }
        else {
            setIncorrectGuesses((prev) => [...prev, letter]);
            setRemainingGuesses(remainingGuesses - 1);
        }

        setGuess("");
    }

    useEffect(() => {
        if (remainingGuesses === 0) {
            endGame("loss");
        }
    }, [remainingGuesses]);

    const endGame = (result) => {
        setGameOver(true);
        setGameResult(result);

        //update stats here, local storage for now
        const users = JSON.parse(localStorage.getItem("hangleUsers")) || {};
        const currentUser = localStorage.getItem("hangleCurrentUser");

        if (currentUser && users[currentUser]) {
            users[currentUser].stats.gamesPlayed += 1;
            if (result === "win") {
                users[currentUser].stats.wins +=1;
            }
            else {
                users[currentUser].stats.losses +=1;
            }
        }

        localStorage.setItem("hangleUsers", JSON.stringify(users));
    }

    const resetGame = () => {
        setGuessedLetters([]);
        setIncorrectGuesses([]);
        setRemainingGuesses(6);
        setGameOver(false);
        setGameResult(null);

        const randomWord = "DIFFERENT"; //another api call here
        setWord(randomWord);
        setDisplayWord("_ ".repeat(randomWord.length).trim());
    };

  return (
    <main className='container-fluid bg-white text-center'>
    <img src="logo.png" alt="Hangman Logo" className="logo"/> 
        <div className="players mt-4">
            {/* <!--display for player name, no functionality yet--> */}
            <h3>Good luck, <span className="player-name fw-bold">{userName}</span></h3>
        </div>


        {/*Notifications*/}
        <ul className="notification list-group my-3">
            {notifications.length > 0 ? (
                notifications.map((note, index) => (
                    <li key={index} className="list-group-item">{note}</li>
                 ))
            ) : (
                <li className="list-group-item text-muted">No new notifications</li>
            )}
        </ul>

        <br />



        {/*Word Display*/}
        <div className="word-container mt-4">
            <h2>Word to Guess</h2>
            <div className="word-box border p-3" id="word-display">{displayWord}</div>
        </div>
        <br />


        {/*Guess input*/}
        {!gameOver ? (
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
        ) : (
            <div className="game-over-container">
                <h2 className={gameResult === "win" ? "text-success" : "text-danger"}>
                    {gameResult === "win" ? "You Win!" : "You Lose"}
                </h2>
                <button className={`btn ${gameResult === "win" ? "btn-success" : "btn-danger"}`} onClick={resetGame}>Reset</button>
            </div>
        )}
        



        <div className="incorrect-guesses">
            {/* <!--small little box that displays the letters that were guessed and not correct--> */}
            <p className="fw-bold">Incorrect guesses: <span id="incorrect-letters" className="text-danger">{incorrectGuesses.join(", ") || "None"}</span></p>
        </div>

        <div className="remaining-guesses">
            {/* <!--shows number of guesses remaining, if I wanted to get fancy I could do a hangman type thing--> */}
            <p className="fw-bold">Incorrect guesses remaining: <span id="guesses-left" className="text-primary">{remainingGuesses}</span></p>
        </div>
    </main>
  );
}