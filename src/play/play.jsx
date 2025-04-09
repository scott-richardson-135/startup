import React from 'react';
import { useState, useEffect } from 'react';
import { GameEvent, GameNotifier } from './gameNotifier'
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
        const backupWords = ["APPLE", "BANANA", "ORANGE", "GRAPE", "MANGO"];
        //third party api call
        GameNotifier.broadcastEvent(userName, GameEvent.Start, { msg: `${userName} started a game` });
        const fetchRandomWord = async () => {
            try {
                const response = await fetch('https://random-word-api.vercel.app/api?words=1');
                if (!response.ok) {
                    throw new Error("Failed to fetch word");
                }

                const data = await response.json();
                const randomWord = data[0]; 
                console.log(randomWord); //for debugging, probably get rid of this
                setWord(randomWord.toUpperCase());
                setDisplayWord("_ ".repeat(randomWord.length).trim())
            } catch (err) {
                console.error("Error fetching random word:", err);
                const fallbackWord = backupWords[Math.floor(Math.random() * backupWords.length)];
                setWord(fallbackWord);
                setDisplayWord("_ ".repeat(fallbackWord.length).trim());
            }
        };

        fetchRandomWord();
    }, [])

    //Mock Notifications
    useEffect(()=> {
        const handler = (event) => {
            //show events from other users
            if (event.type === GameEvent.Start || event.type === GameEvent.End) {
                if (event.from !== userName) {
                    setNotifications((prev) => [...prev.slice(-2), `${event.from} ${event.type === GameEvent.Start ? "started a game" : "finished a game"}`]);
                }
            }
        };

        GameNotifier.addHandler(handler);

        return () => {
            GameNotifier.removeHandler(handler);
        };

    }, [userName])

    //logic for guessed letter
    const handleGuess = (letter) => {
        if (!word) return;

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

    const endGame = async (result) => {
        setGameOver(true);
        setGameResult(result);

        GameNotifier.broadcastEvent(userName, GameEvent.End, { msg: `${userName} ${result === "win" ? "won" : "lost"} the game` });
        const currentUser = localStorage.getItem("hangleCurrentUser");

        if (!currentUser) return;

        const updatedStats = {
            gamesPlayed: 1,
            wins: result === "win" ? 1 : 0,
            losses: result === "loss" ? 1 : 0
        };

        // Send stats update to the backend
        try {
            const response = await fetch('/api/stat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify(updatedStats)
            });

            const text = await response.text(); // Read as text instead of assuming JSON
            console.log("Raw Response from /stat:", text);

            if (!response.ok) {
                const error = await response.json();
                console.error('Failed to update stats:', error);
            } else {
                console.log("Updated stats:", text); // Log raw response
            }

            //get immediately after (debugging)
            const statsResponse = await fetch('/api/stats', { credentials: "include" });
            const statsText = await statsResponse.text();
            console.log("Fetched stats after update:", statsText);

        } catch (error) {
            console.error('Error updating stats:', error);
        }
    }

    const resetGame = async () => {
        setGuessedLetters([]);
        setIncorrectGuesses([]);
        setRemainingGuesses(6);
        setGameOver(false);
        setGameResult(null);

        //another api call
        try {
            const response = await fetch('https://random-word-api.vercel.app/api?words=1');
            if (!response.ok) {
                throw new error("Failed to fetch word");
            }

            GameNotifier.broadcastEvent(userName, GameEvent.Start, { msg: `${userName} started a game` });
            const data = await response.json();
            const randomWord = data[0]; 
            console.log(randomWord); //for debugging, probably get rid of this
            setWord(randomWord.toUpperCase());
            setDisplayWord("_ ".repeat(randomWord.length).trim())
        } catch (err) {
            console.error("Error fetching random word:", err);
        }

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