# Hangle

[My Notes](notes.md)

This will be a simple implementation of the classic game *Hangman*, with a clean, Wordle-type aesthetic. 


> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] Proper use of Markdown
- [X] A concise and compelling elevator pitch
- [X] Description of key features
- [X] Description of how you will use each technology
- [X] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Hangle is a take on the classic word game *Hangman*. It is a classic for a reason, and Hangle will improve on the experience in several ways. Hangle will implement a large vocabulary and statistics to improve the experience and challenge you to learn more. Hangle is the ultimate test of your language and logic skills. It is a perfect game for people who like puzzles, and there will always be more challenges to test you.

### Design



![Design image](login.png)



![Design image](mockup.png.png)




### Key features

- Random word generation for unlimited puzzles.
- Responsive and interactive UI for clean gameplay experience.
- Login and authentication so users can track statistics.
- Score sharing for comparison with other users.
- Keyboard for players to guess individual letters and a text input for guessing the entire word.

  
### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Foundation of my site. There will be two HTML pages- login and main game window.
- **CSS** - Styling my website. I plan to use a clean, simple design that takes inspiration from the popular *Wordle*-type games. 
- **React** - React will be used to build the dynamic parts of my website, such as making guesses or changing the game state. 
- **Service** - Endpoints for authentication and storing statistics. My website will connect with an API to get random words so that there is greater diversity and randomization in the challenge of the Game. Probably something like [Random Word API](https://random-word-api.herokuapp.com/home).
- **DB/Login** - Users will be able to register and login and their credentials are stored. They will be able to view their game statistics and history.
- **WebSocket** - My website will use websocket to notify players when another player completes a puzzle and their score. 

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Server deployed and accessible with custom domain name** - [My server link](https://srich260.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **HTML pages** - I *did* complete this part of the deliverable.
- [X] **Proper HTML element usage** - I used various elements appropriately
- [X] **Links** - Pages link to each other.
- [X] **Text** - Lots of textual content.
- [X] **3rd party API placeholder** - API call will be to get random word for the game.
- [X] **Images** - Logo images in the header.
- [X] **Login placeholder** - Placeholder login screen and elements.
- [X] **DB data placeholder** - Placeholder display for stats that will be tracked.
- [X] **WebSocket placeholder** - Placeholder for websocket notifications.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Header, footer, and main content body** - Each element styled.
- [X] **Navigation elements** - Styled the nav elements in the header.
- [X] **Responsive to window resizing** - Responds to all kinds of resizing, checked in browser.
- [X] **Application elements** - My game elements look how I want them.
- [X] **Application text content** - Text looks how I want it.
- [X] **Application images** - Logo image responsively sized and present.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Bundled using Vite** - I am using vite for my application.
- [X] **Components** - I converted my code into components that are imported and used properly.
- [X] **Router** - I am using browser router for routing

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **All functionality implemented or mocked out** - Everything is mocked out, including a placeholder word before an api request, storing users for login and statistics for each user, and all functionality for the main game.
- [X] **Hooks** - Use effect and use state implemented in various areas in my code to work with React and keep everything up to date.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Node.js/Express HTTP service** - Backend functionality using express and node.js, using fetch to interface with them
- [X] **Static middleware for frontend** - I have app.use(express.static('public')) in my service code
- [X] **Calls to third party endpoints** - Call to the Random Word API for each word in the game
- [X] **Backend service endpoints** - Implemented backend endpoints for create, login, logout, authentication, adding and getting statistics etc. 
- [X] **Frontend calls service endpoints** - My frontend calls these endpoints when logging in and out and creating user. Calls /stat post for updating statistics after finishing a game and the statistics page calls get /stats for displaying.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **User registration** - Users can create "accounts" that are stored in Mongo DB "user" collection.
- [X] **User login and logout** - Changed my login and logout endpoints to check and update the user collection in Mongo instead of server memory.
- [X] **Stores data in MongoDB** - I created a Mongo DB account and can connect to it when using my service endpoints.
- [X] **Stores credentials in MongoDB** - The "user" collection stores emails, hashed passwords, and token values and can lookup based on email or token.
- [X] **Restricts functionality based on authentication** - Restricted endpoints use verifyAuth function.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Backend listens for WebSocket connection** - Backend listens for the websocket connection using peerproxy on httpService.
- [X] **Frontend makes WebSocket connection** - Frontend connects to websocket to notify when a player starts or finishes a game.
- [X] **Data sent over WebSocket connection** - Sends notifications about game status of peers.
- [X] **WebSocket data displayed** - Notifications are displayed in a box in the play.jsx file.
- [X] **Application is fully functional** - All desired functionality has been added and there is no mock functionality leftover.
